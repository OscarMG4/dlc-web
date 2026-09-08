"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { ProjectImage } from "@/components/ui/project-image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { campoora } from "@/lib/content";

export function CompletedPlan() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <section
      id="campoora"
      aria-label={`Plano de ${campoora.name}`}
      className="section-py relative overflow-hidden text-white panel-warm"
    >
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <SectionHeading
            index="04"
            eyebrow={campoora.status}
            title={campoora.name}
            description={campoora.description}
            tone="dark"
          />

          <Reveal delay={0.08}>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label={`Ampliar plano de ${campoora.name}`}
              className="group relative w-full cursor-zoom-in overflow-hidden rounded-[1.35rem] bg-white/[0.03] ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/11] w-full">
                <ProjectImage
                  src={campoora.plan}
                  alt={campoora.planAlt}
                  fill
                  tier="gallery"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02] sm:p-5"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5 sm:p-6">
                <p className="font-display text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
                  {campoora.type} · {campoora.tagline}
                </p>
                <span className="shrink-0 rounded-full bg-brand px-3.5 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">
                  Ampliar
                </span>
              </div>
            </button>
          </Reveal>
        </div>
      </Container>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="campoora-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-3 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`Plano ampliado de ${campoora.name}`}
            onClick={() => setIsOpen(false)}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setIsOpen(false);
              }}
              aria-label="Cerrar plano"
              className="absolute top-4 right-4 z-20 flex size-11 items-center justify-center rounded-full border border-white/20 bg-ink/70 text-white backdrop-blur-sm transition-colors hover:border-brand hover:bg-brand hover:text-ink sm:top-8 sm:right-8"
            >
              <CloseIcon className="size-5" />
            </button>

            <div
              className="relative z-10 max-h-[90vh] w-full max-w-[min(96vw,1200px)] overflow-auto rounded-2xl bg-white p-2 sm:p-4"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className="relative mx-auto w-full"
                style={{ aspectRatio: "1024 / 705" }}
              >
                <ProjectImage
                  src={campoora.plan}
                  alt={campoora.planAlt}
                  fill
                  tier="hero"
                  sizes="1200px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
