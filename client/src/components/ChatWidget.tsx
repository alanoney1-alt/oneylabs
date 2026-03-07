import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Loader2, Mail, Zap } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! I'm the Oney Labs AI assistant. Ask me anything about our services, pricing, or how AI can help your business. What can I help with?" },
  ]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(() => `chat_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMutation = trpc.chatbot.sendMessage.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      const newCount = messageCount + 1;
      setMessageCount(newCount);
      // Show email capture after 3 messages
      if (newCount >= 3 && !emailCaptured) {
        setShowEmailCapture(true);
      }
    },
  });

  const emailMutation = trpc.chatbot.captureEmail.useMutation({
    onSuccess: () => {
      setEmailCaptured(true);
      setShowEmailCapture(false);
      setMessages((prev) => [...prev, { role: "assistant", content: "Thanks! Alan will follow up with you directly. In the meantime, keep asking me anything!" }]);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sendMutation.isPending) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    sendMutation.mutate({
      sessionId,
      message: userMessage,
      history: messages.filter((m) => m.role !== "assistant" || messages.indexOf(m) !== 0),
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    emailMutation.mutate({ sessionId, email: email.trim() });
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-lime text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden" style={{ height: "500px" }}>
          {/* Header */}
          <div className="bg-[#111111] border-b border-white/10 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-lime/20 rounded-full flex items-center justify-center">
              <Zap size={16} className="text-lime" />
            </div>
            <div>
              <p className="font-heading font-700 text-white text-sm">Oney Labs AI</p>
              <p className="text-white/40 text-xs">Ask about services, pricing, anything</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "bg-lime text-black"
                    : "bg-white/10 text-white/80"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {sendMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-lg px-3 py-2">
                  <Loader2 size={16} className="animate-spin text-lime" />
                </div>
              </div>
            )}

            {/* Email capture prompt */}
            {showEmailCapture && !emailCaptured && (
              <div className="bg-lime/10 border border-lime/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={14} className="text-lime" />
                  <p className="text-white text-xs font-heading font-600">Want Alan to follow up?</p>
                </div>
                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10 text-white text-xs h-8 placeholder:text-white/40"
                  />
                  <Button type="submit" size="sm" disabled={emailMutation.isPending} className="bg-lime text-black hover:bg-lime/90 h-8 text-xs px-3">
                    {emailMutation.isPending ? <Loader2 size={12} className="animate-spin" /> : "Send"}
                  </Button>
                </form>
                <button onClick={() => setShowEmailCapture(false)} className="text-white/30 text-xs mt-1 hover:text-white/50">
                  No thanks
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t border-white/10 p-3 flex gap-2">
            <Input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sendMutation.isPending}
              className="bg-white/5 border-white/10 text-white text-sm placeholder:text-white/40"
            />
            <Button type="submit" disabled={!input.trim() || sendMutation.isPending} size="sm" className="bg-lime text-black hover:bg-lime/90">
              <Send size={16} />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
