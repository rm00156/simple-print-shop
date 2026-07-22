import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import type { CategoryItem } from "@/content/categories";

export function ProductCard({
  item,
  fallbackIcon: FallbackIcon,
}: {
  item: CategoryItem;
  fallbackIcon: LucideIcon;
}) {
  const Icon = item.icon ?? FallbackIcon;

  return (
    <div className="group flex flex-col rounded-2xl border border-line bg-surface-2 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md">
      <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-xl bg-surface-1">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 90vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-surface-1 to-primary/5">
            <Icon
              size={30}
              strokeWidth={1.5}
              className="text-primary/35"
              aria-hidden="true"
            />
          </div>
        )}
        {item.badge && (
          <span className="absolute right-2 top-2 rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold text-gold backdrop-blur-sm">
            {item.badge}
          </span>
        )}
      </div>

      <p className="font-bold text-ink">{item.name}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink-2">
        {item.description}
      </p>

      {item.tags && item.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-surface-1 px-2.5 py-1 text-xs font-medium text-ink-2"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
