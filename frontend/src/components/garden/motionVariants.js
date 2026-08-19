// LC Care — Shared Framer Motion Variants
// Maps directly to values in frontend/src/theme/tokens.css

export const transitions = {
  fast: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
  base: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  slow: { duration: 0.40, ease: [0.4, 0, 0.2, 1] },
  slower: { duration: 0.60, ease: [0.4, 0, 0.2, 1] },
  // Spring approximations for --ease-spring and --ease-spring-sm
  spring: { type: "spring", bounce: 0.5, duration: 0.5 },
  springSm: { type: "spring", bounce: 0.25, duration: 0.4 }
};

export const mascotVariants = {
  idle: {
    y: [0, -6, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  entering: {
    y: [30, 0],
    opacity: [0, 1],
    transition: { ...transitions.spring }
  },
  watering: {
    rotate: [0, -15, 15, -10, 10, 0],
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  celebrating: {
    y: [0, -24, 0],
    scale: [1, 1.05, 1],
    transition: { ...transitions.spring, duration: 0.6 }
  },
  meditating: {
    y: [0, -2, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const commonVariants = {
  fadeSlideUp: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: transitions.base },
    exit: { opacity: 0, y: 16, transition: transitions.fast }
  },
  bottomSheet: {
    hidden: { y: "100%" },
    visible: { y: 0, transition: transitions.springSm },
    exit: { y: "100%", transition: transitions.fast }
  }
};
