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
            "flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.2em]",
            align === "center" && "justify-center",
            isDark ? "text-brand" : "text-brand-dark"
          )}
        >
          {index ? (
            <span className="tabular-nums text-brand">{index}</span>
          ) : null}
          <span
            className={cn("h-px w-8", isDark ? "bg-brand/60" : "bg-brand")}
            aria-hidden
          />
          <p>{eyebrow}</p>
        </div>
      ) : null}

      <h2
        className={cn(
          "text-balance mt-5 font-display text-[1.75rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-4xl lg:text-[3rem]",
          isDark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed sm:text-[1.05rem]",
            isDark ? "text-white/60" : "text-ink-500",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
