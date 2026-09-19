import { motion } from 'framer-motion'
import { TESTIMONIALS } from '../lib/content'
import { riseIn, EASE, viewportOnce } from '../lib/motion'

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <motion.h2
        {...riseIn}
        className="max-w-xl text-3xl font-light tracking-tight text-[#F2F6F5] md:text-4xl lg:leading-[1.1]"
      >
        Lo que dicen las clínicas que ya la tienen
      </motion.h2>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            className="liquid-glass flex flex-col justify-between rounded-2xl p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
          >
            <blockquote className="font-serif text-lg leading-relaxed text-[#F2F6F5]/90">
              <span aria-hidden="true" className="text-2xl text-[#3BB7A8]">
                “
              </span>
              {t.quote}
              <span aria-hidden="true" className="text-2xl text-[#3BB7A8]">
                ”
              </span>
            </blockquote>

            <figcaption className="mt-8">
              <p className="text-sm font-light text-[#F2F6F5]">{t.name}</p>
              <p className="mt-1 text-xs font-light text-[#8FA09E]">{t.role}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
