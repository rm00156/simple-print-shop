import clsx from "clsx";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "onAccent" | "ghost" | "outline";
type Size = "md" | "sm";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-on-primary shadow-sm shadow-primary/25 hover:bg-primary-hover hover:shadow-md",
  onAccent: "bg-accent text-on-accent shadow-md shadow-accent/30 hover:bg-accent-hover hover:shadow-lg",
  ghost: "border-2 border-current bg-transparent hover:bg-white/10",
  outline: "border border-line-strong bg-surface-2 text-primary hover:border-primary hover:shadow-sm",
};

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  sm: "px-4 py-2 text-[13px]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-token font-semibold transition-all whitespace-nowrap disabled:opacity-60 disabled:pointer-events-none";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "primary", size = "md", className, children, href, ...props }: ButtonProps) {
  const classes = clsx(base, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    const isExternalOrTel = href.startsWith("tel:") || href.startsWith("http");
    if (isExternalOrTel) {
      return (
        <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
