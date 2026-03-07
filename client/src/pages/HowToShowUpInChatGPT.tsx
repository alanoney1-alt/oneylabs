/*
 * HOW TO SHOW UP IN CHATGPT RESULTS
 * Answer-engine optimized content magnet
 * Targets: "How to show up in ChatGPT" "Get on ChatGPT" "ChatGPT local business visibility"
 */
import { Link } from "wouter";
import { CheckCircle2, Lightbulb, AlertCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HowToShowUpInChatGPT() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <span className="section-number">CONTENT GUIDE</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">
            How to Show Up in <span className="text-lime">ChatGPT Results</span>
          </h1>
          <p className="font-body text-lg text-white/70 leading-relaxed mb-8">
            A complete guide to getting your business visible when people ask ChatGPT for recommendations in your industry.
          </p>
        </div>
      </section>

      {/* The Short Answer */}
      <section className="py-16 px-4 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-8">The Short Answer</h2>
          <div className="bg-[#222222] border border-lime/20 rounded-lg p-8 mb-8">
            <p className="font-body text-white/90 leading-relaxed">
              ChatGPT pulls business information from Google Business Profiles, directories (Yelp, BBB, etc.), your website, and structured data (schema markup). To show up, you need to:
            </p>
            <ol className="mt-6 space-y-3 font-body text-white/80">
              {[
                "Optimize your Google Business Profile completely",
                "Get listed on 25+ directories with consistent information",
                "Add schema markup to your website",
                "Create answer-engine content (FAQs, service pages)",
                "Create an llms.txt file that tells AI crawlers about you",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-lime font-700 shrink-0">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Step 1: Google Business Profile */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-12">Step 1: Optimize Your Google Business Profile</h2>
          <p className="font-body text-white/80 mb-8 leading-relaxed">
            Your Google Business Profile is the #1 source ChatGPT pulls from. If it's incomplete or outdated, you won't show up.
          </p>
          <div className="space-y-6">
            {[
              {
                title: "Complete every field",
                items: [
                  "Business name (exact match)",
                  "Phone number (active and monitored)",
                  "Address (exact, no abbreviations)",
                  "Website URL",
                  "Business hours",
                  "Service areas (if applicable)",
                  "Photos (at least 10, high quality)",
                  "Description (100-150 characters, keyword-rich)",
                ],
              },
              {
                title: "Add service categories",
                items: [
                  "Primary category (most important)",
                  "Secondary categories (up to 9 total)",
                  "Make sure they match your actual services",
                ],
              },
              {
                title: "Get reviews",
                items: [
                  "Ask customers to leave reviews on Google",
                  "Respond to all reviews (positive and negative)",
                  "More reviews = higher visibility in ChatGPT",
                ],
              },
              {
                title: "Keep it updated",
                items: [
                  "Update hours if they change",
                  "Add new photos regularly",
                  "Respond to customer questions",
                  "Post updates about new services",
                ],
              },
            ].map((section, i) => (
              <div key={i}>
                <h3 className="font-heading font-700 text-lg mb-4 text-lime">{section.title}</h3>
                <ul className="space-y-2 ml-4">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex gap-2 font-body text-white/80">
                      <CheckCircle2 size={18} className="text-lime shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 2: Directory Listings */}
      <section className="py-16 px-4 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-12">Step 2: Get Listed on Key Directories</h2>
          <p className="font-body text-white/80 mb-8 leading-relaxed">
            ChatGPT crawls these directories to find business information. You need to be on at least 25 of them with consistent data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              "Google Business Profile",
              "Yelp",
              "BBB (Better Business Bureau)",
              "Apple Business",
              "Bing Places",
              "Nextdoor",
              "Thumbtack",
              "HomeAdvisor",
              "Angi",
              "Trustpilot",
              "Facebook Business",
              "LinkedIn Company",
              "Industry-specific directories",
              "Local chamber of commerce",
              "Local business associations",
            ].map((dir, i) => (
              <div key={i} className="flex gap-2 font-body text-white/80">
                <CheckCircle2 size={18} className="text-lime shrink-0 mt-0.5" />
                <span>{dir}</span>
              </div>
            ))}
          </div>
          <p className="font-body text-white/70 text-sm">
            Pro tip: Use a directory management tool to keep all listings consistent. Inconsistent data hurts your AI visibility.
          </p>
        </div>
      </section>

      {/* Step 3: Schema Markup */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-12">Step 3: Add Schema Markup to Your Website</h2>
          <p className="font-body text-white/80 mb-8 leading-relaxed">
            Schema markup is structured data that tells ChatGPT and other AI crawlers exactly what your business is, what you do, and how to contact you.
          </p>
          <div className="bg-[#1A1A1A] rounded-lg p-8 mb-8">
            <h3 className="font-heading font-700 text-lg mb-4">Add these schema types:</h3>
            <ul className="space-y-3">
              {[
                {
                  name: "LocalBusiness",
                  desc: "Your business name, address, phone, email, hours",
                },
                {
                  name: "Service",
                  desc: "What services you offer, pricing, service area",
                },
                {
                  name: "FAQPage",
                  desc: "Common questions and answers about your business",
                },
                {
                  name: "AggregateRating",
                  desc: "Your average review rating and number of reviews",
                },
              ].map((schema, i) => (
                <li key={i} className="flex gap-3 font-body text-white/80">
                  <span className="text-lime font-700 shrink-0">{schema.name}</span>
                  <span>{schema.desc}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="font-body text-white/70 text-sm">
            If you don't know how to add schema markup, hire a developer or use a tool like Yoast SEO. It's worth it.
          </p>
        </div>
      </section>

      {/* Step 4: Answer-Engine Content */}
      <section className="py-16 px-4 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-12">Step 4: Create Answer-Engine Content</h2>
          <p className="font-body text-white/80 mb-8 leading-relaxed">
            ChatGPT pulls content from your website when answering questions. Create pages that directly answer the questions your customers ask.
          </p>
          <div className="space-y-8">
            {[
              {
                title: "FAQ Pages",
                desc: "Answer the 10-20 most common questions about your business. Use clear headings and concise answers.",
                example: "For HVAC: 'How much does an AC unit cost?' 'What's the best time to replace an HVAC system?' 'How often should I service my AC?'",
              },
              {
                title: "Service Pages",
                desc: "Create detailed pages for each service you offer. Explain what it is, why it matters, and how to get started.",
                example: "For plumbing: 'Emergency Plumbing Repair' 'Drain Cleaning' 'Water Heater Installation'",
              },
              {
                title: "Explainer Content",
                desc: "Write guides that explain concepts in your industry. ChatGPT will cite you when answering related questions.",
                example: "For real estate: 'How to Get Pre-Approved for a Mortgage' 'What is a Home Inspection?' 'Closing Costs Explained'",
              },
            ].map((item, i) => (
              <div key={i}>
                <h3 className="font-heading font-700 text-lg mb-2">{item.title}</h3>
                <p className="font-body text-white/80 mb-2">{item.desc}</p>
                <p className="font-body text-white/60 text-sm">Example: {item.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 5: llms.txt */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-12">Step 5: Create an llms.txt File</h2>
          <p className="font-body text-white/80 mb-8 leading-relaxed">
            An llms.txt file is a simple text file you put on your website that tells AI crawlers exactly what your business does, your services, pricing, and how to contact you.
          </p>
          <div className="bg-[#1A1A1A] rounded-lg p-8 mb-8 font-mono text-sm text-white/70">
            <div className="mb-4">Your llms.txt should include:</div>
            <ul className="space-y-2">
              {[
                "Business name and tagline",
                "What you do (2-3 sentences)",
                "Services offered",
                "Pricing (if public)",
                "Service area (cities/regions)",
                "Contact info (phone, email, website)",
                "Hours of operation",
                "Links to key pages",
              ].map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
          <p className="font-body text-white/70 text-sm">
            Place it at yourwebsite.com/llms.txt. ChatGPT and other AI models will find it and use it as a reference.
          </p>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16 px-4 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-12">Common Mistakes That Hurt Your Visibility</h2>
          <div className="space-y-6">
            {[
              {
                mistake: "Incomplete Google Business Profile",
                impact: "ChatGPT has less information to pull from. You rank lower.",
              },
              {
                mistake: "Inconsistent business information across directories",
                impact: "AI crawlers get confused. Your visibility drops.",
              },
              {
                mistake: "No schema markup on your website",
                impact: "ChatGPT can't easily parse your information. You're harder to cite.",
              },
              {
                mistake: "Thin or generic content",
                impact: "ChatGPT has nothing to cite. Competitors with better content rank higher.",
              },
              {
                mistake: "Outdated information",
                impact: "ChatGPT cites incorrect info. Customers call with wrong hours or services.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <AlertCircle size={24} className="text-orange-warm shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-700 mb-1">{item.mistake}</h3>
                  <p className="font-body text-white/70">{item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl mb-12">How Long Does It Take?</h2>
          <div className="space-y-6 font-body text-white/80">
            <div>
              <h3 className="font-heading font-700 text-lime mb-2">Week 1-2: Quick Wins</h3>
              <p>Optimize your Google Business Profile and add basic schema markup. You might see results within 2 weeks.</p>
            </div>
            <div>
              <h3 className="font-heading font-700 text-lime mb-2">Week 3-4: Directory Listings</h3>
              <p>Get listed on 25+ directories. This takes time but is critical for visibility.</p>
            </div>
            <div>
              <h3 className="font-heading font-700 text-lime mb-2">Month 2-3: Content & llms.txt</h3>
              <p>Create answer-engine content and your llms.txt file. ChatGPT will start citing you more frequently.</p>
            </div>
            <div>
              <h3 className="font-heading font-700 text-lime mb-2">Month 3+: Monitoring & Optimization</h3>
              <p>Monitor your visibility weekly. Optimize based on what ChatGPT is asking for. Continuous improvement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKING: Related Content Hub */}
      <section className="py-16 px-4 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl mb-12 text-center">Explore the AI Visibility <span className="text-lime">Content Hub</span></h2>
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

            {/* Link to AI Search Audit */}
            <Link href="/ai-search-audit-orlando">
              <div className="card-service group cursor-pointer">
                <span className="font-mono-data text-lime text-xs opacity-60 mb-3">SERVICE</span>
                <h3 className="font-heading font-700 text-white text-lg mb-2 group-hover:text-lime transition-colors">
                  Get Your AI Search Audit
                </h3>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-4">
                  2-hour deep dive showing where you rank in ChatGPT, Perplexity, and Claude.
                </p>
                <div className="flex items-center gap-2 text-lime text-sm font-heading font-600">
                  Book Audit <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-lime text-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl mb-4">Not Sure Where to Start?</h2>
          <p className="font-body text-lg mb-8 text-black/80">
            Book a free AI search audit. I'll show you exactly where you rank in ChatGPT and create a custom plan to get you visible.
          </p>
          <Link href="/book">
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
