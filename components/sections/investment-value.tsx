import {
  ArrowIcon,
  FileTextIcon,
  PinIcon,
  WaterDropIcon,
} from "@/components/icons";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  buyingProcess,
  lotUses,
  project,
  purchaseIncludes,
} from "@/lib/content";
import { WhatsAppButton } from "@/components/widgets/whatsapp-provider";
import type { ComponentType, SVGProps } from "react";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const featuredMeta: Record<
  string,
  { Icon: IconType; accent: string }
> = {
  "Punto de agua en cada lote": {
    Icon: WaterDropIcon,
    accent: "from-brand/25 to-transparent",
  },
  "Minuta y escritura pública": {
    Icon: FileTextIcon,
    accent: "from-brand/30 to-transparent",
  },
  "Ubicación Chiclayo – Capote": {
    Icon: PinIcon,
    accent: "from-brand/20 to-transparent",
  },
};

export function InvestmentValue() {
  const amenityCount = project.amenities.length;
  const featuredTitles = new Set(Object.keys(featuredMeta));
  const featured = purchaseIncludes.filter((item) =>
    featuredTitles.has(item.title)
  );
  const rest = purchaseIncludes.filter(
    (item) => !featuredTitles.has(item.title)
  );

  return (
    <section
      id="inversion"
      className="section-py relative overflow-hidden mesh-surface"
    >
      <div
        className="pointer-events-none absolute -right-16 top-8 size-[22rem] rounded-full bg-brand/[0.07] blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-10 size-[18rem] rounded-full bg-brand/[0.04] blur-[90px]"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12">
          <SectionHeading
            index="03"
            eyebrow="Valor de tu inversión"
            title="Más que un lote: patrimonio con áreas comunes ya hechas"
            description="Todo lo que Finca Algarrobo ofrece hoy está respaldado por Grupo DLC. Sin promesas vacías."
          />

          <Reveal delay={0.1}>
            <div className="rounded-[1.5rem] border border-brand/25 bg-gradient-to-br from-brand/20 via-brand/5 to-white p-5 shadow-soft sm:p-6">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-dark">
                Lo que incluye tu compra
              </p>
              <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
                Agua · Escritura · Capote
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Tres pilares que hacen de este proyecto una decisión más segura
                y concreta.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
          {featured.map((item, index) => {
            const meta = featuredMeta[item.title];
            const Icon = meta?.Icon ?? PinIcon;

            return (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-[1.5rem] bg-white text-ink shadow-elevated ring-1 ring-black/[0.04] transition-transform duration-500 hover:-translate-y-1.5">
                  <div
                    className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-br ${meta?.accent ?? "from-brand/30 to-transparent"}`}
                    aria-hidden
                  />
                  <div className="relative p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex size-14 items-center justify-center rounded-2xl bg-ink text-brand shadow-[0_12px_28px_-14px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                        <Icon className="size-6" />
                      </span>
                      <span className="font-display text-sm font-bold tabular-nums text-brand-dark">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-semibold tracking-tight sm:text-[1.35rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {rest.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <article className="group h-full rounded-[1.25rem] bg-white/80 p-5 shadow-soft ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated sm:p-6">
                <span className="font-display text-[11px] font-semibold tabular-nums text-brand-dark">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-display text-base font-semibold tracking-tight text-ink">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {item.title === "Áreas comunes ejecutadas"
                    ? `${amenityCount} espacios compartidos. ${item.description}`
                    : item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
          <Reveal>
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/35">
              Para qué sirve tu lote
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.85rem]">
              Un terreno versátil para vivir, rentabilizar o crecer
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-500 sm:text-[0.95rem]">
              Cada familia le da un uso distinto. Estas son las formas en que
              nuestros clientes ya piensan su inversión.
            </p>

            <ul className="mt-8 space-y-3">
              {lotUses.map((use, index) => (
                <li
                  key={use.title}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 rounded-2xl bg-white/80 px-4 py-4 shadow-soft ring-1 ring-black/[0.04] transition-colors duration-300 hover:ring-brand/25"
                >
                  <span className="font-display text-sm font-semibold tabular-nums text-brand-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold tracking-tight text-ink">
                      {use.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                      {use.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#0a0908] p-7 text-white shadow-elevated sm:p-10">
              <div
                className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-brand/25 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand via-[#ffe08a] to-brand"
                aria-hidden
              />
              <p className="relative font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                Proceso de compra
              </p>
              <h3 className="relative mt-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                Así avanzas con Grupo DLC
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-white/50">
                Te acompañamos de la primera consulta al cierre, con venta
                directa y atención personalizada.
              </p>

              <ol className="relative mt-8 space-y-0 border-t border-white/10 pt-2">
                {buyingProcess.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[2.25rem_1fr] gap-x-4 py-4"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-brand/20 font-display text-xs font-bold tabular-nums text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-sm font-semibold text-white">
                        {step.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-white/50">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <WhatsAppButton
                size="lg"
                className="relative mt-8 w-full bg-[#25D366] text-white shadow-[0_12px_32px_-12px_rgba(37,211,102,0.55)] hover:bg-[#1fb855] sm:w-auto"
              >
                Empezar por WhatsApp
                <ArrowIcon className="size-4" />
              </WhatsAppButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
