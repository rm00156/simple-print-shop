import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { categories } from "@/content/categories";
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
          <span className="inline-flex rounded-full bg-teal px-4 py-1 text-xs font-semibold tracking-wider text-white uppercase">
            Our Portfolio
          </span>
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
            <Button href="#categories" variant="onAccent" className="w-full sm:w-auto">
              Browse Categories
            </Button>
            <Button href="/quote" variant="ghost" className="ts w-full sm:w-auto">
              Talk to an Expert
            </Button>
          </div>
        </div>
      </section>

      <div id="categories" className="scroll-mt-6 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Core Categories
          </h2>
          <div className="mt-2 h-1 w-20 rounded-full bg-accent" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products/${category.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-surface-2 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative h-56 overflow-hidden">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-surface-1">
                    <category.icon
                      size={40}
                      strokeWidth={1.5}
                      className="text-primary/30"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-bold text-ink">
                  {category.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-[1.6] text-ink-2">
                  {category.intro}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-teal transition-all group-hover:gap-2.5">
                  Explore range
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 pb-14 sm:px-6">
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
