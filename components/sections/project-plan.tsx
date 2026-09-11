"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import {
  CloseIcon,
  HomeIcon,
  PinIcon,
  WaterDropIcon,
} from "@/components/icons";
import { Container } from "@/components/ui/container";
import { ProjectImage } from "@/components/ui/project-image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { lotOffer, project } from "@/lib/content";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const planFacts: {
  Icon: IconType;
  title: string;
  description: string;
  detail: string;
}[] = [
  {
    Icon: HomeIcon,
    title: "Terreno",
    description: lotOffer.accentLine,
    detail: "Tu terreno desde 500 m² para casas de campo.",
  },
  {
    Icon: WaterDropIcon,
    title: "Punto de agua",
    description: "En cada lote",
    detail: "Listo para construir con abastecimiento en tu terreno.",
  },
  {
    Icon: PinIcon,
    title: "Ubicación",
    description: "Chiclayo – Capote",
    detail: "Campo cerca de la ciudad, en Capote.",
  },
];

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
      aria-label={`Plano de ${project.name}`}
      className="section-py relative overflow-hidden mesh-surface"
    >
      <Container className="relative">
        <SectionHeading
          index="02"
          eyebrow="Plano del proyecto"
          title="Conoce la lotización de Finca Algarrobo"
          description="Ubicado en Capote, Chiclayo. Terrenos desde 500 m² para casas de campo. Revisa lotes, amenidades y disponibilidad."
        />

        <Reveal delay={0.06} className="mt-8 sm:mt-10">
          <div>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-dark">
              Ventajas del proyecto
            </p>
            <p className="mt-2 max-w-xl text-sm text-ink-500">
              Tres puntos clave que diferencian tu inversión en Finca Algarrobo.
            </p>

            <ul className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4">
              {planFacts.map(({ Icon, title, description, detail }, index) => (
                <li
                  key={title}
                  className="group relative overflow-hidden rounded-[1.25rem] bg-white p-5 shadow-soft ring-1 ring-black/[0.05] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated sm:p-6"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-brand/70 to-transparent"
                    aria-hidden
                  />
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand/15 text-brand-dark transition-transform duration-300 group-hover:scale-105">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-display text-[11px] font-semibold tabular-nums tracking-[0.14em] text-ink/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-4 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-dark">
                    {title}
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
                    {description}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-6 sm:mt-8">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Ampliar plano del proyecto"
            className="group relative mx-auto block w-full max-w-5xl cursor-zoom-in overflow-hidden rounded-[1.35rem] bg-[#0c0b0a] shadow-elevated ring-1 ring-black/[0.05] transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="relative aspect-[1024/724] w-full">
              <ProjectImage
                src={project.plan}
                alt={project.planAlt}
                fill
                tier="gallery"
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 px-4 py-5 text-center sm:py-6">
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
            aria-label="Plano del proyecto ampliado"
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
              className="relative z-10 max-h-[90vh] w-full max-w-[min(96vw,1100px)] overflow-auto rounded-2xl bg-white p-2 sm:p-4"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className="relative mx-auto w-full"
                style={{ aspectRatio: "1024 / 724" }}
              >
                <ProjectImage
                  src={project.plan}
                  alt={project.planAlt}
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
