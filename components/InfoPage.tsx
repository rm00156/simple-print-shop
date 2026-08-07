import type { ReactNode } from "react";
import Image from "next/image";
import {
  FileText,
  Info,
  Lock,
  Mail,
  Printer,
  RefreshCw,
  Settings,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import { Button } from "./Button";
import { site } from "@/content/site";

export type InfoPageSection = {
  heading: string;
  body: ReactNode[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Presentational only: picks a teal accent icon from keywords in the heading,
// so the shared legal template stays consistent across cookies/privacy/terms.
function iconForHeading(heading: string): LucideIcon {
  const h = heading.toLowerCase();
  if (/(essential|necessary|security|secure)/.test(h)) return ShieldCheck;
  if (/(manage|managing|setting|control)/.test(h)) return Settings;
  if (/(change|update|revision|amend)/.test(h)) return RefreshCw;
  if (/contact/.test(h)) return Mail;
  if (/(privacy|data|personal|protect)/.test(h)) return Lock;
  if (/(right|access|consent|choice)/.test(h)) return UserCheck;
  if (/(cookie|what are)/.test(h)) return Info;
  return FileText;
}

export function InfoPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections?: InfoPageSection[];
}) {
  return (
    <>
      <section className="c-blue px-4 pt-12 pb-16 text-center sm:px-6 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h1>
          <p className="ts mx-auto mt-3 max-w-xl text-base leading-[1.7]">
            {intro}
          </p>
        </div>
      </section>

      <div className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          {sections ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <aside className="lg:col-span-3">
                <div className="space-y-6 lg:sticky lg:top-6">
                  <nav aria-label="On this page">
                    <p className="mb-4 text-xs font-semibold tracking-widest text-ink-3 uppercase">
                      In this policy
                    </p>
                    <ul className="flex flex-col border-l-2 border-line">
                      {sections.map((section) => (
                        <li key={section.heading}>
                          <a
                            href={`#${slugify(section.heading)}`}
                            className="-ml-[2px] block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ink-2 transition-all hover:border-teal hover:text-teal"
                          >
                            {section.heading}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="rounded-2xl bg-surface-2 p-6 shadow-card">
                    <div className="flex size-12 items-center justify-center rounded-full bg-accent/15 text-teal">
                      <Printer size={20} aria-hidden="true" />
                    </div>
                    <p className="font-display mt-4 text-lg font-bold text-ink">
                      Need a print quote?
                    </p>
                    <p className="mt-1 text-sm leading-[1.6] text-ink-2">
                      Our team is ready to help with your next project.
                    </p>
                    <Button href="/quote" className="mt-4 w-full">
                      Start your order
                    </Button>
                  </div>
                </div>
              </aside>

              <div className="lg:col-span-9">
                <div className="rounded-2xl bg-surface-2 p-6 shadow-card sm:p-8 md:p-10">
                  {sections.map((section, index) => {
                    const Icon = iconForHeading(section.heading);
                    return (
                      <section
                        key={section.heading}
                        id={slugify(section.heading)}
                        className={clsx("scroll-mt-24", index > 0 && "mt-10")}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-teal">
                            <Icon size={22} aria-hidden="true" />
                          </span>
                          <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                            {section.heading}
                          </h2>
                        </div>
                        {section.body.map((paragraph, i) => (
                          <div
                            key={i}
                            className="mt-3 text-sm leading-[1.8] text-ink-2"
                          >
                            {paragraph}
                          </div>
                        ))}
                      </section>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl bg-surface-2 p-8 text-center shadow-card">
              <p className="text-sm leading-[1.7] text-ink-2">
                In the meantime, call us on{" "}
                <a
                  href={site.phoneHref}
                  className="font-semibold text-primary hover:text-primary-hover"
                >
                  {site.phone}
                </a>{" "}
                and we&apos;ll help directly.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-14 sm:px-6">
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl bg-surface-2 p-6 shadow-card sm:p-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Precision Print, Delivered.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-[1.7] text-ink-2">
              From business stationery to multi-page booklets, we bring south
              east London&apos;s finest print craft to your project.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/products">Explore products</Button>
              <Button href="/quote" variant="outline">
                Request a quote
              </Button>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-card-hover">
            <Image
              src="/bcards.webp"
              alt="Bluwave printed business cards"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </section>
      </div>
    </>
  );
}
