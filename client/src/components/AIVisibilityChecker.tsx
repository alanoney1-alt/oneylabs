import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle2, AlertCircle, TrendingUp, ArrowRight } from "lucide-react";
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
  const [result, setResult] = useState<CheckerResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const checkMutation = trpc.visibility.checkVisibility.useMutation({
    onSuccess: (data) => {
      setResult(data);
      setShowResults(true);
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
      {!showResults ? (
        <form onSubmit={handleCheck} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-heading font-600 text-white mb-2">
                Business Name
              </label>
              <Input
                type="text"
                placeholder="Your business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                disabled={checkMutation.isPending}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <div>
              <label className="block text-sm font-heading font-600 text-white mb-2">
                Service Type
              </label>
              <Input
                type="text"
                placeholder="e.g., HVAC, Plumbing"
                value={service}
                onChange={(e) => setService(e.target.value)}
                disabled={checkMutation.isPending}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <div>
              <label className="block text-sm font-heading font-600 text-white mb-2">
                Location
              </label>
              <Input
                type="text"
                placeholder="City, State"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={checkMutation.isPending}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!businessName.trim() || !service.trim() || checkMutation.isPending}
            className="w-full bg-lime text-black hover:bg-lime/90 font-heading font-700 text-base uppercase tracking-wide py-6"
          >
            {checkMutation.isPending ? (
              <>
                <Loader2 size={18} className="animate-spin mr-2" />
                Checking Visibility...
              </>
            ) : (
              <>
                <TrendingUp size={18} className="mr-2" />
                Check ChatGPT Visibility
              </>
            )}
          </Button>

          {checkMutation.isError && (
            <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4">
              <p className="text-red-400 text-sm font-heading">
                {checkMutation.error?.message || "Failed to check visibility"}
              </p>
            </div>
          )}
        </form>
      ) : result ? (
        <div className="space-y-6">
          {/* Visibility Score Card */}
          <Card className={`border rounded-lg p-8 ${getScoreBgColor(result.visibilityScore)}`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white/60 text-sm font-heading mb-2">AI Visibility Score</p>
                <div className="flex items-baseline gap-2">
                  <span className={`font-display text-6xl font-800 ${getScoreColor(result.visibilityScore)}`}>
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

            <div className="space-y-2">
              <p className="text-white font-heading font-600">
                {result.isVisible ? "You're Visible in ChatGPT" : "Not Currently Visible in ChatGPT"}
              </p>
              <p className="text-white/70 text-sm">{result.suggestion}</p>
            </div>
          </Card>

          {/* Query & Recommendations */}
          <Card className="border border-white/10 rounded-lg p-6 bg-white/5">
            <h3 className="font-heading font-700 text-white mb-4">ChatGPT Query</h3>
            <p className="text-white/60 text-sm italic mb-6">"{result.query}"</p>

            <h3 className="font-heading font-700 text-white mb-4">Top Recommendations</h3>
            <div className="space-y-2">
              {result.recommendations.length > 0 ? (
                result.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-3 rounded border ${
                      rec.toLowerCase().includes(businessName.toLowerCase())
                        ? "bg-lime/10 border-lime/30"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <span className="font-mono-data text-lime font-700 text-sm shrink-0">
                      {i + 1}.
                    </span>
                    <span className="text-white/80 text-sm">{rec}</span>
                  </div>
                ))
              ) : (
                <p className="text-white/40 text-sm">No recommendations found</p>
              )}
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="border border-lime/30 bg-lime/5 rounded-lg p-6">
            <h3 className="font-heading font-700 text-white mb-3">Next Steps</h3>
            <ul className="space-y-2 mb-6">
              {result.visibilityScore < 50 && (
                <>
                  <li className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="text-lime font-bold">1.</span>
                    <span>Optimize your Google Business Profile with complete information and photos</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="text-lime font-bold">2.</span>
                    <span>Get listed on 25+ business directories (Yelp, BBB, Angie's List, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="text-lime font-bold">3.</span>
                    <span>Add schema markup to your website to help AI understand your services</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="text-lime font-bold">4.</span>
                    <span>Generate customer reviews across all platforms</span>
                  </li>
                </>
              )}
              {result.visibilityScore >= 50 && result.visibilityScore < 80 && (
                <>
                  <li className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="text-lime font-bold">1.</span>
                    <span>Expand directory presence to reach 50+ listings</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="text-lime font-bold">2.</span>
                    <span>Create answer-engine content on your website targeting local questions</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="text-lime font-bold">3.</span>
                    <span>Boost customer review generation with automated systems</span>
                  </li>
                </>
              )}
              {result.visibilityScore >= 80 && (
                <li className="flex items-start gap-2 text-white/70 text-sm">
                  <span className="text-lime font-bold">1.</span>
                  <span>Maintain current optimization efforts and monitor visibility monthly</span>
                </li>
              )}
            </ul>

            <Link href="/contact">
              <Button className="w-full bg-lime text-black hover:bg-lime/90 font-heading font-700 text-sm uppercase tracking-wide">
                Book Free AI Audit
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </Card>

          <Button
            onClick={() => {
              setShowResults(false);
              setResult(null);
              setBusinessName("");
              setService("");
            }}
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/5"
          >
            Check Another Business
          </Button>
        </div>
      ) : null}
    </div>
  );
}
