import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Streamdown } from "streamdown";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPostDynamic() {
  const params = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = trpc.blog.bySlug.useQuery(
    { slug: params.slug || "" },
    { enabled: !!params.slug }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111111]">
        <Navbar />
        <div className="container pt-32 pb-20">
          <div className="max-w-3xl mx-auto animate-pulse space-y-4">
            <div className="h-8 bg-white/5 rounded w-3/4" />
            <div className="h-4 bg-white/5 rounded w-1/2" />
            <div className="h-64 bg-white/5 rounded" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#111111]">
        <Navbar />
        <div className="container pt-32 pb-20 text-center">
          <h1 className="font-display text-4xl text-white mb-4">Post Not Found</h1>
          <Link href="/blog">
            <button className="btn-lime">Back to Blog</button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      <article className="pt-32 pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog">
              <button className="flex items-center gap-2 text-white/40 hover:text-lime text-sm font-heading mb-8 transition-colors">
                <ArrowLeft size={14} /> Back to Blog
              </button>
            </Link>

            {post.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.split(",").map((tag) => (
                  <span key={tag} className="text-lime text-xs font-mono-data bg-lime/10 px-2 py-0.5 rounded flex items-center gap-1">
                    <Tag size={10} /> {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-display text-[clamp(2rem,5vw,4rem)] text-white leading-tight mb-4">
              {post.title}
            </h1>

            {post.publishedAt && (
              <div className="flex items-center gap-2 text-white/40 text-sm mb-8">
                <Calendar size={14} />
                {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
            )}

            {post.coverImageUrl && (
              <div className="rounded-lg overflow-hidden mb-10">
                <img src={post.coverImageUrl} alt={post.title} className="w-full object-cover" />
              </div>
            )}

            <div className="prose prose-invert prose-lime max-w-none font-body text-white/70 leading-relaxed [&_h2]:font-heading [&_h2]:font-800 [&_h2]:text-white [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-heading [&_h3]:font-700 [&_h3]:text-white [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3 [&_a]:text-lime [&_strong]:text-white [&_ul]:space-y-1 [&_ol]:space-y-1">
              <Streamdown>{post.content}</Streamdown>
            </div>

            {/* CTA */}
            <div className="mt-16 bg-lime/10 border border-lime/30 rounded-lg p-8 text-center">
              <h3 className="font-heading font-800 text-white text-xl mb-2">Want to discuss this topic?</h3>
              <p className="text-white/60 text-sm mb-6">Book a free 30-minute AI audit and let's talk about how this applies to your business.</p>
              <Link href="/contact">
                <button className="btn-lime px-8 py-3">Book Free AI Audit</button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt || post.metaDescription,
            datePublished: post.publishedAt,
            author: { "@type": "Person", name: "Alan Oney" },
            publisher: { "@type": "Organization", name: "Oney Labs" },
          }),
        }}
      />

      <Footer />
    </div>
  );
}
