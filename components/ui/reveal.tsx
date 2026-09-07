"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 40, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    amount: 0.12,
    margin: "0px 0px -6% 0px",
    once: false,
  });

  const offset = shouldReduceMotion ? 0 : y;
  const visible = shouldReduceMotion || isInView;

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : offset,
        scale: visible ? 1 : 0.985,
        filter: visible ? "blur(0px)" : "blur(4px)",
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 1.15,
        ease: [0.22, 1, 0.36, 1],
        delay: visible && !shouldReduceMotion ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
}
