"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { ProjectImage } from "@/components/ui/project-image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { project } from "@/lib/content";

export function ProjectPlan() {
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
      id="plano"
      aria-label={`Plano de lotización de ${project.name}`}
      className="section-py relative overflow-hidden mesh-surface"
    >
      <Container className="relative">
        <SectionHeading
          index="02"
          eyebrow="Plano del proyecto"
          title="Conoce la lotización de Finca Algarrobo"
          description="Revisa la distribución de lotes, vías y áreas del condominio. Amplía el plano para verlo con detalle."
        />

        <Reveal delay={0.08} className="mt-10 sm:mt-12">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Ampliar plano de lotización"
            className="group relative mx-auto block w-full max-w-3xl cursor-zoom-in overflow-hidden rounded-[1.35rem] bg-white shadow-elevated ring-1 ring-black/[0.05] transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="relative aspect-[3/4] w-full sm:aspect-[4/5]">
              <ProjectImage
                src={project.plan}
                alt={project.planAlt}
                fill
                tier="gallery"
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain object-top p-3 transition-transform duration-700 group-hover:scale-[1.02] sm:p-5"
              />
            </div>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 py-5 text-center sm:py-6">
              <span className="inline-flex rounded-full bg-brand px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-ink shadow-[0_8px_24px_-10px_rgba(253,185,12,0.7)]">
                Clic para ampliar
              </span>
            </span>
          </button>
        </Reveal>
      </Container>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="plan-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-3 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Plano de lotización ampliado"
            onClick={() => setIsOpen(false)}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setIsOpen(false);
              }}
              aria-label="Cerrar plano"
              className="absolute top-4 right-4 z-20 flex size-12 items-center justify-center rounded-full border border-white/20 bg-ink/70 text-white backdrop-blur-md transition-all duration-300 hover:border-brand hover:bg-brand hover:text-ink sm:top-8 sm:right-8"
            >
              <CloseIcon className="size-5" />
            </button>

            <div
              className="relative z-10 max-h-[90vh] w-full max-w-[min(96vw,820px)] overflow-auto rounded-2xl bg-white p-2 sm:p-4"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className="relative mx-auto w-full"
                style={{ aspectRatio: "1808 / 2560" }}
              >
                <ProjectImage
                  src={project.plan}
                  alt={project.planAlt}
                  fill
                  tier="hero"
                  sizes="820px"
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
