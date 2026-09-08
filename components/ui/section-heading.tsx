import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "flex items-center gap-3 font-display text-[11px] font-semibold uppercase tracking-[0.22em]",
            align === "center" && "justify-center",
            isDark ? "text-brand/85" : "text-brand-dark"
          )}
        >
          {index ? (
            <span className="tabular-nums text-brand/70">{index}</span>
          ) : null}
          <span
            className={cn("h-px w-7", isDark ? "bg-brand/50" : "bg-brand/70")}
            aria-hidden
          />
          <p>{eyebrow}</p>
        </div>
      ) : null}

      <h2
        className={cn(
          "text-balance mt-4 font-display text-[1.6rem] font-bold leading-[1.05] tracking-[-0.04em] sm:mt-5 sm:text-[2.35rem] lg:text-[2.85rem]",
          isDark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-[0.95rem] leading-relaxed sm:mt-5 sm:text-base",
            isDark ? "text-white/50" : "text-ink-500",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
