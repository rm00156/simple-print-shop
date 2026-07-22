import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Shipping Info",
  description: `Delivery and collection information for ${site.name}.`,
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return (
    <InfoPage
      title="Shipping Info"
      intro={`Most orders are ready for collection in-store within ${site.turnaround}. Full details on delivery options and areas we cover are coming soon.`}
    />
  );
}
