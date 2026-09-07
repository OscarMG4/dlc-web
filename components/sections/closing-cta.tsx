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
          src="/projects/algarrobo/parque-aereo.png"
          alt="Vista aérea del parque central de Finca Algarrobo"
          fill
          tier="hero"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-ink/55" />

      <Container className="section-py relative z-10">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              <span className="h-px w-8 bg-brand" aria-hidden />
              {project.status}
            </p>

            <h2 className="text-balance mt-5 font-display text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl">
              Tu lote de 500 m² te espera en Finca Algarrobo
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              {company.secondaryTagline}. Agenda una visita o escríbenos hoy mismo.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#contacto" size="lg">
                Quiero más información
                <ArrowIcon className="size-4" />
              </ButtonLink>

              <WhatsAppButton
                size="lg"
                variant="outline"
                className="border-white/35 text-white hover:border-white hover:bg-white hover:text-ink"
              >
                <WhatsAppIcon className="size-4" />
                WhatsApp
              </WhatsAppButton>

              <ContactFormButton
                size="lg"
                variant="outline"
                className="border-white/35 text-white hover:border-white hover:bg-white hover:text-ink"
              >
                <MailIcon className="size-4" />
                Correo
              </ContactFormButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
