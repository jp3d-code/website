import type { Variants } from "motion/react";
import { easeOutQuint } from "@/shared/animations/easings";

export const heroContentVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.16,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
};

export const heroTitleVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const heroItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutQuint,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      duration: 0.25,
      ease: easeOutQuint,
    },
  },
};
