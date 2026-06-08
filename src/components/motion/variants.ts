import type { Variants } from "motion/react";
import { galleryMotionQuickTransition, galleryMotionTransition } from "@/components/motion/transitions";

export const galleryListVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      ...galleryMotionTransition,
      staggerChildren: 0.05,
    },
  },
};

export const galleryCardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: galleryMotionTransition,
  },
};

export const galleryPanelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.985 },
  show: {
    opacity: 1,
    scale: 1,
    transition: galleryMotionTransition,
  },
};

export const galleryModeOptionVariants: Variants = {
  rest: { y: 0 },
  hover: {
    y: -2,
    transition: galleryMotionQuickTransition,
  },
};
