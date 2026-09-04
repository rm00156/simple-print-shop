import clsx from "clsx";
import Link from "next/link";
import { siteUrl } from "@/content/site";

export type Crumb = {
  name: string;
  /** Root-relative path, e.g. "/products". Omitted on the final crumb — it's the current page. */
  href?: string;
};

// Google renders the breadcrumb trail in search results from the BreadcrumbList JSON-LD,
// not from the visible markup — a plain <nav> of links tells it nothing. Both come from
// the same `items` array here so a renamed category can't leave the two disagreeing,
// which Google treats as worse than no markup at all.
export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      // schema.org requires absolute URLs. `item` is omitted for the current page,
      // which is the form Google's own docs recommend for the final crumb.
      ...(crumb.href ? { item: `${siteUrl}${crumb.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={clsx(
          // flex-wrap matters on mobile — a three-level trail ending in a long
          // product name overflows the hero otherwise.
          "flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/70",
          className,
        )}
      >
        {items.map((crumb, i) => (
          <span key={crumb.href ?? crumb.name} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-white">
                {crumb.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-white">
                {crumb.name}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
