"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { company } from "@/lib/content";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#plano", id: "plano", label: "Plano" },
  { href: "#inversion", id: "inversion", label: "Inversión" },
  { href: "#areas-comunes", id: "areas-comunes", label: "Áreas" },
  { href: "#reseñas", id: "reseñas", label: "Reseñas" },
  { href: "#nosotros", id: "nosotros", label: "Nosotros" },
  { href: "#ubicacion", id: "ubicacion", label: "Ubicación" },
] as const;

const sectionIds = [
  "inicio",
  ...navLinks.map((link) => link.id),
  "contacto",
] as const;

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("inicio");
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });
  const navListRef = useRef<HTMLUListElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 40);

      const marker = window.innerHeight * 0.3;
      let current: string = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) {
          current = id;
        }
      }

      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useLayoutEffect(() => {
    const list = navListRef.current;
    if (!list) return;

    const activeItem = list.querySelector<HTMLElement>(
      `[data-nav-id="${CSS.escape(activeId)}"]`
    );

    if (!activeItem) {
      setPill((prev) => ({ ...prev, ready: false }));
      return;
    }

    const listRect = list.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    setPill({
      left: itemRect.left - listRect.left,
      width: itemRect.width,
      ready: true,
    });
  }, [activeId, scrolled]);

  const closeMenu = () => setIsMenuOpen(false);
  const contactActive = activeId === "contacto";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <motion.div
          className={cn(
            "mx-auto transition-[padding,max-width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled
              ? "max-w-6xl px-3 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-4 sm:pt-3"
              : "max-w-7xl px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-5"
          )}
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: -20, filter: "blur(8px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.5, ease: easeOutExpo }}
        >
          <div
            className={cn(
              "relative flex items-center justify-between gap-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              scrolled
                ? "rounded-full bg-black/80 px-2.5 py-2 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.75)] ring-1 ring-white/10 backdrop-blur-2xl sm:px-3 sm:py-2"
                : "rounded-2xl bg-transparent px-1 py-1 sm:rounded-full sm:px-2 sm:py-1.5"
            )}
          >
            {scrolled ? (
              <div
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent"
                aria-hidden
              />
            ) : null}

            <a
              href="#inicio"
              aria-label={`${company.name}, ir al inicio`}
              onClick={closeMenu}
              className={cn(
                "relative z-[1] block shrink-0 transition-all duration-500",
                scrolled
                  ? "h-8 w-[76px] sm:h-9 sm:w-[88px]"
                  : "h-9 w-[84px] sm:h-10 sm:w-[104px]"
              )}
            >
              <Image
                src="/brand/dlc-logo-white.png"
                alt={company.name}
                fill
                priority
                sizes="104px"
                className="object-contain object-left drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]"
              />
            </a>

            <nav
              aria-label="Principal"
              className="absolute left-1/2 top-1/2 z-[1] hidden -translate-x-1/2 -translate-y-1/2 lg:block"
            >
              <ul
                ref={navListRef}
                className={cn(
                  "relative flex items-center gap-0.5 p-1 transition-all duration-500",
                  scrolled
                    ? "rounded-full bg-white/[0.05] ring-1 ring-white/8"
                    : "rounded-full bg-black/35 ring-1 ring-white/10 backdrop-blur-xl"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute top-1 bottom-1 rounded-full bg-brand transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    pill.ready ? "opacity-100" : "opacity-0"
                  )}
                  style={{ left: pill.left, width: pill.width }}
                />

                {navLinks.map(({ href, id, label }) => {
                  const isActive = activeId === id;

                  return (
                    <li key={href} data-nav-id={id} className="relative z-[1]">
                      <a
                        href={href}
                        className={cn(
                          "relative inline-flex items-center rounded-full px-3 py-2 font-display text-[12px] font-medium tracking-tight transition-colors duration-300 xl:px-3.5 xl:text-[13px]",
                          isActive
                            ? "text-ink"
                            : "text-white/70 hover:text-white"
                        )}
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="relative z-[1] flex shrink-0 items-center gap-1.5 sm:gap-2">
              <ButtonLink
                href="#contacto"
                size="sm"
                onClick={closeMenu}
                className={cn(
                  "hidden rounded-full font-semibold transition-all duration-500 sm:inline-flex",
                  scrolled || contactActive
                    ? "px-5 py-2.5 text-[11px] tracking-[0.08em]"
                    : "border border-white/20 bg-white/10 px-5 py-2.5 text-[11px] tracking-[0.08em] text-white shadow-none backdrop-blur-md hover:border-brand hover:bg-brand hover:text-ink"
                )}
                variant={scrolled || contactActive ? "primary" : "ghost"}
              >
                Contacto
              </ButtonLink>

              <ButtonLink
                href="#contacto"
                size="sm"
                onClick={closeMenu}
                className="rounded-full px-3.5 py-2 text-[10px] tracking-[0.1em] sm:hidden"
              >
                Contacto
              </ButtonLink>

              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                className={cn(
                  "relative flex size-10 items-center justify-center rounded-full transition-all duration-300 lg:hidden",
                  scrolled
                    ? "bg-white/10 text-white ring-1 ring-white/12 hover:bg-brand hover:text-ink"
                    : "bg-black/40 text-white ring-1 ring-white/15 backdrop-blur-md hover:bg-brand hover:text-ink"
                )}
              >
                <span className="sr-only">
                  {isMenuOpen ? "Cerrar" : "Menú"}
                </span>
                <span className="relative flex size-4 flex-col justify-center gap-1.5">
                  <span
                    className={cn(
                      "block h-[1.5px] w-4 origin-center rounded-full bg-current transition-transform duration-300",
                      isMenuOpen && "translate-y-[3.5px] rotate-45"
                    )}
                  />
                  <span
                    className={cn(
                      "block h-[1.5px] w-4 origin-center rounded-full bg-current transition-transform duration-300",
                      isMenuOpen && "-translate-y-[3.5px] -rotate-45"
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.28 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <button
              type="button"
              aria-label="Cerrar menú"
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={closeMenu}
            />

            <motion.nav
              initial={{
                y: shouldReduceMotion ? 0 : -24,
                opacity: 0,
                scale: 0.97,
              }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{
                y: shouldReduceMotion ? 0 : -16,
                opacity: 0,
                scale: 0.98,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                ease: easeOutExpo,
              }}
              className="absolute inset-x-3 top-[4.5rem] overflow-hidden rounded-3xl bg-[#0c0b0a]/96 p-3 shadow-[0_32px_80px_-28px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur-2xl sm:inset-x-6 sm:top-[5rem]"
              style={{
                paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
              }}
            >
              <div className="mb-2 flex items-center justify-between px-3 pt-2">
                <p className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Menú
                </p>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Cerrar menú"
                  className="flex size-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <CloseIcon className="size-4" />
                </button>
              </div>

              {navLinks.map(({ href, id, label }, index) => {
                const isActive = activeId === id;

                return (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.04 + index * 0.05,
                      duration: 0.35,
                      ease: easeOutExpo,
                    }}
                    className={cn(
                      "flex min-h-14 items-center justify-between rounded-2xl px-4 text-[1.05rem] font-medium transition-colors duration-300",
                      isActive
                        ? "bg-brand text-ink"
                        : "text-white/80 hover:bg-white/[0.06] hover:text-white"
                    )}
                  >
                    <span className="font-display">{label}</span>
                    <span
                      className={cn(
                        "font-display text-[11px] tabular-nums",
                        isActive ? "text-ink/50" : "text-white/25"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </motion.a>
                );
              })}

              <div className="mt-2 border-t border-white/10 p-2 pt-3">
                <ButtonLink
                  href="#contacto"
                  size="lg"
                  className="w-full"
                  onClick={closeMenu}
                >
                  Solicitar información
                </ButtonLink>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
