import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageSquareText, Package, Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or may have moved.",
  robots: { index: false, follow: false },
};

const quickLinks = [
  {
    href: "/products",
    icon: Package,
    title: "Browse products",
    description: "Business cards, flyers, brochures and more.",
  },
  {
    href: "/quote",
    icon: MessageSquareText,
    title: "Get a quote",
    description: "Tell us what you need and we'll price it up.",
  },
  {
    href: site.phoneHref,
    icon: Phone,
    title: "Call us",
    description: site.phone,
  },
];

export default function NotFound() {
  return (
    <>
      <section className="c-blue flex flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
        <span className="font-display text-accent text-6xl font-bold tracking-tight sm:text-7xl">
          404
        </span>
        <h1 className="font-display mt-4 max-w-lg text-2xl font-bold text-white sm:text-3xl">
          Looks like this page didn&apos;t make it to press
        </h1>
        <p className="ts mt-4 max-w-md text-base leading-[1.7]">
          The page you&apos;re looking for doesn&apos;t exist or may have
          moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="onAccent" className="w-full sm:w-auto">
            Back to homepage
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Button
            href="/products"
            variant="ghost"
            className="ts w-full sm:w-auto"
          >
            Browse products
          </Button>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          {quickLinks.map(({ href, icon: Icon, title, description }) => {
            const cardClassName =
              "rounded-2xl bg-surface-2 p-6 shadow-card transition-shadow hover:shadow-card-hover";
            const content = (
              <>
                <div className="flex size-11 items-center justify-center rounded-full bg-accent/15 text-teal">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <p className="font-display mt-4 text-base font-bold text-ink">
                  {title}
                </p>
                <p className="mt-1 text-sm leading-[1.6] text-ink-2">
                  {description}
                </p>
              </>
            );

            // tel: links need a plain anchor — Link is for in-app routes only.
            return href.startsWith("tel:") ? (
              <a key={title} href={href} className={cardClassName}>
                {content}
              </a>
            ) : (
              <Link key={title} href={href} className={cardClassName}>
                {content}
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
