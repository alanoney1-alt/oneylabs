/*
 * ONEY LABS SERVICES PAGE
 * Design: Raw Craft + Warm Dark
 * All three pillars with full detail
 */
import { Link } from "wouter";
import { ArrowRight, Search, Zap, GraduationCap, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Services() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />
      <div className="pt-24 pb-8 container">
        <p className="section-number mb-3">What We Offer</p>
        <h1 className="font-display text-[clamp(3rem,7vw,6rem)] text-white leading-none mb-4">
          THREE WAYS TO WIN<br />
          <span className="text-lime">WITH AI</span>
        </h1>
        <p className="font-body text-white/60 text-lg max-w-2xl leading-relaxed">
          Every service is designed for South Orlando small businesses. Real pricing. Real timelines. A real person who shows up.
        </p>
      </div>

      {/* Pillar 1 */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <Search size={24} className="text-lime" />
            <span className="font-mono-data text-lime text-xs">01 / AI SEARCH VISIBILITY</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none mb-4">
                SHOW UP WHEN PEOPLE<br />
                ASK <span className="text-lime">CHATGPT</span>
              </h2>
              <p className="font-body text-white/60 leading-relaxed mb-6">
                When someone asks ChatGPT for the best HVAC company in Orlando, do you show up? Nobody in South Orlando sells this. We're the first. That's a first-mover advantage you can own right now.
              </p>
              <Link href="/ai-search-visibility">
                <button className="btn-lime">
                  See Full Details <ArrowRight size={16} />
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { tier: "Starter", price: "$750/mo", features: ["Google Business Profile", "5 directory listings", "Basic AI search optimization", "Monthly report", "1 blog post/month"] },
                { tier: "Growth", price: "$1,500/mo", features: ["Everything in Starter", "25+ directory listings", "Full AI search optimization", "Social media (3x/week)", "Bi-weekly strategy call"] },
                { tier: "Dominate", price: "$2,500/mo", features: ["Everything in Growth", "Weekly AI monitoring", "Review generation system", "8 blog posts/month", "Monthly in-person session"] },
              ].map((plan) => (
                <div key={plan.tier} className="card-service flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-heading font-700 text-white">{plan.tier}</h4>
                    <p className="font-body text-white/40 text-sm">{plan.features.slice(0, 2).join(" · ")}</p>
                  </div>
                  <span className="price-tag text-lg shrink-0">{plan.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 2 */}
      <section className="py-20 bg-[#111111]">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <Zap size={24} className="text-lime" />
            <span className="font-mono-data text-lime text-xs">02 / AI BUSINESS GROWTH</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none mb-4">
                BUILD IT.<br />
                AUTOMATE IT.<br />
                <span className="text-lime">LAUNCH IT.</span>
              </h2>
              <p className="font-body text-white/60 leading-relaxed mb-6">
                Three tracks: build your idea from scratch, automate your existing operations, or get 1-on-1 guidance to grow with AI.
              </p>
              <Link href="/ai-consulting">
                <button className="btn-outline-lime">
                  See Full Details <ChevronRight size={16} />
                </button>
              </Link>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Idea-to-Product", from: "From $3,500", desc: "You have the idea. I build it. 2–4 week MVP delivery." },
                { title: "AI Operations", from: "From $750", desc: "I audit your business and automate where you bleed time." },
                { title: "AI for Entrepreneurs", from: "From $250", desc: "1-on-1 strategy, build-with-me sprints, ongoing advisory." },
              ].map((item) => (
                <div key={item.title} className="card-service">
                  <h4 className="font-heading font-700 text-white mb-2">{item.title}</h4>
                  <p className="price-tag text-sm mb-3">{item.from}</p>
                  <p className="font-body text-white/50 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 3 */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap size={24} className="text-lime" />
            <span className="font-mono-data text-lime text-xs">03 / AI EDUCATION</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none mb-4">
                LEARN IT. USE IT.<br />
                <span className="text-lime">OWN IT.</span>
              </h2>
              <p className="font-body text-white/60 leading-relaxed mb-6">
                Monthly workshops in South Orlando. 1-on-1 lessons. A weekly newsletter. You leave self-sufficient — not dependent on anyone.
              </p>
              <Link href="/workshops">
                <button className="btn-lime">
                  See Workshops <ArrowRight size={16} />
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Monthly Workshop", price: "$75/person", desc: "2-hour hands-on. Live demos. You leave with one AI tool working." },
                { title: "1-on-1 AI Lessons", price: "$200/hr", desc: "Teach AI for your specific business. Leave self-sufficient." },
                { title: "Substack Newsletter", price: "Free", desc: "'AI Search Orlando' — weekly deep dives on AI for local business." },
              ].map((item) => (
                <div key={item.title} className="card-service flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-heading font-700 text-white mb-1">{item.title}</h4>
                    <p className="font-body text-white/50 text-sm">{item.desc}</p>
                  </div>
                  <span className="price-tag text-sm shrink-0">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-lime py-16">
        <div className="container text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-black leading-none mb-4">
            NOT SURE WHERE TO START?
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Book a free 30-minute AI audit. I'll tell you exactly which service fits your business.
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
