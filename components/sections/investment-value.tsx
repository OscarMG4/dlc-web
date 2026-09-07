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
    <section className="section-py bg-white">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Valor de tu inversión"
          title="Más que un lote: patrimonio con áreas comunes ya hechas"
          description="Todo lo que Finca Algarrobo ofrece hoy está respaldado por Grupo DLC en Chiclayo. Sin promesas vacías: lo que ves en renders y galería ya está ejecutado o forma parte del condominio."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {purchaseIncludes.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="card h-full border-t-2 border-t-brand p-6 sm:p-7">
                <p className="font-display text-base font-semibold tracking-tight text-ink">
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

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal>
            <p className="flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
              <span className="h-px w-8 bg-brand" aria-hidden />
              Para qué sirve tu lote
            </p>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Un terreno versátil para vivir, rentabilizar o crecer
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-500 sm:text-base">
              Cada familia le da un uso distinto. Estas son las formas en que
              nuestros clientes ya piensan su inversión en casa de campo.
            </p>

            <ul className="mt-8 border-t border-ink/10">
              {lotUses.map((use, index) => (
                <li
                  key={use.title}
                  className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-b border-ink/10 py-5"
                >
                  <span className="font-display text-sm font-bold tabular-nums text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold tracking-tight text-ink">
                      {use.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">
                      {use.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-lg border-t-2 border-brand bg-ink p-7 text-white sm:p-9">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Proceso de compra
              </p>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
                Así avanzas con Grupo DLC
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Te acompañamos de la primera consulta al cierre, con venta
                directa y atención personalizada.
              </p>

              <ol className="mt-8 border-t border-white/15">
                {buyingProcess.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[2rem_1fr] gap-x-4 border-b border-white/15 py-5"
                  >
                    <span className="font-display text-sm font-bold tabular-nums text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-sm font-semibold text-white">
                        {step.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-white/55">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <WhatsAppButton size="lg" className="mt-9 w-full bg-[#25D366] text-white shadow-[0_8px_28px_-8px_rgba(37,211,102,0.65)] hover:bg-[#1fb855] sm:w-auto">
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
