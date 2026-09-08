import { ArrowIcon } from "@/components/icons";
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

export function InvestmentValue() {
  const amenityCount = project.amenities.length;

  return (
    <section className="section-py relative overflow-hidden text-white panel-warm">
      <Container className="relative">
        <SectionHeading
          index="06"
          eyebrow="Valor de tu inversión"
          title="Más que un lote: patrimonio con áreas comunes ya hechas"
          description="Todo lo que Finca Algarrobo ofrece hoy está respaldado por Grupo DLC. Sin promesas vacías."
          tone="dark"
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {purchaseIncludes.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} className="h-full bg-[#0c0b0a]">
              <article className="group h-full p-6 transition-colors duration-500 hover:bg-gradient-to-br hover:from-brand/[0.12] hover:to-transparent sm:p-8">
                <span className="font-display text-[11px] font-semibold tabular-nums text-brand/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 font-display text-base font-semibold tracking-tight text-white sm:text-lg">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/45">
                  {item.title === "Áreas comunes ejecutadas"
                    ? `${amenityCount} espacios compartidos. ${item.description}`
                    : item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <Reveal>
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Para qué sirve tu lote
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white sm:text-[1.85rem]">
              Un terreno versátil para vivir, rentabilizar o crecer
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/45 sm:text-[0.95rem]">
              Cada familia le da un uso distinto. Estas son las formas en que
              nuestros clientes ya piensan su inversión.
            </p>

            <ul className="mt-8 divide-y divide-white/8 border-y border-white/8">
              {lotUses.map((use, index) => (
                <li
                  key={use.title}
                  className="grid grid-cols-[2.25rem_1fr] gap-x-4 py-5 transition-colors duration-300 hover:bg-white/[0.02]"
                >
                  <span className="font-display text-sm font-semibold tabular-nums text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold tracking-tight text-white">
                      {use.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/45">
                      {use.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#fffdf8] to-brand-soft/60 p-7 text-ink shadow-[0_32px_80px_-40px_rgba(0,0,0,0.55)] sm:p-10">
              <div
                className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand/20 blur-3xl"
                aria-hidden
              />
              <p className="relative font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-dark">
                Proceso de compra
              </p>
              <h3 className="relative mt-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                Así avanzas con Grupo DLC
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-ink-500">
                Te acompañamos de la primera consulta al cierre, con venta
                directa y atención personalizada.
              </p>

              <ol className="relative mt-8 space-y-0 border-t border-ink/8 pt-2">
                {buyingProcess.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[2.25rem_1fr] gap-x-4 py-4"
                  >
                    <span className="font-display text-sm font-semibold tabular-nums text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-sm font-semibold text-ink">
                        {step.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-500">
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
