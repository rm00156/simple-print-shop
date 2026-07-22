import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { Category } from "@/content/categories";
import { Placeholder } from "./Placeholder";

export function CategoryGrid({
  items,
  columns,
}: {
  items: Category[];
  columns: 3 | 4 | 5;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map((category) => (
        <Link
          key={category.slug}
          href={`/products/${category.slug}`}
          className={clsx(
            "group grow-0 shrink-0 rounded-2xl bg-card p-3 text-center shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover",
            "basis-[calc(50%-0.25rem)]",
            columns === 5 &&
              "sm:basis-[calc(33.3333%-0.3333rem)] md:basis-[calc(20%-0.4rem)]",
            columns === 4 && "md:basis-[calc(25%-0.375rem)]",
            columns === 3 && "basis-[calc(33.3333%-0.3333rem)]",
          )}
        >
          {category.image ? (
            <div className="relative mb-1.5 aspect-square overflow-hidden rounded-token">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(min-width: 768px) 20vw, 33vw"
                className="object-cover"
              />
            </div>
          ) : (
            <Placeholder className="mb-1.5" />
          )}
          <p className="text-xs font-semibold text-ink leading-tight">{category.name}</p>
        </Link>
      ))}
    </div>
  );
}
