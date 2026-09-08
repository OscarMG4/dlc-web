"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { ProjectImage } from "@/components/ui/project-image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { project } from "@/lib/content";

type PlanKey = "master" | "lots";

const plans = {
  master: {
    src: project.planMaster,
    alt: project.planMasterAlt,
    label: "Plano maestro",
    caption: "Amenidades · lotes · disponibilidad",
    aspect: "1024 / 724",
    previewAspect: "aspect-[16/11]",
    maxWidth: "min(96vw,1100px)",
  },
  lots: {
    src: project.plan,
    alt: project.planAlt,
    label: "Lotización",
    caption: "Distribución de lotes y vías",
    aspect: "1808 / 2560",
    previewAspect: "aspect-[3/4] sm:aspect-[4/5]",
    maxWidth: "min(96vw,820px)",
  },
} as const;

export function ProjectPlan() {
  const [openPlan, setOpenPlan] = useState<PlanKey | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const active = openPlan ? plans[openPlan] : null;

  useEffect(() => {
    if (!openPlan) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPlan(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openPlan]);

  return (
    <section
      id="plano"
      aria-label={`Planos de ${project.name}`}
      className="section-py relative overflow-hidden mesh-surface"
    >
      <Container className="relative">
        <SectionHeading
          index="02"
          eyebrow="Plano del proyecto"
          title="Conoce la lotización de Finca Algarrobo"
          description="Explora el plano maestro con amenidades y la distribución de lotes. Amplía cada vista para revisarlo con detalle."
        />

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch lg:gap-7">
          <Reveal delay={0.06}>
            <button
              type="button"
              onClick={() => setOpenPlan("master")}
              aria-label="Ampliar plano maestro"
              className="group relative flex h-full w-full cursor-zoom-in flex-col overflow-hidden rounded-[1.35rem] bg-[#0c0b0a] text-left shadow-elevated transition-transform duration-500 hover:-translate-y-1"
            >
              <div className={`relative w-full ${plans.master.previewAspect}`}>
                <ProjectImage
                  src={plans.master.src}
                  alt={plans.master.alt}
                  fill
                  tier="gallery"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                <div>
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                    {plans.master.label}
                  </p>
                  <p className="mt-1.5 font-display text-lg font-semibold text-white sm:text-xl">
                    {plans.master.caption}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-brand px-3.5 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-ink shadow-[0_8px_24px_-10px_rgba(253,185,12,0.7)]">
                  Ampliar
                </span>
              </div>
            </button>
          </Reveal>

          <Reveal delay={0.12}>
            <button
              type="button"
              onClick={() => setOpenPlan("lots")}
              aria-label="Ampliar plano de lotización"
              className="group relative flex h-full w-full cursor-zoom-in flex-col overflow-hidden rounded-[1.35rem] bg-white text-left shadow-elevated ring-1 ring-black/[0.05] transition-transform duration-500 hover:-translate-y-1"
            >
              <div className={`relative w-full flex-1 ${plans.lots.previewAspect}`}>
                <ProjectImage
                  src={plans.lots.src}
                  alt={plans.lots.alt}
                  fill
                  tier="gallery"
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="object-contain object-top p-4 transition-transform duration-700 group-hover:scale-[1.02] sm:p-5"
                />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-ink/6 px-5 py-4 sm:px-6">
                <div>
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-dark">
                    {plans.lots.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-ink-500">
                    {plans.lots.caption}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-ink px-3.5 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                  Ampliar
                </span>
              </div>
            </button>
          </Reveal>
        </div>
      </Container>

      <AnimatePresence>
        {active ? (
          <motion.div
            key={`plan-lightbox-${openPlan}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-3 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.label} ampliado`}
            onClick={() => setOpenPlan(null)}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setOpenPlan(null);
              }}
              aria-label="Cerrar plano"
              className="absolute top-4 right-4 z-20 flex size-12 items-center justify-center rounded-full border border-white/20 bg-ink/70 text-white backdrop-blur-md transition-all duration-300 hover:border-brand hover:bg-brand hover:text-ink sm:top-8 sm:right-8"
            >
              <CloseIcon className="size-5" />
            </button>

            <div
              className="relative z-10 max-h-[90vh] w-full overflow-auto rounded-2xl bg-white p-2 sm:p-4"
              style={{ maxWidth: active.maxWidth }}
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className="relative mx-auto w-full"
                style={{ aspectRatio: active.aspect }}
              >
                <ProjectImage
                  src={active.src}
                  alt={active.alt}
                  fill
                  tier="hero"
                  sizes="1100px"
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
