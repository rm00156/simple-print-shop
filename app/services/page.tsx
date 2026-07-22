import type { Metadata } from "next";
import { ServiceGrid } from "@/components/ServiceGrid";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Design, digital and litho printing, finishing and delivery from ${site.name} in ${site.area}.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-2xl font-bold text-ink sm:text-3xl">Services</p>
      <p className="mt-3 max-w-prose text-sm leading-[1.7] text-ink-2">
        From first design through to same-day collection, here&apos;s how we
        get your job printed and into your hands.
      </p>
      <div className="mt-6">
        <ServiceGrid items={services} columns={5} />
      </div>
    </div>
  );
}
