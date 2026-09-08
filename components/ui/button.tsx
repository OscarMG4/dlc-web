import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand/60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-ink shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_10px_32px_-10px_rgba(253,185,12,0.7)] hover:bg-[#ffc933] hover:shadow-[0_1px_0_rgba(255,255,255,0.3)_inset,0_16px_40px_-12px_rgba(253,185,12,0.85)] hover:-translate-y-[2px]",
  dark: "bg-ink text-white shadow-[0_10px_28px_-12px_rgba(0,0,0,0.45)] hover:bg-ink-700 hover:-translate-y-[2px]",
  outline:
    "border border-ink/12 bg-white/40 text-ink backdrop-blur-sm hover:border-ink/25 hover:bg-white/80 hover:-translate-y-[1px]",
  ghost: "text-ink/70 hover:text-brand-dark hover:bg-brand/5",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-xs uppercase tracking-[0.12em]",
  md: "px-7 py-3.5 text-sm tracking-tight",
  lg: "px-9 py-[1.1rem] text-[0.95rem] tracking-tight",
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
