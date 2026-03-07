import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";

/**
 * AI Search Visibility Checker Router
 * Checks if a business shows up in ChatGPT results for local search queries
 */

export const visibilityRouter = router({
  /**
   * Check if a business is visible in ChatGPT results
   * Queries ChatGPT for local business recommendations and checks if the input business appears
   */
  checkVisibility: publicProcedure
    .input(
      z.object({
        businessName: z.string().min(2, "Business name must be at least 2 characters"),
        service: z.string().min(2, "Service must be at least 2 characters"),
        location: z.string().min(2, "Location must be at least 2 characters"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { businessName, service, location } = input;

        // Construct a natural query that ChatGPT would receive
        const query = `What are the best ${service} companies in ${location}? List 5 recommendations with brief descriptions.`;

        // Call ChatGPT to get recommendations
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content:
                "You are a helpful local business recommendation assistant. When asked about local businesses, provide honest recommendations based on what you know about well-established, reputable companies in that area. Format your response as a numbered list with business names and brief descriptions.",
            },
            {
              role: "user",
              content: query,
            },
          ],
        });

        const messageContent = response.choices[0]?.message.content;
        const responseText = typeof messageContent === 'string' ? messageContent : '';

        // Check if the business name appears in the response
        const isVisible = responseText
          .toLowerCase()
          .includes(businessName.toLowerCase());

        // Extract the list of recommended businesses from the response
        const recommendations = extractRecommendations(responseText);

        // Calculate visibility score (0-100)
        // Factors: appears in results, position in list, mention frequency
        const visibilityScore = calculateScore(
          isVisible,
          recommendations,
          businessName
        );

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
        throw new Error(
          "Failed to check visibility. Please try again later."
        );
      }
    }),
});

/**
 * Extract business recommendations from ChatGPT response
 */
function extractRecommendations(text: string): string[] {
  const lines = text.split("\n");
  const recommendations: string[] = [];

  for (const line of lines) {
    // Match numbered list items (1. Company Name, 2. Company Name, etc.)
    const match = line.match(/^\d+\.\s+(.+?)(?:\s*[-–]|$)/);
    if (match) {
      const name = match[1].trim().split("\n")[0]; // Get first line only
      if (name && name.length > 0) {
        recommendations.push(name);
      }
    }
  }

  return recommendations.slice(0, 5); // Return top 5
}

/**
 * Calculate visibility score based on presence and position
 */
function calculateScore(
  isVisible: boolean,
  recommendations: string[],
  businessName: string
): number {
  if (!isVisible) return 0;

  // Find position in recommendations
  const position = recommendations.findIndex((r) =>
    r.toLowerCase().includes(businessName.toLowerCase())
  );

  if (position === -1) return 5; // Mentioned but not in top 5
  if (position === 0) return 100; // First recommendation
  if (position === 1) return 85; // Second recommendation
  if (position === 2) return 70; // Third recommendation
  if (position === 3) return 55; // Fourth recommendation
  return 40; // Fifth recommendation
}

/**
 * Generate actionable suggestion based on visibility
 */
function generateSuggestion(isVisible: boolean, score: number): string {
  if (score >= 80) {
    return "Excellent! Your business is highly visible in ChatGPT results. Maintain your current optimization efforts.";
  }
  if (score >= 50) {
    return "Good visibility, but there's room for improvement. Focus on getting more directory listings and customer reviews.";
  }
  if (score >= 20) {
    return "Your business is mentioned but not prominently. Optimize your Google Business Profile and add schema markup to your website.";
  }
  if (isVisible) {
    return "Your business appears in ChatGPT but needs significant optimization. Start with directory listings and review generation.";
  }
  return "Your business is not currently visible in ChatGPT results. Book a free AI audit to create a visibility strategy.";
}
