import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM, type Message, type Tool, type ToolCall } from "../_core/llm";
import { notifyOwner } from "../_core/notification";
import {
  createLead,
  createVisibilityCheck,
  createBooking,
  createChatConversation,
  updateChatConversation,
  getChatConversationBySession,
} from "../db";
import { AGENT_SYSTEM_PROMPT } from "./agentKnowledge";
import { AGENT_TOOLS, executeAgentTool } from "./agentTools";

/**
 * The Oney Labs AI Agent Router
 * 
 * This is not a chatbot. This is a closer.
 * It has TOOLS (not just words), DEEP KNOWLEDGE (not generic responses),
 * and GOALS (not just answers). Every conversation is a live demo.
 */

// Lead qualification scoring
interface LeadProfile {
  businessName?: string;
  businessType?: string;
  location?: string;
  website?: string;
  email?: string;
  phone?: string;
  painPoints: string[];
  budget?: string;
  urgency?: string;
  messageCount: number;
  toolsUsed: string[];
  score: number; // 0-100
  temperature: "cold" | "warm" | "hot";
}

function scoreLeadProfile(profile: LeadProfile): LeadProfile {
  let score = 0;

  // Business info provided
  if (profile.businessName) score += 10;
  if (profile.businessType) score += 10;
  if (profile.location) score += 5;
  if (profile.website) score += 5;
  if (profile.email) score += 15;
  if (profile.phone) score += 10;

  // Engagement signals
  if (profile.messageCount >= 3) score += 5;
  if (profile.messageCount >= 6) score += 5;
  if (profile.messageCount >= 10) score += 5;

  // Tool usage (high intent)
  if (profile.toolsUsed.includes("check_ai_visibility")) score += 15;
  if (profile.toolsUsed.includes("scan_website")) score += 10;
  if (profile.toolsUsed.includes("book_consultation")) score += 20;

  // Pain points
  score += Math.min(profile.painPoints.length * 5, 15);

  // Budget mentioned
  if (profile.budget) score += 5;

  // Urgency
  if (profile.urgency === "high") score += 10;
  else if (profile.urgency === "medium") score += 5;

  score = Math.min(score, 100);

  let temperature: "cold" | "warm" | "hot" = "cold";
  if (score >= 60) temperature = "hot";
  else if (score >= 30) temperature = "warm";

  return { ...profile, score, temperature };
}

export const agentRouter = router({
  /**
   * Main agent endpoint with function calling loop
   * The agent thinks, decides which tools to use, executes them,
   * and returns a final response with rich tool results.
   */
  chat: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
        message: z.string().min(1),
        history: z
          .array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            })
          )
          .optional(),
        leadProfile: z
          .object({
            businessName: z.string().optional(),
            businessType: z.string().optional(),
            location: z.string().optional(),
            website: z.string().optional(),
            email: z.string().optional(),
            phone: z.string().optional(),
            painPoints: z.array(z.string()),
            budget: z.string().optional(),
            urgency: z.string().optional(),
            messageCount: z.number(),
            toolsUsed: z.array(z.string()),
            score: z.number(),
            temperature: z.enum(["cold", "warm", "hot"]),
          })
          .optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { sessionId, message, history = [] } = input;
      const leadProfile: LeadProfile = input.leadProfile || {
        painPoints: [],
        messageCount: 0,
        toolsUsed: [],
        score: 0,
        temperature: "cold",
      };

      leadProfile.messageCount += 1;

      // Build conversation messages
      const messages: Message[] = [
        { role: "system", content: AGENT_SYSTEM_PROMPT },
        ...history.map((h) => ({
          role: h.role as "user" | "assistant",
          content: h.content,
        })),
        { role: "user", content: message },
      ];

      // Tool results to send back to frontend for rich display
      const toolResults: Array<{
        tool: string;
        result: Record<string, unknown>;
      }> = [];

      // Agent tool loop: keep calling until the agent stops using tools
      let maxIterations = 5;
      let finalResponse = "";

      while (maxIterations > 0) {
        maxIterations--;

        const response = await invokeLLM({
          messages,
          tools: AGENT_TOOLS as Tool[],
          toolChoice: maxIterations === 0 ? "none" : "auto",
        });

        const choice = response.choices[0];
        if (!choice) break;

        const assistantMessage = choice.message;

        // If the model wants to call tools
        if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
          // Add the assistant message with tool calls to conversation
          messages.push({
            role: "assistant",
            content: (typeof assistantMessage.content === "string" ? assistantMessage.content : "") || "",
            // We need to pass tool_calls through but our Message type doesn't have it
            // So we'll handle this by adding tool results
          });

          // Execute each tool call
          for (const toolCall of assistantMessage.tool_calls) {
            const toolName = toolCall.function.name;
            let toolArgs: Record<string, unknown> = {};

            try {
              toolArgs = JSON.parse(toolCall.function.arguments);
            } catch {
              toolArgs = {};
            }

            // Track tool usage for lead scoring
            if (!leadProfile.toolsUsed.includes(toolName)) {
              leadProfile.toolsUsed.push(toolName);
            }

            // Extract lead info from tool args
            extractLeadInfo(toolArgs, leadProfile);

            // Execute the tool
            const result = await executeAgentTool(toolName, toolArgs);
            toolResults.push({ tool: toolName, result });

            // Add tool result to conversation
            messages.push({
              role: "tool",
              content: JSON.stringify(result),
              tool_call_id: toolCall.id,
              name: toolName,
            });
          }

          // We need to re-construct the assistant message properly for the next LLM call
          // Remove the plain assistant message we added and add the proper one
          messages.splice(messages.length - assistantMessage.tool_calls.length - 1, 1, {
            role: "assistant",
            content: buildAssistantToolCallMessage(assistantMessage),
          });

          continue; // Loop back for the agent to process tool results
        }

        // No tool calls — this is the final response
        finalResponse =
          typeof assistantMessage.content === "string"
            ? assistantMessage.content
            : "";
        break;
      }

      // Score the lead
      const scoredProfile = scoreLeadProfile(leadProfile);

      // Save conversation to DB
      try {
        const existing = await getChatConversationBySession(sessionId);
        const allMessages = [
          ...history,
          { role: "user", content: message },
          { role: "assistant", content: finalResponse },
        ];

        if (existing) {
          await updateChatConversation(existing.id, {
            messages: JSON.stringify(allMessages),
          });
        } else {
          await createChatConversation({
            sessionId,
            messages: JSON.stringify(allMessages),
          });
        }
      } catch (err) {
        console.error("[Agent DB Error]", err);
      }

      // Notify owner for hot leads
      if (
        scoredProfile.temperature === "hot" &&
        scoredProfile.score >= 60
      ) {
        try {
          await notifyOwner({
            title: `HOT LEAD: ${scoredProfile.businessName || "Unknown Business"} (Score: ${scoredProfile.score})`,
            content: `Business: ${scoredProfile.businessName || "N/A"}
Type: ${scoredProfile.businessType || "N/A"}
Location: ${scoredProfile.location || "N/A"}
Email: ${scoredProfile.email || "N/A"}
Phone: ${scoredProfile.phone || "N/A"}
Pain Points: ${scoredProfile.painPoints.join(", ") || "N/A"}
Tools Used: ${scoredProfile.toolsUsed.join(", ")}
Messages: ${scoredProfile.messageCount}
Score: ${scoredProfile.score}/100`,
          });
        } catch (err) {
          console.error("[Agent Notification Error]", err);
        }
      }

      // Save lead if we have enough info
      if (scoredProfile.email || (scoredProfile.businessName && scoredProfile.temperature !== "cold")) {
        try {
          await createLead({
            email: scoredProfile.email || "unknown@agent-lead.com",
            name: scoredProfile.businessName || null,
            businessName: scoredProfile.businessName || null,
            service: scoredProfile.businessType || null,
            location: scoredProfile.location || null,
            source: "chatbot",
            visibilityScore: scoredProfile.score,
            message: `Agent conversation. Temperature: ${scoredProfile.temperature}. Tools used: ${scoredProfile.toolsUsed.join(", ")}. Pain points: ${scoredProfile.painPoints.join(", ")}`,
          });
        } catch (err) {
          // Lead may already exist, that's fine
          console.error("[Agent Lead Save]", err);
        }
      }

      return {
        message: finalResponse,
        toolResults,
        leadProfile: scoredProfile,
      };
    }),

  /** Capture contact info from agent conversation */
  captureContact: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
        email: z.string().email(),
        name: z.string().optional(),
        phone: z.string().optional(),
        businessName: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const existing = await getChatConversationBySession(input.sessionId);
        if (existing) {
          await updateChatConversation(existing.id, {
            emailCaptured: input.email,
          });
        }

        await createLead({
          email: input.email,
          name: input.name || null,
          phone: input.phone || null,
          businessName: input.businessName || null,
          source: "chatbot",
          message: "Contact captured from AI agent conversation",
        });

        await notifyOwner({
          title: `Agent Lead: ${input.businessName || input.name || input.email}`,
          content: `New contact from AI agent.\nEmail: ${input.email}\nName: ${input.name || "N/A"}\nPhone: ${input.phone || "N/A"}\nBusiness: ${input.businessName || "N/A"}`,
        });

        return { success: true };
      } catch (err) {
        console.error("[Agent Contact Capture Error]", err);
        throw new Error("Failed to save contact info");
      }
    }),
});

function extractLeadInfo(
  args: Record<string, unknown>,
  profile: LeadProfile
) {
  if (args.businessName && typeof args.businessName === "string")
    profile.businessName = args.businessName;
  if (args.business_name && typeof args.business_name === "string")
    profile.businessName = args.business_name;
  if (args.service && typeof args.service === "string")
    profile.businessType = args.service;
  if (args.industry && typeof args.industry === "string")
    profile.businessType = args.industry;
  if (args.location && typeof args.location === "string")
    profile.location = args.location;
  if (args.website && typeof args.website === "string")
    profile.website = args.website;
  if (args.url && typeof args.url === "string") profile.website = args.url;
  if (args.email && typeof args.email === "string")
    profile.email = args.email;
  if (args.phone && typeof args.phone === "string")
    profile.phone = args.phone;
  if (args.name && typeof args.name === "string" && !profile.businessName)
    profile.businessName = args.name;
}

function buildAssistantToolCallMessage(assistantMessage: {
  content: string | unknown;
  tool_calls?: ToolCall[];
}): string {
  // For the re-send to LLM, we encode the tool calls as a structured message
  const content =
    typeof assistantMessage.content === "string"
      ? assistantMessage.content
      : "";
  const toolCallSummary = (assistantMessage.tool_calls || [])
    .map(
      (tc) =>
        `[Called tool: ${tc.function.name}(${tc.function.arguments})]`
    )
    .join("\n");
  return content + (toolCallSummary ? "\n" + toolCallSummary : "");
}
