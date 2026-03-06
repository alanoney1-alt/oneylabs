/*
 * ONEY LABS ABOUT PAGE
 * Design: Raw Craft + Warm Dark
 * Alan's story + UpTend proof + competitive advantages
 */
import { Link } from "wouter";
import { ArrowRight, MapPin, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ALAN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663409472708/AwZd3Nde3Mv8PBZXHdvufN/alan-working-TUcZbSurU99qLMJ9EkAzAn.webp";
const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663409472708/AwZd3Nde3Mv8PBZXHdvufN/ai-tools-dashboard-gCb8Zuz9S6rQartTaWAMH6.webp";

const advantages = [
  { title: "Proof, not promises", desc: "UpTend exists. 198 AI tools. One person. That's the pitch." },
  { title: "Local and in-person", desc: "Sit across from you at a coffee shop and demo it live." },
  { title: "Accessible pricing", desc: "$750/mo entry vs $3K+ everywhere else." },
  { title: "Full stack", desc: "Apps, automation, SEO, content, AI agents, social media, strategy. One person, all of it." },
  { title: "Speed", desc: "2–4 weeks, not 3–6 months. AI makes this possible." },
  { title: "Revenue share", desc: "Nobody else offers this. Attracts the best ideas." },
  { title: "Low overhead", desc: "No team salaries. AI does the heavy lifting. ~$50/month cost per client = 95%+ margins." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 bg-[#111111]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-number mb-4">About</p>
              <h1 className="font-display text-[clamp(3rem,7vw,6rem)] text-white leading-none mb-6">
                BUILT BY<br />
                A BUILDER,<br />
                <span className="text-lime">NOT A CONSULTANT.</span>
              </h1>
              <p className="font-body text-white/70 text-lg leading-relaxed mb-4">
                I'm Alan Oney. I live in Lake Nona, Orlando. I help local businesses get visible, get efficient, and get built with AI.
              </p>
              <p className="font-body text-white/60 leading-relaxed mb-4">
                Not a consulting firm that writes reports. A builder who delivers working systems.
              </p>
              <p className="font-body text-white/60 leading-relaxed mb-8">
                I'm not a guru. Not a thought leader. I'm the guy who builds the thing and shows you how it works over coffee.
              </p>
              <div className="flex items-center gap-2 mb-8">
                <MapPin size={16} className="text-lime" />
                <span className="font-heading font-500 text-white/60">Lake Nona, Orlando, FL</span>
              </div>
              <div className="flex gap-4">
                <Link href="/contact">
                  <button className="btn-lime">
                    Work With Me <ArrowRight size={16} />
                  </button>
                </Link>
                <a href="tel:8503199550">
                  <button className="btn-outline-lime">
                    (850) 319-9550
                  </button>
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src={ALAN_IMG}
                alt="Alan Oney — AI builder and consultant in Lake Nona, Orlando"
                className="w-full rounded-lg object-cover max-h-[600px]"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#1A1A1A] border border-lime/30 rounded-lg p-4">
                <p className="font-mono-data text-lime text-xs mb-1">alan@oneylabs.ai</p>
                <p className="font-heading font-600 text-white text-sm">Lake Nona, Orlando FL</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UpTend Proof */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container">
          <div className="mb-12">
            <p className="section-number mb-3">The Proof</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white leading-none">
              I BUILT <span className="text-lime">UPTEND.</span><br />
              ONE PERSON.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-white/70 text-lg leading-relaxed mb-5">
                UpTend is a full home services platform. 198 AI tools. Automated voice agents. Partner management. Real-time booking. Analytics. SEO infrastructure.
              </p>
              <p className="font-body text-white/60 leading-relaxed mb-5">
                Built entirely by me, using AI. Not a team. Not a $500K budget. One person with the right tools and the right mindset.
              </p>
              <p className="font-body text-white/60 leading-relaxed mb-8">
                That's not a case study. That's the product demo. That's the credibility. And that's exactly what I can bring to your business.
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
                alt="UpTend platform dashboard — 198 AI tools built by one person"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-3">
                {[
                  { value: "198", label: "AI Tools" },
                  { value: "1", label: "Person" },
                  { value: "Live", label: "In Production" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#111111]/90 border border-lime/20 rounded p-3 text-center">
                    <p className="font-mono-data font-700 text-lime text-xl">{stat.value}</p>
                    <p className="font-heading text-white/60 text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-24 bg-[#111111]">
        <div className="container">
          <div className="mb-12">
            <p className="section-number mb-3">Why Choose Oney Labs</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white leading-none">
              WHAT NOBODY IN<br />
              <span className="text-lime">ORLANDO DOES.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {advantages.map((item, i) => (
              <div key={item.title} className="card-service">
                <span className="font-mono-data text-lime/50 text-xs mb-3 block">0{i + 1}</span>
                <h3 className="font-heading font-700 text-white mb-2">{item.title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Strategy */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="mb-10">
            <p className="section-number mb-3">Geographic Focus</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none">
              OWNING<br />
              <span className="text-lime">SOUTH ORLANDO</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { phase: "Phase 1", months: "Month 1–3", areas: "Lake Nona · St. Cloud · Narcoossee · Meadow Woods" },
              { phase: "Phase 2", months: "Month 4–6", areas: "Hunter's Creek · Kissimmee · Celebration · Poinciana" },
              { phase: "Phase 3", months: "Month 7–12", areas: "Dr. Phillips · Windermere · Winter Garden · South Downtown" },
              { phase: "Phase 4", months: "Year 2", areas: "All Orlando Metro" },
            ].map((phase) => (
              <div key={phase.phase} className="card-service">
                <span className="font-mono-data text-lime text-xs mb-2 block">{phase.phase}</span>
                <p className="font-heading font-600 text-white/60 text-xs mb-3">{phase.months}</p>
                <p className="font-body text-white/50 text-sm leading-relaxed">{phase.areas}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-lime py-16">
        <div className="container text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-black leading-none mb-4">
            LET'S MEET FOR COFFEE.
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            I do office hours every Thursday — free 15-minute AI chats. Or book a full 30-minute audit.
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
