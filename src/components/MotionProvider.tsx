"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Motion's animation features arrive in a separate chunk after first paint;
// components use the lightweight `m.*` elements.
const loadFeatures = () => import("./motionFeatures").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
