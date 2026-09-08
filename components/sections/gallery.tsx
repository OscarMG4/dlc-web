"use client";

import { ProjectImage } from "@/components/ui/project-image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { ArrowIcon, CloseIcon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { gallery } from "@/lib/content";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 48;

function galleryThumbSrc(src: string) {
  // Las miniaturas viven como .jpg; las imágenes grandes pueden ser .webp/.png.
  const name =
    src.split("/").pop()?.replace(/\.(png|webp|jpe?g)$/i, ".jpg") ?? "";
  return `/projects/algarrobo/thumbs/${name}`;
}

export function Gallery() {
  const [index, setIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const goTo = useCallback((next: number) => {
    setIndex((next + gallery.length) % gallery.length);
  }, []);

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

  const current = gallery[index];

  return (
    <>
      <section id="galeria" className="section-py mesh-surface">
        <Container>
          <SectionHeading
            index="04"
            eyebrow="Galería"
            title="Así se vive Finca Algarrobo"
            description="Recorre las áreas comunes del condominio: parque central, zonas deportivas, alameda arborizada y espacios de descanso."
          />

          <div
            className="mt-14"
            role="region"
            aria-roledescription="carrusel"
            aria-label="Galería del proyecto Finca Algarrobo"
          >
            <div
              className="relative overflow-hidden rounded-lg bg-ink-100"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                aria-label={`Ampliar: ${current.caption}`}
                className="group relative block w-full cursor-zoom-in"
              >
                <div className="relative aspect-16/10 sm:aspect-16/9">
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.div
                      key={current.src}
                      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute inset-0"
                    >
                      <ProjectImage
                        src={current.src}
                        alt={current.alt}
                        fill
                        tier="gallery"
                        sizes="(max-width: 1152px) 100vw, 1152px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        priority={index === 0}
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end gap-4 p-4 pb-5 sm:p-8">
                    <div className="text-left">
                      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.15em] text-brand">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(gallery.length).padStart(2, "0")}
                      </p>
                      <p className="mt-2 font-display text-lg font-semibold text-white sm:text-2xl">
                        {current.caption}
                      </p>
                      <p className="mt-1 text-[11px] text-white/55 sm:hidden">
                        Toca para ampliar
                      </p>
                      <p className="mt-1 hidden text-xs text-white/50 sm:block">
                        Clic para ampliar · Desliza en móvil
                      </p>
                    </div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Imagen anterior"
                className="absolute top-1/2 left-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-ink/50 text-white backdrop-blur-sm transition-all duration-300 hover:border-brand hover:bg-brand hover:text-ink sm:left-5"
              >
                <ArrowIcon className="size-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Siguiente imagen"
                className="absolute top-1/2 right-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-ink/50 text-white backdrop-blur-sm transition-all duration-300 hover:border-brand hover:bg-brand hover:text-ink sm:right-5"
              >
                <ArrowIcon className="size-4" />
              </button>
            </div>

            <div className="mt-3 h-0.5 overflow-hidden bg-ink-100">
              <div
                className="h-full bg-brand transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ width: `${((index + 1) / gallery.length) * 100}%` }}
                role="progressbar"
                aria-valuenow={index + 1}
                aria-valuemin={1}
                aria-valuemax={gallery.length}
                aria-label="Progreso de la galería"
              />
            </div>

            <div className="scroll-snap-x -mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
              {gallery.map((item, itemIndex) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => goTo(itemIndex)}
                  aria-label={`Ver ${item.caption}`}
                  aria-current={itemIndex === index}
                  className={cn(
                    "relative aspect-4/3 w-[4.75rem] shrink-0 snap-start overflow-hidden rounded transition-all duration-300 min-[390px]:w-28 sm:w-36",
                    itemIndex === index
                      ? "ring-2 ring-brand ring-offset-2"
                      : "opacity-55 grayscale hover:opacity-100 hover:grayscale-0"
                  )}
                >
                  <ProjectImage
                    src={galleryThumbSrc(item.src)}
                    alt=""
                    fill
                    tier="thumb"
                    sizes="128px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <AnimatePresence>
        {isLightboxOpen ? (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`Vista ampliada: ${current.caption}`}
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Cerrar galería"
              className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-brand hover:bg-brand hover:text-ink sm:top-8 sm:right-8"
            >
              <CloseIcon className="size-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goTo(index - 1);
              }}
              aria-label="Imagen anterior"
              className="absolute left-2 flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-brand hover:bg-brand hover:text-ink sm:left-8"
            >
              <ArrowIcon className="size-4 rotate-180" />
            </button>

            <div
              className="relative max-h-[90vh] w-full max-w-[min(96vw,1600px)]"
              onClick={(event) => event.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="relative aspect-16/10 max-h-[85vh] w-full overflow-hidden rounded-2xl">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={current.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                    className="absolute inset-0"
                  >
                    <ProjectImage
                      src={current.src}
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

              <p className="mt-4 text-center font-display text-sm font-semibold text-white/80">
                {current.caption}
              </p>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goTo(index + 1);
              }}
              aria-label="Siguiente imagen"
              className="absolute right-2 flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-brand hover:bg-brand hover:text-ink sm:right-8"
            >
              <ArrowIcon className="size-4" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
