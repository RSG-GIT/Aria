import type { Variants } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1] as const

/** Every section enters exactly once, the same way. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export const viewportOnce = { once: true, margin: '-15% 0px' } as const

/** Spread onto any motion element that should rise in on scroll. */
export const riseIn = {
  variants: rise,
  initial: 'hidden' as const,
  whileInView: 'show' as const,
  viewport: viewportOnce,
}
