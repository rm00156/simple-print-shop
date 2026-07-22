import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { site, footerColumns } from "@/content/site";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}

export function SiteFooter() {
  const showEmail = !site.email.startsWith("TODO");
  const showFacebook = !site.social.facebook.startsWith("TODO");
  const showInstagram = !site.social.instagram.startsWith("TODO");
  const showSocial = showFacebook || showInstagram;

  return (
    <footer className="c-footer px-4 py-10 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="shrink-0">
          <div className="inline-flex rounded-2xl bg-white p-3">
            <Image src="/logo.webp" alt={site.name} width={170} height={48} className="h-10 w-auto" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:flex sm:gap-x-10 lg:gap-x-16">
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="mb-3 text-sm font-bold text-ink">{col.title}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-2 hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-3">
          &copy; {new Date().getFullYear()} {site.name} Ltd. All rights reserved. Built by Thintent.
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-2">
          <a href={site.phoneHref} className="flex items-center gap-1.5 hover:text-ink">
            <Phone size={13} aria-hidden="true" />
            {site.phone}
          </a>
          {showEmail && (
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-ink">
              <Mail size={13} aria-hidden="true" />
              {site.email}
            </a>
          )}
        </div>

        {showSocial && (
          <div className="flex items-center gap-3 text-ink-2">
            {showFacebook && (
              <a href={site.social.facebook} aria-label="Facebook" className="hover:text-ink">
                <FacebookIcon className="size-[18px]" />
              </a>
            )}
            {showInstagram && (
              <a href={site.social.instagram} aria-label="Instagram" className="hover:text-ink">
                <InstagramIcon className="size-[18px]" />
              </a>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
