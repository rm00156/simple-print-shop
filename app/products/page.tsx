import type { Metadata } from "next";
import { CategoryGrid } from "@/components/CategoryGrid";
import { categories } from "@/content/categories";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Products",
  description: `Business cards, flyers, brochures and more, printed locally by ${site.name} in ${site.area}.`,
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-2xl font-bold text-ink sm:text-3xl">Products</p>
      <p className="mt-3 max-w-prose text-sm leading-[1.7] text-ink-2">
        Everything we print, from business stationery to large-format
        marketing. Pick a category to see what&apos;s included and request a
        quote.
      </p>
      <div className="mt-6">
        <CategoryGrid items={categories} columns={5} />
      </div>
    </div>
  );
}
