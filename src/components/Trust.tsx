import { motion } from 'framer-motion'
import { SEALS } from '../lib/content'
import { riseIn, EASE, viewportOnce } from '../lib/motion'
import { CornerBrackets } from './CornerBrackets'

const RADIAL_MASK =
  'radial-gradient(ellipse 70% 60% at 50% 45%, #000 0%, rgba(0,0,0,0.5) 55%, transparent 80%)'

// The masked frame is brightest exactly where the copy sits, so a matching
// scrim rides on top of it and hands the centre back to the text.
const CENTRE_SCRIM =
  'radial-gradient(ellipse 58% 52% at 50% 40%, rgba(6,9,11,0.92) 0%, rgba(6,9,11,0.6) 55%, transparent 82%)'

// Pure black in the body, easing into the page colour so no seam shows.
const SECTION_BG =
  'linear-gradient(to bottom, #06090B 0%, #000 10%, #000 90%, #06090B 100%)'

export function Trust() {
  return (
    <section
      className="relative overflow-hidden py-28 md:py-36"
      style={{ background: SECTION_BG }}
    >
      {/* Final frame of the transition, pushed right back into the dark. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <picture>
          <source srcSet="/aria-frame-02.webp" type="image/webp" />
          <img
            src="/aria-frame-02.jpg"
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-40"
            style={{ maskImage: RADIAL_MASK, WebkitMaskImage: RADIAL_MASK }}
          />
        </picture>
        <div className="absolute inset-0" style={{ background: CENTRE_SCRIM }} />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <motion.h2
          {...riseIn}
          className="text-3xl font-light tracking-tight text-[#F2F6F5] md:text-4xl lg:text-5xl lg:leading-[1.1]"
        >
          Suena a persona porque está hecha para sonar así
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-[#7E8F8D]"
        >
          Aria no lee un guion. Escucha, espera su turno, repite el dato si no
          lo entendió y usa el nombre de la mascota. La mayoría de quienes
          llaman nunca preguntan si están hablando con una persona.
        </motion.p>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {SEALS.map((seal, i) => (
            <motion.div
              key={seal.title}
              className="relative rounded-lg px-5 py-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: EASE }}
            >
              <CornerBrackets />
              <h3 className="text-sm font-light text-[#F2F6F5]">{seal.title}</h3>
              <p className="mt-2 text-xs font-light leading-relaxed text-[#8FA09E]">
                {seal.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
