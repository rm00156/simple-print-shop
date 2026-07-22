import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { Service } from "@/content/services";
import { Placeholder } from "./Placeholder";

export function ServiceGrid({
  items,
  columns,
}: {
  items: Service[];
  columns: 3 | 4 | 5;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map((service) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className={clsx(
            "group grow-0 shrink-0 rounded-2xl border border-line bg-surface-1 p-3 text-center transition-all hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-2 hover:shadow-md",
            "basis-[calc(50%-0.25rem)]",
            columns === 5 &&
              "sm:basis-[calc(33.3333%-0.3333rem)] md:basis-[calc(20%-0.4rem)]",
            columns === 4 && "md:basis-[calc(25%-0.375rem)]",
            columns === 3 && "basis-[calc(33.3333%-0.3333rem)]",
          )}
        >
          {service.image ? (
            <div className="relative mb-1.5 aspect-square overflow-hidden rounded-token">
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(min-width: 768px) 20vw, 33vw"
                className="object-cover"
              />
            </div>
          ) : (
            <Placeholder className="mb-1.5" />
          )}
          <p className="text-xs font-semibold text-ink leading-tight">
            {service.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
