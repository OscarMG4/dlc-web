import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons";
import { company } from "@/lib/content";
import { cn } from "@/lib/utils";

const socialItems = [
  {
    href: company.social.facebook,
    label: "Facebook",
    Icon: FacebookIcon,
    hoverIcon: "group-hover:bg-[#1877F2] group-hover:text-white",
  },
  {
    href: company.social.instagram,
    label: "Instagram",
    Icon: InstagramIcon,
    hoverIcon:
      "group-hover:bg-gradient-to-br group-hover:from-[#f58529] group-hover:via-[#dd2a7b] group-hover:to-[#8134af] group-hover:text-white",
  },
  {
    href: company.social.tiktok,
    label: "TikTok",
    Icon: TikTokIcon,
    hoverIcon: "group-hover:bg-ink group-hover:text-white",
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
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {socialItems.map(({ href, label, Icon, hoverIcon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} de ${company.name}`}
          className={cn(
            "group inline-flex items-center gap-2.5 rounded-full px-3 py-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isDark
              ? "bg-white/[0.06] text-white/75 ring-1 ring-white/12 hover:-translate-y-0.5 hover:bg-white/[0.1] hover:text-white hover:ring-white/22 hover:shadow-[0_12px_28px_-14px_rgba(0,0,0,0.55)]"
              : "bg-white text-ink/70 ring-1 ring-black/[0.06] shadow-soft hover:-translate-y-0.5 hover:text-ink hover:ring-black/10 hover:shadow-[0_12px_28px_-14px_rgba(0,0,0,0.16)]"
          )}
        >
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
              isDark ? "bg-white/10 text-white" : "bg-[#f3f2ef] text-ink/65",
              hoverIcon
            )}
          >
            <Icon className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
          </span>
          {showLabels ? (
            <span className="pr-1 font-display text-sm font-medium tracking-tight">
              {label}
            </span>
          ) : null}
        </a>
      ))}
    </div>
  );
}
