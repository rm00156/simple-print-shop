import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Artwork guidelines",
  description: `How to supply print-ready artwork to ${site.name} — file formats, bleed, resolution, colour and fonts, so your job runs first time.`,
  alternates: { canonical: "/artwork-guidelines" },
};

// Written for the customer who supplies their own files — trade buyers above all.
// The point is fewer files that need fixing before they can run, which is the
// part of the job that costs time without anyone paying for it. The specs below
// (3mm bleed, 5mm safe area, 300dpi, booklets in fours) are the industry norm and
// are out for sign-off in notes/campaign/04-ask-for-dad.md, section 4 — change
// them here if the press wants something different.
export default function ArtworkGuidelinesPage() {
  const linkClasses = "font-semibold text-primary hover:text-primary-hover";

  return (
    <InfoPage
      title="Artwork Guidelines"
      intro="What we need from your files so the job runs first time. Every file still gets a free check and a proof before anything goes to press — this just means fewer surprises in it."
      navLabel="In this guide"
      sections={[
        {
          heading: "File format",
          body: [
            "A print-ready PDF is best: it's what goes to press, so what you see is what you get.",
            "We can also work from InDesign, Illustrator, Photoshop, Word and image files. Send what you have and we'll tell you if anything needs changing before we quote it.",
          ],
        },
        {
          heading: "Bleed and safe area",
          body: [
            <>
              Anything that runs to the edge of the page — a background colour, a
              photo — needs to extend{" "}
              <strong className="font-semibold text-ink">3mm past the trim</strong>{" "}
              on every side. Without it, a hairline of white paper can show where
              the guillotine cuts.
            </>,
            <>
              Keep text and logos at least{" "}
              <strong className="font-semibold text-ink">5mm inside the trim</strong>,
              so nothing important sits close enough to the edge to be cut into.
              Crop marks are welcome but not needed.
            </>,
          ],
        },
        {
          heading: "Image resolution",
          body: [
            <>
              Photos and images should be{" "}
              <strong className="font-semibold text-ink">300dpi at the size they&apos;ll print</strong>.
              Images saved from websites and social media are usually far lower
              than that — they look sharp on screen and print soft.
            </>,
            "Banners, display boards and large posters are seen from further away and can usually run at lower resolution. Ask us before resampling anything up — it adds pixels, not detail.",
          ],
        },
        {
          heading: "Colour",
          body: [
            "Set your files up in CMYK. Screens show colour in RGB, and some bright greens, blues and oranges can't be reproduced in ink — converted at the last minute, they come out duller than expected.",
            "If your file is in RGB we'll flag it during the free check, so the colour change is something you see on the proof rather than on the finished job.",
          ],
        },
        {
          heading: "Fonts",
          body: [
            "Embed all fonts when you export the PDF, or convert text to outlines. A missing font gets substituted, and the substitute rarely matches your spacing.",
          ],
        },
        {
          heading: "Booklets",
          body: [
            "Supply booklets as single pages in reading order, not as printer's spreads — we impose them for the press.",
            "The page count, cover included, needs to be a multiple of four: 8, 12, 16 pages and so on. If you're a page or two out, tell us and we'll suggest where a blank or a notes page sits best.",
          ],
        },
        {
          heading: "Checks and proofs",
          body: [
            "Every file gets a free check for low-resolution images, missing fonts and RGB colour before it costs anyone a reprint.",
            "You'll get a PDF proof to approve before anything runs. Nothing is printed until you've said yes — so check names, dates and phone numbers on the proof, because that's what we'll print.",
          ],
        },
        {
          heading: "Sending your files",
          body: [
            <>
              Email them to{" "}
              <a href={`mailto:${site.email}`} className={linkClasses}>
                {site.email}
              </a>
              . For anything too big to attach, send a download link instead —
              WeTransfer, Google Drive and Dropbox all work. Naming the file after
              the job saves a phone call.
            </>,
            <>
              Files not print-ready, or no files at all yet? Our{" "}
              <Link href="/services/design-artwork" className={linkClasses}>
                design and artwork service
              </Link>{" "}
              can set them up or start from scratch, or call us on{" "}
              <a href={site.phoneHref} className={linkClasses}>
                {site.phone}
              </a>{" "}
              and we&apos;ll talk it through.
            </>,
          ],
        },
      ]}
    />
  );
}
