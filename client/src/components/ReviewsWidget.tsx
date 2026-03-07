import { trpc } from "@/lib/trpc";
import { Star } from "lucide-react";

export default function ReviewsWidget() {
  const { data: reviews, isLoading } = trpc.reviews.published.useQuery();

  if (isLoading || !reviews || reviews.length === 0) return null;

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="bg-[#111111] py-16 border-t border-white/6">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono-data text-lime text-xs tracking-widest uppercase mb-2">Google Reviews</p>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className={i < Math.round(avgRating) ? "text-lime fill-lime" : "text-white/20"} />
                ))}
              </div>
              <span className="font-heading font-700 text-white text-lg">{avgRating.toFixed(1)}</span>
              <span className="text-white/40 text-sm">({reviews.length} reviews)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.slice(0, 8).map((review) => (
            <div key={review.id} className="bg-[#1A1A1A] border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                {review.profilePhotoUrl ? (
                  <img src={review.profilePhotoUrl} alt={review.reviewerName} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-lime/20 flex items-center justify-center">
                    <span className="text-lime text-xs font-heading font-700">{review.reviewerName.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <p className="font-heading font-600 text-white text-xs">{review.reviewerName}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} className={i < review.rating ? "text-lime fill-lime" : "text-white/20"} />
                    ))}
                  </div>
                </div>
              </div>
              {review.text && (
                <p className="text-white/60 text-xs leading-relaxed line-clamp-4">{review.text}</p>
              )}
              {review.reviewDate && (
                <p className="text-white/30 text-xs mt-2">{review.reviewDate}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
