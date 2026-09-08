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

      <div className="absolute inset-0 bg-[#0c0b09]/55" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_15%_85%,rgba(253,185,12,0.2),transparent_55%),linear-gradient(90deg,rgba(8,7,6,0.65),transparent_65%)]"
        aria-hidden
      />

      <Container className="section-py relative z-10">
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/90">
              {project.status}
            </p>

            <h2 className="text-balance mt-4 font-display text-[1.75rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:mt-5 sm:text-[2.75rem]">
              Tu lote de <span className="text-brand">500 m²</span> te espera en
              Finca Algarrobo
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/65 sm:text-base">
              {company.secondaryTagline}. Agenda una visita o escríbenos hoy.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href="#contacto"
                size="lg"
                className="w-full shadow-[0_12px_36px_-12px_rgba(253,185,12,0.65)] sm:w-auto"
              >
                Quiero más información
                <ArrowIcon className="size-4" />
              </ButtonLink>

              <div className="grid grid-cols-2 gap-3 sm:contents">
                <WhatsAppButton
                  size="lg"
                  variant="outline"
                  className="w-full border-white/25 bg-white/[0.04] text-white hover:border-brand hover:bg-brand hover:text-ink sm:w-auto"
                >
                  <WhatsAppIcon className="size-4" />
                  WhatsApp
                </WhatsAppButton>

                <ContactFormButton
                  size="lg"
                  variant="outline"
                  className="w-full border-white/25 bg-white/[0.04] text-white hover:border-brand hover:bg-brand hover:text-ink sm:w-auto"
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
