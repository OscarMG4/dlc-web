import Image from "next/image";
import { AmenitiesShowcase } from "@/components/sections/amenities-showcase";
import { ArrowIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProjectImage } from "@/components/ui/project-image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { project } from "@/lib/content";

export function FeaturedProject() {
  return (
    <section id="proyecto" className="section-py relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] animate-aurora rounded-full bg-brand/8 blur-[100px]" />

      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="03"
            eyebrow="Proyecto destacado"
            title={project.headline}
            description={project.summary}
            tone="dark"
          />

          <Reveal delay={0.12}>
            <span className="inline-flex items-center gap-2 border-l-2 border-brand bg-white/5 px-3 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
              </span>
              {project.status}
            </span>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-12">
          <div className="group relative overflow-hidden rounded-lg">
            <div className="relative aspect-[16/10] sm:aspect-[21/9]">
              <ProjectImage
                src={project.cover}
                alt={`Vista aérea del proyecto ${project.name}`}
                fill
                tier="hero"
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
              <div>
                <Image
                  src="/brand/algarrobo-horizontal-white.png"
                  alt={project.name}
                  width={828}
                  height={212}
                  className="h-9 w-auto sm:h-12"
                />
                <p className="mt-3 max-w-md text-sm text-white/65">
                  Condominio campestre en Chiclayo con áreas comunes ejecutadas.
                </p>
              </div>

              <ButtonLink href="#contacto" size="lg" className="w-full shrink-0 sm:w-auto">
                Solicitar información
                <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ...project.highlights.slice(0, 1),
            {
              label: "Áreas comunes",
              value: `${project.amenities.length} ejecutadas`,
            },
            ...project.highlights.slice(2),
          ].map((highlight, index) => (
            <Reveal key={highlight.label} delay={index * 0.05}>
              <div className="h-full border-t border-white/20 pt-3.5 sm:pt-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/45 sm:text-xs">
                  {highlight.label}
                </p>
                <p className="mt-1.5 font-display text-base font-semibold tracking-tight text-white sm:text-lg">
                  {highlight.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <AmenitiesShowcase />
      </Container>
    </section>
  );
}
