import { ArrowIcon, PinIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { company, mapEmbedUrl, mapLinkUrl } from "@/lib/content";

export function Location() {
  return (
    <section id="ubicacion" className="section-py bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              index="05"
              eyebrow="Ubicación"
              title="Visítanos en nuestra oficina de Chiclayo"
              description="Te esperamos para resolver tus dudas, revisar el plano de lotes y coordinar una visita guiada al proyecto."
            />

            <Reveal delay={0.12} className="mt-9 space-y-4">
              <div className="card flex gap-4 border-l-2 border-l-brand p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded bg-brand-soft text-brand-dark">
                  <PinIcon className="size-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-ink">
                    {company.address}
                  </p>
                  <p className="mt-1 text-sm text-ink-500">
                    {company.city}, {company.region}, {company.country}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="card px-4 py-4">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-300">
                    Horario
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">Lun – Sáb</p>
                  <p className="text-xs text-ink-500">9:00 a.m. – 6:00 p.m.</p>
                </div>
                <div className="card px-4 py-4">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-300">
                    Atención
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">Presencial</p>
                  <p className="text-xs text-ink-500">Con cita previa</p>
                </div>
              </div>

              <ButtonLink
                href={mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                Cómo llegar
                <ArrowIcon className="size-4" />
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="card overflow-hidden border-t-2 border-t-brand p-1.5">
              <iframe
                src={mapEmbedUrl}
                title={`Mapa de ubicación de ${company.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-[320px] w-full rounded-sm border-0 sm:h-[440px]"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
