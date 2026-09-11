import { ArrowIcon, PinIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  company,
  mapEmbedUrl,
  mapLinkUrl,
  projectLocation,
  projectMapEmbedUrl,
  projectMapLinkUrl,
} from "@/lib/content";

export function Location() {
  return (
    <section
      id="ubicacion"
      className="section-py relative overflow-hidden text-white panel-warm"
    >
      <div
        className="pointer-events-none absolute -left-24 top-1/4 size-[28rem] rounded-full bg-brand/[0.07] blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 size-[22rem] rounded-full bg-brand/[0.04] blur-[100px]"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-14">
          <SectionHeading
            index="07"
            eyebrow="Ubicación"
            title="Capote te espera. La oficina, en Chiclayo."
            description="Conoce Finca Algarrobo en campo y visítanos en oficina. Coordinamos tu recorrido guiado."
            tone="dark"
          />

          <Reveal delay={0.1}>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { label: "Proyecto", value: "Capote" },
                { label: "Ciudad", value: "Chiclayo" },
                { label: "Visita", value: "Guiada" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 text-center sm:px-4 sm:py-5"
                >
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    {item.label}
                  </p>
                  <p className="mt-2 font-display text-base font-semibold tracking-tight text-brand sm:text-lg">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-7">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white text-ink shadow-[0_28px_70px_-32px_rgba(0,0,0,0.65)]">
              <div
                className="absolute inset-x-0 top-0 z-10 h-1.5 bg-gradient-to-r from-brand via-[#ffe08a] to-brand"
                aria-hidden
              />
              <div className="relative">
                <iframe
                  src={projectMapEmbedUrl}
                  title={`Mapa de ${projectLocation.label} en ${projectLocation.place}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-[280px] w-full border-0 sm:h-[380px] lg:h-[420px]"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"
                  aria-hidden
                />
              </div>

              <div className="relative flex flex-1 flex-col px-6 pb-7 pt-2 sm:px-8 sm:pb-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-ink px-3.5 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                    Proyecto
                  </span>
                  <span className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                    {projectLocation.region}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-[1.85rem]">
                  {projectLocation.label}
                </h3>
                <p className="mt-1 font-display text-lg font-medium text-brand-dark sm:text-xl">
                  {projectLocation.place}
                </p>

                <div className="mt-5 flex gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-brand">
                    <PinIcon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">
                      Campo cerca de la ciudad
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-500">
                      Ubicación estratégica en Capote para vivir o invertir con
                      tranquilidad.
                    </p>
                  </div>
                </div>

                <ButtonLink
                  href={projectMapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  className="mt-7 w-full sm:w-auto"
                >
                  Cómo llegar al proyecto
                  <ArrowIcon className="size-4" />
                </ButtonLink>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04]">
              <div className="relative">
                <iframe
                  src={mapEmbedUrl}
                  title={`Mapa de la oficina de ${company.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-[220px] w-full border-0 sm:h-[260px] lg:h-[280px]"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0908] to-transparent"
                  aria-hidden
                />
              </div>

              <div className="flex flex-1 flex-col px-6 pb-7 pt-5 sm:px-7 sm:pb-8">
                <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Oficina comercial
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Visítanos en Chiclayo
                </h3>

                <div className="mt-4 flex gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                    <PinIcon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {company.address}
                    </p>
                    <p className="mt-0.5 text-sm text-white/45">
                      {company.city}, {company.region}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3.5">
                    <p className="font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                      Horario
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-white">
                      Lun – Sáb
                    </p>
                    <p className="mt-0.5 text-xs text-white/45">
                      9:00 a.m. – 6:00 p.m.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3.5">
                    <p className="font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                      Atención
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-white">
                      Presencial
                    </p>
                    <p className="mt-0.5 text-xs text-white/45">Con cita previa</p>
                  </div>
                </div>

                <ButtonLink
                  href={mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className="mt-6 w-full border-white/20 bg-white/[0.04] text-white hover:border-brand hover:bg-brand hover:text-ink sm:w-auto"
                >
                  Cómo llegar a la oficina
                  <ArrowIcon className="size-4" />
                </ButtonLink>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
