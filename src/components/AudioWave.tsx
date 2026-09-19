import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useMediaQuery'
import { viewportOnce } from '../lib/motion'

/** Deterministic pseudo-random in [0,1) — same bars on every render. */
const noise = (i: number, seed: number) => {
  const x = Math.sin((i + 1) * 12.9898 + seed * 78.233) * 43758.5453
  return x - Math.floor(x)
}

type LoopProps = {
  bars?: number
  className?: string
  barWidth?: number
  gap?: number
  height?: number
}

/**
 * The live-call meter: bars breathing in and out on an offset loop.
 * Pure CSS so it costs nothing on the main thread.
 */
export function LoopingWave({
  bars = 24,
  className = '',
  barWidth = 2,
  gap = 3,
  height = 28,
}: LoopProps) {
  const reduced = useReducedMotion()
  const width = bars * (barWidth + gap) - gap

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
    >
      {Array.from({ length: bars }, (_, i) => {
        const peak = 0.3 + noise(i, 3) * 0.7
        const h = Math.max(3, height * peak)
        return (
          <rect
            key={i}
            x={i * (barWidth + gap)}
            y={(height - h) / 2}
            width={barWidth}
            height={h}
            rx={barWidth / 2}
            fill="#3BB7A8"
            opacity={0.45 + noise(i, 9) * 0.55}
            className={reduced ? undefined : 'aria-bar'}
            style={
              reduced
                ? undefined
                : {
                    animationDelay: `${-(i * 0.07 + noise(i, 5) * 0.3).toFixed(3)}s`,
                    animationDuration: `${(1.05 + noise(i, 7) * 0.5).toFixed(3)}s`,
                  }
            }
          />
        )
      })}
    </svg>
  )
}

/**
 * The full-width waveform in the capabilities section: each bar grows out of
 * the centreline once, left to right, the first time it scrolls into view.
 */
export function RevealWave({ bars = 64, className = '' }: { bars?: number; className?: string }) {
  const reduced = useReducedMotion()
  const barWidth = 2
  const gap = 4
  const height = 72
  const width = bars * (barWidth + gap) - gap

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
    >
      {Array.from({ length: bars }, (_, i) => {
        // Envelope: quiet at the edges, loud in the middle third.
        const t = i / (bars - 1)
        const envelope = 0.25 + Math.sin(t * Math.PI) ** 1.4 * 0.75
        const h = Math.max(4, height * envelope * (0.35 + noise(i, 11) * 0.65))
        return (
          <motion.rect
            key={i}
            x={i * (barWidth + gap)}
            y={(height - h) / 2}
            width={barWidth}
            height={h}
            rx={barWidth / 2}
            fill="#3BB7A8"
            opacity={0.25 + envelope * 0.55}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            initial={reduced ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: i * 0.012, ease: [0.22, 1, 0.36, 1] }}
          />
        )
      })}
    </svg>
  )
}
