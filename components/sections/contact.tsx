import { ContactForm } from "@/components/forms/contact-form";
import {
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SocialLinks } from "@/components/ui/social-links";
import { WhatsAppButton } from "@/components/widgets/whatsapp-provider";
import { company, mapLinkUrl } from "@/lib/content";

const channels = [
  {
    Icon: PinIcon,
    label: "Oficina",
    value: company.addressFull,
    href: mapLinkUrl,
    external: true,
  },
  {
    Icon: PhoneIcon,
    label: "Celular",
    value: company.phoneDisplay,
    href: `tel:${company.phoneE164}`,
    external: false,
  },
  {
    Icon: MailIcon,
    label: "Correo",
    value: company.email,
    href: `mailto:${company.email}`,
    external: false,
  },
];

export function Contact() {
  return (
    <section id="contacto" className="section-py relative overflow-hidden mesh-surface">
      <Container className="relative">
        <SectionHeading
          index="06"
          eyebrow="Contacto"
          title="Conversemos sobre tu próxima inversión"
          description="Déjanos tus datos y un asesor te contactará con lotes, precios y formas de pago."
          align="center"
        />

        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6">
          <Reveal>
            <div className="h-full rounded-2xl border border-black/5 bg-white/80 p-5 shadow-soft backdrop-blur-sm sm:p-8">
              <h3 className="font-display text-lg font-semibold text-ink">
                Datos de contacto
              </h3>
              <p className="mt-1.5 text-sm text-ink-500">
                También puedes escribirnos por cualquiera de estos canales.
              </p>

              <div className="mt-6 space-y-1">
                {channels.map(({ Icon, label, value, href, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex gap-3.5 rounded-xl px-2.5 py-3 transition-colors duration-300 hover:bg-brand-soft/70"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-dark transition-colors group-hover:bg-brand group-hover:text-ink">
                      <Icon className="size-3.5" />
                    </span>
                    <span>
                      <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-ink-300">
                        {label}
                      </span>
                      <span className="mt-0.5 block text-sm text-ink">
                        {value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-8 space-y-4 border-t border-ink/6 pt-6">
                <WhatsAppButton className="w-full shadow-[0_8px_24px_-10px_rgba(37,211,102,0.45)]">
                  <WhatsAppIcon className="size-4" />
                  Escribir por WhatsApp
                </WhatsAppButton>

                <div className="space-y-2.5">
                  <span className="text-xs font-medium text-ink-300">
                    Síguenos
                  </span>
                  <SocialLinks variant="light" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white/90 shadow-elevated">
              <div className="border-b border-ink/6 bg-gradient-to-r from-brand-soft/60 via-white to-white px-5 py-5 sm:px-8 sm:py-6">
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-dark">
                  Formulario
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                  Solicita información
                </h3>
                <p className="mt-1 text-sm text-ink-500">
                  Te respondemos en menos de 24 horas hábiles.
                </p>
              </div>
              <div className="p-5 sm:p-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
