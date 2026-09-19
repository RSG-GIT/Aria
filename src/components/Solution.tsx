import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { BENEFITS } from '../lib/content'
import { riseIn, EASE, viewportOnce } from '../lib/motion'

export function Solution() {
  return (
    <section id="como-funciona" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <motion.div {...riseIn} className="liquid-glass rounded-3xl">
        <div className="flex flex-col gap-8 px-6 pt-10 md:flex-row md:items-end md:justify-between md:px-12 md:pt-14">
          <h2 className="max-w-md text-3xl font-light tracking-tight text-[#F2F6F5] md:text-4xl lg:text-5xl lg:leading-[1.1]">
            Aria se encarga del teléfono
          </h2>

          <div className="max-w-sm md:text-right">
            <p className="text-sm font-light leading-relaxed text-[#7E8F8D]">
              Se conecta a su número actual y a su agenda en una tarde. Usted no
              cambia nada de cómo trabaja hoy.
            </p>
            <a
              href="#"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#3BB7A8] px-5 py-2.5 text-xs font-medium text-[#06090B] transition-opacity duration-300 hover:opacity-85"
            >
              Agendar demostración
              <ArrowUpRight size={16} strokeWidth={1.75} />
            </a>
          </div>
        </div>

        <div className="grid gap-3 p-6 md:grid-cols-3 md:p-12">
          {BENEFITS.map((b, i) => (
            <motion.article
              key={b.number}
              className="flex min-h-[280px] flex-col justify-between rounded-2xl bg-[#0F1618]/60 p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            >
              <span className="text-xs font-light tracking-[0.2em] text-[#8FA09E]/80">
                {b.number}
              </span>
              <div>
                <h3 className="text-xl font-light tracking-tight text-[#F2F6F5] md:text-2xl">
                  {b.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-[#7E8F8D]">
                  {b.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
