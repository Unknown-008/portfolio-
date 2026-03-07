/**
 * Reusable Framer Motion animation variants
 */

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
}

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
})

export const slideInFromBottom = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export const glowPulse = {
  initial: { boxShadow: '0 0 5px rgba(6,182,212,0.2)' },
  animate: {
    boxShadow: [
      '0 0 5px rgba(6,182,212,0.2)',
      '0 0 20px rgba(6,182,212,0.6)',
      '0 0 5px rgba(6,182,212,0.2)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0, -10],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
}

/**
 * Easing curves
 */
export const easings = {
  spring: [0.34, 1.56, 0.64, 1],
  smooth: [0.16, 1, 0.3, 1],
  snappy: [0.4, 0, 0.2, 1],
}

/**
 * Delay helper for staggered animations
 */
export const withDelay = (variants, delay) => ({
  ...variants,
  visible: {
    ...variants.visible,
    transition: { ...variants.visible.transition, delay },
  },
})
