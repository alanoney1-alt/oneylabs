import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle2, AlertCircle, TrendingUp, ArrowRight, Mail } from "lucide-react";
import { Link } from "wouter";

interface CheckerResult {
  isVisible: boolean;
  visibilityScore: number;
  query: string;
  recommendations: string[];
  suggestion: string;
  fullResponse: string;
}

export default function AIVisibilityChecker() {
  const [businessName, setBusinessName] = useState("");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("Orlando");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<CheckerResult | null>(null);
  const [step, setStep] = useState<"form" | "email_gate" | "results">("form");

  const checkMutation = trpc.visibility.checkVisibility.useMutation({
    onSuccess: (data) => {
      setResult(data);
      setStep("email_gate");
    },
    onError: (error) => {
      console.error("Visibility check failed:", error);
    },
  });

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !service.trim()) return;
    checkMutation.mutate({
      businessName: businessName.trim(),
      service: service.trim(),
      location: location.trim(),
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Re-run the check with email to save the lead
    checkMutation.mutate({
      businessName: businessName.trim(),
      service: service.trim(),
      location: location.trim(),
      email: email.trim(),
      name: name.trim() || undefined,
      phone: phone.trim() || undefined,
    });
    setStep("results");
  };

  const handleSkipEmail = () => {
    setStep("results");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-lime";
    if (score >= 50) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-lime/10 border-lime/30";
    if (score >= 50) return "bg-orange-400/10 border-orange-400/30";
    return "bg-red-400/10 border-red-400/30";
  };

  return (
    <div className="w-full">
      {/* STEP 1: Business info form */}
      {step === "form" && (
        <form onSubmit={handleCheck} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-heading font-600 text-white mb-2">Business Name</label>
              <Input type="text" placeholder="Your business name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} disabled={checkMutation.isPending} className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
            </div>
            <div>
              <label className="block text-sm font-heading font-600 text-white mb-2">Service Type</label>
              <Input type="text" placeholder="e.g., HVAC, Plumbing" value={service} onChange={(e) => setService(e.target.value)} disabled={checkMutation.isPending} className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
            </div>
            <div>
              <label className="block text-sm font-heading font-600 text-white mb-2">Location</label>
              <Input type="text" placeholder="City, State" value={location} onChange={(e) => setLocation(e.target.value)} disabled={checkMutation.isPending} className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
            </div>
          </div>

          <Button type="submit" disabled={!businessName.trim() || !service.trim() || checkMutation.isPending} className="w-full bg-lime text-black hover:bg-lime/90 font-heading font-700 text-base uppercase tracking-wide py-6">
            {checkMutation.isPending ? (
              <><Loader2 size={18} className="animate-spin mr-2" /> Checking Visibility...</>
            ) : (
              <><TrendingUp size={18} className="mr-2" /> Check ChatGPT Visibility</>
            )}
          </Button>

          {checkMutation.isError && (
            <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4">
              <p className="text-red-400 text-sm font-heading">{checkMutation.error?.message || "Failed to check visibility"}</p>
            </div>
          )}
        </form>
      )}

      {/* STEP 2: Email capture gate */}
      {step === "email_gate" && result && (
        <div className="space-y-6">
          {/* Teaser score */}
          <Card className={`border rounded-lg p-8 ${getScoreBgColor(result.visibilityScore)}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/60 text-sm font-heading mb-2">Your AI Visibility Score</p>
                <div className="flex items-baseline gap-2">
                  <span className={`font-display text-7xl font-800 ${getScoreColor(result.visibilityScore)}`}>
                    {result.visibilityScore}
                  </span>
                  <span className="text-white/40 text-lg">/100</span>
                </div>
              </div>
              {result.isVisible ? (
                <CheckCircle2 size={40} className="text-lime" />
              ) : (
                <AlertCircle size={40} className="text-red-400" />
              )}
            </div>
            <p className="text-white font-heading font-600 mb-1">
              {result.isVisible ? "You're Visible in ChatGPT!" : "Not Currently Visible in ChatGPT"}
            </p>
            <p className="text-white/50 text-sm">Enter your email below to see the full report with recommendations and competitor analysis.</p>
          </Card>

          {/* Email form */}
          <Card className="border border-lime/30 bg-[#1A1A1A] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-lime/10 border border-lime/20 rounded-lg flex items-center justify-center">
                <Mail size={18} className="text-lime" />
              </div>
              <div>
                <h3 className="font-heading font-700 text-white text-lg">Get Your Full Report</h3>
                <p className="text-white/50 text-xs">See competitors, recommendations, and action plan</p>
              </div>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
              <div className="grid grid-cols-2 gap-3">
                <Input type="text" placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
                <Input type="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
              </div>
              <Button type="submit" className="w-full bg-lime text-black hover:bg-lime/90 font-heading font-700 text-sm uppercase tracking-wide py-5">
                View Full Report <ArrowRight size={16} className="ml-2" />
              </Button>
            </form>

            <button onClick={handleSkipEmail} className="w-full mt-3 text-white/30 hover:text-white/50 text-xs font-heading transition-colors">
              Skip and see basic results
            </button>
          </Card>
        </div>
      )}

      {/* STEP 3: Full results */}
      {step === "results" && result && (
        <div className="space-y-6">
          <Card className={`border rounded-lg p-8 ${getScoreBgColor(result.visibilityScore)}`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white/60 text-sm font-heading mb-2">AI Visibility Score</p>
                <div className="flex items-baseline gap-2">
                  <span className={`font-display text-6xl font-800 ${getScoreColor(result.visibilityScore)}`}>{result.visibilityScore}</span>
                  <span className="text-white/40 text-lg">/100</span>
                </div>
              </div>
              {result.isVisible ? <CheckCircle2 size={40} className="text-lime" /> : <AlertCircle size={40} className="text-red-400" />}
            </div>
            <div className="space-y-2">
              <p className="text-white font-heading font-600">{result.isVisible ? "You're Visible in ChatGPT" : "Not Currently Visible in ChatGPT"}</p>
              <p className="text-white/70 text-sm">{result.suggestion}</p>
            </div>
          </Card>

          <Card className="border border-white/10 rounded-lg p-6 bg-white/5">
            <h3 className="font-heading font-700 text-white mb-4">ChatGPT Query</h3>
            <p className="text-white/60 text-sm italic mb-6">"{result.query}"</p>
            <h3 className="font-heading font-700 text-white mb-4">Top Recommendations</h3>
            <div className="space-y-2">
              {result.recommendations.length > 0 ? (
                result.recommendations.map((rec, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded border ${rec.toLowerCase().includes(businessName.toLowerCase()) ? "bg-lime/10 border-lime/30" : "bg-white/5 border-white/10"}`}>
                    <span className="font-mono-data text-lime font-700 text-sm shrink-0">{i + 1}.</span>
                    <span className="text-white/80 text-sm">{rec}</span>
                  </div>
                ))
              ) : (
                <p className="text-white/40 text-sm">No recommendations found</p>
              )}
            </div>
          </Card>

          <Card className="border border-lime/30 bg-lime/5 rounded-lg p-6">
            <h3 className="font-heading font-700 text-white mb-3">Next Steps</h3>
            <ul className="space-y-2 mb-6">
              {result.visibilityScore < 50 && (
                <>
                  <li className="flex items-start gap-2 text-white/70 text-sm"><span className="text-lime font-bold">1.</span><span>Optimize your Google Business Profile with complete information and photos</span></li>
                  <li className="flex items-start gap-2 text-white/70 text-sm"><span className="text-lime font-bold">2.</span><span>Get listed on 25+ business directories (Yelp, BBB, Angie's List, etc.)</span></li>
                  <li className="flex items-start gap-2 text-white/70 text-sm"><span className="text-lime font-bold">3.</span><span>Add schema markup to your website to help AI understand your services</span></li>
                  <li className="flex items-start gap-2 text-white/70 text-sm"><span className="text-lime font-bold">4.</span><span>Generate customer reviews across all platforms</span></li>
                </>
              )}
              {result.visibilityScore >= 50 && result.visibilityScore < 80 && (
                <>
                  <li className="flex items-start gap-2 text-white/70 text-sm"><span className="text-lime font-bold">1.</span><span>Expand directory presence to reach 50+ listings</span></li>
                  <li className="flex items-start gap-2 text-white/70 text-sm"><span className="text-lime font-bold">2.</span><span>Create answer-engine content on your website targeting local questions</span></li>
                  <li className="flex items-start gap-2 text-white/70 text-sm"><span className="text-lime font-bold">3.</span><span>Boost customer review generation with automated systems</span></li>
                </>
              )}
              {result.visibilityScore >= 80 && (
                <li className="flex items-start gap-2 text-white/70 text-sm"><span className="text-lime font-bold">1.</span><span>Maintain current optimization efforts and monitor visibility monthly</span></li>
              )}
            </ul>
            <Link href="/book">
              <Button className="w-full bg-lime text-black hover:bg-lime/90 font-heading font-700 text-sm uppercase tracking-wide">
                Book Free AI Audit <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </Card>

          <Button onClick={() => { setStep("form"); setResult(null); setBusinessName(""); setService(""); setEmail(""); setName(""); setPhone(""); }} variant="outline" className="w-full border-white/20 text-white hover:bg-white/5">
            Check Another Business
          </Button>
        </div>
      )}
    </div>
  );
}
