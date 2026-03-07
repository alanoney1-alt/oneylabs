/*
 * ONEY LABS AI SEARCH VISIBILITY PAGE
 * Design: Raw Craft + Warm Dark
 * Deep dive on Pillar 1   AI Search Visibility
 */
import { Link } from "wouter";
import { useEffect } from "react";
import { ArrowRight, CheckCircle2, Search, TrendingUp, Globe, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ORLANDO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663409472708/AwZd3Nde3Mv8PBZXHdvufN/orlando-city-28XkTxA3wixxNE8KDbawSD.webp";

const plans = [
  {
    tier: "Starter",
    price: "$750",
    period: "/month",
    highlight: false,
    features: [
      "Google Business Profile setup + optimization",
      "5 core directory listings (Yelp, BBB, Bing Places, Nextdoor, Apple Business)",
      "Basic AI search optimization (schema markup, llms.txt)",
      "Monthly performance report",
      "1 blog post/month",
      "Phone/email support",
    ],
  },
  {
    tier: "Growth",
    price: "$1,500",
    period: "/month",
    highlight: true,
    features: [
      "Everything in Starter",
      "Branded SEO landing page (hosted, optimized, server-rendered)",
      "25+ directory listings and data aggregator submissions",
      "Full AI search optimization (structured data, answer-engine content, citation pages)",
      "Social media management (3 posts/week, FB + IG)",
      "Dedicated tracking phone number with call analytics",
      "4 blog posts/month",
      "Competitor monitoring report",
      "Bi-weekly strategy call",
    ],
  },
  {
    tier: "Dominate",
    price: "$2,500",
    period: "/month",
    highlight: false,
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
  },
];

const faqs = [
  {
    q: "What is AI search visibility?",
    a: "When someone asks ChatGPT, Perplexity, or Google AI Overview for the best HVAC company in Orlando, AI search visibility is whether your business shows up in that answer. It's the next evolution of SEO.",
  },
  {
    q: "How is this different from regular SEO?",
    a: "Traditional SEO optimizes for Google's 10 blue links. AI search optimization makes your business the answer that AI systems cite and recommend. It requires structured data, llms.txt files, answer-engine content, and directory presence that AI systems can read.",
  },
  {
    q: "How long does it take to see results?",
    a: "Directory listings and GBP optimization show results in 2 4 weeks. AI search visibility typically builds over 2 3 months as AI systems index and cite your content.",
  },
  {
    q: "Do I need to sign a long-term contract?",
    a: "No contracts required. Month-to-month. If you're not seeing results, you can cancel anytime.",
  },
  {
    q: "What makes you different from other SEO agencies?",
    a: "Nobody in South Orlando specifically sells AI search optimization. We're the first. And we show pricing on the page   no hidden fees, no surprise invoices.",
  },
];

// FAQ Schema for answer engines
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
};

export default function AISearchVisibility() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-28 pb-24 overflow-hidden"
        style={{
          backgroundImage: `url(${ORLANDO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/95 to-[#111111]/60" />
        <div className="relative z-10 container">
          <div className="flex items-center gap-2 mb-6">
            <Search size={16} className="text-lime" />
            <span className="section-number">AI Search Visibility</span>
          </div>
          <h1 className="font-display text-[clamp(3rem,7vw,6rem)] text-white leading-none mb-6">
            WHEN SOMEONE ASKS<br />
            CHATGPT FOR THE BEST<br />
            <span className="text-lime">[YOUR SERVICE]</span><br />
            IN ORLANDO  <br />
            DO YOU SHOW UP?
          </h1>
          <p className="font-body text-white/70 text-lg max-w-xl leading-relaxed mb-10">
            Nobody in South Orlando sells this. We're the first. That's a first-mover advantage you can own right now.
          </p>
          <Link href="/contact">
            <button className="btn-lime text-base px-8 py-4">
              Get Visible Now <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-number mb-4">The Opportunity</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none mb-6">
                AI IS THE NEW<br />
                <span className="text-lime">GOOGLE.</span>
              </h2>
              <p className="font-body text-white/60 leading-relaxed mb-5">
                50% of searches now start with an AI tool. ChatGPT, Perplexity, Google AI Overview, Gemini   they're all recommending local businesses. The businesses that show up are the ones that get the call.
              </p>
              <p className="font-body text-white/60 leading-relaxed">
                Most businesses in South Orlando aren't optimized for this yet. That's your window. We help you get in front of it before your competitors figure it out.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Search, title: "ChatGPT Citations", desc: "Show up when people ask AI for recommendations" },
                { icon: Globe, title: "25+ Directories", desc: "Consistent presence across every platform AI reads" },
                { icon: TrendingUp, title: "Answer Engine Content", desc: "Pages built to be cited by AI, not just ranked" },
                { icon: Star, title: "Review Systems", desc: "More reviews = more AI citations = more calls" },
              ].map((item) => (
                <div key={item.title} className="card-service">
                  <item.icon size={20} className="text-lime mb-3" />
                  <h4 className="font-heading font-700 text-white text-sm mb-2">{item.title}</h4>
                  <p className="font-body text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-[#111111]">
        <div className="container">
          <div className="mb-12">
            <p className="section-number mb-3">Pricing</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none">
              TRANSPARENT.<br />
              <span className="text-lime">NO SURPRISES.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
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

      {/* FAQ */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container max-w-3xl">
          <div className="mb-12">
            <p className="section-number mb-3">FAQ</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none">
              COMMON QUESTIONS
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="card-service">
                <h3 className="font-heading font-700 text-white mb-3">{faq.q}</h3>
                <p className="font-body text-white/60 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-lime py-16">
        <div className="container text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-black leading-none mb-4">
            GET VISIBLE BEFORE<br />
            YOUR COMPETITORS DO.
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Book a free AI visibility audit. I'll show you exactly where you stand and what it takes to show up.
          </p>
          <Link href="/contact">
            <button className="bg-black text-lime font-heading font-700 text-base uppercase tracking-wide px-10 py-4 rounded hover:bg-black/80 transition-all flex items-center gap-2 mx-auto">
              Book Free Visibility Audit <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      {/* INTERNAL LINKING: Related Content Hub */}
      <section className="py-20 bg-[#111111]">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="section-number mb-3">Learn More</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] text-white leading-none">
              EXPLORE THE AI VISIBILITY<br />
              <span className="text-lime">CONTENT HUB</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Link to How to Show Up in ChatGPT */}
            <Link href="/how-to-show-up-in-chatgpt">
              <div className="card-service group cursor-pointer">
                <span className="font-mono-data text-lime text-xs opacity-60 mb-3">CONTENT GUIDE</span>
                <h3 className="font-heading font-700 text-white text-lg mb-2 group-hover:text-lime transition-colors">
                  How to Show Up in ChatGPT Results
                </h3>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-4">
                  Step-by-step guide with 5 actionable steps to get your business visible in ChatGPT.
                </p>
                <div className="flex items-center gap-2 text-lime text-sm font-heading font-600">
                  Read Guide <ArrowRight size={14} />
                </div>
              </div>
            </Link>

            {/* Link to AI Search Audit */}
            <Link href="/ai-search-audit-orlando">
              <div className="card-service group cursor-pointer">
                <span className="font-mono-data text-lime text-xs opacity-60 mb-3">SERVICE</span>
                <h3 className="font-heading font-700 text-white text-lg mb-2 group-hover:text-lime transition-colors">
                  Get Your AI Search Audit
                </h3>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-4">
                  2-hour deep dive showing exactly where you rank in ChatGPT, Perplexity, and Claude.
                </p>
                <div className="flex items-center gap-2 text-lime text-sm font-heading font-600">
                  Book Audit <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
