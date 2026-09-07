"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { company } from "@/lib/content";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#galeria", label: "Galería" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 px-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6",
          isScrolled ? "top-3 sm:top-4" : "top-0"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 transition-all duration-500",
            isScrolled || isMenuOpen
              ? "glass rounded-2xl px-4 py-3 shadow-[0_16px_50px_-28px_rgba(0,0,0,0.3)] ring-1 ring-ink/5 sm:px-5"
              : "px-1 py-4 sm:py-5"
          )}
        >
          <Link
            href="/"
            aria-label={`${company.name}, ir al inicio`}
            onClick={closeMenu}
            className="relative block h-9 w-[92px] shrink-0 transition-transform duration-300 hover:scale-[1.02] sm:h-10 sm:w-[104px]"
          >
            <Image
              src="/brand/dlc-logo-black.png"
              alt={company.name}
              fill
              priority
              sizes="104px"
              className={cn(
                "object-contain object-left transition-opacity duration-500",
                isScrolled || isMenuOpen ? "opacity-100" : "opacity-0"
              )}
            />
            <Image
              src="/brand/dlc-logo-white.png"
              alt=""
              fill
              priority
              sizes="104px"
              className={cn(
                "object-contain object-left transition-opacity duration-500",
                isScrolled || isMenuOpen ? "opacity-0" : "opacity-100 shadow-on-video"
              )}
            />
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={cn(
                  "hidden rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:inline-block",
                  "hover:-translate-y-0.5 hover:scale-[1.06] hover:bg-brand hover:font-semibold hover:text-ink",
                  "hover:shadow-[0_10px_28px_-8px_rgba(253,185,12,0.85)] hover:ring-2 hover:ring-brand/40",
                  isScrolled ? "text-ink-500" : "text-on-video"
                )}
              >
                {label}
              </a>
            ))}

            <ButtonLink
              href="#proyecto"
              size="sm"
              className={cn(
                "hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:inline-flex",
                "hover:-translate-y-0.5 hover:scale-[1.06]",
                !isScrolled &&
                  "border-2 border-white/50 bg-black/20 text-on-video shadow-[0_2px_16px_rgb(0_0_0/0.35)] backdrop-blur-sm hover:border-brand hover:bg-brand hover:text-ink hover:shadow-[0_10px_28px_-8px_rgba(253,185,12,0.85)]"
              )}
            >
              Ver proyecto
            </ButtonLink>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className={cn(
                "flex size-11 items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
                "hover:-translate-y-0.5 hover:scale-110 hover:bg-brand hover:text-ink",
                "hover:shadow-[0_10px_28px_-8px_rgba(253,185,12,0.85)] hover:ring-2 hover:ring-brand/40",
                isScrolled || isMenuOpen ? "text-ink" : "text-on-video shadow-on-video"
              )}
            >
              {isMenuOpen ? (
                <CloseIcon className="size-5" />
              ) : (
                <MenuIcon className="size-5" />
              )}
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <button
              type="button"
              aria-label="Cerrar menú"
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
              onClick={closeMenu}
            />

            <motion.nav
              initial={{ y: shouldReduceMotion ? 0 : -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: shouldReduceMotion ? 0 : -16, opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              className="absolute inset-x-4 top-[4.75rem] rounded-3xl bg-white p-2 shadow-elevated ring-1 ring-ink/5 sm:inset-x-6 sm:top-20"
              style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
            >
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="flex min-h-12 items-center rounded-2xl border-l-[3px] border-transparent px-4 text-base font-medium text-ink transition-all duration-300 hover:scale-[1.02] hover:border-brand hover:bg-brand hover:pl-5 hover:font-semibold hover:text-ink hover:shadow-[0_8px_24px_-10px_rgba(253,185,12,0.7)] active:bg-brand-dark"
                >
                  {label}
                </a>
              ))}

              <div className="mt-2 border-t border-ink/8 p-2">
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
