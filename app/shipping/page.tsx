import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Shipping Info",
  description: `Collection and delivery information for ${site.name} — free collection from our ${site.address.addressLocality} press, or we arrange delivery across south east London and nationwide.`,
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return (
    <InfoPage
      title="Shipping & Collection"
      intro={`Most standard jobs are ready within ${site.turnaround}. Collect from our ${site.address.addressLocality} press, or we'll deliver — here's exactly how it works.`}
      sections={[
        {
          heading: "Collection",
          body: [
            `Collection from our premises at ${site.address.full} is always free. Most standard digital print jobs are ready within ${site.turnaround} of your job being confirmed — larger litho runs and bespoke large-format work take longer, so we'll agree a collection date with you when you confirm the job rather than promise a blanket timescale.`,
            `We're open Monday to Friday, and we'll call or email as soon as your order's ready, so there's no need to guess and turn up early. If you need directions, get in touch and we'll point you the right way.`,
          ],
        },
        {
          heading: "Delivery",
          body: [
            "We arrange delivery across Lower Sydenham, the surrounding south east London area, and nationwide by courier on request. Cost depends on the job and the distance, and we'll always quote it up front when you get your quote — never a surprise on the invoice. (Collection, on the other hand, is always free — see above.)",
            `Delivery time comes on top of production time, so factor in both if you're working to a deadline. Call ${site.phone} and we'll give you a realistic date and price for your specific job and postcode, rather than a general estimate that might not hold.`,
            "For regular or bulk orders we can also hold your stock and dispatch it as you need it — ask about pick, pack and mailing fulfilment if that would save you the hassle of warehousing it yourself.",
          ],
        },
        {
          heading: "Rush jobs",
          body: [
            `Need it faster than ${site.turnaround}? Same-day turnaround is often possible on smaller digital jobs — mention it when you call ${site.phone} for a quote, and we'll confirm whether it's doable around what's already on press.`,
          ],
        },
      ]}
    />
  );
}
