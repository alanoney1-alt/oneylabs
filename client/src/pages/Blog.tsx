/**
 * ONEY LABS BLOG PAGE
 * Design: Raw Craft + Warm Dark
 * Lists all blog posts with internal linking to content hub
 */
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    slug: "best-hvac-company-orlando-chatgpt",
    title: "Best HVAC Company in Orlando According to ChatGPT (2026 Guide)",
    excerpt: "Discover how ChatGPT recommends HVAC companies in Orlando. Learn what makes businesses visible in AI search and how to choose the right contractor.",
    date: "March 7, 2026",
    readTime: "8 min read",
    category: "AI Search Visibility",
    keywords: ["best HVAC company Orlando ChatGPT", "HVAC companies Orlando AI search"],
  },
  {
    slug: "how-to-show-up-in-perplexity",
    title: "How to Show Up in Perplexity: The Answer Engine Guide for Local Businesses",
    excerpt: "Complete guide to getting your local business visible in Perplexity AI search. Learn what Perplexity prioritizes and how to optimize for answer engines.",
    date: "March 6, 2026",
    readTime: "7 min read",
    category: "AI Search Visibility",
    keywords: ["how to show up in Perplexity", "Perplexity local business visibility"],
  },
  {
    slug: "chatgpt-vs-google-local-business",
    title: "ChatGPT vs Google for Local Business: Which Should You Optimize For in 2026?",
    excerpt: "Compare ChatGPT and Google for local business visibility. Learn which platform matters more in 2026 and how to optimize for both simultaneously.",
    date: "March 5, 2026",
    readTime: "9 min read",
    category: "AI Search Visibility",
    keywords: ["ChatGPT vs Google local business", "AI search vs Google Maps"],
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="section-number">BLOG</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">
            AI Search Visibility <span className="text-lime">Insights</span>
          </h1>
          <p className="font-body text-lg text-white/70 leading-relaxed">
            Deep dives into answer engines, local AI search, and how to dominate ChatGPT, Perplexity, and Claude for your business.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {blogPosts.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="card-service group cursor-pointer h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-mono-data text-lime text-xs opacity-60 uppercase">{post.category}</span>
                    <span className="font-mono-data text-white/40 text-xs">{post.readTime}</span>
                  </div>

                  <h2 className="font-display text-2xl md:text-3xl leading-tight mb-3 group-hover:text-lime transition-colors">
                    {post.title}
                  </h2>

                  <p className="font-body text-white/60 text-base leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4 text-white/40 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-lime font-heading font-600 group-hover:gap-3 transition-all">
                      Read <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to Content Hub */}
      <section className="py-20 px-4 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-number mb-4">RELATED</p>
          <h2 className="font-display text-3xl md:text-4xl mb-8">
            Explore the AI Visibility <span className="text-lime">Content Hub</span>
          </h2>
          <p className="font-body text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Read in-depth guides, explainers, and service pages designed to help you understand and master AI search visibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/what-is-ai-search-visibility">
              <button className="btn-outline-lime">What is AI Search Visibility?</button>
            </Link>
            <Link href="/how-to-show-up-in-chatgpt">
              <button className="btn-outline-lime">How to Show Up in ChatGPT</button>
            </Link>
            <Link href="/ai-search-audit-orlando">
              <button className="btn-outline-lime">Get Your AI Audit</button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
