import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section
      id="preguntas"
      aria-label="Preguntas frecuentes sobre Finca Algarrobo y Grupo DLC"
      className="section-py relative overflow-hidden mesh-surface"
    >
      <Container className="relative">
        <SectionHeading
          index="08"
          eyebrow="Preguntas frecuentes"
          title="Respuestas claras antes de tu visita"
          description="Lo que más consultan las familias sobre terrenos en Capote, Chiclayo y Finca Algarrobo."
        />

        <div className="mx-auto mt-10 max-w-3xl space-y-3 sm:mt-12">
          {faqs.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.05}>
              <details className="group rounded-[1.25rem] bg-white/80 ring-1 ring-black/[0.04] open:shadow-soft transition-shadow duration-300">
                <summary className="cursor-pointer list-none px-5 py-4 font-display text-[0.98rem] font-semibold tracking-tight text-ink marker:content-none sm:px-6 sm:py-5 sm:text-lg [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <span>{item.question}</span>
                    <span
                      aria-hidden
                      className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/15 font-display text-sm text-brand-dark transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="border-t border-ink/6 px-5 pb-5 pt-3 text-sm leading-relaxed text-ink-500 sm:px-6 sm:pb-6 sm:text-[0.95rem]">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
