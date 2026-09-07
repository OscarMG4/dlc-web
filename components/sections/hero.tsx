"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { ProjectImage } from "@/components/ui/project-image";
import { ArrowIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { hero, project, stats } from "@/lib/content";
import { cn } from "@/lib/utils";

// Alineado con el breakpoint `lg` de Tailwind: debajo de 1024px usa el
// video liviano; a partir de ahí, el de escritorio.
const DESKTOP_MQ = "(min-width: 1024px)";

function resolveHeroVideoSrc() {
  if (typeof window === "undefined") return hero.videoMobile;
  return window.matchMedia(DESKTOP_MQ).matches ? hero.video : hero.videoMobile;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.13]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) return;

    const applySrc = () => {
      const next = resolveHeroVideoSrc();
      const current = video.getAttribute("src") ?? "";
      if (current.endsWith(next)) {
        video.play().catch(() => {
          // El navegador puede bloquear autoplay; el poster cubre ese caso.
        });
        return;
      }

      video.setAttribute("src", next);
      video.load();
      video.play().catch(() => {
        // El navegador puede bloquear autoplay; el poster cubre ese caso.
      });
    };

    applySrc();

    const mq = window.matchMedia(DESKTOP_MQ);
    mq.addEventListener("change", applySrc);
    return () => mq.removeEventListener("change", applySrc);
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={shouldReduceMotion ? undefined : { y: mediaY, scale: mediaScale }}
      >
        {shouldReduceMotion ? (
          <ProjectImage
            src={hero.poster}
            alt={hero.imageAlt}
            fill
            priority
            tier="hero"
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 size-full object-cover object-center brightness-[1.08] contrast-[1.03]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={hero.poster}
            aria-label={hero.imageAlt}
          />
        )}
      </motion.div>

      <div className="pointer-events-none absolute inset-0 grain opacity-[0.08] mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />

      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <div className="mx-auto grid h-full max-w-7xl grid-cols-4 px-10">
          <div />
          <div className="border-l border-white/[0.07]" />
          <div className="border-l border-white/[0.07]" />
          <div className="border-l border-white/[0.07]" />
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-end pt-28 sm:pt-32">
        <Container className="pb-10 sm:pb-14 lg:pb-16">
          <motion.div
            className="flex flex-wrap items-center gap-x-4 gap-y-2.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3">
              <span className="animate-shimmer-line h-px w-9 bg-brand" aria-hidden />
              <p className="text-hero font-display text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-xs">
                {hero.eyebrow}
              </p>
            </div>

            <span className="inline-flex items-center gap-2 border-l-2 border-brand bg-ink/55 px-3 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:text-[11px]">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
              </span>
              {project.status}
            </span>
          </motion.div>

          <motion.h1
            className="text-hero text-balance mt-6 max-w-4xl font-display text-[2.4rem] font-normal leading-[1] tracking-[-0.035em] min-[390px]:text-[2.7rem] sm:mt-7 sm:text-6xl sm:font-light lg:text-[4.75rem] lg:leading-[0.95]"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            Tu <span className="font-bold text-brand">{hero.titleAccent}</span>
            <br />
            a minutos de la ciudad
          </motion.h1>

          <motion.p
            className="text-hero mt-6 max-w-lg text-base leading-relaxed sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <ButtonLink href="#proyecto" size="lg" className="group w-full min-[480px]:w-auto">
              Ver Finca Algarrobo
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>

            <a
              href="#galeria"
              className="group inline-flex items-center justify-center gap-2 border-b border-white/30 py-2 font-display text-sm font-semibold text-white transition-colors hover:border-brand hover:text-brand min-[480px]:justify-start"
            >
              Ver galería
              <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </Container>

        <motion.div
          className="border-t border-brand bg-ink/85 pb-[calc(4rem+env(safe-area-inset-bottom))] backdrop-blur-md sm:pb-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <Container>
            <ul className="grid grid-cols-3">
              {stats.map((stat, index) => (
                <li
                  key={stat.label}
                  title={stat.description}
                  className={cn(
                    "py-4 sm:py-6",
                    index > 0 && "border-l border-white/15 pl-4 sm:pl-8"
                  )}
                >
                  <p className="font-display text-2xl font-bold leading-none tracking-tight text-brand sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] font-medium uppercase leading-snug tracking-[0.14em] text-white/70 sm:mt-3 sm:text-xs">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </motion.div>
      </div>

      <a
        href="#galeria"
        aria-label="Ver la galería"
        className="group absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex xl:right-5"
      >
        <span className="relative h-14 w-px overflow-hidden bg-white/20">
          <span className="animate-scroll-hint absolute inset-x-0 top-0 h-1/2 bg-brand" />
        </span>
        <span className="rotate-180 font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50 transition-colors group-hover:text-white [writing-mode:vertical-rl]">
          Desliza
        </span>
      </a>
    </section>
  );
}
