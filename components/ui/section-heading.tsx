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
            "inline-flex items-center gap-3.5",
            align === "center" && "mx-auto"
          )}
        >
          {index ? (
            <span
              className={cn(
                "font-display text-[11px] font-semibold tabular-nums tracking-[0.1em]",
                isDark ? "text-brand" : "text-brand-dark"
              )}
            >
              {index}
            </span>
          ) : null}
          <span
            className={cn(
              "h-px w-10",
              isDark ? "bg-brand/55" : "bg-brand/75"
            )}
            aria-hidden
          />
          <p
            className={cn(
              "font-display text-[11px] font-semibold uppercase tracking-[0.16em]",
              isDark ? "text-white/50" : "text-ink-500"
            )}
          >
            {eyebrow}
          </p>
        </div>
      ) : null}

      <h2
        className={cn(
          "text-balance mt-5 font-display text-[1.85rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:mt-6 sm:text-[2.6rem] lg:text-[3.15rem]",
          isDark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-5 max-w-xl text-[0.98rem] leading-[1.75] sm:mt-6 sm:text-[1.06rem]",
            isDark ? "text-white/48" : "text-ink-500",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
