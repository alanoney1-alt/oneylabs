/*
 * ONEY LABS WORKSHOPS PAGE
 * Design: Raw Craft + Warm Dark
 * Monthly workshops, 1-on-1 lessons, newsletter
 */
import { Link } from "wouter";
import { ArrowRight, Calendar, Users, Clock, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WORKSHOP_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663409472708/AwZd3Nde3Mv8PBZXHdvufN/workshop-scene-DwUhcrA2qo4CXzNmTcdNvZ.webp";

const whatYouLearn = [
  "How to find where AI can save YOUR business 20+ hours a week",
  "How to set up AI tools without a tech background",
  "Real demos   not slides, not theory",
  "One AI tool working for your business before you leave",
  "How to evaluate AI tools without getting scammed",
  "The difference between AI hype and AI that actually works",
];

export default function Workshops() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-0 bg-[#111111]">
        <div className="container">
          <p className="section-number mb-4">AI Education</p>
          <h1 className="font-display text-[clamp(3rem,7vw,6rem)] text-white leading-none mb-6">
            LEARN AI.<br />
            <span className="text-lime">ACTUALLY USE IT.</span>
          </h1>
          <p className="font-body text-white/60 text-lg max-w-2xl leading-relaxed">
            Monthly workshops in South Orlando. 1-on-1 lessons. A weekly newsletter. You leave self-sufficient   not dependent on anyone.
          </p>
        </div>
      </section>

      {/* Workshop Feature */}
      <section className="py-20 bg-[#0D0D0D] mt-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Calendar size={20} className="text-lime" />
                <span className="font-mono-data text-lime text-xs">MONTHLY WORKSHOP</span>
              </div>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none mb-4">
                "AI FOR YOUR<br />
                <span className="text-lime">BUSINESS"</span>
              </h2>
              <p className="font-body text-white/60 leading-relaxed mb-6">
                A 2-hour hands-on workshop for South Orlando business owners. Not slides. Live demos. Each attendee leaves with one AI tool working for their business.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Clock, label: "2 Hours", sub: "Hands-on" },
                  { icon: Users, label: "15 20", sub: "People max" },
                  { icon: Calendar, label: "Monthly", sub: "South Orlando" },
                ].map((item) => (
                  <div key={item.label} className="bg-[#1A1A1A] border border-white/8 rounded-lg p-4 text-center">
                    <item.icon size={20} className="text-lime mx-auto mb-2" />
                    <p className="font-heading font-700 text-white text-sm">{item.label}</p>
                    <p className="font-body text-white/40 text-xs">{item.sub}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div>
                  <span className="font-mono-data font-700 text-lime text-3xl">$75</span>
                  <span className="font-heading text-white/40 text-sm">/person</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <p className="font-body text-white/50 text-sm">Free with consultation booking</p>
              </div>

              <Link href="/book">
                <button className="btn-lime">
                  Register for Next Workshop <ArrowRight size={16} />
                </button>
              </Link>
            </div>

            <div className="relative rounded-lg overflow-hidden">
              <img
                src={WORKSHOP_IMG}
                alt="AI for Your Business workshop in South Orlando"
                className="w-full object-cover max-h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* What You Learn */}
      <section className="py-20 bg-[#111111]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="section-number mb-4">What You Learn</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none mb-8">
                NOT SLIDES.<br />
                <span className="text-lime">LIVE DEMOS.</span>
              </h2>
              <ul className="flex flex-col gap-4">
                {whatYouLearn.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-lime mt-0.5 shrink-0" />
                    <span className="font-body text-white/70 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 1-on-1 Lessons */}
            <div>
              <p className="section-number mb-4">1-on-1 Lessons</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none mb-6">
                YOUR BUSINESS.<br />
                <span className="text-lime">YOUR AI.</span>
              </h2>
              <p className="font-body text-white/60 leading-relaxed mb-6">
                I teach AI for your specific business. A plumber learns different things than a restaurant owner. You leave self-sufficient   not dependent on me or anyone else.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  { label: "Single Session", price: "$200/hr", desc: "Deep dive into AI for your specific business" },
                  { label: "4-Session Package", price: "$700", desc: "Save $100. Build a full AI toolkit over 4 weeks." },
                ].map((item) => (
                  <div key={item.label} className="card-service flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-heading font-700 text-white">{item.label}</h4>
                      <p className="font-body text-white/40 text-sm">{item.desc}</p>
                    </div>
                    <span className="price-tag text-lg shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>

              <Link href="/book">
                <button className="btn-outline-lime">
                  Book a Lesson <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <div className="max-w-2xl">
            <p className="section-number mb-4">Free Resource</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none mb-4">
              "AI SEARCH ORLANDO"<br />
              <span className="text-lime">WEEKLY NEWSLETTER</span>
            </h2>
            <p className="font-body text-white/60 leading-relaxed mb-8">
              Weekly deep dives on AI for local business. Real tools. Real results. Written by someone who actually builds with AI   not someone who writes about it.
            </p>
            <a href="https://substack.com" target="_blank" rel="noopener noreferrer">
              <button className="btn-lime">
                Subscribe Free <ArrowRight size={16} />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-lime py-16">
        <div className="container text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-black leading-none mb-4">
            NEXT WORKSHOP IS COMING UP.
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Spots fill up fast. 15 20 people max. Register now or book a 1-on-1 lesson.
          </p>
          <Link href="/book">
            <button className="bg-black text-lime font-heading font-700 text-base uppercase tracking-wide px-10 py-4 rounded hover:bg-black/80 transition-all flex items-center gap-2 mx-auto">
              Register Now <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
