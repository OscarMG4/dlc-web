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
    <section
      id="contacto"
      className="section-py relative overflow-hidden mesh-surface"
    >
      <Container className="relative">
        <SectionHeading
          index="09"
          eyebrow="Contacto"
          title="Conversemos sobre tu próxima inversión"
          description="Déjanos tus datos y un asesor te contactará con lotes, precios y formas de pago."
          align="center"
        />

        <div className="mx-auto mt-10 max-w-5xl sm:mt-12">
          <Reveal>
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {channels.map(({ Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-start gap-3.5 rounded-2xl bg-white/70 px-4 py-4 ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-soft sm:flex-col sm:gap-4 sm:px-5 sm:py-5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ink text-brand transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <span className="block font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-300">
                      {label}
                    </span>
                    <span className="mt-1.5 block text-sm font-medium leading-snug text-ink">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-5 overflow-hidden rounded-[1.75rem] bg-white shadow-elevated ring-1 ring-black/[0.04] sm:mt-6">
              <div className="flex flex-col gap-5 border-b border-ink/6 px-6 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-9 sm:py-8">
                <div>
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-dark">
                    Formulario
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    Solicita información
                  </h3>
                  <p className="mt-2 text-sm text-ink-500">
                    Te respondemos en menos de 24 horas hábiles.
                  </p>
                </div>
                <WhatsAppButton className="w-full shrink-0 bg-[#25D366] text-white shadow-[0_12px_32px_-14px_rgba(37,211,102,0.5)] hover:bg-[#1fb855] sm:w-auto">
                  <WhatsAppIcon className="size-4" />
                  WhatsApp
                </WhatsAppButton>
              </div>

              <div className="p-6 sm:p-9">
                <ContactForm />
              </div>

              <div className="flex flex-col gap-4 border-t border-ink/6 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-9">
                <p className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-300">
                  Síguenos
                </p>
                <SocialLinks variant="light" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
