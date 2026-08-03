import type { Metadata } from "next";
import { categories } from "@/content/categories";
import { site } from "@/content/site";
import { SearchResults } from "./search-results";

export const metadata: Metadata = {
  title: "Search",
  description: `Search everything ${site.name} prints, from business cards to site boards.`,
  // Result pages shouldn't be indexed, so /search is also kept out of the sitemap.
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" },
};

type Props = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q) ?? "";

  const categoryLinks = categories.map((category) => ({
    href: `/products/${category.slug}`,
    label: category.name,
  }));

  return (
    <>
      <section className="c-blue px-4 py-12 sm:px-6 sm:py-16">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl leading-tight font-bold text-white sm:text-4xl">
            Search
          </h1>
          <p className="ts mt-3 max-w-xl text-base leading-[1.7]">
            Every product and service we offer, in one place. Try a product
            name, a material, or just describe the job.
          </p>
        </div>
      </section>

      {/* Matched on the server, so results are in the initial HTML rather
          than appearing only after hydration. */}
      <SearchResults initialQuery={query} categoryLinks={categoryLinks} />
    </>
  );
}
