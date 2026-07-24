import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductCard } from "@/components/ProductCard";
import { categories, slugifyItemName } from "@/content/categories";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Products",
  description: `Business cards, flyers, brochures and more, printed locally by ${site.name} in ${site.area}.`,
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <section className="c-blue px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <h1 className="font-display mt-6 text-3xl leading-tight font-bold text-white sm:text-4xl md:text-5xl">
            Precision Print
            <br />
            <span className="text-accent">for London Business</span>
          </h1>
          <p className="ts mt-6 max-w-xl text-base leading-[1.7]">
            Everything we print, from business stationery to large-format
            marketing. Pick a category to see what&apos;s included and request a
            quote.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href="#all-products"
              variant="onAccent"
              className="w-full sm:w-auto"
            >
              Browse All Products
            </Button>
            <Button
              href="/quote"
              variant="ghost"
              className="ts w-full sm:w-auto"
            >
              Talk to an Expert
            </Button>
          </div>
        </div>
      </section>

      <div
        id="all-products"
        className="scroll-mt-6 px-4 py-12 sm:px-6 sm:py-16"
      >
        {categories.map((category) => (
          <div key={category.slug} className="mb-14 last:mb-0">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {category.name}
              </h2>
              <p className="mt-1 text-sm text-ink-2">{category.tagline}</p>
              <div className="mt-2 h-1 w-14 rounded-full bg-accent" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <ProductCard
                  key={item.name}
                  item={item}
                  href={`/products/${category.slug}/${slugifyItemName(item.name)}`}
                  fallbackIcon={category.icon}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <HowItWorks />

      <div className="px-4 py-14 sm:px-6">
        <section className="c-blue rounded-3xl px-6 py-12 text-center sm:px-10 sm:py-16">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to start your project?
          </h2>
          <p className="ts mx-auto mt-3 max-w-xl text-sm leading-[1.7]">
            Whether you have print-ready artwork or need a bespoke design from
            our studio, we&apos;re here to help you achieve the perfect result.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/quote" variant="onAccent">
              Request a Quick Quote
            </Button>
            <Button href="/contact" variant="ghost" className="ts">
              Contact Our Studio
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
