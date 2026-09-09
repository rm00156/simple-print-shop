import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site, siteUrl } from "@/content/site";
import "./globals.css";

// Quicksand is a variable font (300–700), so no explicit weight list is needed.
// It drives both body and display type, per the Stitch "Azure Horizon" mockup.
//
// Self-hosted rather than fetched via next/font/google: that helper downloads from
// fonts.googleapis.com at build time and hard-errors if the request fails, which
// would let a Google outage break a deploy. This is the latin subset Next was
// already emitting and preloading, so glyph coverage is unchanged.
const quicksand = localFont({
  src: "./fonts/quicksand-latin-variable.woff2",
  variable: "--font-quicksand",
  weight: "300 700",
  style: "normal",
  display: "swap",
});

// Cloudflare Web Analytics. This has to be the manual beacon: the dashboard's
// automatic JS injection does not work on this site and cannot be made to.
//
// Measured after enabling automatic injection and purging the zone cache: every HTML
// page still came back with zero beacon tags and `cf-cache-status: HIT`, including
// deep pages that had never been requested by anyone. That HIT comes from the Workers
// Static Assets layer, which is served ahead of the proxy stage that rewrites HTML, so
// there is nothing for the injector to modify and a cache purge does not change it.
// It follows from run_worker_first being scoped to /api/* in wrangler.jsonc — every
// page is deliberately served straight off the asset layer, which is what keeps page
// views free, and the same property rules out edge injection.
//
// The dashboard is misleading about this. Visits and page views still populate, because
// those come from edge measurement and need no beacon; only Core Web Vitals depend on
// it. The tell was 35 visits against an LCP sample count of 1.
//
// The token identifies the site and grants nothing — it is public by design, and is
// served in the HTML of every page regardless. It is inlined here rather than read from
// a build variable on purpose: a variable has to be set again in every environment that
// ever builds this site, and forgetting it fails silently, which is the same class of
// bug as the injection problem above. Inline, it cannot be lost.
//
// Gated to production so `next dev` never reports. A local `npm run build` will emit it,
// which is correct — that output is only ever seen by visitors once it is deployed.
const CF_BEACON_TOKEN = "e67558a00c8e4203a45a015e4b9c0031";

// Both place names the unit is findable under, kept under ~60 characters so search
// results don't truncate it. Used for the document, OG and Twitter titles alike.
const siteTitle = "Bluwave — print shop in Lower Sydenham & Beckenham";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Bluwave",
  },
  description: site.description,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: siteTitle,
    description: site.description,
    images: [
      {
        url: "/hero1.webp",
        width: 1536,
        height: 1024,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: site.description,
    images: ["/hero1.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const address =
  site.address.streetAddress.startsWith("TODO") ||
  site.address.postalCode.startsWith("TODO")
    ? undefined
    : {
        "@type": "PostalAddress",
        streetAddress: site.address.streetAddress,
        addressLocality: site.address.addressLocality,
        addressRegion: site.address.addressRegion,
        postalCode: site.address.postalCode,
        addressCountry: site.address.addressCountry,
      };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  telephone: site.phoneHref.replace(/^tel:/, ""),
  url: siteUrl,
  ...(address ? { address } : {}),
  areaServed: [
    "Lower Sydenham",
    "Sydenham",
    // The registered address is Beckenham BR3 — the unit sits on the boundary, so
    // both names are real and both need to be claimed here.
    "Beckenham",
    "Catford",
    "Bromley",
    "South East London",
  ],
  foundingDate: String(site.foundedYear),
  priceRange: "££",
  openingHoursSpecification: site.openingHours.schema,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${quicksand.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === "production" ? (
          // type="module" matches the snippet Cloudflare hands out. Module scripts are
          // deferred by definition, so `defer` changes nothing at runtime — it is here
          // because @next/next/no-sync-scripts does not know that and fails the build.
          <script
            type="module"
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
          />
        ) : null}
      </body>
    </html>
  );
}
