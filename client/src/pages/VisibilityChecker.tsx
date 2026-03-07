import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIVisibilityChecker from "@/components/AIVisibilityChecker";
import { TrendingUp } from "lucide-react";

export default function VisibilityChecker() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#0D0D0D] py-20 border-b border-white/6">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <TrendingUp size={24} className="text-lime" />
              <span className="font-heading font-700 text-lime text-sm uppercase tracking-wider">
                AI Search Visibility Checker
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-white leading-none mb-6">
              Check Your<br />
              <span className="text-lime">ChatGPT Visibility</span>
            </h1>

            <p className="font-body text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              See if your business shows up when people ask ChatGPT for recommendations in your industry. Get an instant visibility score and actionable recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Checker Section */}
      <section className="bg-[#111111] py-24">
        <div className="container max-w-2xl">
          <div className="bg-[#0D0D0D] border border-white/10 rounded-lg p-8">
            <AIVisibilityChecker />
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              {
                number: "01",
                title: "Real-Time Check",
                description: "We query ChatGPT in real-time to see exactly what it recommends for your industry and location.",
              },
              {
                number: "02",
                title: "Visibility Score",
                description: "Get a 0-100 score based on whether you appear in results and your ranking position.",
              },
              {
                number: "03",
                title: "Actionable Plan",
                description: "Receive specific recommendations to improve your ChatGPT visibility and dominate answer engines.",
              },
            ].map((item) => (
              <div key={item.number} className="text-center">
                <div className="font-display text-5xl text-lime/20 leading-none mb-4">
                  {item.number}
                </div>
                <h3 className="font-heading font-700 text-white text-lg mb-2">{item.title}</h3>
                <p className="font-body text-white/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 border-t border-white/10 pt-16">
            <h2 className="font-display text-3xl text-white leading-none mb-12">
              How This Works
            </h2>

            <div className="space-y-8">
              {[
                {
                  q: "Why does ChatGPT visibility matter?",
                  a: "Millions of people now use ChatGPT, Perplexity, and Claude to find local businesses instead of Google. If you're not visible in these answer engines, you're losing customers.",
                },
                {
                  q: "How do you check my visibility?",
                  a: "We ask ChatGPT the same question your customers would ask: 'What's the best [service] in [location]?' Then we check if your business appears in the recommendations.",
                },
                {
                  q: "What does the visibility score mean?",
                  a: "Your score reflects both whether you appear in results and your position. A score of 80+ means you're prominently visible. Below 50 means you need optimization.",
                },
                {
                  q: "How can I improve my visibility?",
                  a: "The checker provides specific recommendations. Generally, you need a complete Google Business Profile, listings on 25+ directories, customer reviews, and answer-engine content on your website.",
                },
                {
                  q: "Is this free?",
                  a: "Yes! The visibility checker is completely free. If you want a detailed audit and custom strategy, book a free 30-minute consultation.",
                },
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="font-heading font-700 text-white text-lg mb-3">{item.q}</h3>
                  <p className="font-body text-white/60 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
