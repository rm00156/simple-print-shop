import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { ReviewAvatar } from "@/components/ReviewAvatar";
import type { GoogleReviewsData } from "@/lib/google-reviews";

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex gap-0.5 text-gold" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < filled ? "currentColor" : "none"}
          strokeWidth={i < filled ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

type FallbackReview = { quote: string; authorName: string; rating: number };

type Props = {
  liveData: GoogleReviewsData | null;
  fallbackRating: number;
  fallbackCount: number;
  fallbackReviews: FallbackReview[];
};

export function GoogleReviews({ liveData, fallbackRating, fallbackCount, fallbackReviews }: Props) {
  const isLive = liveData !== null;
  const rating = liveData?.rating ?? fallbackRating;
  const count = liveData?.count ?? fallbackCount;
  // liveData.reviews can be a valid empty array (e.g. the latest reviews are all star-only,
  // with no text) — an empty array is truthy, so `??` alone wouldn't fall back here.
  const reviews = liveData?.reviews.length
    ? liveData.reviews
    : fallbackReviews.map((r, i) => ({
      id: String(i),
      quote: r.quote,
      rating: r.rating,
      authorName: r.authorName,
      authorPhotoUrl: null,
      relativeTime: "",
    }));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
        <span className="text-2xl font-bold text-primary sm:text-3xl">{rating}</span>
        <div className="flex flex-col gap-1">
          <StarRow rating={rating} size={16} />
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-2">
            <span>Based on {count} Google reviews</span>
            {isLive && (
              <span className="flex items-center gap-1 text-ink-3">
                Reviews from <GoogleLogo className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="flex flex-col rounded-2xl bg-surface-2 p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
          >
            <StarRow rating={r.rating} size={12} />
            <p className="mt-3 mb-4 line-clamp-5 flex-1 text-sm leading-[1.6] text-ink-2 italic">
              &ldquo;{r.quote}&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <ReviewAvatar name={r.authorName} photoUrl={r.authorPhotoUrl} />
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-ink">{r.authorName}</p>
                {r.relativeTime && <p className="text-[11px] text-ink-3">{r.relativeTime}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isLive && liveData && (
        <div className="mt-5 flex flex-col items-center gap-2.5 text-center">
          <p className="text-xs text-ink-3">
            Showing {liveData.reviews.length} of {liveData.count} reviews. See what everyone else
            is saying on Google.
          </p>
          <Button href={liveData.profileUrl} variant="outline" size="sm">
            Read all {liveData.count} reviews on Google
            <ArrowRight size={14} aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
}
