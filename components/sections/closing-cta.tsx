import { ProjectImage } from "@/components/ui/project-image";
import { ArrowIcon, MailIcon, WhatsAppIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ContactFormButton } from "@/components/widgets/contact-form-provider";
import { WhatsAppButton } from "@/components/widgets/whatsapp-provider";
import { company, project } from "@/lib/content";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <ProjectImage
          src="/projects/algarrobo/parque-aereo.webp"
          alt="Vista aérea del parque central de Finca Algarrobo"
          fill
          tier="hero"
          sizes="100vw"
          className="object-cover scale-[1.03]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#080807]/70 via-[#080807]/55 to-[#080807]/75" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_12%_85%,rgba(253,185,12,0.16),transparent_55%),linear-gradient(100deg,rgba(8,7,6,0.72)_0%,transparent_68%)]"
        aria-hidden
      />

      <Container className="section-py relative z-10">
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-brand/90">
              {project.status}
            </p>

            <h2 className="text-balance mt-5 font-display text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:mt-6 sm:text-[2.9rem]">
              Tu lote de <span className="text-brand">500 m²</span> te espera en
              Finca Algarrobo
            </h2>
            <p className="mt-5 max-w-lg text-[0.98rem] leading-[1.7] text-white/60 sm:mt-6 sm:text-[1.05rem]">
              {company.secondaryTagline}. Agenda una visita o escríbenos hoy.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href="#contacto"
                size="lg"
                className="w-full shadow-[0_16px_44px_-14px_rgba(253,185,12,0.7)] sm:w-auto"
              >
                Quiero más información
                <ArrowIcon className="size-4" />
              </ButtonLink>

              <div className="grid grid-cols-2 gap-3 sm:contents">
                <WhatsAppButton
                  size="lg"
                  variant="outline"
                  className="w-full border-white/25 bg-white/[0.05] text-white backdrop-blur-sm hover:border-brand hover:bg-brand hover:text-ink sm:w-auto"
                >
                  <WhatsAppIcon className="size-4" />
                  WhatsApp
                </WhatsAppButton>

                <ContactFormButton
                  size="lg"
                  variant="outline"
                  className="w-full border-white/25 bg-white/[0.05] text-white backdrop-blur-sm hover:border-brand hover:bg-brand hover:text-ink sm:w-auto"
                >
                  <MailIcon className="size-4" />
                  Correo
                </ContactFormButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
