"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { ProjectImage } from "@/components/ui/project-image";
import { project } from "@/lib/content";
import { easeOutExpo } from "@/lib/motion";

const panelHighlights = [
  {
    label: project.highlights[0].label,
    shortLabel: "Área",
    value: project.highlights[0].value,
  },
  {
    label: "Áreas comunes",
    shortLabel: "Áreas",
    value: `${project.amenities.length} hechas`,
  },
  {
    label: project.highlights[1].label,
    shortLabel: "Venta",
    value: project.highlights[1].value,
  },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-brand ring-1 ring-brand/25 sm:px-3">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-50" />
        <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
      </span>
      {project.status}
    </span>
  );
}

export function FeaturedProject() {
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 1.5, ease: easeOutExpo };

  return (
    <aside
      id="proyecto"
      aria-label={`Proyecto: ${project.name}`}
      className="relative flex flex-col overflow-hidden text-white lg:h-[100svh] lg:min-h-0 lg:border-r lg:border-brand/35"
      style={{
        background:
          "radial-gradient(ellipse 95% 70% at 85% -5%, rgba(253,185,12,0.38), transparent 55%), radial-gradient(ellipse 80% 55% at 0% 100%, rgba(253,185,12,0.22), transparent 50%), radial-gradient(ellipse 50% 40% at 50% 55%, rgba(253,185,12,0.1), transparent 60%), linear-gradient(165deg, #1c160c 0%, #120e09 45%, #0a0908 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-16 top-0 h-[55%] w-[70%] rounded-full bg-brand/20 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-[45%] w-[60%] rounded-full bg-brand/12 blur-[80px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay grain lg:opacity-[0.025]"
        aria-hidden
      />

      <div className="relative flex min-h-[100svh] flex-col lg:hidden">
        <motion.div
          className="relative h-[55svh] min-h-[280px] w-full shrink-0"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: easeOutExpo, delay: 0.2 }}
        >
          <ProjectImage
            src={project.cover}
            alt={`Vista aérea del proyecto ${project.name}`}
            fill
            tier="featured"
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-[#0c0b09]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand/30 via-brand/5 to-transparent" />

          <motion.div
            className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-12"
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: { staggerChildren: 0.14, delayChildren: 0.7 },
              },
            }}
          >
            <motion.div
              className="flex flex-wrap items-center gap-2.5"
              variants={fadeUp}
              transition={transition}
            >
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                Proyecto
              </p>
              <StatusBadge />
            </motion.div>
            <motion.h2
              className="mt-2 font-display text-[2.25rem] font-bold leading-[0.9] tracking-[-0.045em] min-[390px]:text-[2.55rem]"
              variants={fadeUp}
              transition={transition}
            >
              <span className="block text-white">Finca</span>
              <span className="mt-0.5 block text-brand">Algarrobo</span>
            </motion.h2>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex flex-1 flex-col justify-between gap-4 px-4 pb-24 pt-4 sm:pb-28"
          initial="hidden"
          animate="show"
          variants={{
            show: {
              transition: { staggerChildren: 0.12, delayChildren: 0.95 },
            },
          }}
        >
          <div>
            <motion.p
              className="text-sm font-normal leading-snug tracking-tight text-white/70"
              variants={fadeUp}
              transition={transition}
            >
              {project.tagline}
            </motion.p>
            <motion.p
              className="mt-2.5 text-[0.9rem] leading-relaxed text-white/60"
              variants={fadeUp}
              transition={transition}
            >
              {project.presentation}
            </motion.p>
          </div>

          <motion.div variants={fadeUp} transition={transition}>
            <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10">
              {panelHighlights.map((highlight) => (
                <div
                  key={highlight.label}
                  className="bg-black/35 px-1.5 py-2.5 text-center backdrop-blur-sm"
                >
                  <dt className="text-[8px] uppercase tracking-[0.1em] text-white/45">
                    {highlight.shortLabel}
                  </dt>
                  <dd className="mt-0.5 font-display text-[0.8rem] font-semibold text-brand">
                    {highlight.value}
                  </dd>
                </div>
              ))}
            </dl>

            <ButtonLink
              href="#contacto"
              size="md"
              variant="outline"
              className="group mt-3.5 w-full border-white/35 text-white hover:border-brand hover:bg-brand hover:text-ink"
            >
              Solicitar información
              <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </ButtonLink>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="relative hidden h-full min-h-0 flex-col px-8 pb-6 pt-28 xl:px-10 xl:pb-7 xl:pt-32 lg:flex"
        initial="hidden"
        animate="show"
        variants={{
          show: {
            transition: { staggerChildren: 0.12, delayChildren: 0.75 },
          },
        }}
      >
        <div className="shrink-0">
          <motion.div
            className="flex flex-wrap items-center gap-3"
            variants={fadeUp}
            transition={transition}
          >
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/80">
              Proyecto
            </p>
            <StatusBadge />
          </motion.div>

          <motion.h2
            className="mt-4 font-display text-[2.2rem] font-bold leading-[0.92] tracking-[-0.04em] xl:text-[2.55rem]"
            variants={fadeUp}
            transition={transition}
          >
            <span className="block text-white">Finca</span>
            <span className="mt-1 block text-brand">Algarrobo</span>
          </motion.h2>

          <motion.p
            className="mt-3 max-w-sm text-[0.9375rem] font-normal leading-snug text-white/55"
            variants={fadeUp}
            transition={transition}
          >
            {project.tagline}
          </motion.p>

          <motion.p
            className="mt-2.5 line-clamp-2 max-w-md text-sm leading-relaxed text-white/45 xl:line-clamp-3"
            variants={fadeUp}
            transition={transition}
          >
            {project.presentation}
          </motion.p>
        </div>

        <motion.div
          className="group relative mt-5 min-h-0 flex-1 overflow-hidden rounded-2xl shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
          variants={fadeUp}
          transition={{ ...transition, duration: 1.8 }}
        >
          <ProjectImage
            src={project.cover}
            alt={`Vista aérea del proyecto ${project.name}`}
            fill
            tier="featured"
            sizes="45vw"
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand/5 to-brand/25 opacity-90" />
        </motion.div>

        <motion.div
          className="mt-5 flex shrink-0 items-end justify-between gap-6 border-t border-brand/20 pt-4"
          variants={fadeUp}
          transition={transition}
        >
          <dl className="grid flex-1 grid-cols-3 gap-4">
            {panelHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.label}
                className={
                  index > 0 ? "border-l border-white/10 pl-4" : undefined
                }
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
              >
                <dt className="text-[10px] uppercase tracking-[0.14em] text-white/35">
                  {highlight.label}
                </dt>
                <dd className="mt-1 font-display text-base font-semibold tracking-tight text-brand">
                  {highlight.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        <motion.div variants={fadeUp} transition={transition}>
          <ButtonLink
            href="#contacto"
            size="md"
            variant="outline"
            className="group mt-4 w-fit border-white/25 bg-white/[0.03] text-white backdrop-blur-sm hover:border-brand hover:bg-brand hover:text-ink"
          >
            Solicitar información
            <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </ButtonLink>
        </motion.div>
      </motion.div>
    </aside>
  );
}
