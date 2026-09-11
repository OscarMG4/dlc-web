"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowIcon,
  FileTextIcon,
  HomeIcon,
  PinIcon,
  WaterDropIcon,
} from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { ProjectImage } from "@/components/ui/project-image";
import { gallery, hero, lotOffer, project } from "@/lib/content";
import { easeOutExpo } from "@/lib/motion";

// `lg` (1024px): video desktop; abajo, video móvil liviano.
const DESKTOP_MQ = "(min-width: 1024px)";

function resolveHeroVideoSrc() {
  if (typeof window === "undefined") return hero.videoMobile;
  return window.matchMedia(DESKTOP_MQ).matches ? hero.video : hero.videoMobile;
}

const heroFacts = [
  {
    Icon: HomeIcon,
    value: lotOffer.accentLine,
    label: "Para casas de campo",
    shortLabel: "500 m²",
  },
  {
    Icon: WaterDropIcon,
    value: "Agua en lote",
    label: "Punto de agua en cada lote",
    shortLabel: "Agua",
  },
  {
    Icon: PinIcon,
    value: "Capote",
    label: "Chiclayo – Capote",
    shortLabel: "Ubicación",
  },
] as const;

const previewGallery = gallery.slice(0, 5);

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [galleryIndex, setGalleryIndex] = useState(0);
  const current = previewGallery[galleryIndex] ?? previewGallery[0];
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 1.35, ease: easeOutExpo };

  const goGallery = (next: number) => {
    setGalleryIndex((next + previewGallery.length) % previewGallery.length);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) return;

    const applySrc = () => {
      const next = resolveHeroVideoSrc();
      const currentSrc = video.getAttribute("src") ?? "";
      if (currentSrc.endsWith(next)) {
        video.play().catch(() => {});
        return;
      }

      video.setAttribute("src", next);
      video.load();
      video.play().catch(() => {});
    };

    applySrc();

    const mq = window.matchMedia(DESKTOP_MQ);
    mq.addEventListener("change", applySrc);
    return () => mq.removeEventListener("change", applySrc);
  }, [shouldReduceMotion]);

  return (
    <section
      id="inicio"
      className="relative flex flex-col overflow-x-hidden bg-black text-white lg:h-[100svh] lg:min-h-0 lg:overflow-hidden"
    >
      <div className="absolute inset-0">
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
            className="absolute inset-0 size-full object-cover object-[center_30%] sm:object-center brightness-[1.05] contrast-[1.03]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={hero.poster}
            aria-label={hero.imageAlt}
          />
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/38 to-black/82 sm:bg-gradient-to-r sm:from-black/86 sm:via-black/58 sm:to-black/18 lg:from-black/80 lg:via-black/48 lg:to-black/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_48%_at_12%_38%,rgba(253,185,12,0.07),transparent_58%)]"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col pt-[4.75rem] sm:pt-24 lg:h-full lg:min-h-0 lg:pt-28">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 pb-6 sm:gap-8 sm:px-6 sm:pb-8 md:px-8 lg:grid lg:min-h-0 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-8 lg:px-10 lg:pb-5 xl:gap-12">
          <motion.div
            id="proyecto"
            className="flex min-w-0 flex-col justify-end lg:min-h-0"
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: { staggerChildren: 0.08, delayChildren: 0.45 },
              },
            }}
          >
            <motion.p
              className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-brand sm:text-[11px] sm:tracking-[0.22em]"
              variants={fadeUp}
              transition={transition}
            >
              Proyecto · {project.status}
            </motion.p>

            <motion.h1
              className="mt-3 sm:mt-4"
              variants={fadeUp}
              transition={transition}
            >
              <span className="sr-only">{project.name}</span>
              <span className="relative block h-10 w-[min(100%,220px)] min-[380px]:h-11 min-[380px]:w-[250px] sm:h-14 sm:w-[320px] md:h-16 md:w-[380px] lg:h-[4.25rem] lg:w-[min(100%,420px)]">
                <Image
                  src={project.logo}
                  alt={project.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 250px, (max-width: 1024px) 380px, 420px"
                  className="object-contain object-left drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
                />
              </span>
            </motion.h1>

            <motion.p
              className="mt-2 max-w-md text-[0.95rem] font-medium leading-snug text-white/85 sm:mt-3 sm:text-lg"
              variants={fadeUp}
              transition={transition}
            >
              {project.tagline}
            </motion.p>

            <motion.p
              className="mt-2 hidden max-w-lg text-sm leading-relaxed text-white/60 sm:mt-3 sm:line-clamp-3 sm:block lg:line-clamp-2 xl:line-clamp-3"
              variants={fadeUp}
              transition={transition}
            >
              {project.presentation}
            </motion.p>

            <motion.div
              className="relative mt-5 min-h-0 overflow-hidden rounded-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3),0_24px_60px_-28px_rgba(0,0,0,0.7)] sm:mt-6 sm:rounded-2xl lg:mt-5 lg:max-h-[min(38vh,340px)] xl:max-h-[min(42vh,400px)]"
              variants={fadeUp}
              transition={{ ...transition, duration: 1.55 }}
            >
              <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[200px]">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={current.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.4,
                    }}
                    className="absolute inset-0"
                  >
                    <ProjectImage
                      src={current.src}
                      alt={current.alt}
                      fill
                      tier="featured"
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                <ButtonLink
                  href="#areas-comunes"
                  size="sm"
                  className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1.5 text-[9px] tracking-[0.1em] shadow-[0_2px_8px_rgba(0,0,0,0.2),0_10px_28px_-12px_rgba(253,185,12,0.75)] sm:top-4 sm:left-4 sm:px-3 sm:text-[10px]"
                >
                  Ver galería
                </ButtonLink>

                <div className="absolute right-2.5 bottom-2.5 z-10 flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-1.5 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.3)] backdrop-blur-md sm:right-4 sm:bottom-4 sm:gap-1.5 sm:px-2 sm:py-1.5">
                  <button
                    type="button"
                    onClick={() => goGallery(galleryIndex - 1)}
                    aria-label="Foto anterior"
                    className="flex size-7 items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-brand hover:to-[#e8aa00] hover:text-ink sm:size-8"
                  >
                    <ArrowIcon className="size-3 rotate-180 transition-transform duration-300 hover:scale-110 sm:size-3.5" />
                  </button>
                  <span className="min-w-[2.25rem] text-center font-display text-[10px] font-semibold tabular-nums text-white/95 sm:min-w-[2.5rem] sm:text-[11px]">
                    {galleryIndex + 1}/{previewGallery.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => goGallery(galleryIndex + 1)}
                    aria-label="Foto siguiente"
                    className="flex size-7 items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-brand hover:to-[#e8aa00] hover:text-ink sm:size-8"
                  >
                    <ArrowIcon className="size-3 transition-transform duration-300 hover:scale-110 sm:size-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex min-w-0 flex-col justify-end pb-1 sm:pb-2 lg:pb-8 lg:pl-2 xl:pl-4"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 28, filter: "blur(6px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ ...transition, delay: 0.75 }}
          >
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 sm:text-[11px] sm:tracking-[0.2em]">
              {hero.eyebrow}
            </p>
            <h2 className="text-balance mt-2 max-w-md font-display text-[1.4rem] font-medium leading-[1.08] tracking-[-0.03em] min-[380px]:text-[1.55rem] sm:mt-3 sm:text-[2rem] md:text-[2.15rem] lg:text-[clamp(1.75rem,2.5vw,2.4rem)]">
              Tu{" "}
              <span className="font-bold text-brand">{hero.titleAccent}</span>
              <br />
              a minutos de la ciudad
            </h2>
            <p className="mt-2 max-w-md text-[0.85rem] leading-relaxed text-white/65 sm:mt-3 sm:text-sm lg:line-clamp-2 xl:line-clamp-none xl:text-[0.95rem]">
              {hero.subtitle}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href="#areas-comunes"
                size="lg"
                className="group w-full px-5 py-3 text-sm shadow-[0_12px_40px_-10px_rgba(253,185,12,0.75)] sm:w-auto sm:px-7 sm:py-3.5 sm:text-[0.9rem]"
              >
                Ver áreas comunes
                <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink
                href="#plano"
                size="lg"
                variant="outline"
                className="group w-full border-white/30 bg-white/[0.04] px-5 py-3 text-sm text-white hover:border-brand hover:bg-brand hover:text-ink sm:w-auto sm:px-7 sm:py-3.5 sm:text-[0.9rem]"
              >
                Ver plano
                <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>
            </div>
          </motion.div>
        </div>

        <div className="safe-bottom border-t border-white/[0.07] bg-black/55 shadow-[0_-12px_48px_rgba(0,0,0,0.3)] backdrop-blur-2xl pb-fab lg:pb-0">
          <div className="mx-auto max-w-7xl px-3 py-3.5 sm:px-6 sm:py-4 md:px-8 lg:px-10">
            <ul className="grid grid-cols-3 gap-2 sm:gap-5 md:gap-8 lg:flex lg:items-center lg:gap-14 xl:gap-16">
              {heroFacts.map(({ Icon, value, label, shortLabel }) => (
                <li
                  key={`bar-${label}`}
                  className="group flex min-w-0 flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:gap-3.5 sm:text-left"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-ink shadow-[0_8px_22px_-10px_rgba(253,185,12,0.85)] transition-transform duration-300 group-hover:scale-105 sm:size-10">
                    <Icon className="size-3.5 sm:size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[8px] font-semibold uppercase tracking-[0.1em] text-white/40 sm:text-[10px] sm:tracking-[0.14em]">
                      <span className="sm:hidden">{shortLabel}</span>
                      <span className="hidden sm:inline">{label}</span>
                    </span>
                    <span className="block truncate font-display text-[11px] font-semibold tracking-tight text-white min-[380px]:text-xs sm:text-sm md:text-[0.95rem]">
                      {value}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
