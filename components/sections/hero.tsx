"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { ProjectImage } from "@/components/ui/project-image";
import { ArrowIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { FeaturedProject } from "@/components/sections/featured-project";
import { hero } from "@/lib/content";
import { easeOutExpo } from "@/lib/motion";

// `lg` (1024px): video desktop; abajo, video móvil liviano.
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

  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.14]);
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.55]);

  const load = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 1.55, ease: easeOutExpo };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) return;

    const applySrc = () => {
      const next = resolveHeroVideoSrc();
      const current = video.getAttribute("src") ?? "";
      if (current.endsWith(next)) {
        video.play().catch(() => {
        });
        return;
      }

      video.setAttribute("src", next);
      video.load();
      video.play().catch(() => {
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
      className="relative flex flex-col bg-[#080807] lg:grid lg:h-[100svh] lg:min-h-0 lg:grid-cols-[1.05fr_0.95fr] lg:overflow-hidden"
    >
      <FeaturedProject />

      <div className="relative flex min-h-[42svh] flex-col overflow-hidden border-t border-brand/50 sm:min-h-[46svh] lg:min-h-0 lg:h-full lg:border-t-0">
        <motion.div
          className="absolute inset-0"
          initial={shouldReduceMotion ? false : { scale: 1.1, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: easeOutExpo }}
        >
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={
              shouldReduceMotion
                ? undefined
                : { y: mediaY, scale: mediaScale, opacity: mediaOpacity }
            }
          >
            {shouldReduceMotion ? (
              <ProjectImage
                src={hero.poster}
                alt={hero.imageAlt}
                fill
                priority
                tier="hero"
                sizes="(max-width: 1024px) 100vw, 48vw"
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
        </motion.div>

        <div className="pointer-events-none absolute inset-0 grain opacity-[0.08] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/35 via-transparent to-transparent" />

        <div className="relative z-10 mt-auto px-4 pb-5 pt-8 sm:px-8 sm:pb-7 lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
          <motion.div
            className="flex flex-wrap items-center gap-x-4 gap-y-2.5"
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ ...load, delay: 0.85 }}
          >
            <div className="inline-flex max-w-full items-center gap-3">
              <span className="animate-shimmer-line h-px w-7 shrink-0 bg-brand sm:w-9" aria-hidden />
              <p className="text-hero font-display text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.22em]">
                {hero.eyebrow}
              </p>
            </div>
          </motion.div>

          <motion.h1
            className="text-hero text-balance mt-2 max-w-xl font-display text-[1.45rem] font-normal leading-[1.02] tracking-[-0.035em] min-[390px]:text-[1.65rem] sm:mt-3 sm:text-3xl sm:font-light lg:text-[2.35rem] lg:leading-[0.95] xl:text-[2.75rem]"
            initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ ...load, delay: 1.05 }}
          >
            Tu{" "}
            <span className="animate-text-shine bg-gradient-to-r from-brand via-[#ffe08a] to-brand bg-[length:200%_auto] bg-clip-text font-bold text-transparent">
              {hero.titleAccent}
            </span>
            <br />
            a minutos de la ciudad
          </motion.h1>

          <motion.p
            className="text-hero mt-2 hidden max-w-md text-[0.85rem] leading-relaxed sm:mt-2.5 sm:block sm:text-sm lg:line-clamp-2 lg:text-[0.9rem]"
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ ...load, delay: 1.25 }}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            className="mt-3 sm:mt-3.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...load, delay: 1.4 }}
          >
            <ButtonLink
              href="#areas-comunes"
              size="lg"
              className="group w-full px-5 py-2.5 text-sm shadow-[0_12px_40px_-10px_rgba(253,185,12,0.75)] sm:w-auto sm:px-7 sm:py-3 sm:text-[0.9rem]"
            >
              Ver áreas comunes
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
