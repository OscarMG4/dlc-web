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
    <section id="contacto" className="section-py mesh-surface">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Contacto"
          title="Conversemos sobre tu próxima inversión"
          description="Déjanos tus datos y un asesor te contactará con la lista de lotes disponibles, precios y formas de pago."
          align="center"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="card h-full p-8 sm:p-9">
              <h3 className="font-display text-lg font-semibold text-ink">
                Datos de contacto
              </h3>
              <p className="mt-2 text-sm text-ink-500">
                También puedes escribirnos directamente por cualquiera de estos
                canales.
              </p>

              <div className="mt-8 space-y-6">
                {channels.map(({ Icon, label, value, href, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex gap-4"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded bg-brand-soft text-brand-dark transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-[0.12em] text-ink-300">
                        {label}
                      </span>
                      <span className="mt-0.5 block text-sm text-ink transition-colors group-hover:text-brand-dark">
                        {value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-10 space-y-5 border-t border-ink/8 pt-8">
                <WhatsAppButton className="w-full">
                  <WhatsAppIcon className="size-4" />
                  Escribir por WhatsApp
                </WhatsAppButton>

                <div className="space-y-3">
                  <span className="text-xs font-medium text-ink-300">
                    Síguenos
                  </span>
                  <SocialLinks variant="light" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card overflow-hidden border-t-2 border-t-brand">
              <div className="border-b border-ink/10 bg-surface px-8 py-6 sm:px-9">
                <h3 className="font-display text-lg font-semibold text-ink">
                  Solicita información
                </h3>
                <p className="mt-1 text-sm text-ink-500">
                  Te respondemos en menos de 24 horas hábiles.
                </p>
              </div>
              <div className="p-8 sm:p-9">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
