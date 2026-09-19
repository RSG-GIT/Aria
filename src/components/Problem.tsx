import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '../hooks/useMediaQuery'
import { EASE } from '../lib/motion'

const TEXT =
  'El 62 % de las llamadas llegan cuando el equipo está con un paciente, en cirugía o fuera de horario. Quien no recibe respuesta no vuelve a llamar. Llama a la clínica de la siguiente cuadra.'

const TOTAL_CHARS = TEXT.length
const SWEEP_SECONDS = 1.8

/**
 * Lifts each letter from 25% to full opacity in a single left-to-right sweep.
 * Words are kept unbreakable so the reveal never splits one across lines.
 *
 * The whole paragraph is exposed to assistive tech as one string; the split
 * spans are hidden from it.
 */
function LetterReveal({ text, play }: { text: string; play: boolean }) {
  let cursor = 0

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(' ').map((word, w, words) => {
          const chars = [...word]
          if (w < words.length - 1) chars.push('\u00A0')

          return (
            <span key={`${word}-${w}`} className="inline-block whitespace-nowrap">
              {chars.map((char, c) => {
                const index = cursor++
                return (
                  <span key={c} className="relative inline-block">
                    {/* Reserves the exact glyph box so nothing reflows. */}
                    <span className="invisible">{char}</span>
                    <motion.span
                      className="absolute inset-0"
                      initial={{ opacity: 0.25 }}
                      animate={play ? { opacity: 1 } : { opacity: 0.25 }}
                      transition={{
                        duration: 0.05,
                        delay: (index / TOTAL_CHARS) * SWEEP_SECONDS,
                        ease: 'linear',
                      }}
                    >
                      {char}
                    </motion.span>
                  </span>
                )
              })}
            </span>
          )
        })}
      </span>
    </>
  )
}

export function Problem() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const reduced = useReducedMotion()

  return (
    <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24 md:px-10">
      <div ref={ref} className="max-w-3xl">
        <h2 className="text-2xl font-light tracking-tight text-[#F2F6F5] sm:text-3xl md:text-5xl lg:text-6xl lg:leading-[1.15]">
          {reduced ? TEXT : <LetterReveal text={TEXT} play={inView} />}
        </h2>

        <motion.p
          className="mt-12 text-sm font-light text-[#7E8F8D]"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : SWEEP_SECONDS * 0.8, ease: EASE }}
        >
          No es un problema de atención. Es un problema de manos disponibles.
        </motion.p>
      </div>
    </section>
  )
}
