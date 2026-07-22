type PlacesApiReview = {
  rating?: number;
  text?: { text?: string };
  authorAttribution?: { displayName?: string; photoUri?: string };
  relativePublishTimeDescription?: string;
};

type PlacesApiResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesApiReview[];
};

export type GoogleReview = {
  id: string;
  quote: string;
  rating: number;
  authorName: string;
  authorPhotoUrl: string | null;
  relativeTime: string;
};

export type GoogleReviewsData = {
  rating: number;
  count: number;
  profileUrl: string;
  reviews: GoogleReview[];
};

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "rating,userRatingCount,reviews.rating,reviews.text,reviews.authorAttribution,reviews.relativePublishTimeDescription",
      },
      next: { revalidate: 60 * 60 * 24 }, // 24h — reviews change infrequently
    });

    if (!res.ok) {
      console.error("Google Places request failed", res.status, await res.text());
      return null;
    }

    const data: PlacesApiResponse = await res.json();

    if (typeof data.rating !== "number" || !Array.isArray(data.reviews)) {
      console.error("Google Places response missing expected fields", data);
      return null;
    }

    const reviews = data.reviews
      .slice(0, 5)
      .map((r, i) => ({
        id: String(i),
        quote: r.text?.text ?? "",
        rating: r.rating ?? 5,
        authorName: r.authorAttribution?.displayName ?? "Google user",
        authorPhotoUrl: r.authorAttribution?.photoUri ?? null,
        relativeTime: r.relativePublishTimeDescription ?? "",
      }))
      .filter((r) => r.quote);

    // Note: `reviews` may be empty here (e.g. the 5 most recent are all star-only,
    // with no written text) — that's still a valid live rating/count, so don't discard it.
    return {
      rating: data.rating,
      count: data.userRatingCount ?? 0,
      profileUrl: `https://search.google.com/local/reviews?placeid=${placeId}`,
      reviews,
    };
  } catch (err) {
    console.error("Google Places request threw", err);
    return null;
  }
}
