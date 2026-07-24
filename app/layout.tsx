import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/content/site";
import "./globals.css";

// Quicksand is a variable font (300–700), so no explicit weight list is needed.
// It drives both body and display type, per the Stitch "Azure Horizon" mockup.
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Without this, fully static routes (no dynamic data) prerender once at build time and
// SiteFooter's `new Date().getFullYear()` would freeze at that year until the next deploy.
// Must be a literal number, not an expression — this Next.js version's static config
// extractor only evaluates numeric literals for segment config exports.
export const revalidate = 86400;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bluwave — print shop in Lower Sydenham, south east London",
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
    title: "Bluwave — print shop in Lower Sydenham, south east London",
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
    title: "Bluwave — print shop in Lower Sydenham, south east London",
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
      </body>
    </html>
  );
}
