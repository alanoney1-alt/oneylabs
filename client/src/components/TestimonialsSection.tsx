import { trpc } from "@/lib/trpc";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = trpc.testimonials.published.useQuery();

  if (isLoading) {
    return (
      <section className="bg-[#0D0D0D] py-24">
        <div className="container">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-white/5 rounded w-1/3 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 rounded-lg h-48" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-[#0D0D0D] py-24">
      <div className="container">
        <div className="mb-14 text-center">
          <p className="font-mono-data text-lime text-xs tracking-widest uppercase mb-3">What Clients Say</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none">
            REAL RESULTS.{" "}
            <span className="text-lime">REAL PEOPLE.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`rounded-lg p-6 border transition-all ${
                t.featured
                  ? "bg-lime/10 border-lime/30"
                  : "bg-[#1A1A1A] border-white/10"
              }`}
            >
              {/* Rating */}
              {t.rating && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < t.rating! ? "text-lime fill-lime" : "text-white/20"}
                    />
                  ))}
                </div>
              )}

              {/* Quote */}
              <p className="font-body text-white/70 text-sm leading-relaxed mb-4 italic">
                "{t.quote}"
              </p>

              {/* Before/After metrics */}
              {t.beforeMetric && t.afterMetric && (
                <div className="flex items-center gap-3 mb-4 bg-white/5 rounded-lg p-3">
                  <div className="text-center flex-1">
                    <p className="text-white/40 text-xs font-heading">Before</p>
                    <p className="text-red-400 font-heading font-700 text-sm">{t.beforeMetric}</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center flex-1">
                    <p className="text-white/40 text-xs font-heading">After</p>
                    <p className="text-lime font-heading font-700 text-sm">{t.afterMetric}</p>
                  </div>
                </div>
              )}

              {/* Client info */}
              <div className="flex items-center gap-3">
                {t.imageUrl ? (
                  <img src={t.imageUrl} alt={t.clientName} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center">
                    <span className="text-lime font-heading font-700 text-sm">
                      {t.clientName.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-heading font-700 text-white text-sm">{t.clientName}</p>
                  {t.businessName && (
                    <p className="text-white/40 text-xs">{t.businessName}{t.industry ? ` · ${t.industry}` : ""}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
