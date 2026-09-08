"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { company } from "@/lib/content";
import { easeOutExpo } from "@/lib/motion";

export function PageIntro() {
  const shouldReduceMotion = useReducedMotion();
  const [show, setShow] = useState(!shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) {
      setShow(false);
      return;
    }

    const hide = window.setTimeout(() => setShow(false), 920);
    return () => window.clearTimeout(hide);
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="page-intro"
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 40%, rgba(253,185,12,0.2), transparent 55%), linear-gradient(165deg, #0a0908 0%, #050505 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: easeOutExpo }}
          aria-hidden
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[42%] size-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/18 blur-[110px] sm:size-[26rem]"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: easeOutExpo }}
          />

          <motion.div
            className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-transparent via-brand to-transparent"
            initial={{ scaleX: 0, opacity: 0.4 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.85, ease: easeOutExpo }}
          />

          <motion.div
            className="relative h-14 w-[148px] sm:h-16 sm:w-[170px]"
            initial={{ opacity: 0, y: 14, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, scale: 0.96, filter: "blur(6px)" }}
            transition={{ duration: 0.95, ease: easeOutExpo }}
          >
            <Image
              src="/brand/dlc-logo-white.png"
              alt={company.name}
              fill
              priority
              sizes="170px"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
