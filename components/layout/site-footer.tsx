import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";
import { company, mapLinkUrl } from "@/lib/content";

const links = [
  { href: "#plano", label: "Plano" },
  { href: "#inversion", label: "Inversión" },
  { href: "#areas-comunes", label: "Áreas comunes" },
  { href: "#reseñas", label: "Reseñas" },
  { href: "#nosotros", label: "Sobre nosotros" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#preguntas", label: "Preguntas" },
  { href: "#contacto", label: "Contacto" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden text-white panel-warm">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent"
        aria-hidden
      />

      <Container className="relative grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12">
        <div>
          <Image
            src="/brand/dlc-logo-white.png"
            alt={company.name}
            width={137}
            height={68}
            className="h-11 w-auto"
          />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-[1.7] text-white/45">
            {company.tagline}. {company.secondaryTagline}.
          </p>

          <SocialLinks variant="dark" className="mt-8" />
        </div>

        <div>
          <h3 className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
            Contacto
          </h3>
          <ul className="mt-6 space-y-3.5 text-sm text-white/55">
            <li>
              <a
                href={mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-brand"
              >
                {company.addressFull}
              </a>
            </li>
            <li>
              <a
                href={`tel:${company.phoneE164}`}
                className="transition-colors duration-300 hover:text-brand"
              >
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className="break-all transition-colors duration-300 hover:text-brand"
              >
                {company.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
            Navegación
          </h3>
          <ul className="mt-6 space-y-3.5 text-sm text-white/55">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="inline-flex items-center gap-2 transition-all duration-300 hover:gap-3 hover:text-brand"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/[0.07]">
        <Container className="flex flex-col gap-2 py-7 text-[11px] tracking-wide text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. Todos los derechos
            reservados.
          </p>
          <p>
            {company.city}, {company.country}
          </p>
        </Container>
      </div>
    </footer>
  );
}
