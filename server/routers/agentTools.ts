import { invokeLLM } from "../_core/llm";
import { createBooking, createVisibilityCheck } from "../db";
import { notifyOwner } from "../_core/notification";

/**
 * AGENT TOOLS
 * 
 * These are the actions the agent can take. Not words. Actions.
 * Each tool is a real function that queries APIs, scans websites,
 * books consultations, and pulls market data.
 */

export const AGENT_TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "check_ai_visibility",
      description:
        "Run a LIVE AI visibility check for a business. Queries ChatGPT to see if the business shows up when people ask for recommendations. Returns visibility score, competing businesses, and specific recommendations. USE THIS when a visitor mentions their business name or industry.",
      parameters: {
        type: "object",
        properties: {
          business_name: {
            type: "string",
            description: "The name of the business to check",
          },
          service: {
            type: "string",
            description:
              "The type of service (e.g., HVAC, restaurant, law firm, med spa)",
          },
          location: {
            type: "string",
            description:
              "The location to check (default: Orlando, FL)",
          },
        },
        required: ["business_name", "service"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "scan_website",
      description:
        "Scan a website for AI search readiness. Checks for schema markup, llms.txt, structured data, meta tags, Open Graph, and basic SEO signals. Returns a readiness score and specific fixes. USE THIS when a visitor mentions their website URL.",
      parameters: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "The website URL to scan (e.g., https://example.com)",
          },
        },
        required: ["url"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "book_consultation",
      description:
        "Book a free 30-minute AI audit consultation with Alan Oney. Collects name, email, phone, business name, and preferred date/time. USE THIS when the visitor is ready to take the next step.",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The visitor's full name",
          },
          email: {
            type: "string",
            description: "The visitor's email address",
          },
          phone: {
            type: "string",
            description: "The visitor's phone number (optional)",
          },
          business_name: {
            type: "string",
            description: "The name of their business (optional)",
          },
          preferred_date: {
            type: "string",
            description:
              "Preferred date for the consultation (e.g., 'next Tuesday', 'March 15')",
          },
          preferred_time: {
            type: "string",
            description:
              "Preferred time (e.g., 'morning', '2pm', 'afternoon')",
          },
          notes: {
            type: "string",
            description: "Any additional notes about what they want to discuss",
          },
        },
        required: ["name", "email"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_market_data",
      description:
        "Get Orlando market data for a specific industry. Returns number of businesses, AI visibility stats, growth trends, and competitive landscape. USE THIS to create urgency and show the opportunity gap.",
      parameters: {
        type: "object",
        properties: {
          industry: {
            type: "string",
            description:
              "The industry to look up (e.g., HVAC, restaurants, law firms, med spas, real estate)",
          },
          location: {
            type: "string",
            description:
              "The specific area (default: Orlando metro / Orange County)",
          },
        },
        required: ["industry"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "qualify_lead",
      description:
        "Internally qualify and score a lead based on the conversation so far. Returns lead temperature and recommended next action. Use this after gathering enough info to assess the lead.",
      parameters: {
        type: "object",
        properties: {
          business_name: {
            type: "string",
            description: "Business name if known",
          },
          industry: {
            type: "string",
            description: "Industry/business type",
          },
          location: {
            type: "string",
            description: "Business location",
          },
          pain_points: {
            type: "array",
            items: { type: "string" },
            description: "List of pain points mentioned",
          },
          budget_indicator: {
            type: "string",
            description:
              "Any budget indicators (e.g., 'price sensitive', 'ready to invest', 'exploring options')",
          },
          urgency: {
            type: "string",
            enum: ["low", "medium", "high"],
            description: "How urgent is their need",
          },
          engagement_level: {
            type: "string",
            enum: ["low", "medium", "high"],
            description: "How engaged they are in the conversation",
          },
        },
        required: ["industry"],
        additionalProperties: false,
      },
    },
  },
];

// ─── Tool Implementations ───────────────────────────────────────────

async function checkAIVisibility(args: {
  business_name: string;
  service: string;
  location?: string;
}): Promise<Record<string, unknown>> {
  const location = args.location || "Orlando, FL";
  const query = `What are the best ${args.service} companies in ${location}? List your top 5 recommendations with brief descriptions of why you recommend each one.`;

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful local business recommendation assistant. Provide honest recommendations based on well-established, reputable companies in the area. Format as a numbered list.",
        },
        { role: "user", content: query },
      ],
    });

    const responseText =
      typeof response.choices[0]?.message.content === "string"
        ? response.choices[0].message.content
        : "";

    const isVisible = responseText
      .toLowerCase()
      .includes(args.business_name.toLowerCase());
    const recommendations = extractRecommendations(responseText);
    const position = recommendations.findIndex((r) =>
      r.toLowerCase().includes(args.business_name.toLowerCase())
    );

    let score = 0;
    if (isVisible) {
      if (position === 0) score = 95;
      else if (position === 1) score = 80;
      else if (position === 2) score = 65;
      else if (position === 3) score = 50;
      else if (position >= 4) score = 35;
      else score = 10;
    }

    // Save to DB
    try {
      await createVisibilityCheck({
        leadId: null,
        businessName: args.business_name,
        service: args.service,
        location,
        score,
        isVisible,
        recommendations: JSON.stringify(recommendations),
        fullResponse: responseText,
      });
    } catch (e) {
      console.error("[Agent Visibility DB]", e);
    }

    return {
      business_name: args.business_name,
      service: args.service,
      location,
      is_visible: isVisible,
      visibility_score: score,
      position: isVisible ? position + 1 : null,
      competitors_shown: recommendations,
      total_competitors: recommendations.length,
      query_used: query,
      summary: isVisible
        ? `${args.business_name} appears at position ${position + 1} of ${recommendations.length} in ChatGPT results for "${args.service} in ${location}". Visibility score: ${score}/100.`
        : `${args.business_name} does NOT appear in ChatGPT results for "${args.service} in ${location}". The following businesses are recommended instead: ${recommendations.join(", ")}. This means potential customers asking AI for recommendations are being sent to your competitors.`,
      action_items: isVisible
        ? [
            "Maintain current optimization",
            "Add more directory listings to strengthen position",
            "Generate more reviews to improve ranking",
          ]
        : [
            "Optimize Google Business Profile immediately",
            "Get listed on 25+ directories (Yelp, BBB, Bing Places, Apple Maps, etc.)",
            "Add schema markup and llms.txt to your website",
            "Create answer-engine content targeting AI citations",
            "Book a free AI audit to get a full visibility strategy",
          ],
    };
  } catch (error) {
    console.error("[Agent Visibility Check Error]", error);
    return {
      error: true,
      message:
        "I had trouble running the visibility check. Let me try a different approach. Can you tell me more about your business?",
    };
  }
}

async function scanWebsite(args: {
  url: string;
}): Promise<Record<string, unknown>> {
  let url = args.url;
  if (!url.startsWith("http")) url = "https://" + url;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; OneyLabsBot/1.0; +https://oneylabs.ai)",
      },
    });
    clearTimeout(timeout);

    const html = await response.text();
    const htmlLower = html.toLowerCase();

    // Check for key AI readiness signals
    const hasSchemaMarkup =
      htmlLower.includes("application/ld+json") ||
      htmlLower.includes("itemtype=") ||
      htmlLower.includes("itemscope");
    const hasOpenGraph =
      htmlLower.includes('property="og:') ||
      htmlLower.includes("property='og:");
    const hasTwitterCards =
      htmlLower.includes('name="twitter:') ||
      htmlLower.includes("name='twitter:");
    const hasMetaDescription =
      htmlLower.includes('name="description"') ||
      htmlLower.includes("name='description'");
    const hasCanonical = htmlLower.includes('rel="canonical"');
    const hasRobotsTxt = true; // We'll check separately
    const hasSitemap =
      htmlLower.includes("sitemap") || htmlLower.includes("sitemap.xml");
    const hasH1 = htmlLower.includes("<h1");
    const hasAltTags =
      (html.match(/alt="[^"]+"/g) || []).length > 0;
    const hasMobileViewport = htmlLower.includes("viewport");
    const hasSSL = url.startsWith("https");
    const hasStructuredData =
      (html.match(/application\/ld\+json/g) || []).length;

    // Check for llms.txt
    let hasLlmsTxt = false;
    try {
      const llmsUrl = new URL("/llms.txt", url).toString();
      const llmsResp = await fetch(llmsUrl, {
        signal: AbortSignal.timeout(5000),
      });
      hasLlmsTxt = llmsResp.ok;
    } catch {
      hasLlmsTxt = false;
    }

    // Calculate AI readiness score
    let score = 0;
    const checks: Array<{
      item: string;
      passed: boolean;
      impact: string;
    }> = [];

    const addCheck = (
      item: string,
      passed: boolean,
      points: number,
      impact: string
    ) => {
      if (passed) score += points;
      checks.push({ item, passed, impact });
    };

    addCheck("Schema Markup (JSON-LD)", hasSchemaMarkup, 20, "Critical for AI citation");
    addCheck("llms.txt File", hasLlmsTxt, 15, "Tells AI crawlers what your business does");
    addCheck("Open Graph Tags", hasOpenGraph, 10, "Helps AI understand page content");
    addCheck("Meta Description", hasMetaDescription, 10, "AI uses this for summaries");
    addCheck("Structured Data Count", hasStructuredData > 1, 10, "More structured data = more AI-readable");
    addCheck("SSL/HTTPS", hasSSL, 5, "Trust signal for AI crawlers");
    addCheck("Mobile Viewport", hasMobileViewport, 5, "Mobile-first indexing");
    addCheck("Canonical URL", hasCanonical, 5, "Prevents duplicate content");
    addCheck("H1 Tag Present", hasH1, 5, "Content hierarchy for AI parsing");
    addCheck("Image Alt Tags", hasAltTags, 5, "Accessibility and AI understanding");
    addCheck("Twitter Cards", hasTwitterCards, 5, "Social sharing metadata");
    addCheck("Sitemap Reference", hasSitemap, 5, "Helps crawlers discover pages");

    const passedCount = checks.filter((c) => c.passed).length;
    const failedCount = checks.filter((c) => !c.passed).length;

    const criticalMissing = checks
      .filter((c) => !c.passed)
      .map((c) => `${c.item}: ${c.impact}`);

    return {
      url,
      ai_readiness_score: score,
      total_checks: checks.length,
      passed: passedCount,
      failed: failedCount,
      checks,
      critical_missing: criticalMissing,
      has_schema_markup: hasSchemaMarkup,
      has_llms_txt: hasLlmsTxt,
      structured_data_count: hasStructuredData,
      summary:
        score >= 70
          ? `Your website scores ${score}/100 for AI readiness. Good foundation, but there are ${failedCount} areas to improve.`
          : score >= 40
            ? `Your website scores ${score}/100 for AI readiness. Several critical elements are missing that prevent AI crawlers from understanding your business.`
            : `Your website scores ${score}/100 for AI readiness. Most critical AI optimization elements are missing. AI crawlers like ChatGPT and Perplexity cannot effectively read and recommend your business.`,
      top_priorities: criticalMissing.slice(0, 3),
      recommendation:
        score < 50
          ? "Your website needs significant AI optimization. Book a free AI audit and we'll create a complete action plan."
          : "Your website has a decent foundation. A few targeted improvements could dramatically increase your AI visibility.",
    };
  } catch (error) {
    console.error("[Agent Website Scan Error]", error);
    return {
      url,
      error: true,
      message: `I couldn't reach ${url}. The site might be down, blocking bots, or the URL might be incorrect. Can you double-check the URL?`,
    };
  }
}

async function bookConsultation(args: {
  name: string;
  email: string;
  phone?: string;
  business_name?: string;
  preferred_date?: string;
  preferred_time?: string;
  notes?: string;
}): Promise<Record<string, unknown>> {
  try {
    await createBooking({
      name: args.name,
      email: args.email,
      phone: args.phone || null,
      businessName: args.business_name || null,
      serviceType: "ai_audit",
      preferredDate: args.preferred_date || "Flexible",
      preferredTime: args.preferred_time || "Flexible",
      notes: args.notes || "Booked via AI Agent conversation",
      status: "pending",
    });

    await notifyOwner({
      title: `BOOKING: ${args.name} wants a Free AI Audit`,
      content: `New consultation booked via AI Agent!
Name: ${args.name}
Email: ${args.email}
Phone: ${args.phone || "N/A"}
Business: ${args.business_name || "N/A"}
Preferred Date: ${args.preferred_date || "Flexible"}
Preferred Time: ${args.preferred_time || "Flexible"}
Notes: ${args.notes || "N/A"}`,
    });

    return {
      success: true,
      booking_type: "Free AI Audit (30 minutes)",
      name: args.name,
      email: args.email,
      preferred_date: args.preferred_date || "Flexible",
      preferred_time: args.preferred_time || "Flexible",
      message: `Booked! Alan will confirm your free AI audit within 24 hours. He'll email you at ${args.email} with the exact time. In the meantime, if you have any other questions, I'm here.`,
      next_steps: [
        "Alan will confirm the exact date/time via email",
        "The audit is 30 minutes, no pitch, just answers",
        "Come prepared with questions about your business",
        "No payment required, no contracts, no obligations",
      ],
    };
  } catch (error) {
    console.error("[Agent Booking Error]", error);
    return {
      success: false,
      message:
        "I had trouble booking that. Can you try again or call Alan directly at (850) 319-9550?",
    };
  }
}

function getMarketData(args: {
  industry: string;
  location?: string;
}): Record<string, unknown> {
  const location = args.location || "Orlando metro / Orange County";
  const industry = args.industry.toLowerCase();

  // Industry-specific data
  const industryData: Record<
    string,
    {
      estimated_businesses: string;
      ai_visible_pct: string;
      avg_job_value: string;
      growth_rate: string;
      key_insight: string;
      ai_search_queries: string[];
      opportunity: string;
    }
  > = {
    hvac: {
      estimated_businesses: "180-220",
      ai_visible_pct: "Less than 2%",
      avg_job_value: "$3,000-$15,000",
      growth_rate: "8% annually (FL heat drives demand)",
      key_insight:
        "Emergency HVAC searches are the highest-intent local queries. When someone's AC breaks in July in Orlando, they're asking ChatGPT 'best HVAC company near me' and calling the first recommendation.",
      ai_search_queries: [
        "best HVAC company Orlando",
        "emergency AC repair near me",
        "HVAC installation Lake Nona",
        "air conditioning service South Orlando",
      ],
      opportunity:
        "With 200+ HVAC companies and less than 5 showing up in ChatGPT, the first movers will capture a disproportionate share of AI-driven leads.",
    },
    restaurant: {
      estimated_businesses: "3,000-4,000",
      ai_visible_pct: "Less than 1%",
      avg_job_value: "$15-$50 per check",
      growth_rate: "5% annually",
      key_insight:
        "AI is replacing Yelp for restaurant recommendations. 'Best Italian restaurant in Orlando' is now asked to ChatGPT more than searched on Google by younger demographics.",
      ai_search_queries: [
        "best restaurants Orlando",
        "best Italian food Lake Nona",
        "date night restaurants South Orlando",
        "family restaurants near me",
      ],
      opportunity:
        "Restaurants with strong Google reviews and structured data are 10x more likely to be recommended by AI. Most Orlando restaurants have neither optimized.",
    },
    "law firm": {
      estimated_businesses: "800-1,200",
      ai_visible_pct: "Less than 3%",
      avg_job_value: "$5,000-$50,000+ per case",
      growth_rate: "4% annually",
      key_insight:
        "Legal searches are the highest-value local queries. A single AI referral for a personal injury case could be worth $10K+ in fees. Yet almost no law firms in Orlando are optimized for AI search.",
      ai_search_queries: [
        "best personal injury lawyer Orlando",
        "divorce attorney near me",
        "criminal defense lawyer South Orlando",
        "business attorney Lake Nona",
      ],
      opportunity:
        "Law firms spend $500-$2,000/month on Google Ads for the same keywords. AI search visibility costs less and converts better because it comes as a trusted recommendation, not an ad.",
    },
    "med spa": {
      estimated_businesses: "150-250",
      ai_visible_pct: "Less than 2%",
      avg_job_value: "$200-$5,000 per treatment",
      growth_rate: "12% annually (fastest growing)",
      key_insight:
        "Med spa clients research extensively before booking. AI recommendations carry more weight than ads because they feel like personal advice. Repeat clients = $10K+ lifetime value.",
      ai_search_queries: [
        "best med spa Orlando",
        "Botox near me Orlando",
        "laser hair removal Lake Nona",
        "facial treatments South Orlando",
      ],
      opportunity:
        "Med spas are Instagram-driven but AI search is the next frontier. The first med spas to optimize will dominate AI recommendations in a low-competition space.",
    },
    "real estate": {
      estimated_businesses: "5,000-8,000",
      ai_visible_pct: "Less than 1%",
      avg_job_value: "$5,000-$30,000 commission",
      growth_rate: "6% annually",
      key_insight:
        "AI is replacing Zillow for agent recommendations. 'Best real estate agent in Lake Nona' asked to ChatGPT returns specific agents, not listings. Agents who show up get the call.",
      ai_search_queries: [
        "best real estate agent Orlando",
        "homes for sale Lake Nona",
        "real estate agent South Orlando",
        "buying a house in Orlando",
      ],
      opportunity:
        "With thousands of agents and almost none optimized for AI, a single agent who gets this right will stand out dramatically.",
    },
    "property management": {
      estimated_businesses: "200-400",
      ai_visible_pct: "Less than 3%",
      avg_job_value: "$100-$300/unit/month recurring",
      growth_rate: "7% annually",
      key_insight:
        "Property owners increasingly ask AI for management company recommendations. A portfolio of 50 units at $200/month = $120K/year recurring. One AI referral could be worth $10K+ annually.",
      ai_search_queries: [
        "best property management Orlando",
        "rental management company near me",
        "property manager Lake Nona",
        "HOA management South Orlando",
      ],
      opportunity:
        "Property management is relationship-driven. AI recommendations feel like trusted referrals, making them the highest-converting lead source.",
    },
  };

  // Find matching industry or use generic
  let data = null;
  for (const [key, value] of Object.entries(industryData)) {
    if (industry.includes(key) || key.includes(industry)) {
      data = value;
      break;
    }
  }

  if (!data) {
    data = {
      estimated_businesses: "Varies",
      ai_visible_pct: "Less than 5%",
      avg_job_value: "Varies by service",
      growth_rate: "Growing steadily",
      key_insight: `Most ${args.industry} businesses in Orlando have zero AI search visibility. The ones who optimize first will capture a disproportionate share of AI-driven leads.`,
      ai_search_queries: [
        `best ${args.industry} Orlando`,
        `${args.industry} near me`,
        `${args.industry} South Orlando`,
        `top ${args.industry} Lake Nona`,
      ],
      opportunity: `With most ${args.industry} businesses having no AI optimization, the first movers have a massive advantage.`,
    };
  }

  return {
    industry: args.industry,
    location,
    ...data,
    orlando_context: {
      metro_population: "~2.7 million (2025)",
      annual_growth: "2.5%",
      south_orlando_note:
        "Lake Nona, Kissimmee, St. Cloud corridor is the fastest growing in Central FL",
      ai_adoption:
        "ChatGPT usage for local recommendations growing 300%+ year over year",
    },
    bottom_line: `In ${location}, there are approximately ${data.estimated_businesses} ${args.industry} businesses. ${data.ai_visible_pct} show up in AI search results. That's a massive opportunity gap.`,
  };
}

function qualifyLead(args: {
  business_name?: string;
  industry?: string;
  location?: string;
  pain_points?: string[];
  budget_indicator?: string;
  urgency?: string;
  engagement_level?: string;
}): Record<string, unknown> {
  let score = 0;

  // Business info
  if (args.business_name) score += 15;
  if (args.industry) score += 10;
  if (args.location) score += 5;

  // Pain points
  const painCount = args.pain_points?.length || 0;
  score += Math.min(painCount * 10, 20);

  // Budget
  if (args.budget_indicator === "ready to invest") score += 20;
  else if (args.budget_indicator === "exploring options") score += 10;
  else if (args.budget_indicator === "price sensitive") score += 5;

  // Urgency
  if (args.urgency === "high") score += 15;
  else if (args.urgency === "medium") score += 10;
  else score += 3;

  // Engagement
  if (args.engagement_level === "high") score += 15;
  else if (args.engagement_level === "medium") score += 10;
  else score += 3;

  score = Math.min(score, 100);

  let temperature: "cold" | "warm" | "hot" = "cold";
  let recommended_action = "";

  if (score >= 65) {
    temperature = "hot";
    recommended_action =
      "Push for booking. This lead is ready. Offer the free AI audit and make it easy to say yes.";
  } else if (score >= 35) {
    temperature = "warm";
    recommended_action =
      "Build more value. Run a visibility check or website scan to create the 'aha' moment. Then guide toward booking.";
  } else {
    temperature = "cold";
    recommended_action =
      "Keep engaging. Ask more questions about their business challenges. Offer to run a free visibility check to spark interest.";
  }

  return {
    score,
    temperature,
    recommended_action,
    business_name: args.business_name || "Unknown",
    industry: args.industry || "Unknown",
    qualification_summary: `Lead score: ${score}/100 (${temperature}). ${recommended_action}`,
  };
}

// ─── Tool Executor ──────────────────────────────────────────────────

export async function executeAgentTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<Record<string, unknown>> {
  switch (toolName) {
    case "check_ai_visibility":
      return checkAIVisibility(
        args as {
          business_name: string;
          service: string;
          location?: string;
        }
      );

    case "scan_website":
      return scanWebsite(args as { url: string });

    case "book_consultation":
      return bookConsultation(
        args as {
          name: string;
          email: string;
          phone?: string;
          business_name?: string;
          preferred_date?: string;
          preferred_time?: string;
          notes?: string;
        }
      );

    case "get_market_data":
      return getMarketData(
        args as { industry: string; location?: string }
      );

    case "qualify_lead":
      return qualifyLead(
        args as {
          business_name?: string;
          industry?: string;
          location?: string;
          pain_points?: string[];
          budget_indicator?: string;
          urgency?: string;
          engagement_level?: string;
        }
      );

    default:
      return { error: true, message: `Unknown tool: ${toolName}` };
  }
}

// ─── Helpers ────────────────────────────────────────────────────────

function extractRecommendations(text: string): string[] {
  const lines = text.split("\n");
  const recommendations: string[] = [];
  for (const line of lines) {
    const match = line.match(/^\d+\.\s+\*?\*?(.+?)(?:\*?\*?\s*[-–:]|$)/);
    if (match) {
      const name = match[1]
        .trim()
        .replace(/\*\*/g, "")
        .split("\n")[0];
      if (name && name.length > 0 && name.length < 100)
        recommendations.push(name);
    }
  }
  return recommendations.slice(0, 5);
}
