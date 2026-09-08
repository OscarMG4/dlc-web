"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon, SendIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { company } from "@/lib/content";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#areas-comunes", label: "Áreas comunes" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#ubicacion", label: "Ubicación" },
] as const;

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.65rem,env(safe-area-inset-top))] sm:px-6 sm:pt-4">
        <motion.div
          className={cn(
            "relative mx-auto flex max-w-6xl items-center justify-between gap-3 overflow-hidden rounded-2xl px-3 py-2.5 transition-[background,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:gap-4 sm:rounded-full sm:px-5 sm:py-2.5",
            scrolled
              ? "bg-black/75 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.65)] ring-1 ring-white/10 backdrop-blur-2xl"
              : "bg-black/45 shadow-[0_12px_40px_-30px_rgba(0,0,0,0.45)] ring-1 ring-white/12 backdrop-blur-xl"
          )}
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: -24, filter: "blur(8px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.25,
            delay: 0.55,
            ease: easeOutExpo,
          }}
        >
          <div
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent"
            aria-hidden
          />

          <a
            href="#inicio"
            aria-label={`${company.name}, ir al inicio`}
            onClick={closeMenu}
            className="relative z-[1] block h-7 w-[68px] shrink-0 transition-transform duration-300 hover:scale-[1.03] sm:h-9 sm:w-[96px]"
          >
            <Image
              src="/brand/dlc-logo-white.png"
              alt={company.name}
              fill
              priority
              sizes="96px"
              className="object-contain object-left"
            />
          </a>

          <nav
            aria-label="Principal"
            className="absolute left-1/2 top-1/2 z-[1] hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          >
            <ul className="flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={cn(
                      "group relative inline-flex items-center rounded-full px-4 py-2 font-display text-[13px] font-medium tracking-tight text-white/75",
                      "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      "hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {label}
                    <span
                      className="absolute inset-x-3.5 -bottom-px h-px origin-center scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-[1] flex shrink-0 items-center gap-1 sm:gap-2">
            <ButtonLink
              href="#contacto"
              size="sm"
              onClick={closeMenu}
              className={cn(
                "rounded-full px-3 py-2 text-[9px] tracking-[0.12em] sm:px-5 sm:text-[11px] sm:tracking-[0.14em]",
                "shadow-[0_8px_24px_-12px_rgba(253,185,12,0.75)]"
              )}
            >
              Contacto
              <SendIcon className="hidden size-3.5 sm:block" />
            </ButtonLink>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className={cn(
                "flex size-9 items-center justify-center rounded-full text-white ring-1 ring-white/15 transition-all duration-300 sm:size-10 lg:hidden",
                "bg-white/10 hover:bg-brand hover:text-ink hover:ring-brand/40"
              )}
            >
              {isMenuOpen ? (
                <CloseIcon className="size-4" />
              ) : (
                <MenuIcon className="size-4" />
              )}
            </button>
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
              className="absolute inset-0 bg-black/65 backdrop-blur-md"
              onClick={closeMenu}
            />

            <motion.nav
              initial={{ y: shouldReduceMotion ? 0 : -20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: shouldReduceMotion ? 0 : -16, opacity: 0, scale: 0.98 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                ease: easeOutExpo,
              }}
              className="absolute inset-x-3 top-[4.75rem] overflow-hidden rounded-[1.75rem] bg-[#111]/95 p-2 shadow-[0_28px_70px_-28px_rgba(0,0,0,0.55)] ring-1 ring-white/10 backdrop-blur-xl sm:inset-x-6 sm:top-[5.25rem]"
              style={{
                paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
              }}
            >
              {navLinks.map(({ href, label }, index) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 + index * 0.05,
                    duration: 0.35,
                    ease: easeOutExpo,
                  }}
                  className="relative flex min-h-12 items-center justify-between rounded-2xl px-4 text-[0.95rem] font-medium text-white/80 transition-colors duration-300 hover:bg-brand/15 hover:text-white"
                >
                  {label}
                  <span className="h-px w-5 bg-brand/70" aria-hidden />
                </motion.a>
              ))}

              <div className="mt-1.5 border-t border-white/10 p-2">
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
