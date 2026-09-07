import { FacebookIcon, InstagramIcon } from "@/components/icons";
import { company } from "@/lib/content";
import { cn } from "@/lib/utils";

const socialItems = [
  {
    href: company.social.facebook,
    label: "Facebook",
    Icon: FacebookIcon,
    iconHover: "group-hover:bg-[#1877F2] group-hover:text-white",
  },
  {
    href: company.social.instagram,
    label: "Instagram",
    Icon: InstagramIcon,
    iconHover:
      "group-hover:bg-gradient-to-br group-hover:from-[#f58529] group-hover:via-[#dd2a7b] group-hover:to-[#8134af] group-hover:text-white",
  },
] as const;

type SocialLinksProps = {
  variant?: "dark" | "light";
  showLabels?: boolean;
  className?: string;
};

export function SocialLinks({
  variant = "dark",
  showLabels = true,
  className,
}: SocialLinksProps) {
  const isDark = variant === "dark";

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {socialItems.map(({ href, label, Icon, iconHover }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} de ${company.name}`}
          className={cn(
            "group inline-flex items-center gap-2.5 rounded-full border transition-all duration-300",
            showLabels ? "px-4 py-2" : "p-2.5",
            isDark
              ? "border-white/15 bg-white/5 text-white/75 hover:border-white/25 hover:bg-white/10 hover:text-white"
              : "border-ink/10 bg-surface text-ink-500 hover:border-ink/15 hover:bg-white hover:text-ink"
          )}
        >
          <span
            className={cn(
              "flex shrink-0 items-center justify-center rounded-full transition-all duration-300",
              showLabels ? "size-9" : "size-10",
              isDark ? "bg-white/10 text-white" : "bg-white text-ink-500 shadow-sm ring-1 ring-ink/5",
              iconHover
            )}
          >
            <Icon className={showLabels ? "size-4" : "size-5"} />
          </span>
          {showLabels ? (
            <span className="pr-0.5 text-sm font-medium">{label}</span>
          ) : null}
        </a>
      ))}
    </div>
  );
}
