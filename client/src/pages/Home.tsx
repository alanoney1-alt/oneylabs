/*
 * ONEY LABS HOME PAGE
 * Design: Raw Craft + Warm Dark
 * Sections: Hero → Pain → 3 Pillars → Proof → Stats → Process → Pricing → CTA
 * Images: hero-bg (dark circuit), alan-working (builder photo)
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Zap, Search, GraduationCap, Building2, Clock, DollarSign, TrendingUp, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663409472708/AwZd3Nde3Mv8PBZXHdvufN/hero-bg-nDvTnKn8Bzvj5v3ef6G7YS.webp";
const ALAN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663409472708/AwZd3Nde3Mv8PBZXHdvufN/alan-working-TUcZbSurU99qLMJ9EkAzAn.webp";
const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663409472708/AwZd3Nde3Mv8PBZXHdvufN/ai-tools-dashboard-gCb8Zuz9S6rQartTaWAMH6.webp";

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) {
      const items = el.querySelectorAll(".animate-slide-up");
      items.forEach((item) => observer.observe(item));
    }
    return () => observer.disconnect();
  }, []);
  return ref;
}

const pillars = [
  {
    number: "01",
    icon: Search,
    title: "AI Search Visibility",
    subtitle: "Show up when people ask ChatGPT",
    description: "When someone asks ChatGPT for the best HVAC company in Orlando, do you show up? Nobody in South Orlando sells this. We do.",
    href: "/ai-search-visibility",
    from: "$750/mo",
  },
  {
    number: "02",
    icon: Zap,
    title: "AI Business Growth",
    subtitle: "Build it. Automate it. Launch it.",
    description: "Walk into your business, find where you bleed time, and automate it. Or bring me your idea and I'll build it in weeks, not months.",
    href: "/ai-consulting",
    from: "$750 one-time",
  },
  {
    number: "03",
    icon: GraduationCap,
    title: "AI Education",
    subtitle: "Learn it. Use it. Own it.",
    description: "Monthly workshops, 1-on-1 lessons, and a weekly newsletter. You leave self-sufficient   not dependent on anyone.",
    href: "/workshops",
    from: "$75/workshop",
  },
];

const stats = [
  { value: "198", unit: "AI Tools", label: "Built in UpTend   one platform, one person" },
  { value: "2 4", unit: "Weeks", label: "Average MVP delivery time (not 3 6 months)" },
  { value: "95%+", unit: "Margin", label: "~$50/month cost per client. AI does the heavy lifting." },
  { value: "50 70%", unit: "Cheaper", label: "Than every other AI consulting firm in Orlando" },
];

const process = [
  {
    step: "01",
    title: "Free AI Audit",
    desc: "30 minutes. I look at your business, ask the right questions, and tell you exactly where AI can save you time and money. No pitch. Just honest answers.",
  },
  {
    step: "02",
    title: "Build the Plan",
    desc: "We agree on what to build, automate, or optimize. You get a clear scope, a real timeline, and a price you can actually afford.",
  },
  {
    step: "03",
    title: "Ship & Scale",
    desc: "I build it. You use it. We measure results. Then we find the next thing to improve. That's the whole model.",
  },
];

const industries = [
  "HVAC & Home Services", "Medical Offices", "Law Firms", "Restaurants",
  "Real Estate Agents", "Property Managers", "Med Spas", "Retail Shops",
];

export default function Home() {
  const sectionRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#111111]" ref={sectionRef}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#111111]/40" />
        <div className="relative z-10 container pt-24 pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="section-number">Lake Nona, Orlando FL</span>
              <span className="w-8 h-px bg-lime opacity-60" />
              <span className="section-number">AI Consulting</span>
            </div>

            <h1 className="font-display text-[clamp(3.5rem,10vw,7rem)] leading-none text-white mb-6">
              AI FOR<br />
              <span className="text-lime">SOUTH ORLANDO</span><br />
              BUSINESSES.
            </h1>

            <p className="font-body text-lg text-white/70 max-w-xl leading-relaxed mb-4">
              Built by a builder, not a consultant. I'll show you exactly where AI saves your business 20 hours a week   then I'll build it.
            </p>

            <p className="font-heading font-600 text-white/40 text-sm mb-10">
              Based in Lake Nona · Serving all of South Orlando
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="btn-lime text-base px-8 py-4">
                  Book Free AI Audit
                  <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/about">
                <button className="btn-outline-lime text-base px-8 py-4">
                  See What I've Built
                </button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 mt-10">
              {["No contracts required", "Pricing on the page", "2 4 week delivery"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-lime" />
                  <span className="font-heading text-sm text-white/60">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-gradient-to-b from-lime/60 to-transparent" />
        </div>
      </section>

      {/* ── PAIN POINT ── */}
      <section className="bg-[#111111] py-20 border-t border-white/6">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <p className="section-number mb-4">The Problem</p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-white leading-none mb-6">
              YOU KNOW AI MATTERS.<br />
              <span className="text-lime">YOU JUST NEED SOMEONE</span><br />
              TO SHOW YOU WHAT IT CAN DO.
            </h2>
            <p className="font-body text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Every other AI consultant in Orlando writes reports and disappears. I sit across from you, show you live demos, and build the thing. No fluff. No 6-month timelines. No $10,000 minimums.
            </p>
          </div>

          {/* Industry tags */}
          <div className="flex flex-wrap justify-center gap-3 mt-12 animate-slide-up">
            {industries.map((ind) => (
              <span
                key={ind}
                className="font-heading text-sm font-500 text-white/50 border border-white/10 rounded-full px-4 py-2 hover:border-lime/40 hover:text-white/80 transition-all"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 PILLARS ── */}
      <section className="bg-[#0D0D0D] py-24">
        <div className="container">
          <div className="mb-14 animate-slide-up">
            <p className="section-number mb-3">What We Do</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white leading-none">
              THREE WAYS I HELP<br />
              <span className="text-lime">YOUR BUSINESS WIN</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.number}
                className="card-service animate-slide-up group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono-data text-lime text-xs opacity-60">{pillar.number}</span>
                  <pillar.icon size={22} className="text-white/30 group-hover:text-lime transition-colors" />
                </div>
                <h3 className="font-heading font-800 text-white text-xl mb-1">{pillar.title}</h3>
                <p className="font-heading font-500 text-lime text-sm mb-4">{pillar.subtitle}</p>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-6">{pillar.description}</p>
                <div className="flex items-center justify-between">
                  <span className="price-tag text-sm">From {pillar.from}</span>
                  <Link href={pillar.href}>
                    <button className="flex items-center gap-1 text-white/40 hover:text-lime text-sm font-heading font-600 transition-colors">
                      Learn more <ChevronRight size={14} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF: UPTEND ── */}
      <section className="bg-[#111111] py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <p className="section-number mb-4">Proof, Not Promises</p>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white leading-none mb-6">
                I BUILT A PLATFORM WITH<br />
                <span className="text-lime">198 AI TOOLS.</span><br />
                ONE PERSON.
              </h2>
              <p className="font-body text-white/60 leading-relaxed mb-6">
                UpTend is a full home services platform   AI voice agents, automated booking, partner management, real-time analytics, and SEO infrastructure. Built entirely by me, using AI. That's not a case study. That's the product demo.
              </p>
              <p className="font-body text-white/60 leading-relaxed mb-8">
                Imagine what I can build for your business.
              </p>
              <div className="flex gap-4">
                <a href="https://uptendapp.com" target="_blank" rel="noopener noreferrer">
                  <button className="btn-lime">
                    See UpTend Live
                    <ArrowRight size={16} />
                  </button>
                </a>
                <Link href="/about">
                  <button className="btn-outline-lime">
                    Alan's Story
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="relative rounded-lg overflow-hidden border border-white/10">
                <img
                  src={DASHBOARD_IMG}
                  alt="UpTend AI platform dashboard with 198 AI tools"
                  className="w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-[#111111]/90 border border-lime/30 rounded-md px-4 py-3">
                    <p className="font-mono-data text-lime text-xs">uptendapp.com</p>
                    <p className="font-heading font-600 text-white text-sm">198 AI tools · Built by 1 person · Live in production</p>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-lime/20 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#0D0D0D] py-20">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.unit}
                className="text-center animate-slide-up"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="font-display text-[clamp(2.5rem,5vw,4rem)] text-lime leading-none mb-1">
                  {stat.value}
                </div>
                <div className="font-heading font-700 text-white text-sm uppercase tracking-wider mb-2">
                  {stat.unit}
                </div>
                <p className="font-body text-white/40 text-xs leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="bg-[#111111] py-24">
        <div className="container">
          <div className="mb-14 animate-slide-up">
            <p className="section-number mb-3">How It Works</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white leading-none">
              THREE STEPS.<br />
              <span className="text-lime">THAT'S THE WHOLE MODEL.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((step, i) => (
              <div key={step.step} className="animate-slide-up" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="font-display text-[5rem] text-lime/10 leading-none mb-4">{step.step}</div>
                <h3 className="font-heading font-800 text-white text-xl mb-3">{step.title}</h3>
                <p className="font-body text-white/60 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center animate-slide-up">
            <Link href="/contact">
              <button className="btn-lime text-base px-10 py-4">
                Start with a Free Audit
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section className="bg-[#0D0D0D] py-24">
        <div className="container">
          <div className="mb-14 text-center animate-slide-up">
            <p className="section-number mb-3">Transparent Pricing</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white leading-none mb-4">
              EVERYONE ELSE HIDES IT.<br />
              <span className="text-lime">WE SHOW IT.</span>
            </h2>
            <p className="font-body text-white/50 max-w-xl mx-auto">
              No "contact us for pricing." No surprise invoices. Real numbers, upfront.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                tier: "Starter",
                price: "$750",
                period: "/month",
                desc: "AI Search Visibility",
                features: ["Google Business Profile setup", "5 core directory listings", "Basic AI search optimization", "Monthly performance report", "1 blog post/month"],
                cta: "Get Started",
                highlight: false,
              },
              {
                tier: "Growth",
                price: "$1,500",
                period: "/month",
                desc: "AI Search Visibility",
                features: ["Everything in Starter", "25+ directory listings", "Full AI search optimization", "Social media management", "Bi-weekly strategy call"],
                cta: "Most Popular",
                highlight: true,
              },
              {
                tier: "Dominate",
                price: "$2,500",
                period: "/month",
                desc: "AI Search Visibility",
                features: ["Everything in Growth", "Weekly AI monitoring", "Review generation system", "8 blog posts/month", "Monthly in-person session"],
                cta: "Go All In",
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={plan.tier}
                className={`rounded-lg p-7 border transition-all animate-slide-up ${
                  plan.highlight
                    ? "bg-lime border-lime relative"
                    : "bg-[#1A1A1A] border-white/10 hover:border-white/20"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#111111] border border-lime text-lime font-mono-data text-xs px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <p className={`font-heading font-700 text-xs uppercase tracking-widest mb-1 ${plan.highlight ? "text-black/60" : "text-white/40"}`}>
                  {plan.desc}
                </p>
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
                <ul className="flex flex-col gap-2 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${plan.highlight ? "text-black/70" : "text-lime"}`} />
                      <span className={`font-body text-sm ${plan.highlight ? "text-black/80" : "text-white/60"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <button className={`w-full py-3 rounded font-heading font-700 text-sm uppercase tracking-wide transition-all ${
                    plan.highlight
                      ? "bg-black text-lime hover:bg-black/80"
                      : "bg-transparent border border-lime text-lime hover:bg-lime hover:text-black"
                  }`}>
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center animate-slide-up">
            <Link href="/pricing">
              <button className="flex items-center gap-2 mx-auto text-white/50 hover:text-lime font-heading text-sm transition-colors">
                See all pricing including consulting, builds & one-time services
                <ChevronRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY ONEY LABS ── */}
      <section className="bg-[#111111] py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-slide-up order-2 lg:order-1">
              <img
                src={ALAN_IMG}
                alt="Alan Oney working on AI systems in Lake Nona, Orlando"
                className="w-full rounded-lg object-cover max-h-[600px]"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -left-4 bg-lime rounded-lg p-4 shadow-2xl">
                <p className="font-mono-data font-700 text-black text-2xl leading-none">$750</p>
                <p className="font-heading font-600 text-black/70 text-xs">Entry price vs $3K+ everywhere else</p>
              </div>
            </div>

            <div className="animate-slide-up order-1 lg:order-2">
              <p className="section-number mb-4">Why Oney Labs</p>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white leading-none mb-8">
                WHAT NOBODY<br />
                IN ORLANDO<br />
                <span className="text-lime">DOES.</span>
              </h2>

              <div className="flex flex-col gap-5">
                {[
                  { icon: DollarSign, title: "Pricing on the page", desc: "Everyone hides it. We show it. Instant trust." },
                  { icon: Building2, title: "Proof of building", desc: "UpTend exists. 198 AI tools. One person. That's the pitch." },
                  { icon: Clock, title: "2 4 week delivery", desc: "Not 3 6 months. AI makes this possible." },
                  { icon: TrendingUp, title: "Revenue share option", desc: "$0 upfront for the best ideas. Zero competitors offer this." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 bg-lime/10 border border-lime/20 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-lime" />
                    </div>
                    <div>
                      <h4 className="font-heading font-700 text-white text-sm mb-1">{item.title}</h4>
                      <p className="font-body text-white/50 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-lime py-20">
        <div className="container text-center">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-black leading-none mb-4 animate-slide-up">
            READY TO STOP DOING<br />
            THINGS BY HAND?
          </h2>
          <p className="font-body text-black/70 text-lg max-w-xl mx-auto mb-10 animate-slide-up">
            Book a free 30-minute AI audit. I'll look at your business and tell you exactly what AI can do for you. No pitch. Just answers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link href="/contact">
              <button className="bg-black text-lime font-heading font-700 text-base uppercase tracking-wide px-10 py-4 rounded hover:bg-black/80 transition-all flex items-center gap-2">
                Book Free AI Audit
                <ArrowRight size={18} />
              </button>
            </Link>
            <a href="tel:8503199550">
              <button className="bg-transparent border-2 border-black text-black font-heading font-700 text-base uppercase tracking-wide px-10 py-4 rounded hover:bg-black/10 transition-all">
                Call (850) 319-9550
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── ANSWER ENGINE CONTENT HUB ── */}
      <section className="bg-[#0D0D0D] py-24">
        <div className="container">
          <div className="mb-16 text-center">
            <p className="section-number mb-3">Learn More</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-white leading-none">
              UNDERSTAND AI SEARCH<br />
              <span className="text-lime">VISIBILITY</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: What is AI Search Visibility */}
            <Link href="/what-is-ai-search-visibility">
              <div className="card-service group cursor-pointer h-full flex flex-col">
                <span className="font-mono-data text-lime text-xs opacity-60 mb-4">EXPLAINER</span>
                <h3 className="font-heading font-800 text-white text-lg mb-3 group-hover:text-lime transition-colors">
                  What is AI Search Visibility?
                </h3>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-6 flex-grow">
                  Understand the basics of AI search visibility and why it matters for your business. Learn how ChatGPT, Perplexity, and Claude are changing how customers find you.
                </p>
                <div className="flex items-center gap-2 text-lime text-sm font-heading font-600 group-hover:gap-3 transition-all">
                  Read <ArrowRight size={14} />
                </div>
              </div>
            </Link>

            {/* Card 2: How to Show Up in ChatGPT */}
            <Link href="/how-to-show-up-in-chatgpt">
              <div className="card-service group cursor-pointer h-full flex flex-col">
                <span className="font-mono-data text-lime text-xs opacity-60 mb-4">CONTENT GUIDE</span>
                <h3 className="font-heading font-800 text-white text-lg mb-3 group-hover:text-lime transition-colors">
                  How to Show Up in ChatGPT Results
                </h3>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-6 flex-grow">
                  Step-by-step guide to getting your business visible in ChatGPT. Optimize your GBP, get listed on directories, add schema markup, and create answer-engine content.
                </p>
                <div className="flex items-center gap-2 text-lime text-sm font-heading font-600 group-hover:gap-3 transition-all">
                  Read <ArrowRight size={14} />
                </div>
              </div>
            </Link>

            {/* Card 3: AI Search Audit */}
            <Link href="/ai-search-audit-orlando">
              <div className="card-service group cursor-pointer h-full flex flex-col">
                <span className="font-mono-data text-lime text-xs opacity-60 mb-4">SERVICE PAGE</span>
                <h3 className="font-heading font-800 text-white text-lg mb-3 group-hover:text-lime transition-colors">
                  AI Search Audit for Orlando Businesses
                </h3>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-6 flex-grow">
                  Get a 2-hour deep dive into your AI search visibility. See exactly where you rank in ChatGPT, Perplexity, and Claude, plus actionable recommendations.
                </p>
                <div className="flex items-center gap-2 text-lime text-sm font-heading font-600 group-hover:gap-3 transition-all">
                  Learn More <ArrowRight size={14} />
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
