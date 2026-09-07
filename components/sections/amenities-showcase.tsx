"use client";

import { ProjectImage } from "@/components/ui/project-image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { project } from "@/lib/content";
import { cn } from "@/lib/utils";

export function AmenitiesShowcase() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const current = project.amenities[active];

  return (
    <div className="mt-16 overflow-hidden rounded-lg border-t-2 border-brand bg-white text-ink">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-11">
          <Reveal>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
              Áreas comunes
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight sm:text-[1.75rem]">
              Espacios pensados para disfrutar en familia
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              Parques, deporte y descanso ya ejecutados dentro del condominio.
            </p>
          </Reveal>

          <div className="mt-8 flex flex-col gap-1">
            {project.amenities.map((amenity, index) => {
              const isActive = active === index;

              return (
                <Reveal key={amenity.title} delay={index * 0.04}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex w-full min-h-11 items-start gap-3 border-l-2 px-3 py-3 text-left transition-all duration-300 sm:gap-4 sm:px-4 sm:py-3.5",
                      isActive
                        ? "border-brand bg-brand-soft/70"
                        : "border-transparent hover:bg-surface"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 font-display text-xs font-bold tabular-nums",
                        isActive ? "text-brand-dark" : "text-ink-300"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-sm font-semibold text-ink">
                        {amenity.title}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-xs leading-relaxed text-ink-500",
                          !isActive && "hidden"
                        )}
                      >
                        {amenity.description}
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[280px] lg:min-h-full">
          <div className="relative aspect-[4/3] h-full min-h-[280px] lg:absolute lg:inset-0 lg:aspect-auto">
            <AnimatePresence mode="sync">
              <motion.div
                key={current.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <ProjectImage
                  src={current.image}
                  alt={current.title}
                  fill
                  tier="gallery"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={active === 0}
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent lg:from-ink/20" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:hidden">
              <p className="font-display text-lg font-semibold text-white">
                {current.title}
              </p>
              <p className="mt-1 text-sm text-white/75">{current.description}</p>
            </div>

            <div className="absolute top-5 right-5 hidden border-l-2 border-brand bg-white/90 px-3 py-1.5 font-display text-[11px] font-semibold tabular-nums tracking-[0.14em] text-ink backdrop-blur-sm lg:block">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(project.amenities.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
