/*
 * ONEY LABS AI CONSULTING PAGE
 * Design: Raw Craft + Warm Dark
 * AI Operations Consulting   audit, implement, manage
 */
import { Link } from "wouter";
import { ArrowRight, Zap, Clock, DollarSign, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const targets = [
  "Medical offices", "Law firms", "Restaurants", "Real estate agents",
  "Property managers", "HVAC companies", "Med spas", "Retail shops",
  "Any business with 5 50 employees still doing things by hand",
];

export default function AIConsulting() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 bg-[#111111]">
        <div className="container">
          <div className="flex items-center gap-2 mb-6">
            <Zap size={16} className="text-lime" />
            <span className="section-number">AI Business Growth</span>
          </div>
          <h1 className="font-display text-[clamp(3rem,7vw,6rem)] text-white leading-none mb-6">
            I BUILD THE THING.<br />
            <span className="text-lime">YOU STOP DOING</span><br />
            IT BY HAND.
          </h1>
          <p className="font-body text-white/60 text-lg max-w-2xl leading-relaxed">
            Walk into your business. Find where you bleed time. Automate it. Or bring me your idea   I'll build it in weeks, not months.
          </p>
        </div>
      </section>

      {/* Three Tracks */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="mb-12">
            <p className="section-number mb-3">Three Tracks</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none">
              PICK YOUR PATH
            </h2>
          </div>

          {/* Track A */}
          <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="font-mono-data text-lime text-xs mb-3 block">TRACK A</span>
              <h3 className="font-display text-[clamp(1.8rem,3vw,3rem)] text-white leading-none mb-4">
                IDEA-TO-PRODUCT<br />
                <span className="text-lime">BUILDS</span>
              </h3>
              <p className="font-body text-white/60 leading-relaxed mb-5">
                You have a business idea but no tech team. I use AI to prototype, build, and launch in weeks. Not months. Not $100K. Real software, real timelines.
              </p>
              <p className="font-body text-white/60 leading-relaxed mb-6">
                What we build: Apps, platforms, websites, custom AI agents, internal tools, workflow automation.
              </p>
              <Link href="/build-with-me">
                <button className="btn-outline-lime text-sm">
                  Learn More About Builds <ArrowRight size={14} />
                </button>
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Discovery Session", price: "$250", note: "90 min · Applied to project if you sign" },
                { label: "MVP Sprint", price: "$3,500 $10,000", note: "2 4 week delivery" },
                { label: "Ongoing Support", price: "$500 $1,500/mo", note: "After launch" },
                { label: "Revenue Share", price: "$0 upfront", note: "15% of revenue for ideas Alan believes in" },
              ].map((item) => (
                <div key={item.label} className="card-service flex items-center justify-between gap-4">
                  <div>
                    <p className="font-heading font-600 text-white">{item.label}</p>
                    <p className="font-body text-white/40 text-xs">{item.note}</p>
                  </div>
                  <span className="price-tag shrink-0">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/6 pt-12 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Track B */}
            <div>
              <span className="font-mono-data text-lime text-xs mb-3 block">TRACK B</span>
              <h3 className="font-display text-[clamp(1.8rem,3vw,3rem)] text-white leading-none mb-4">
                AI OPERATIONS<br />
                <span className="text-lime">CONSULTING</span>
              </h3>
              <p className="font-body text-white/60 leading-relaxed mb-5">
                I walk into your business, audit where you bleed time, and automate it. Medical offices, law firms, restaurants, property managers   any business with 5 50 employees still doing things by hand.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "AI Audit", price: "$750", note: "2-hour deep dive + written report" },
                  { label: "Implementation Sprint", price: "$3,000 $7,500", note: "Build what the audit recommends" },
                  { label: "Managed AI Operations", price: "$1,500 $3,500/mo", note: "Ongoing automation management" },
                ].map((item) => (
                  <div key={item.label} className="card-service flex items-center justify-between gap-4">
                    <div>
                      <p className="font-heading font-600 text-white">{item.label}</p>
                      <p className="font-body text-white/40 text-xs">{item.note}</p>
                    </div>
                    <span className="price-tag shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Track C */}
            <div>
              <span className="font-mono-data text-lime text-xs mb-3 block">TRACK C</span>
              <h3 className="font-display text-[clamp(1.8rem,3vw,3rem)] text-white leading-none mb-4">
                AI FOR<br />
                <span className="text-lime">ENTREPRENEURS</span>
              </h3>
              <p className="font-body text-white/60 leading-relaxed mb-5">
                For individuals who want to use AI to start or grow something. 1-on-1 strategy, build-with-me sprints, ongoing advisory.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "1-on-1 Strategy Session", price: "$250", note: "90 min · Leave with a plan" },
                  { label: "Build-With-Me Sprint", price: "$2,000", note: "Alan builds it WITH you over a week" },
                  { label: "Ongoing Advisory", price: "$750/mo", note: "Weekly calls + async support" },
                ].map((item) => (
                  <div key={item.label} className="card-service flex items-center justify-between gap-4">
                    <div>
                      <p className="font-heading font-600 text-white">{item.label}</p>
                      <p className="font-body text-white/40 text-xs">{item.note}</p>
                    </div>
                    <span className="price-tag shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Industries */}
      <section className="py-20 bg-[#111111]">
        <div className="container">
          <div className="mb-10">
            <p className="section-number mb-3">Who This Is For</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none">
              STILL DOING THINGS<br />
              <span className="text-lime">BY HAND?</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {targets.map((target) => (
              <span key={target} className="font-heading text-sm font-500 text-white/60 border border-white/10 rounded-full px-4 py-2 hover:border-lime/40 hover:text-white transition-all">
                {target}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Speed */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: "2 4 Week Delivery", desc: "Not 3 6 months. AI makes this possible. I've done it with UpTend   198 tools, one person." },
              { icon: DollarSign, title: "50 70% Cheaper", desc: "Than every other AI consulting firm in Orlando. No team overhead. AI does the heavy lifting." },
              { icon: Users, title: "In-Person Available", desc: "Based in Lake Nona. I'll sit across from you, demo it live, and build it with you." },
            ].map((item) => (
              <div key={item.title} className="card-service text-center">
                <div className="w-12 h-12 bg-lime/10 border border-lime/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={22} className="text-lime" />
                </div>
                <h3 className="font-heading font-700 text-white text-lg mb-3">{item.title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-lime py-16">
        <div className="container text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-black leading-none mb-4">
            START WITH A<br />
            FREE AI AUDIT.
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            $750 one-time. 2-hour deep dive + written report. I'll show you exactly where AI can save your business time and money.
          </p>
          <Link href="/contact">
            <button className="bg-black text-lime font-heading font-700 text-base uppercase tracking-wide px-10 py-4 rounded hover:bg-black/80 transition-all flex items-center gap-2 mx-auto">
              Book AI Audit   $750 <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
