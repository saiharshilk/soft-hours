"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

/**
 * A mist-like reveal: blur and opacity lift slowly as the block enters view.
 * Under prefers-reduced-motion, CSS on [data-reveal] pins it fully visible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, filter: "blur(7px)", y: 12 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
