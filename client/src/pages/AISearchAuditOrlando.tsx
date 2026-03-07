/*
 * AI SEARCH AUDIT FOR ORLANDO BUSINESSES
 * Answer-engine optimized service page
 * Targets: "AI search audit" "ChatGPT visibility audit" "AI visibility for local business"
 */
import { Link } from "wouter";
import { CheckCircle2, BarChart3, AlertCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AISearchAuditOrlando() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <span className="section-number">SERVICE</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">
            AI Search Audit for <span className="text-lime">Orlando Businesses</span>
          </h1>
          <p className="font-body text-lg text-white/70 leading-relaxed mb-8">
            A 2-hour deep dive into your AI search visibility. I'll show you exactly where you rank in ChatGPT, Perplexity, and Claude, and what it takes to show up.
          </p>
          <Link href="/book">
            <button className="btn-lime">Book Your Audit</button>
          </Link>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-12">What's Included in Your Audit</h2>
          <div className="space-y-6">
            {[
              {
                title: "ChatGPT Visibility Check",
                desc: "I ask ChatGPT 10 industry-specific questions relevant to your business. Do you show up? Where do you rank?",
              },
              {
                title: "Perplexity & Claude Analysis",
                desc: "Same questions across Perplexity and Claude. Are you visible across all major AI models?",
              },
              {
                title: "Google Business Profile Audit",
                desc: "Your GBP is the foundation of AI search visibility. I review completeness, accuracy, and optimization.",
              },
              {
                title: "Directory Listing Review",
                desc: "Are you on the 25+ directories that AI crawlers use? Which ones are missing? Which have outdated info?",
              },
              {
                title: "Schema Markup Analysis",
                desc: "Do you have structured data? Is it correct? Does it help or hurt your AI visibility?",
              },
              {
                title: "Content Analysis",
                desc: "What content are AI models pulling from? Is it your website, competitors, or outdated directories?",
              },
              {
                title: "Written Report",
                desc: "A detailed report showing your current AI search visibility score, gaps, and exact steps to improve.",
              },
              {
                title: "Recommendations",
                desc: "Specific, actionable recommendations tailored to your business and industry.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle2 size={24} className="text-lime shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-700 mb-1">{item.title}</h3>
                  <p className="font-body text-white/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-12">The Audit Process</h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Book Your Audit",
                desc: "Schedule a 2-hour session. I'll ask you about your business, target customers, and current marketing.",
              },
              {
                step: "2",
                title: "I Run the Audit",
                desc: "I test your visibility across ChatGPT, Perplexity, and Claude. I review your GBP, directories, and schema markup.",
              },
              {
                step: "3",
                title: "Live Demo",
                desc: "I show you exactly what ChatGPT says about your business. You see the gaps in real-time.",
              },
              {
                step: "4",
                title: "Written Report",
                desc: "You get a detailed report with your AI search visibility score, gaps, and step-by-step recommendations.",
              },
              {
                step: "5",
                title: "Next Steps",
                desc: "We discuss which recommendations make sense for your business and budget. No pressure to do anything.",
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

      {/* Who It's For */}
      <section className="py-16 px-4 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-12">Who This Audit Is For</h2>
          <div className="space-y-4 font-body text-white/80">
            <p>You're a good fit if you:</p>
            <ul className="space-y-3 ml-4">
              {[
                "Own a local service business (HVAC, plumbing, medical, law, real estate, etc.)",
                "Want to know if you're visible in ChatGPT and AI search",
                "Are curious about this new channel but don't know where to start",
                "Have a Google Business Profile but aren't sure if it's optimized",
                "Want a clear roadmap before investing in AI search visibility",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle2 size={18} className="text-lime shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-8">Audit Pricing</h2>
          <div className="bg-[#1A1A1A] rounded-lg p-8 mb-8">
            <div className="mb-6">
              <div className="text-5xl font-display text-lime mb-2">$250</div>
              <p className="font-body text-white/70">2-hour deep dive audit</p>
            </div>
            <p className="font-body text-white/80 mb-6">
              Includes live ChatGPT/Perplexity testing, GBP review, directory audit, schema analysis, and written report with recommendations.
            </p>
            <p className="font-body text-sm text-white/60">
              If you book a service after the audit, the $250 is applied to your first month.
            </p>
          </div>
          <Link href="/book">
            <button className="btn-lime">Book Your Audit</button>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-12">Questions About the Audit</h2>
          <div className="space-y-8">
            {[
              {
                q: "How long does the audit take?",
                a: "2 hours total. We'll spend time understanding your business, running the AI search tests, and reviewing results together.",
              },
              {
                q: "Do I need to do anything before the audit?",
                a: "No. Just show up. I'll handle all the testing and analysis.",
              },
              {
                q: "What if I'm not ready to invest in AI search visibility?",
                a: "That's fine. The audit is just information. You'll know exactly what's possible and what it costs. No pressure.",
              },
              {
                q: "Can I do the audit remotely?",
                a: "Yes. We can do it over Zoom or in person at a coffee shop in Lake Nona.",
              },
              {
                q: "What happens after the audit?",
                a: "You get a written report with recommendations. If you want to move forward, we build a plan. If not, you have a clear picture of your AI search visibility.",
              },
            ].map((item, i) => (
              <div key={i}>
                <h3 className="font-heading font-700 text-lg mb-3">{item.q}</h3>
                <p className="font-body text-white/70">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKING: Related Content Hub */}
      <section className="py-16 px-4 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl mb-12 text-center">Learn More About AI <span className="text-lime">Search Visibility</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Link to What is AI Search Visibility */}
            <Link href="/what-is-ai-search-visibility">
              <div className="card-service group cursor-pointer">
                <span className="font-mono-data text-lime text-xs opacity-60 mb-3">EXPLAINER</span>
                <h3 className="font-heading font-700 text-white text-lg mb-2 group-hover:text-lime transition-colors">
                  What is AI Search Visibility?
                </h3>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-4">
                  Understand the fundamentals and why it matters for your business.
                </p>
                <div className="flex items-center gap-2 text-lime text-sm font-heading font-600">
                  Read <ArrowRight size={14} />
                </div>
              </div>
            </Link>

            {/* Link to How to Show Up in ChatGPT */}
            <Link href="/how-to-show-up-in-chatgpt">
              <div className="card-service group cursor-pointer">
                <span className="font-mono-data text-lime text-xs opacity-60 mb-3">CONTENT GUIDE</span>
                <h3 className="font-heading font-700 text-white text-lg mb-2 group-hover:text-lime transition-colors">
                  How to Show Up in ChatGPT Results
                </h3>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-4">
                  Step-by-step guide with 5 actionable steps to get visible in ChatGPT.
                </p>
                <div className="flex items-center gap-2 text-lime text-sm font-heading font-600">
                  Read Guide <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-lime text-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl mb-4">Ready to See Your AI Search Visibility?</h2>
          <p className="font-body text-lg mb-8 text-black/80">
            Book your 2-hour audit. I'll show you exactly where you rank in ChatGPT and what it takes to show up.
          </p>
          <Link href="/book">
            <button className="bg-black text-lime font-heading font-700 px-8 py-3 rounded hover:bg-black/90 transition">
              Book Audit Now
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
