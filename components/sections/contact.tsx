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
          index="08"
          eyebrow="Contacto"
          title="Conversemos sobre tu próxima inversión"
          description="Déjanos tus datos y un asesor te contactará con lotes, precios y formas de pago."
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="h-full rounded-[1.35rem] bg-white/75 p-7 shadow-soft ring-1 ring-black/[0.04] backdrop-blur-sm sm:p-9">
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                Datos de contacto
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                También puedes escribirnos por cualquiera de estos canales.
              </p>

              <div className="mt-8 divide-y divide-ink/8 border-y border-ink/8">
                {channels.map(({ Icon, label, value, href, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex gap-4 py-4 transition-colors duration-300 first:pt-5 last:pb-5 hover:bg-brand-soft/40"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/12 text-brand-dark transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-ink-300">
                        {label}
                      </span>
                      <span className="mt-1 block text-sm font-medium text-ink">
                        {value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-8 space-y-5">
                <WhatsAppButton className="w-full bg-[#25D366] text-white shadow-[0_12px_32px_-14px_rgba(37,211,102,0.5)] hover:bg-[#1fb855]">
                  <WhatsAppIcon className="size-4" />
                  Escribir por WhatsApp
                </WhatsAppButton>

                <div className="space-y-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink-300">
                    Síguenos
                  </span>
                  <SocialLinks variant="light" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-[1.35rem] bg-white/85 shadow-elevated ring-1 ring-black/[0.04]">
              <div className="border-b border-ink/6 bg-gradient-to-br from-brand-soft/80 via-white to-white px-7 py-7 sm:px-9 sm:py-8">
                <p className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-dark">
                  Formulario
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
                  Solicita información
                </h3>
                <p className="mt-2 text-sm text-ink-500">
                  Te respondemos en menos de 24 horas hábiles.
                </p>
              </div>
              <div className="p-7 sm:p-9">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
