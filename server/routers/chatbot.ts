import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { notifyOwner } from "../_core/notification";
import { createLead, createChatConversation, updateChatConversation, getChatConversationBySession } from "../db";

const SYSTEM_PROMPT = `You are the AI assistant for Oney Labs, an AI consulting company based in Lake Nona, South Orlando, FL. You help visitors learn about our services and answer their questions.

ABOUT ONEY LABS:
- Founded by Alan Oney, who built UpTend (a platform with 198 AI tools) as a single person
- Based in Lake Nona, serving all of South Orlando
- Phone: (850) 319-9550
- Email: alan@oneylabs.ai

SERVICES:
1. AI Search Visibility ($750-$2,500/mo): Help businesses show up when people ask ChatGPT, Perplexity, or Claude for recommendations
2. AI Business Growth ($750+ one-time): AI consulting, automation, and custom tool building for businesses
3. AI Education ($75/workshop): Monthly workshops, 1-on-1 lessons, weekly newsletter

KEY DIFFERENTIATORS:
- Pricing is transparent (on the website)
- No contracts required
- 2-4 week delivery (not 3-6 months)
- 50-70% cheaper than other AI consulting firms
- Revenue share option available ($0 upfront)
- Free 30-minute AI audit available

INSTRUCTIONS:
- Be helpful, direct, and conversational (not corporate)
- If someone asks about pricing, give specific numbers
- Always try to guide them toward booking a free AI audit
- If they seem interested, ask for their email so Alan can follow up
- Keep responses concise (2-3 sentences max unless they ask for detail)
- If you don't know something specific, say so and suggest they book an audit`;

export const chatbotRouter = router({
  /** Send a message to the AI chatbot */
  sendMessage: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      message: z.string().min(1),
      history: z.array(z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })).optional(),
    }))
    .mutation(async ({ input }) => {
      const { sessionId, message, history = [] } = input;

      const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.map(h => ({ role: h.role as "user" | "assistant", content: h.content })),
        { role: "user", content: message },
      ];

      const response = await invokeLLM({ messages });
      const assistantMessage = typeof response.choices[0]?.message.content === 'string'
        ? response.choices[0].message.content
        : '';

      // Save conversation to DB
      try {
        const existing = await getChatConversationBySession(sessionId);
        const allMessages = [...history, { role: "user", content: message }, { role: "assistant", content: assistantMessage }];
        
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
        console.error("[Chatbot DB Error]", err);
      }

      return { message: assistantMessage };
    }),

  /** Capture email from chatbot conversation */
  captureEmail: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      email: z.string().email(),
      name: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      try {
        // Update conversation with email
        const existing = await getChatConversationBySession(input.sessionId);
        if (existing) {
          await updateChatConversation(existing.id, {
            emailCaptured: input.email,
          });
        }

        // Create lead
        await createLead({
          email: input.email,
          name: input.name || null,
          source: "chatbot",
          message: "Captured from AI chatbot conversation",
        });

        await notifyOwner({
          title: `Chatbot Lead: ${input.name || input.email}`,
          content: `New lead captured from AI chatbot.\nEmail: ${input.email}\nName: ${input.name || "N/A"}`,
        });

        return { success: true };
      } catch (err) {
        console.error("[Chatbot Email Capture Error]", err);
        throw new Error("Failed to save contact info");
      }
    }),
});
