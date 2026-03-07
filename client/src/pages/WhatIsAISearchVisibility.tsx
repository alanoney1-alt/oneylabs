/*
 * WHAT IS AI SEARCH VISIBILITY
 * Answer-engine optimized explainer page
 * Targets: "What is AI search visibility?" "How to show up in ChatGPT?"
 */
import { Link } from "wouter";
import { CheckCircle2, Zap, TrendingUp, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function WhatIsAISearchVisibility() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <span className="section-number">AI SEARCH VISIBILITY</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">
            What is <span className="text-lime">AI Search Visibility?</span>
          </h1>
          <p className="font-body text-lg text-white/70 leading-relaxed mb-8">
            AI search visibility is how visible your business is when people ask AI assistants like ChatGPT, Perplexity, and Claude for recommendations in your industry. It's the new frontier of local search.
          </p>
          <Link href="/contact">
            <button className="btn-lime">Book Free AI Audit</button>
          </Link>
        </div>
      </section>

      {/* Definition */}
      <section className="py-16 px-4 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-8">The Definition</h2>
          <div className="space-y-6 font-body text-white/80 leading-relaxed">
            <p>
              When someone asks ChatGPT "What's the best HVAC company in Orlando?" or "Who should I hire for web design in Lake Nona?", AI search visibility determines whether your business appears in the answer.
            </p>
            <p>
              Unlike Google Search, which ranks websites, AI search visibility is about making your business information discoverable and citable by AI models. It's about being the source that ChatGPT, Perplexity, and Claude pull from when answering questions about your industry.
            </p>
            <p>
              Right now, most South Orlando businesses have zero AI search visibility. You're invisible to the fastest-growing search channel. That's a first-mover advantage you can own.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-12">How AI Search Works</h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Someone asks ChatGPT a question",
                desc: "A prospect asks 'Best plumber in Lake Nona' or 'AI consultant for my business'",
              },
              {
                step: "2",
                title: "ChatGPT searches the web for answers",
                desc: "It crawls Google Business Profiles, directories, websites, and structured data to find relevant businesses",
              },
              {
                step: "3",
                title: "Your business appears (or doesn't)",
                desc: "If you have AI search visibility, you show up in the answer. If not, a competitor does.",
              },
              {
                step: "4",
                title: "Prospect clicks and contacts you",
                desc: "ChatGPT includes your phone, email, and website. They reach out directly.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-lime text-black font-display text-xl font-bold flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-700 mb-2">{item.title}</h3>
                  <p className="font-body text-white/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 px-4 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-12">Why It Matters for Your Business</h2>
          <div className="grid gap-6">
            {[
              {
                icon: TrendingUp,
                title: "New customer channel",
                desc: "ChatGPT is growing faster than Google. Get ahead before it's saturated.",
              },
              {
                icon: Zap,
                title: "High-intent leads",
                desc: "People asking ChatGPT are actively looking for solutions. They're ready to buy.",
              },
              {
                icon: CheckCircle2,
                title: "Zero competition right now",
                desc: "Nobody in South Orlando is doing this. First-mover advantage is yours.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex gap-4">
                  <Icon size={24} className="text-lime shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-700 mb-2">{item.title}</h3>
                    <p className="font-body text-white/70">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What It Includes */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-12">What AI Search Visibility Includes</h2>
          <div className="space-y-4">
            {[
              "Google Business Profile optimization (the #1 source AI crawlers use)",
              "25+ directory listings (Yelp, BBB, Apple Business, Bing Places, etc.)",
              "Structured data markup (schema.org for AI readability)",
              "Answer-engine content (FAQ pages, service pages optimized for AI citation)",
              "llms.txt file (tells AI crawlers exactly what you do)",
              "Weekly monitoring across ChatGPT, Perplexity, Claude, and Gemini",
              "Monthly performance reports showing where you rank",
            ].map((item, i) => (
              <div key={i} className="flex gap-3 font-body text-white/80">
                <CheckCircle2 size={20} className="text-lime shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-lime text-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl mb-4">Ready to Own AI Search Visibility?</h2>
          <p className="font-body text-lg mb-8 text-black/80">
            Book a free 30-minute audit. I'll show you exactly where you rank in ChatGPT and what it takes to show up.
          </p>
          <Link href="/contact">
            <button className="bg-black text-lime font-heading font-700 px-8 py-3 rounded hover:bg-black/90 transition">
              Book Free Audit
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
