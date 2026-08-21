import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { slugifyItemName, type CategoryItem } from "@/content/categories";
import { getFromPrice } from "@/content/pricing";

export function ProductCard({
  item,
  href,
  fallbackIcon: FallbackIcon,
}: {
  item: CategoryItem;
  href: string;
  fallbackIcon: LucideIcon;
}) {
  const Icon = item.icon ?? FallbackIcon;
  const fromPrice = getFromPrice(slugifyItemName(item.name));

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl bg-surface-2 p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-xl bg-surface-1">
        {item.image ? (
          <Image
            src={item.image}
            alt={`${item.name} - professional printing by Bluwave`}
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
          <span className="absolute left-2 top-2 rounded-full bg-gold px-2.5 py-0.5 text-[11px] font-bold text-primary-900">
            {item.badge}
          </span>
        )}
      </div>

      <p className="font-display font-bold text-ink">{item.name}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink-2">
        {item.description}
      </p>

      <p className="mt-2 text-sm font-bold text-primary">
        {fromPrice != null ? `From £${fromPrice.toFixed(2)}` : "Request a quote"}
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
    </Link>
  );
}
