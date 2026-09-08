"use client";

import { ProjectImage } from "@/components/ui/project-image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { ArrowIcon, CloseIcon } from "@/components/icons";
import { commonAreasGallery } from "@/lib/content";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 48;

function amenityThumbSrc(src: string) {
  // Thumbs viven como .jpg aunque la foto grande sea .webp.
  const name =
    src.split("/").pop()?.replace(/\.(png|webp|jpe?g)$/i, ".jpg") ?? "";
  return `/projects/algarrobo/thumbs/${name}`;
}

export function AmenitiesGallery() {
  const [index, setIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const items = commonAreasGallery;
  const current = items[index];

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + items.length) % items.length);
    },
    [items.length]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(index + 1);
      if (event.key === "ArrowLeft") goTo(index - 1);
      if (event.key === "Escape") setIsLightboxOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, index]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0]?.clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta === undefined || Math.abs(delta) < SWIPE_THRESHOLD) return;
    goTo(delta < 0 ? index + 1 : index - 1);
  };

  return (
    <>
      <div
        id="galeria"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Galería de áreas comunes de Finca Algarrobo"
        className="overflow-hidden rounded-[1.35rem] bg-white/[0.03] ring-1 ring-white/10"
      >
        <div
          className="relative"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            aria-label={`Ampliar: ${current.title}`}
            className="group relative block w-full cursor-zoom-in"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9]">
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={current.image}
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.85,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0"
                >
                  <ProjectImage
                    src={current.image}
                    alt={current.alt}
                    fill
                    tier="gallery"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    priority={index === 0}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />
              <div
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
                aria-hidden
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-8 lg:p-10">
                <div className="max-w-xl pr-14 text-left sm:pr-0">
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-brand sm:text-[11px] sm:tracking-[0.18em]">
                    Área común · {String(index + 1).padStart(2, "0")} /{" "}
                    {String(items.length).padStart(2, "0")}
                  </p>
                  <p className="mt-1.5 font-display text-lg font-semibold text-white sm:mt-2 sm:text-3xl">
                    {current.title}
                  </p>
                  <p className="mt-1.5 line-clamp-2 max-w-md text-sm leading-relaxed text-white/70 sm:mt-2 sm:line-clamp-none sm:text-base">
                    {current.description}
                  </p>
                  <p className="mt-2.5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 text-[10px] font-medium text-white/75 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.3)] backdrop-blur-md sm:mt-3 sm:px-3.5 sm:text-xs">
                    Clic para ampliar · Desliza
                  </p>
                </div>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Área común anterior"
            className="absolute top-1/2 left-2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-white/30 bg-ink/60 text-white shadow-[0_2px_8px_rgba(0,0,0,0.2),0_12px_32px_-14px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-[350ms] hover:scale-[1.08] hover:border-brand hover:bg-gradient-to-br hover:from-brand hover:to-[#e8aa00] hover:text-ink hover:shadow-[0_4px_16px_rgba(253,185,12,0.4)] sm:left-5 sm:size-12"
          >
            <ArrowIcon className="size-4 transition-transform duration-300 group-hover:scale-110" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Siguiente área común"
            className="absolute top-1/2 right-2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-white/30 bg-ink/60 text-white shadow-[0_2px_8px_rgba(0,0,0,0.2),0_12px_32px_-14px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-[350ms] hover:scale-[1.08] hover:border-brand hover:bg-gradient-to-br hover:from-brand hover:to-[#e8aa00] hover:text-ink hover:shadow-[0_4px_16px_rgba(253,185,12,0.4)] sm:right-5 sm:size-12"
          >
            <ArrowIcon className="size-4 transition-transform duration-300 group-hover:scale-110" />
          </button>
        </div>

        <div className="bg-ink/90 px-4 py-4 sm:px-6 sm:py-5">
          <div className="h-0.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand via-[#ffe08a] to-brand transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: `${((index + 1) / items.length) * 100}%` }}
              role="progressbar"
              aria-valuenow={index + 1}
              aria-valuemin={1}
              aria-valuemax={items.length}
              aria-label="Progreso de áreas comunes"
            />
          </div>

          <div className="scroll-snap-x mt-3 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:thin] sm:mt-4 sm:gap-3">
            {items.map((item, itemIndex) => {
              const isActive = itemIndex === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => goTo(itemIndex)}
                  aria-label={`Ver ${item.title}`}
                  aria-current={isActive}
                  className={cn(
                    "group/thumb relative w-[4.75rem] shrink-0 snap-start text-left transition-all duration-300 min-[390px]:w-[5.5rem] sm:w-36",
                    !isActive && "opacity-55 hover:opacity-100"
                  )}
                >
                  <span
                    className={cn(
                      "relative block aspect-4/3 overflow-hidden rounded-lg transition-transform duration-300 group-hover/thumb:-translate-y-0.5",
                      isActive && "ring-2 ring-brand ring-offset-2 ring-offset-ink"
                    )}
                  >
                    <ProjectImage
                      src={amenityThumbSrc(item.image)}
                      alt=""
                      fill
                      tier="thumb"
                      sizes="144px"
                      className="object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                    />
                  </span>
                  <span
                    className={cn(
                      "mt-2 block truncate font-display text-[10px] font-semibold uppercase tracking-[0.08em] sm:text-[11px]",
                      isActive ? "text-brand" : "text-white/55"
                    )}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isLightboxOpen ? (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`Vista ampliada: ${current.title}`}
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setIsLightboxOpen(false);
              }}
              aria-label="Cerrar galería"
              className="absolute top-4 right-4 z-20 flex size-12 items-center justify-center rounded-full border-[1.5px] border-white/25 bg-ink/75 text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-brand hover:bg-gradient-to-br hover:from-brand hover:to-[#e8aa00] hover:text-ink sm:top-8 sm:right-8"
            >
              <CloseIcon className="size-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goTo(index - 1);
              }}
              aria-label="Área común anterior"
              className="absolute top-1/2 left-2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-white/25 bg-ink/75 text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-brand hover:bg-gradient-to-br hover:from-brand hover:to-[#e8aa00] hover:text-ink sm:left-8"
            >
              <ArrowIcon className="size-4 rotate-180" />
            </button>

            <div
              className="relative z-10 max-h-[90vh] w-full max-w-[min(96vw,1600px)]"
              onClick={(event) => event.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="relative aspect-16/10 max-h-[80vh] w-full overflow-hidden rounded-2xl">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={current.image}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                    className="absolute inset-0"
                  >
                    <ProjectImage
                      src={current.image}
                      alt={current.alt}
                      fill
                      tier="hero"
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-4 text-center">
                <p className="font-display text-sm font-semibold text-brand">
                  Área común
                </p>
                <p className="mt-1 font-display text-base font-semibold text-white">
                  {current.title}
                </p>
                <p className="mt-1 text-sm text-white/65">{current.description}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goTo(index + 1);
              }}
              aria-label="Siguiente área común"
              className="absolute top-1/2 right-2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-white/25 bg-ink/75 text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-brand hover:bg-gradient-to-br hover:from-brand hover:to-[#e8aa00] hover:text-ink sm:right-8"
            >
              <ArrowIcon className="size-4" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
