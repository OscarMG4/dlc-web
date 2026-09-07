import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";
import { company, mapLinkUrl } from "@/lib/content";

const links = [
  { href: "#proyecto", label: "Finca Algarrobo" },
  { href: "#galeria", label: "Galería" },
  { href: "#nosotros", label: "Sobre nosotros" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/8 bg-ink text-white">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/dlc-logo-white.png"
            alt={company.name}
            width={137}
            height={68}
            className="h-10 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
            {company.tagline}. {company.secondaryTagline}.
          </p>

          <SocialLinks variant="dark" className="mt-7" />
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
            Contacto
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/60">
            <li>
              <a
                href={mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {company.addressFull}
              </a>
            </li>
            <li>
              <a
                href={`tel:${company.phoneE164}`}
                className="transition-colors hover:text-white"
              >
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className="break-all transition-colors hover:text-white"
              >
                {company.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
            Navegación
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/60">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-brand">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. Todos los derechos reservados.
          </p>
          <p>
            {company.city}, {company.country}
          </p>
        </Container>
      </div>
    </footer>
  );
}
