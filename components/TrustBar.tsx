import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Real client logos, all supplied as image files in /public.
const logos: {
  name: string;
  image: { src: string; width: number; height: number };
}[] = [
  { name: "NHS", image: { src: "/nhs.webp", width: 1920, height: 778 } },
  {
    name: "Great Ormond Street Hospital",
    image: { src: "/great.svg", width: 1000, height: 528.6 },
  },
  {
    name: "Macmillan Cancer Support",
    image: { src: "/macmillan.webp", width: 1000, height: 564 },
  },
  {
    name: "Marie Curie",
    image: { src: "/marie-curie-logo.webp", width: 476, height: 209 },
  },
  {
    name: "Southwark Council",
    image: {
      src: "/southwarklogo.svg",
      width: 115,
      height: 51,
    },
  },
  {
    name: "Bromley Council",
    image: { src: "/bromley-council.svg", width: 400, height: 251.7 },
  },
];

export function TrustBar({
  showAccountsLink = false,
}: {
  /** Adds a link to /for-organisations under the logos — off on that page itself. */
  showAccountsLink?: boolean;
} = {}) {
  return (
    <section className="border-b border-line bg-surface-2 px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
        <h2 className="font-display max-w-2xl text-center text-lg font-bold text-ink sm:text-xl">
          Great Ormond Street, Macmillan and the NHS print with us
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-20">
          {logos.map(({ name, image }) => (
            <li key={name} className="flex h-9 items-center sm:h-11">
              <Image
                src={image.src}
                alt={name}
                width={image.width}
                height={image.height}
                className="h-full w-auto object-contain"
              />
            </li>
          ))}
        </ul>
        {showAccountsLink && (
          <Link
            href="/for-organisations"
            className="flex items-center gap-1 text-sm font-semibold text-teal transition-all hover:gap-2 hover:text-primary"
          >
            Print on account for your organisation
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}
