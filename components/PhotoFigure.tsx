import Image from "next/image";
import clsx from "clsx";

// Real photos of the unit live in public/ (press-floor, finishing, shopfront) and
// are small phone shots, 765–990px wide. They hold up at half width or in a strip,
// but not as a full-bleed hero on a high-density screen — size them accordingly.
// Used on /trade and /for-organisations; kept off /for-funeral-directors, where
// the product photos carry the page instead.
export const premisesPhotos = {
  pressFloor: {
    src: "/press-floor.webp",
    alt: "The press floor at Bluwave's unit in Beckenham, with a four-unit litho press and stock on pallets",
    caption: "Our press floor in Beckenham",
  },
  finishing: {
    src: "/finishing.webp",
    alt: "Bluwave's finishing room, with folding and laminating machines",
    caption: "Folding, laminating and trimming, in-house",
  },
  shopfront: {
    src: "/shopfront.webp",
    alt: "The front of Bluwave's unit on the Gardner Industrial Estate, Beckenham",
    caption: "Unit 4, Gardner Industrial Estate",
  },
} as const;

// A captioned photo in a 4:3 frame.
export function PhotoFigure({
  src,
  alt,
  caption,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={clsx("relative overflow-hidden rounded-2xl shadow-card", className)}>
      <div className="relative aspect-[4/3]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-900/85 to-transparent px-4 pt-8 pb-3 text-sm font-semibold text-white">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
