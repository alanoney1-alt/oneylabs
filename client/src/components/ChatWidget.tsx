import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Zap, Globe, Calendar, BarChart3, Target, Loader2, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  toolResults?: ToolResult[];
}

interface ToolResult {
  tool: string;
  result: Record<string, unknown>;
}

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
  score: number;
  temperature: "cold" | "warm" | "hot";
}

const defaultProfile: LeadProfile = {
  painPoints: [],
  messageCount: 0,
  toolsUsed: [],
  score: 0,
  temperature: "cold",
};

function getSessionId(): string {
  let id = sessionStorage.getItem("oney-agent-session");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("oney-agent-session", id);
  }
  return id;
}

/* ─── Tool Result Display Components ──────────────────────────────── */

function VisibilityResult({ result }: { result: Record<string, unknown> }) {
  const score = (result.visibility_score as number) || 0;
  const isVisible = result.is_visible as boolean;
  const competitors = (result.competitors_shown as string[]) || [];
  const actions = (result.action_items as string[]) || [];

  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-4 my-2">
      <div className="flex items-center gap-2 mb-3">
        <Target size={16} className="text-lime" />
        <span className="font-heading font-700 text-white text-sm uppercase tracking-wider">AI Visibility Check</span>
      </div>
      <div className="flex items-center gap-4 mb-3">
        <div className={`text-3xl font-display ${score >= 50 ? "text-lime" : score >= 25 ? "text-orange-400" : "text-red-400"}`}>{score}</div>
        <div>
          <div className="text-white text-sm font-heading font-600">{result.business_name as string}</div>
          <div className={`text-xs font-heading ${isVisible ? "text-lime" : "text-red-400"}`}>
            {isVisible ? "Visible in ChatGPT" : "NOT visible in ChatGPT"}
          </div>
        </div>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 mb-3">
        <div className={`h-2 rounded-full transition-all ${score >= 50 ? "bg-lime" : score >= 25 ? "bg-orange-400" : "bg-red-400"}`} style={{ width: `${score}%` }} />
      </div>
      {!isVisible && competitors.length > 0 && (
        <div className="mb-3">
          <p className="text-white/50 text-xs mb-1">ChatGPT recommends instead:</p>
          <div className="flex flex-wrap gap-1">
            {competitors.slice(0, 5).map((c, i) => (
              <span key={i} className="text-xs bg-white/5 border border-white/10 rounded px-2 py-0.5 text-white/70">{c}</span>
            ))}
          </div>
        </div>
      )}
      {actions.length > 0 && (
        <div>
          <p className="text-white/50 text-xs mb-1">Recommended actions:</p>
          {actions.slice(0, 3).map((a, i) => (
            <div key={i} className="flex items-start gap-1.5 mb-1">
              <CheckCircle2 size={12} className="text-lime mt-0.5 shrink-0" />
              <span className="text-white/60 text-xs">{a}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WebsiteScanResult({ result }: { result: Record<string, unknown> }) {
  const score = (result.ai_readiness_score as number) || 0;
  const checks = (result.checks as Array<{ item: string; passed: boolean; impact: string }>) || [];
  const priorities = (result.top_priorities as string[]) || [];

  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-4 my-2">
      <div className="flex items-center gap-2 mb-3">
        <Globe size={16} className="text-lime" />
        <span className="font-heading font-700 text-white text-sm uppercase tracking-wider">Website AI Readiness Scan</span>
      </div>
      <div className="flex items-center gap-4 mb-3">
        <div className={`text-3xl font-display ${score >= 70 ? "text-lime" : score >= 40 ? "text-orange-400" : "text-red-400"}`}>{score}</div>
        <div>
          <div className="text-white text-sm font-heading font-600">{result.url as string}</div>
          <div className="text-white/50 text-xs">{result.passed as number}/{result.total_checks as number} checks passed</div>
        </div>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 mb-3">
        <div className={`h-2 rounded-full transition-all ${score >= 70 ? "bg-lime" : score >= 40 ? "bg-orange-400" : "bg-red-400"}`} style={{ width: `${score}%` }} />
      </div>
      <div className="grid grid-cols-2 gap-1 mb-3">
        {checks.slice(0, 6).map((check, i) => (
          <div key={i} className="flex items-center gap-1.5">
            {check.passed ? <CheckCircle2 size={10} className="text-lime shrink-0" /> : <AlertTriangle size={10} className="text-red-400 shrink-0" />}
            <span className="text-white/60 text-[10px] truncate">{check.item}</span>
          </div>
        ))}
      </div>
      {priorities.length > 0 && (
        <div>
          <p className="text-white/50 text-xs mb-1">Top priorities:</p>
          {priorities.slice(0, 2).map((p, i) => (
            <div key={i} className="flex items-start gap-1.5 mb-1">
              <Zap size={12} className="text-orange-400 mt-0.5 shrink-0" />
              <span className="text-white/60 text-xs">{p}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BookingResult({ result }: { result: Record<string, unknown> }) {
  const success = result.success as boolean;
  return (
    <div className={`border rounded-lg p-4 my-2 ${success ? "bg-lime/10 border-lime/30" : "bg-red-500/10 border-red-500/30"}`}>
      <div className="flex items-center gap-2 mb-2">
        <Calendar size={16} className={success ? "text-lime" : "text-red-400"} />
        <span className="font-heading font-700 text-white text-sm uppercase tracking-wider">{success ? "Consultation Booked!" : "Booking Issue"}</span>
      </div>
      {success && (
        <>
          <p className="text-white/70 text-sm mb-2">{result.message as string}</p>
          {(result.next_steps as string[])?.map((step, i) => (
            <div key={i} className="flex items-start gap-1.5 mb-1">
              <CheckCircle2 size={12} className="text-lime mt-0.5 shrink-0" />
              <span className="text-white/60 text-xs">{step}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function MarketDataResult({ result }: { result: Record<string, unknown> }) {
  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-4 my-2">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 size={16} className="text-lime" />
        <span className="font-heading font-700 text-white text-sm uppercase tracking-wider">{result.industry as string} Market Data</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-white/40 text-[10px] uppercase">Businesses</p>
          <p className="text-lime font-display text-lg">{result.estimated_businesses as string}</p>
        </div>
        <div>
          <p className="text-white/40 text-[10px] uppercase">AI Visible</p>
          <p className="text-orange-400 font-display text-lg">{result.ai_visible_pct as string}</p>
        </div>
        <div>
          <p className="text-white/40 text-[10px] uppercase">Avg Job Value</p>
          <p className="text-white font-heading font-600 text-sm">{result.avg_job_value as string}</p>
        </div>
        <div>
          <p className="text-white/40 text-[10px] uppercase">Growth Rate</p>
          <p className="text-white font-heading font-600 text-sm">{result.growth_rate as string}</p>
        </div>
      </div>
      <p className="text-white/60 text-xs leading-relaxed">{result.key_insight as string}</p>
      <div className="mt-2 bg-lime/10 border border-lime/20 rounded p-2">
        <p className="text-lime text-xs font-heading font-600">{result.bottom_line as string}</p>
      </div>
    </div>
  );
}

function ToolResultRenderer({ toolResult }: { toolResult: ToolResult }) {
  switch (toolResult.tool) {
    case "check_ai_visibility": return <VisibilityResult result={toolResult.result} />;
    case "scan_website": return <WebsiteScanResult result={toolResult.result} />;
    case "book_consultation": return <BookingResult result={toolResult.result} />;
    case "get_market_data": return <MarketDataResult result={toolResult.result} />;
    case "qualify_lead": return null;
    default: return null;
  }
}

/* ─── Main Chat Widget ────────────────────────────────────────────── */

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hey! I'm the Oney Labs AI Agent. I can check if your business shows up in ChatGPT, scan your website for AI readiness, or book you a free audit with Alan. What brings you here today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadProfile, setLeadProfile] = useState<LeadProfile>(defaultProfile);
  const [sessionId] = useState(getSessionId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const agentChat = trpc.agent.chat.useMutation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (overrideMessage?: string) => {
    const userMessage = overrideMessage || input.trim();
    if (!userMessage || isLoading) return;
    if (!overrideMessage) setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const response = await agentChat.mutateAsync({
        sessionId,
        message: userMessage,
        history,
        leadProfile,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.message,
          toolResults: response.toolResults as ToolResult[],
        },
      ]);

      if (response.leadProfile) {
        setLeadProfile(response.leadProfile as LeadProfile);
      }
    } catch (err) {
      console.error("[Agent Error]", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I had a brief hiccup. Can you try that again? Or call Alan directly at (850) 319-9550.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    { label: "Check my AI visibility", icon: Target },
    { label: "Scan my website", icon: Globe },
    { label: "Book free AI audit", icon: Calendar },
  ];

  return (
    <>
      {/* Chat bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-lime text-black w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
          aria-label="Open AI Agent"
        >
          <MessageCircle size={24} />
          <span className="absolute inset-0 rounded-full bg-lime animate-ping opacity-20" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-[#111111] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#0D0D0D] border-b border-white/10 px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-lime rounded-lg flex items-center justify-center">
                <Bot size={18} className="text-black" />
              </div>
              <div>
                <p className="font-heading font-700 text-white text-sm">Oney Labs AI Agent</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-lime rounded-full animate-pulse" />
                  <span className="text-white/40 text-xs">Live &middot; Tools Active</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i}>
                <div className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 bg-lime/20 rounded-md flex items-center justify-center shrink-0 mt-1">
                      <Bot size={12} className="text-lime" />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 ${msg.role === "user" ? "bg-lime text-black" : "bg-white/5 text-white/80"}`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center shrink-0 mt-1">
                      <User size={12} className="text-white/60" />
                    </div>
                  )}
                </div>
                {msg.toolResults && msg.toolResults.length > 0 && (
                  <div className="ml-8 mt-1">
                    {msg.toolResults.map((tr, j) => (
                      <ToolResultRenderer key={j} toolResult={tr} />
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-2 items-start">
                <div className="w-6 h-6 bg-lime/20 rounded-md flex items-center justify-center shrink-0 mt-1">
                  <Bot size={12} className="text-lime" />
                </div>
                <div className="bg-white/5 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Loader2 size={14} className="text-lime animate-spin" />
                    <span className="text-white/50 text-sm">Running tools...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick actions (show only at start) */}
            {messages.length <= 1 && !isLoading && (
              <div className="flex flex-col gap-2 mt-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.label)}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-left hover:border-lime/30 hover:bg-lime/5 transition-all group"
                  >
                    <action.icon size={14} className="text-white/40 group-hover:text-lime transition-colors" />
                    <span className="text-white/60 text-sm group-hover:text-white/80 transition-colors">{action.label}</span>
                    <ArrowRight size={12} className="ml-auto text-white/20 group-hover:text-lime transition-colors" />
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Lead temperature indicator */}
          {leadProfile.temperature !== "cold" && (
            <div className={`px-4 py-1.5 text-center text-xs font-heading font-600 ${leadProfile.temperature === "hot" ? "bg-red-500/20 text-red-400" : "bg-orange-400/20 text-orange-400"}`}>
              {leadProfile.temperature === "hot"
                ? `Hot Lead (${leadProfile.score}/100)`
                : `Warm Lead (${leadProfile.score}/100)`}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-white/10 px-3 py-3 shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about AI for your business..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-lime/40 transition-colors"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="bg-lime text-black w-10 h-10 rounded-lg flex items-center justify-center hover:bg-lime/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-white/20 text-[10px] text-center mt-1.5">Powered by Oney Labs AI &middot; Real tools, real results</p>
          </div>
        </div>
      )}
    </>
  );
}
