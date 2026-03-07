import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the LLM so we don't make real API calls in tests
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [
      {
        message: {
          content:
            "I'd be happy to help! Tell me your business name and what service you provide, and I'll check your AI visibility right now.",
          tool_calls: undefined,
        },
      },
    ],
  }),
}));

// Mock notification
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock DB functions
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  createLead: vi.fn().mockResolvedValue(undefined),
  createVisibilityCheck: vi.fn().mockResolvedValue(undefined),
  createBooking: vi.fn().mockResolvedValue(undefined),
  createChatConversation: vi.fn().mockResolvedValue(undefined),
  updateChatConversation: vi.fn().mockResolvedValue(undefined),
  getChatConversationBySession: vi.fn().mockResolvedValue(null),
  getLeads: vi.fn().mockResolvedValue([]),
  getBookings: vi.fn().mockResolvedValue([]),
  getTestimonials: vi.fn().mockResolvedValue([]),
  getBlogPosts: vi.fn().mockResolvedValue([]),
  getReviews: vi.fn().mockResolvedValue([]),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("agent.chat", () => {
  it("returns a message and empty toolResults for a basic greeting", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agent.chat({
      sessionId: "test-session-1",
      message: "Hello, I need help with my business",
      history: [],
      leadProfile: {
        painPoints: [],
        messageCount: 0,
        toolsUsed: [],
        score: 0,
        temperature: "cold",
      },
    });

    expect(result).toHaveProperty("message");
    expect(result).toHaveProperty("toolResults");
    expect(result).toHaveProperty("leadProfile");
    expect(typeof result.message).toBe("string");
    expect(result.message.length).toBeGreaterThan(0);
    expect(Array.isArray(result.toolResults)).toBe(true);
  });

  it("increments messageCount in lead profile", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agent.chat({
      sessionId: "test-session-2",
      message: "I own an HVAC company in Orlando",
      history: [],
      leadProfile: {
        painPoints: [],
        messageCount: 3,
        toolsUsed: [],
        score: 0,
        temperature: "cold",
      },
    });

    expect(result.leadProfile.messageCount).toBe(4);
  });

  it("returns a scored lead profile with temperature", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agent.chat({
      sessionId: "test-session-3",
      message: "Can you check my visibility?",
      history: [],
      leadProfile: {
        businessName: "Test HVAC Co",
        businessType: "HVAC",
        location: "Orlando",
        email: "test@example.com",
        painPoints: ["low visibility", "no leads"],
        messageCount: 5,
        toolsUsed: ["check_ai_visibility"],
        score: 0,
        temperature: "cold",
      },
    });

    expect(result.leadProfile).toHaveProperty("score");
    expect(result.leadProfile).toHaveProperty("temperature");
    expect(result.leadProfile.score).toBeGreaterThan(0);
    // With business name, type, location, email, pain points, messages >= 3, and tool usage
    // Score should be: 10 + 10 + 5 + 15 + 10 + 5 + 15 = 70 → hot
    expect(result.leadProfile.temperature).toBe("hot");
  });

  it("works without optional leadProfile input", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agent.chat({
      sessionId: "test-session-4",
      message: "What services do you offer?",
    });

    expect(result).toHaveProperty("message");
    expect(result.leadProfile.messageCount).toBe(1);
    expect(result.leadProfile.temperature).toBe("cold");
  });

  it("preserves history in conversation", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agent.chat({
      sessionId: "test-session-5",
      message: "What about pricing?",
      history: [
        { role: "user", content: "I own a restaurant in Lake Nona" },
        {
          role: "assistant",
          content: "Great! I can help with AI visibility for your restaurant.",
        },
      ],
      leadProfile: {
        businessType: "restaurant",
        location: "Lake Nona",
        painPoints: [],
        messageCount: 2,
        toolsUsed: [],
        score: 0,
        temperature: "cold",
      },
    });

    expect(result).toHaveProperty("message");
    expect(result.leadProfile.messageCount).toBe(3);
  });
});

describe("agent.captureContact", () => {
  it("captures contact info successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agent.captureContact({
      sessionId: "test-session-contact",
      email: "john@example.com",
      name: "John Smith",
      phone: "555-1234",
      businessName: "Smith HVAC",
    });

    expect(result).toEqual({ success: true });
  });

  it("works with only required email field", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agent.captureContact({
      sessionId: "test-session-contact-2",
      email: "minimal@example.com",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.agent.captureContact({
        sessionId: "test-session-bad-email",
        email: "not-an-email",
      })
    ).rejects.toThrow();
  });
});

describe("lead scoring", () => {
  it("scores a cold lead with minimal info", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agent.chat({
      sessionId: "test-score-cold",
      message: "hi",
      leadProfile: {
        painPoints: [],
        messageCount: 0,
        toolsUsed: [],
        score: 0,
        temperature: "cold",
      },
    });

    expect(result.leadProfile.score).toBeLessThan(30);
    expect(result.leadProfile.temperature).toBe("cold");
  });

  it("scores a warm lead with moderate engagement", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agent.chat({
      sessionId: "test-score-warm",
      message: "Tell me more",
      leadProfile: {
        businessName: "My Biz",
        businessType: "HVAC",
        painPoints: ["need more customers"],
        messageCount: 5,
        toolsUsed: [],
        score: 0,
        temperature: "cold",
      },
    });

    // businessName(10) + businessType(10) + painPoints(5) + messages>=3(5) + messages>=6 is false = 30
    expect(result.leadProfile.score).toBeGreaterThanOrEqual(30);
    expect(["warm", "hot"]).toContain(result.leadProfile.temperature);
  });
});
