"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { easeOutExpo } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  y = 56,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    amount: 0.18,
    margin: "0px 0px -8% 0px",
    once: true,
  });

  const offset = shouldReduceMotion ? 0 : y;
  const visible = shouldReduceMotion || isInView;

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: offset,
              scale: 0.97,
              filter: "blur(8px)",
            }
      }
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : offset,
        scale: visible ? 1 : 0.97,
        filter: visible ? "blur(0px)" : "blur(8px)",
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 1.65,
        ease: easeOutExpo,
        delay: visible && !shouldReduceMotion ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
}
