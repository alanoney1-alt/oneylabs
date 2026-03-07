import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogCMS() {
  const { data: posts, isLoading } = trpc.blog.published.useQuery();

  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-[#0D0D0D] to-[#111111]">
        <div className="container">
          <p className="font-mono-data text-lime text-xs tracking-widest uppercase mb-3">Blog</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-none mb-4">
            AI INSIGHTS FOR<br />
            <span className="text-lime">ORLANDO BUSINESSES</span>
          </h1>
          <p className="font-body text-white/60 text-lg max-w-xl">
            Practical guides, case studies, and strategies to help your business leverage AI for growth.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white/5 rounded-lg h-64" />
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="bg-[#1A1A1A] border border-white/10 rounded-lg overflow-hidden hover:border-lime/30 transition-all cursor-pointer group h-full flex flex-col">
                    {post.coverImageUrl && (
                      <div className="aspect-video overflow-hidden">
                        <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      {post.tags && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.split(",").slice(0, 3).map((tag) => (
                            <span key={tag} className="text-lime text-xs font-mono-data bg-lime/10 px-2 py-0.5 rounded">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="font-heading font-800 text-white text-lg mb-2 group-hover:text-lime transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="font-body text-white/50 text-sm leading-relaxed mb-4 flex-1">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-auto">
                        {post.publishedAt && (
                          <span className="text-white/30 text-xs flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        )}
                        <span className="text-lime text-sm font-heading font-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/40 font-heading">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
