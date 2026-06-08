"use client";

import { useReducedMotion } from "motion/react";

export function useReducedMotionSafe() {
  return useReducedMotion() ?? false;
}
