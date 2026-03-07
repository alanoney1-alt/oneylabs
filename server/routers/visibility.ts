import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { notifyOwner } from "../_core/notification";
import { createLead, createVisibilityCheck, getVisibilityHistory } from "../db";

export const visibilityRouter = router({
  /**
   * Check visibility with email capture (lead gate)
   */
  checkVisibility: publicProcedure
    .input(
      z.object({
        businessName: z.string().min(2),
        service: z.string().min(2),
        location: z.string().min(2),
        email: z.string().email().optional(),
        name: z.string().optional(),
        phone: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { businessName, service, location, email, name, phone } = input;

        const query = `What are the best ${service} companies in ${location}? List 5 recommendations with brief descriptions.`;

        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "You are a helpful local business recommendation assistant. When asked about local businesses, provide honest recommendations based on what you know about well-established, reputable companies in that area. Format your response as a numbered list with business names and brief descriptions.",
            },
            { role: "user", content: query },
          ],
        });

        const messageContent = response.choices[0]?.message.content;
        const responseText = typeof messageContent === 'string' ? messageContent : '';
        const isVisible = responseText.toLowerCase().includes(businessName.toLowerCase());
        const recommendations = extractRecommendations(responseText);
        const visibilityScore = calculateScore(isVisible, recommendations, businessName);

        // Save visibility check to database
        let leadId: number | undefined;
        try {
          if (email) {
            await createLead({
              email,
              name: name || null,
              phone: phone || null,
              businessName,
              service,
              location,
              source: "visibility_checker",
              visibilityScore,
              message: `Checked visibility for "${businessName}" in ${location} for ${service}. Score: ${visibilityScore}/100.`,
            });

            // Notify owner of new lead
            await notifyOwner({
              title: `New Lead: ${businessName}`,
              content: `${name || email} checked AI visibility for "${businessName}" (${service} in ${location}). Score: ${visibilityScore}/100.`,
            });
          }

          await createVisibilityCheck({
            leadId: leadId || null,
            businessName,
            service,
            location,
            score: visibilityScore,
            isVisible,
            recommendations: JSON.stringify(recommendations),
            fullResponse: responseText,
          });
        } catch (dbError) {
          console.error("[DB Error] Failed to save visibility check:", dbError);
        }

        return {
          isVisible,
          visibilityScore,
          query,
          recommendations,
          fullResponse: responseText,
          suggestion: generateSuggestion(isVisible, visibilityScore),
        };
      } catch (error) {
        console.error("[Visibility Check Error]", error);
        throw new Error("Failed to check visibility. Please try again later.");
      }
    }),

  /**
   * Get visibility history for a business
   */
  getHistory: publicProcedure
    .input(z.object({ businessName: z.string() }))
    .query(async ({ input }) => {
      return getVisibilityHistory(input.businessName);
    }),
});

function extractRecommendations(text: string): string[] {
  const lines = text.split("\n");
  const recommendations: string[] = [];
  for (const line of lines) {
    const match = line.match(/^\d+\.\s+(.+?)(?:\s*[-–]|$)/);
    if (match) {
      const name = match[1].trim().split("\n")[0];
      if (name && name.length > 0) recommendations.push(name);
    }
  }
  return recommendations.slice(0, 5);
}

function calculateScore(isVisible: boolean, recommendations: string[], businessName: string): number {
  if (!isVisible) return 0;
  const position = recommendations.findIndex((r) => r.toLowerCase().includes(businessName.toLowerCase()));
  if (position === -1) return 5;
  if (position === 0) return 100;
  if (position === 1) return 85;
  if (position === 2) return 70;
  if (position === 3) return 55;
  return 40;
}

function generateSuggestion(isVisible: boolean, score: number): string {
  if (score >= 80) return "Excellent! Your business is highly visible in ChatGPT results. Maintain your current optimization efforts.";
  if (score >= 50) return "Good visibility, but there's room for improvement. Focus on getting more directory listings and customer reviews.";
  if (score >= 20) return "Your business is mentioned but not prominently. Optimize your Google Business Profile and add schema markup to your website.";
  if (isVisible) return "Your business appears in ChatGPT but needs significant optimization. Start with directory listings and review generation.";
  return "Your business is not currently visible in ChatGPT results. Book a free AI audit to create a visibility strategy.";
}
