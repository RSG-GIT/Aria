import { motion } from 'framer-motion'
import { CAPABILITIES } from '../lib/content'
import { riseIn, EASE, viewportOnce } from '../lib/motion'
import { RevealWave } from './AudioWave'

export function Capabilities() {
  return (
    <section id="capacidades" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div {...riseIn} className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="max-w-md text-3xl font-light tracking-tight text-[#F2F6F5] md:text-4xl lg:text-5xl lg:leading-[1.1]">
            Todo lo que Aria resuelve sin preguntarle a usted
          </h2>
          <RevealWave bars={64} className="mt-12 h-16 w-full md:h-20" />
        </motion.div>

        <ul className="lg:pt-2">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon
            return (
              <motion.li
                key={cap.title}
                className="group border-b border-white/[0.06] transition-transform duration-300 hover:-translate-y-0.5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              >
                <div className="flex items-start gap-5 py-6">
                  <Icon
                    size={19}
                    strokeWidth={1.25}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#3BB7A8] transition-colors duration-300 group-hover:text-[#F0C48A]"
                  />
                  <div>
                    <h3 className="text-base font-light text-[#F2F6F5]">{cap.title}</h3>
                    <p className="mt-1.5 text-sm font-light leading-relaxed text-[#7E8F8D]">
                      {cap.body}
                    </p>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
