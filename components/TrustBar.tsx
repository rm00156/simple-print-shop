import Image from "next/image";

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
    image: { src: "/macmillan.png", width: 1000, height: 564 },
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

export function TrustBar() {
  return (
    <section className="border-b border-line bg-surface-2 px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
        <h2 className="text-xs font-bold tracking-[0.2em] text-ink-3 uppercase">
          Trusted by leading brands
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 grayscale opacity-70 transition-all duration-500 hover:grayscale-0 hover:opacity-100 sm:gap-x-20">
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
      </div>
    </section>
  );
}
