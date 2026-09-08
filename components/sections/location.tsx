import { ArrowIcon, PinIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { company, mapEmbedUrl, mapLinkUrl } from "@/lib/content";

export function Location() {
  return (
    <section id="ubicacion" className="section-py relative overflow-hidden mesh-surface">
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
          <div>
            <SectionHeading
              index="05"
              eyebrow="Ubicación"
              title="Visítanos en nuestra oficina de Chiclayo"
              description="Te esperamos para resolver tus dudas, revisar el plano de lotes y coordinar una visita guiada."
            />

            <Reveal delay={0.1} className="mt-8 space-y-3">
              <div className="flex gap-4 rounded-2xl border border-black/5 bg-white/80 p-5 shadow-soft backdrop-blur-sm transition-all duration-300 hover:border-brand/25">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-dark">
                  <PinIcon className="size-4" />
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
                <div className="rounded-2xl border border-black/5 bg-white/70 px-4 py-4 backdrop-blur-sm">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-300">
                    Horario
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-ink">Lun – Sáb</p>
                  <p className="text-xs text-ink-500">9:00 a.m. – 6:00 p.m.</p>
                </div>
                <div className="rounded-2xl border border-black/5 bg-white/70 px-4 py-4 backdrop-blur-sm">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-300">
                    Atención
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-ink">Presencial</p>
                  <p className="text-xs text-ink-500">Con cita previa</p>
                </div>
              </div>

              <ButtonLink
                href={mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="mt-1 border-ink/10 hover:border-brand hover:bg-brand hover:text-ink"
              >
                Cómo llegar
                <ArrowIcon className="size-4" />
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-2xl bg-white/70 p-1.5 shadow-elevated ring-1 ring-black/5">
              <iframe
                src={mapEmbedUrl}
                title={`Mapa de ubicación de ${company.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-[260px] w-full rounded-xl border-0 sm:h-[420px]"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
