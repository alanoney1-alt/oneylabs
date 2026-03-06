/*
 * ONEY LABS PRICING PAGE
 * Design: Raw Craft + Warm Dark
 * Full transparent pricing for all services
 */
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const searchPlans = [
  {
    tier: "Starter",
    price: "$750",
    period: "/month",
    features: [
      "Google Business Profile setup + optimization",
      "5 core directory listings (Yelp, BBB, Bing Places, Nextdoor, Apple Business)",
      "Basic AI search optimization (schema markup, llms.txt)",
      "Monthly performance report",
      "1 blog post/month",
      "Phone/email support",
    ],
    highlight: false,
  },
  {
    tier: "Growth",
    price: "$1,500",
    period: "/month",
    features: [
      "Everything in Starter",
      "Branded SEO landing page (hosted, optimized)",
      "25+ directory listings and data aggregator submissions",
      "Full AI search optimization (structured data, answer-engine content)",
      "Social media management (3 posts/week, FB + IG)",
      "Dedicated tracking phone number with call analytics",
      "4 blog posts/month",
      "Competitor monitoring report",
      "Bi-weekly strategy call",
    ],
    highlight: true,
  },
  {
    tier: "Dominate",
    price: "$2,500",
    period: "/month",
    features: [
      "Everything in Growth",
      "AI search monitoring (weekly checks across ChatGPT, Perplexity, Claude, Gemini)",
      "Custom answer-engine pages (FAQ pages optimized for AI citation)",
      "Review generation system",
      "Multi-location directory management",
      "8 blog posts/month",
      "Video content strategy (TikTok + YouTube)",
      "Reputation monitoring + response drafting",
      "Monthly in-person strategy session",
      "Priority support (same-day response)",
    ],
    highlight: false,
  },
];

const buildPricing = [
  { label: "Discovery Session", price: "$250", note: "90 min · Applied to project if you sign" },
  { label: "MVP Sprint", price: "$3,500–$10,000", note: "2–4 week delivery" },
  { label: "Ongoing Support", price: "$500–$1,500/mo", note: "After launch" },
  { label: "Revenue Share", price: "$0 upfront", note: "15% of revenue for ideas Alan believes in" },
];

const opsPricing = [
  { label: "AI Audit", price: "$750", note: "2-hour deep dive + written report" },
  { label: "Implementation Sprint", price: "$3,000–$7,500", note: "Build what the audit recommends" },
  { label: "Managed AI Operations", price: "$1,500–$3,500/mo", note: "Ongoing automation management" },
];

const educationPricing = [
  { label: "1-on-1 Strategy Session", price: "$250", note: "90 min · Leave with a plan" },
  { label: "Build-With-Me Sprint", price: "$2,000", note: "Alan builds it WITH you over a week" },
  { label: "Ongoing Advisory", price: "$750/mo", note: "Weekly calls + async support" },
  { label: "Monthly Workshop", price: "$75/person", note: "Free with consultation booking" },
  { label: "1-on-1 AI Lessons", price: "$200/hr", note: "Or $700 for 4-session package" },
];

const alaCarte = [
  { service: "GBP Audit + Optimization", price: "$350" },
  { service: "AI Search Visibility Audit", price: "$250" },
  { service: "Directory Blitz (25 listings)", price: "$600" },
  { service: "Website SEO Audit", price: "$450" },
  { service: "Social Media Setup (FB + IG + branding)", price: "$350" },
  { service: "Tracking Number Setup + Integration", price: "$125" },
  { service: "Branded Landing Page (one-time build)", price: "$800" },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      <div className="pt-24 pb-8 container">
        <p className="section-number mb-3">Transparent Pricing</p>
        <h1 className="font-display text-[clamp(3rem,7vw,6rem)] text-white leading-none mb-4">
          EVERYONE HIDES IT.<br />
          <span className="text-lime">WE SHOW IT.</span>
        </h1>
        <p className="font-body text-white/60 text-lg max-w-2xl leading-relaxed">
          Real prices. No "contact us for a quote." No surprise invoices. You know exactly what you're getting before you sign anything.
        </p>
      </div>

      {/* AI Search Visibility */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="mb-12">
            <p className="section-number mb-2">Pillar 01</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none">
              AI SEARCH VISIBILITY
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {searchPlans.map((plan, i) => (
              <div
                key={plan.tier}
                className={`rounded-lg p-7 border transition-all ${
                  plan.highlight
                    ? "bg-lime border-lime relative"
                    : "bg-[#1A1A1A] border-white/10"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#111111] border border-lime text-lime font-mono-data text-xs px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className={`font-heading font-800 text-2xl mb-1 ${plan.highlight ? "text-black" : "text-white"}`}>
                  {plan.tier}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`font-mono-data font-700 text-4xl ${plan.highlight ? "text-black" : "text-lime"}`}>
                    {plan.price}
                  </span>
                  <span className={`font-heading text-sm ${plan.highlight ? "text-black/60" : "text-white/40"}`}>
                    {plan.period}
                  </span>
                </div>
                <ul className="flex flex-col gap-2.5 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${plan.highlight ? "text-black/70" : "text-lime"}`} />
                      <span className={`font-body text-sm leading-snug ${plan.highlight ? "text-black/80" : "text-white/60"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <button className={`w-full py-3 rounded font-heading font-700 text-sm uppercase tracking-wide transition-all ${
                    plan.highlight
                      ? "bg-black text-lime hover:bg-black/80"
                      : "bg-transparent border border-lime text-lime hover:bg-lime hover:text-black"
                  }`}>
                    Get Started
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Business Growth */}
      <section className="py-20 bg-[#111111]">
        <div className="container">
          <div className="mb-12">
            <p className="section-number mb-2">Pillar 02</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none">
              AI BUSINESS GROWTH
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Idea to Product */}
            <div className="card-service">
              <h3 className="font-heading font-800 text-white text-xl mb-4">Idea-to-Product Builds</h3>
              <p className="font-body text-white/50 text-sm mb-5">You have the idea. No tech team. I build it in weeks using AI.</p>
              <div className="flex flex-col gap-3">
                {buildPricing.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4 py-2 border-b border-white/6">
                    <div>
                      <p className="font-heading font-600 text-white text-sm">{item.label}</p>
                      <p className="font-body text-white/40 text-xs">{item.note}</p>
                    </div>
                    <span className="price-tag text-sm shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Operations */}
            <div className="card-service">
              <h3 className="font-heading font-800 text-white text-xl mb-4">AI Operations Consulting</h3>
              <p className="font-body text-white/50 text-sm mb-5">Walk into your business. Find where you bleed time. Automate it.</p>
              <div className="flex flex-col gap-3">
                {opsPricing.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4 py-2 border-b border-white/6">
                    <div>
                      <p className="font-heading font-600 text-white text-sm">{item.label}</p>
                      <p className="font-body text-white/40 text-xs">{item.note}</p>
                    </div>
                    <span className="price-tag text-sm shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI for Entrepreneurs */}
            <div className="card-service">
              <h3 className="font-heading font-800 text-white text-xl mb-4">AI for Entrepreneurs</h3>
              <p className="font-body text-white/50 text-sm mb-5">For individuals who want to use AI to start or grow something.</p>
              <div className="flex flex-col gap-3">
                {educationPricing.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4 py-2 border-b border-white/6">
                    <div>
                      <p className="font-heading font-600 text-white text-sm">{item.label}</p>
                      <p className="font-body text-white/40 text-xs">{item.note}</p>
                    </div>
                    <span className="price-tag text-sm shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A La Carte */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="mb-12">
            <p className="section-number mb-2">One-Time Services</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none">
              À LA CARTE
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {alaCarte.map((item) => (
              <div key={item.service} className="flex items-center justify-between gap-4 py-4 px-5 bg-[#1A1A1A] border border-white/8 rounded-lg hover:border-lime/20 transition-all">
                <span className="font-heading font-500 text-white/80 text-sm">{item.service}</span>
                <span className="price-tag text-sm shrink-0">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-lime py-16">
        <div className="container text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-black leading-none mb-4">
            START WITH A FREE AUDIT
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Not sure which service is right for you? Book a free 30-minute AI audit and I'll tell you exactly what makes sense.
          </p>
          <Link href="/contact">
            <button className="bg-black text-lime font-heading font-700 text-base uppercase tracking-wide px-10 py-4 rounded hover:bg-black/80 transition-all flex items-center gap-2 mx-auto">
              Book Free AI Audit <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
