import Link from "next/link";
import { getCategory } from "@/content/categories";

// Compact icon-and-tagline tiles linking to product categories. Used by the
// audience pages (/trade, /for-organisations) to show the work that audience
// most often sends, as a way into the full product list.
export function CategoryLinks({ slugs }: { slugs: readonly string[] }) {
  const categories = slugs.map((slug) => {
    const category = getCategory(slug);
    if (!category) throw new Error(`Unknown category slug: ${slug}`);
    return category;
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/products/${category.slug}`}
          className="group flex items-start gap-4 rounded-2xl border border-line bg-surface-2 p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
        >
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-teal">
            <category.icon size={20} aria-hidden="true" />
          </div>
          <div>
            <p className="font-display text-base font-bold text-ink group-hover:text-primary">
              {category.name}
            </p>
            <p className="mt-1 line-clamp-2 text-sm text-ink-2">
              {category.tagline}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
