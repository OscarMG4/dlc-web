import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-ink shadow-[0_8px_28px_-8px_rgba(253,185,12,0.65)] hover:bg-brand-dark hover:shadow-[0_12px_36px_-8px_rgba(253,185,12,0.75)] hover:-translate-y-0.5",
  dark: "bg-ink text-white hover:bg-ink-700 hover:-translate-y-0.5",
  outline:
    "border border-ink/15 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white",
  ghost: "text-ink hover:text-brand-dark",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs uppercase tracking-[0.12em]",
  md: "px-6 py-3 text-sm tracking-tight",
  lg: "px-8 py-4 text-[0.95rem] tracking-tight",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Omit<BaseProps, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

function isHashHref(href: ComponentProps<typeof Link>["href"]) {
  return typeof href === "string" && href.startsWith("#");
}

type ButtonLinkProps = BaseProps &
  Omit<ComponentProps<typeof Link>, "className" | "children">;

export function ButtonLink({
  variant,
  size,
  className,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });

  if (isHashHref(href)) {
    return (
      <a href={href as string} className={classes} {...(props as ComponentProps<"a">)}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = BaseProps & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({
  variant,
  size,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}
