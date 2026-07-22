"use client";

import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { site, navLinks } from "@/content/site";
import { Button } from "./Button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setOpenMobileSection(null);
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header>
      <div className="flex items-center justify-between gap-4 border-b border-line bg-surface-2 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.webp"
            alt={site.name}
            width={160}
            height={45}
            preload
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold whitespace-nowrap xl:flex">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className={clsx(
                    "flex items-center gap-1",
                    pathname === link.href
                      ? "text-primary underline decoration-teal decoration-2 underline-offset-8"
                      : "text-ink hover:text-primary",
                  )}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    className="transition-transform group-hover:rotate-180"
                  />
                </Link>
                <div className="invisible absolute left-0 top-full z-20 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="min-w-56 rounded-2xl border border-line bg-surface-1 p-2 shadow-lg">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-token px-3 py-2 text-sm font-medium text-ink-2 hover:bg-surface-2 hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  pathname === link.href
                    ? "text-primary underline decoration-teal decoration-2 underline-offset-8"
                    : "text-ink hover:text-primary",
                )}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-ink hover:text-primary lg:flex"
          >
            <Phone size={15} aria-hidden="true" />
            {site.phone}
          </a>
          <span className="hidden sm:inline-flex">
            <Button href="/quote" size="sm">
              Request a quote
            </Button>
          </span>
          <span className="sm:hidden">
            <Button href="/quote" size="sm">
              Quote
            </Button>
          </span>
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-token text-ink xl:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id={panelId}
        className={clsx(
          "overflow-hidden border-b border-line xl:hidden",
          open ? "max-h-[32rem] overflow-y-auto" : "max-h-0 border-b-0",
        )}
        style={{ transition: "max-height 200ms ease" }}
      >
        <nav className="flex flex-col px-4 py-2 sm:px-5">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href} className="border-b border-line last:border-b-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={link.href}
                    className={clsx(
                      "flex min-h-11 flex-1 items-center text-sm font-semibold",
                      pathname === link.href ? "text-primary" : "text-ink-2",
                    )}
                  >
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={openMobileSection === link.href}
                    aria-label={`Toggle ${link.label} submenu`}
                    onClick={() =>
                      setOpenMobileSection((v) => (v === link.href ? null : link.href))
                    }
                    className="flex size-11 items-center justify-center text-ink-2"
                  >
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className={clsx(
                        "transition-transform",
                        openMobileSection === link.href && "rotate-180",
                      )}
                    />
                  </button>
                </div>
                <div
                  className={clsx(
                    "flex flex-col overflow-hidden pl-3",
                    openMobileSection === link.href ? "max-h-96 pb-2" : "max-h-0",
                  )}
                  style={{ transition: "max-height 200ms ease" }}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="flex min-h-10 items-center text-sm font-medium text-ink-2"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex min-h-11 items-center text-sm font-semibold",
                  pathname === link.href ? "text-primary" : "text-ink-2",
                )}
              >
                {link.label}
              </Link>
            ),
          )}
          <a
            href={site.phoneHref}
            className="flex min-h-11 items-center gap-2 border-t border-line text-sm font-medium text-ink"
          >
            <Phone size={15} aria-hidden="true" />
            {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
