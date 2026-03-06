/*
 * ONEY LABS BUILD WITH ME PAGE
 * Design: Raw Craft + Warm Dark
 * For entrepreneurs with ideas   idea-to-product builds
 */
import { Link } from "wouter";
import { ArrowRight, Rocket, CheckCircle2, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663409472708/AwZd3Nde3Mv8PBZXHdvufN/ai-tools-dashboard-gCb8Zuz9S6rQartTaWAMH6.webp";

const whatWeBuild = [
  "Web apps and SaaS platforms",
  "Custom AI agents and chatbots",
  "Workflow automation systems",
  "Internal business tools",
  "Customer-facing portals",
  "Booking and scheduling systems",
  "Analytics dashboards",
  "E-commerce and marketplace platforms",
];

const process = [
  {
    step: "01",
    title: "Discovery Session   $250",
    desc: "90 minutes. We map out your idea, validate the concept, define the MVP scope, and create a clear build plan. Applied to your project cost if you sign.",
  },
  {
    step: "02",
    title: "MVP Sprint   $3,500 $10,000",
    desc: "2 4 week delivery. I build your MVP using AI tools, modern frameworks, and proven patterns. You get a working product, not a prototype.",
  },
  {
    step: "03",
    title: "Launch & Iterate",
    desc: "Ongoing support at $500 $1,500/month. Or revenue share: $0 upfront, 15% of revenue for ideas I believe in.",
  },
];

export default function BuildWithMe() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 bg-[#111111]">
        <div className="container">
          <div className="flex items-center gap-2 mb-6">
            <Rocket size={16} className="text-lime" />
            <span className="section-number">Build With Me</span>
          </div>
          <h1 className="font-display text-[clamp(3rem,7vw,6rem)] text-white leading-none mb-6">
            YOU HAVE THE IDEA.<br />
            <span className="text-lime">I BUILD IT.</span><br />
            IN WEEKS.
          </h1>
          <p className="font-body text-white/60 text-lg max-w-2xl leading-relaxed mb-10">
            No tech team needed. No $100K budget. I use AI to prototype, build, and launch your idea in 2 4 weeks. Real software. Real timelines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <button className="btn-lime text-base px-8 py-4">
                Book Discovery Session   $250 <ArrowRight size={18} />
              </button>
            </Link>
            <a href="https://uptendapp.com" target="_blank" rel="noopener noreferrer">
              <button className="btn-outline-lime text-base px-8 py-4">
                See What I've Built <ExternalLink size={16} />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-number mb-4">The Proof</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none mb-5">
                I BUILT UPTEND.<br />
                <span className="text-lime">198 AI TOOLS.</span><br />
                ONE PERSON.
              </h2>
              <p className="font-body text-white/60 leading-relaxed mb-5">
                UpTend is a full home services platform. AI voice agents. Automated booking. Partner management. Real-time analytics. SEO infrastructure. Built by me, using AI.
              </p>
              <p className="font-body text-white/60 leading-relaxed mb-8">
                That's the demo. That's the proof. Imagine what I can build for your idea.
              </p>
              <a href="https://uptendapp.com" target="_blank" rel="noopener noreferrer">
                <button className="btn-lime">
                  Visit UpTend <ExternalLink size={16} />
                </button>
              </a>
            </div>
            <div className="relative rounded-lg overflow-hidden border border-white/10">
              <img
                src={DASHBOARD_IMG}
                alt="UpTend platform   built by one person with AI"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-[#111111]">
        <div className="container">
          <div className="mb-12">
            <p className="section-number mb-3">How It Works</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none">
              THREE STEPS TO<br />
              <span className="text-lime">LAUNCH.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((step, i) => (
              <div key={step.step} className="card-service">
                <div className="font-display text-[5rem] text-lime/10 leading-none mb-4">{step.step}</div>
                <h3 className="font-heading font-800 text-white text-lg mb-3">{step.title}</h3>
                <p className="font-body text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="section-number mb-4">What We Build</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none mb-8">
                IF YOU CAN<br />
                DESCRIBE IT,<br />
                <span className="text-lime">WE CAN BUILD IT.</span>
              </h2>
              <ul className="grid grid-cols-1 gap-3">
                {whatWeBuild.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={15} className="text-lime shrink-0" />
                    <span className="font-body text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="section-number mb-4">Revenue Share Option</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-white leading-none mb-6">
                $0 UPFRONT.<br />
                <span className="text-lime">15% OF REVENUE.</span>
              </h2>
              <p className="font-body text-white/60 leading-relaxed mb-5">
                For ideas I believe in, I'll build it for free and take 15% of revenue instead. Nobody else in Orlando offers this.
              </p>
              <p className="font-body text-white/60 leading-relaxed mb-8">
                This isn't for everyone. It's for the ideas that are genuinely good. Book a discovery session and let's talk.
              </p>
              <Link href="/contact">
                <button className="btn-lime">
                  Pitch Your Idea <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-lime py-16">
        <div className="container text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-black leading-none mb-4">
            YOUR IDEA DESERVES<br />
            TO EXIST.
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Book a discovery session. 90 minutes. $250 applied to your project. We'll map out exactly what it takes to build it.
          </p>
          <Link href="/contact">
            <button className="bg-black text-lime font-heading font-700 text-base uppercase tracking-wide px-10 py-4 rounded hover:bg-black/80 transition-all flex items-center gap-2 mx-auto">
              Book Discovery Session   $250 <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
