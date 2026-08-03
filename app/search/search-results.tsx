"use client";

import { SearchX } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/Button";
import { SearchBox } from "@/components/SearchBox";
import { SearchResultCard } from "@/components/SearchResultCard";
import type { SearchKind } from "@/content/search-index";
import { searchDocs, tokenise } from "@/lib/search";

type Filter = "all" | SearchKind;

const FILTER_LABEL: Record<Filter, string> = {
  all: "All",
  product: "Products",
  category: "Categories",
  service: "Services",
  page: "Pages",
};

const FILTER_ORDER: Filter[] = ["all", "product", "category", "service", "page"];

const POPULAR = [
  "Business cards",
  "Flyers",
  "Posters",
  "Booklets",
  "Roller banners",
  "Orders of service",
];

type Props = {
  initialQuery: string;
  categoryLinks: { href: string; label: string }[];
};

export function SearchResults({ initialQuery, categoryLinks }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<Filter>("all");

  // Adopt a query pushed in from the URL, e.g. on back/forward navigation.
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);
  if (initialQuery !== prevInitialQuery) {
    setPrevInitialQuery(initialQuery);
    setQuery(initialQuery);
  }

  // Matching is synchronous, so the server render already contains the
  // results for ?q= — they're in the initial HTML, not added on hydration.
  const results = useMemo(() => searchDocs(query), [query]);

  const tokens = useMemo(() => tokenise(query), [query]);

  const counts = useMemo(() => {
    const tally: Record<Filter, number> = {
      all: results.length,
      product: 0,
      category: 0,
      service: 0,
      page: 0,
    };
    for (const doc of results) tally[doc.kind] += 1;
    return tally;
  }, [results]);

  const visible = useMemo(
    () => (filter === "all" ? results : results.filter((d) => d.kind === filter)),
    [results, filter],
  );

  // Drop back to "All" when the active filter no longer matches anything.
  if (filter !== "all" && counts[filter] === 0 && results.length > 0) {
    setFilter("all");
  }

  /*
    Keep the URL shareable without a server round-trip per keystroke — the
    native History API integrates with the Next router, unlike router.replace
    which would re-render this dynamic route on every character.
  */
  useEffect(() => {
    const trimmed = query.trim();
    const url = trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search";
    if (window.location.pathname + window.location.search !== url) {
      window.history.replaceState(null, "", url);
    }
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <SearchBox
          variant="page"
          initialQuery={query}
          autoFocus={!initialQuery}
          onQueryChange={setQuery}
          placeholder="e.g. business cards, roller banners, scanning…"
        />
      </div>

      {hasQuery && results.length > 0 && (
        <>
          {/* Left-aligned with the count and grid below, not the centred input. */}
          <div className="mt-8 flex flex-wrap gap-2">
            {FILTER_ORDER.filter(
              (key) => key === "all" || counts[key] > 0,
            ).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
                className={clsx(
                  "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
                  filter === key
                    ? "bg-primary text-on-primary"
                    : "bg-surface-2 text-ink-2 shadow-card hover:text-primary",
                )}
              >
                {FILTER_LABEL[key]}{" "}
                <span className="opacity-60">{counts[key]}</span>
              </button>
            ))}
          </div>

          <p className="mt-4 text-sm text-ink-2" aria-live="polite">
            {visible.length} {visible.length === 1 ? "result" : "results"} for{" "}
            <span className="font-semibold text-ink">{query.trim()}</span>
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((doc) => (
              <SearchResultCard key={doc.id} doc={doc} tokens={tokens} />
            ))}
          </div>
        </>
      )}

      {hasQuery && results.length === 0 && (
        <div className="mx-auto mt-10 max-w-xl text-center">
          <SearchX
            size={36}
            strokeWidth={1.5}
            className="mx-auto text-primary/35"
            aria-hidden="true"
          />
          <h2 className="font-display mt-4 text-xl font-bold text-ink">
            No results for “{query.trim()}”
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">
            We print far more than we can list. Tell us what you need and
            we&apos;ll price it up — or try one of these.
          </p>

          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {POPULAR.map((term) => (
              <li key={term}>
                <button
                  type="button"
                  onClick={() => setQuery(term)}
                  className="rounded-full bg-surface-2 px-3.5 py-1.5 text-sm font-medium text-ink-2 shadow-card transition-colors hover:text-primary"
                >
                  {term}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/quote">Request a quote</Button>
            <Button href="/products" variant="outline">
              Browse all products
            </Button>
          </div>
        </div>
      )}

      {!hasQuery && (
        <div className="mx-auto mt-10 max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink-3">
            Popular searches
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {POPULAR.map((term) => (
              <li key={term}>
                <button
                  type="button"
                  onClick={() => setQuery(term)}
                  className="rounded-full bg-surface-2 px-3.5 py-1.5 text-sm font-medium text-ink-2 shadow-card transition-colors hover:text-primary"
                >
                  {term}
                </button>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-sm font-bold uppercase tracking-wide text-ink-3">
            Browse by category
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {categoryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block rounded-full bg-surface-2 px-3.5 py-1.5 text-sm font-medium text-ink-2 shadow-card transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
