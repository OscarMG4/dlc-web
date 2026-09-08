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
          index="04"
          eyebrow="Valor de tu inversión"
          title="Más que un lote: patrimonio con áreas comunes ya hechas"
          description="Todo lo que Finca Algarrobo ofrece hoy está respaldado por Grupo DLC. Sin promesas vacías."
          tone="dark"
        />

        <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {purchaseIncludes.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1}>
              <article className="group h-full rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-all duration-300 hover:border-brand/30 hover:bg-brand/[0.07] sm:p-6">
                <p className="font-display text-base font-semibold tracking-tight text-white">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
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
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/85">
              Para qué sirve tu lote
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-[1.75rem]">
              Un terreno versátil para vivir, rentabilizar o crecer
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/50 sm:text-[0.95rem]">
              Cada familia le da un uso distinto. Estas son las formas en que
              nuestros clientes ya piensan su inversión.
            </p>

            <ul className="mt-7 space-y-1">
              {lotUses.map((use, index) => (
                <li
                  key={use.title}
                  className="grid grid-cols-[2rem_1fr] gap-x-3 rounded-xl px-2 py-4 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="font-display text-sm font-bold tabular-nums text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold tracking-tight text-white">
                      {use.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white/50">
                      {use.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative overflow-hidden rounded-2xl border border-brand/20 bg-gradient-to-br from-white via-[#fffdf8] to-brand-soft/40 p-5 text-ink shadow-[0_28px_70px_-40px_rgba(0,0,0,0.5)] sm:p-8">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-dark">
                Proceso de compra
              </p>
              <h3 className="mt-2.5 font-display text-xl font-bold tracking-tight sm:text-2xl">
                Así avanzas con Grupo DLC
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
                Te acompañamos de la primera consulta al cierre, con venta
                directa y atención personalizada.
              </p>

              <ol className="mt-6 space-y-1 border-t border-ink/8 pt-2">
                {buyingProcess.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[2rem_1fr] gap-x-3 py-3.5"
                  >
                    <span className="font-display text-sm font-bold tabular-nums text-brand">
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
                className="mt-7 w-full bg-[#25D366] text-white shadow-[0_8px_28px_-10px_rgba(37,211,102,0.55)] hover:bg-[#1fb855] sm:w-auto"
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
