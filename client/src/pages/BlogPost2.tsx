/**
 * BLOG POST: How to Show Up in Perplexity
 * Target Keywords: "how to show up in Perplexity", "Perplexity local business visibility"
 */
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPost2() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      {/* Article Header */}
      <section className="pt-32 pb-12 px-4 border-b border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <span className="section-number text-xs">AI SEARCH VISIBILITY</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">
            How to Show Up in <span className="text-lime">Perplexity</span>: The Answer Engine Guide for Local Businesses
          </h1>
          <div className="flex flex-col sm:flex-row gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              March 6, 2026
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              7 min read
            </div>
            <div className="flex items-center gap-2">
              <span>By Alan Oney</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-invert">
          <p className="font-body text-lg text-white/80 leading-relaxed mb-8">
            Perplexity is growing faster than ChatGPT in some demographics. It's cleaner, faster, and increasingly the go-to answer engine for professionals and researchers. If your business isn't visible in Perplexity, you're missing a growing segment of potential customers.
          </p>

          <p className="font-body text-white/70 leading-relaxed mb-8">
            The problem: Most local businesses don't even know Perplexity exists. The opportunity: Perplexity's algorithm is actually more transparent than ChatGPT's, and easier to optimize for.
          </p>

          <h2 className="font-display text-3xl text-white mt-12 mb-6">How Perplexity Finds Local Businesses</h2>

          <p className="font-body text-white/70 leading-relaxed mb-6">
            Perplexity uses a hybrid approach:
          </p>

          <ol className="space-y-4 mb-8 font-body text-white/70">
            <li className="flex gap-4">
              <span className="text-lime font-700 shrink-0">1.</span>
              <span><strong>Real-time Web Search</strong> Unlike ChatGPT (which has a knowledge cutoff), Perplexity searches the current web. This means fresh content ranks faster.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-lime font-700 shrink-0">2.</span>
              <span><strong>Source Attribution</strong> Perplexity always cites its sources. If your website is the best source for a query, Perplexity will cite you and link to you.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-lime font-700 shrink-0">3.</span>
              <span><strong>Google Business Profile Data</strong> Perplexity pulls business information directly from GBP, just like ChatGPT.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-lime font-700 shrink-0">4.</span>
              <span><strong>Website Content Quality</strong> Perplexity prioritizes websites with clear, well-structured content and proper schema markup.</span>
            </li>
          </ol>

          <h2 className="font-display text-3xl text-white mt-12 mb-6">The Perplexity Advantage Over ChatGPT</h2>

          <p className="font-body text-white/70 leading-relaxed mb-8">
            Perplexity is actually easier to rank in than ChatGPT because:
          </p>

          <ul className="space-y-3 mb-8 font-body text-white/70">
            <li className="flex gap-3">
              <span className="text-lime font-700 shrink-0">•</span>
              <span><strong>Real-time indexing</strong> New content can show up in Perplexity within days, not months</span>
            </li>
            <li className="flex gap-3">
              <span className="text-lime font-700 shrink-0">•</span>
              <span><strong>Source links matter</strong> Perplexity cites sources, so quality content gets traffic</span>
            </li>
            <li className="flex gap-3">
              <span className="text-lime font-700 shrink-0">•</span>
              <span><strong>Less competition</strong> Fewer businesses are optimizing for Perplexity yet</span>
            </li>
            <li className="flex gap-3">
              <span className="text-lime font-700 shrink-0">•</span>
              <span><strong>Clearer algorithm</strong> Perplexity's approach is more similar to traditional SEO</span>
            </li>
          </ul>

          <h2 className="font-display text-3xl text-white mt-12 mb-6">Step-by-Step: Get Visible in Perplexity</h2>

          <h3 className="font-heading text-xl text-white mt-8 mb-4">Step 1: Optimize Your Google Business Profile (Week 1)</h3>

          <p className="font-body text-white/70 leading-relaxed mb-4">
            Same as ChatGPT:
          </p>
          <ul className="space-y-2 mb-8 font-body text-white/70">
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>Complete all fields</span>
            </li>
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>Add 15+ high-quality photos</span>
            </li>
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>Write a compelling business description</span>
            </li>
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>List all service areas (be specific: "Lake Nona", "Downtown Orlando", not just "Orlando")</span>
            </li>
          </ul>

          <h3 className="font-heading text-xl text-white mt-8 mb-4">Step 2: Create Answer-Engine Content (Week 2-3)</h3>

          <p className="font-body text-white/70 leading-relaxed mb-4">
            Perplexity loves websites that directly answer questions. Create pages for:
          </p>
          <ul className="space-y-2 mb-8 font-body text-white/70">
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>Common customer questions in your industry</span>
            </li>
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>Local guides ("Best restaurants in Lake Nona", "HVAC maintenance tips for Florida homes")</span>
            </li>
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>How-to content ("How to prepare your AC for summer")</span>
            </li>
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>Local event coverage or community insights</span>
            </li>
          </ul>

          <p className="font-body text-white/70 leading-relaxed mb-8">
            Each page should:
          </p>
          <ul className="space-y-2 mb-8 font-body text-white/70">
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>Have a clear H1 with your target keyword</span>
            </li>
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>Include 1000+ words of original, helpful content</span>
            </li>
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>Have FAQ schema markup</span>
            </li>
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>Link to other relevant pages on your site</span>
            </li>
          </ul>

          <h3 className="font-heading text-xl text-white mt-8 mb-4">Step 3: Build Backlinks from Authoritative Sites (Week 4+)</h3>

          <p className="font-body text-white/70 leading-relaxed mb-4">
            Perplexity, like Google, considers backlinks as a trust signal. Get links from:
          </p>
          <ul className="space-y-2 mb-8 font-body text-white/70">
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>Local business associations</span>
            </li>
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>Industry directories</span>
            </li>
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>Local news outlets</span>
            </li>
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>Chamber of commerce</span>
            </li>
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>Partner websites</span>
            </li>
          </ul>

          <h3 className="font-heading text-xl text-white mt-8 mb-4">Step 4: Monitor & Optimize (Ongoing)</h3>

          <p className="font-body text-white/70 leading-relaxed mb-8">
            Use Perplexity to search for queries related to your business:
          </p>
          <ul className="space-y-2 mb-8 font-body text-white/70">
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>"Best [service] in [city]"</span>
            </li>
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>"[Service] near me"</span>
            </li>
            <li className="flex gap-2">
              <span className="text-lime">•</span>
              <span>"[Service] cost in [city]"</span>
            </li>
          </ul>

          <p className="font-body text-white/70 leading-relaxed mb-8">
            If you're not showing up, identify the top-ranking source and create better content.
          </p>

          <h2 className="font-display text-3xl text-white mt-12 mb-6">Why Perplexity Matters Now</h2>

          <p className="font-body text-white/70 leading-relaxed mb-8">
            Perplexity's user base is growing 30% month-over-month. Early movers who optimize for Perplexity now will dominate as the platform grows. In 2026, Perplexity visibility will be as important as Google Maps visibility.
          </p>

          <p className="font-body text-white/70 leading-relaxed mb-8 bg-lime/10 border-l-4 border-lime p-6">
            The businesses winning in Perplexity today are those with:
          </p>

          <ul className="space-y-3 mb-8 font-body text-white/70">
            <li className="flex gap-3">
              <span className="text-lime font-700 shrink-0">1.</span>
              <span>Complete, verified business information</span>
            </li>
            <li className="flex gap-3">
              <span className="text-lime font-700 shrink-0">2.</span>
              <span>High-quality, answer-focused content</span>
            </li>
            <li className="flex gap-3">
              <span className="text-lime font-700 shrink-0">3.</span>
              <span>Active engagement (reviews, updates, fresh content)</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-16 px-4 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-display text-2xl mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/blog/best-hvac-company-orlando-chatgpt">
              <div className="card-service group cursor-pointer">
                <h4 className="font-heading font-700 text-white text-lg mb-2 group-hover:text-lime transition-colors">
                  Best HVAC Company in Orlando According to ChatGPT
                </h4>
                <p className="font-body text-white/60 text-sm mb-4">
                  Guide to dominating ChatGPT search for HVAC contractors.
                </p>
                <div className="flex items-center gap-2 text-lime text-sm font-heading font-600">
                  Read <ArrowRight size={14} />
                </div>
              </div>
            </Link>

            <Link href="/blog/chatgpt-vs-google-local-business">
              <div className="card-service group cursor-pointer">
                <h4 className="font-heading font-700 text-white text-lg mb-2 group-hover:text-lime transition-colors">
                  ChatGPT vs Google for Local Business
                </h4>
                <p className="font-body text-white/60 text-sm mb-4">
                  Which platform matters more and how to optimize for both.
                </p>
                <div className="flex items-center gap-2 text-lime text-sm font-heading font-600">
                  Read <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-lime text-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl mb-4">Ready to Dominate Perplexity?</h2>
          <p className="font-body text-lg mb-8 text-black/80">
            Book a free AI search audit. I'll show you where you rank in Perplexity and create a custom optimization plan.
          </p>
          <Link href="/contact">
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
