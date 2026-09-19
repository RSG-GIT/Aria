import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { PRICING_INCLUDES } from '../lib/content'
import { BookingLink } from './BookingLink'
import { riseIn } from '../lib/motion'

export function Pricing() {
  return (
    <section id="precios" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <motion.div {...riseIn} className="mx-auto max-w-md">
        <div className="relative">
          {/* Hairline that catches the light along the top edge of the card. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(59,183,168,0.75), transparent)',
            }}
          />

          <div className="liquid-glass rounded-3xl p-10">
            <p className="text-xs font-light tracking-[0.2em] text-[#8FA09E]/80">
              UN PLAN
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-light tracking-tight text-[#F2F6F5]">
                US$ 149
              </span>
              <span className="text-sm font-light text-[#7E8F8D]">/ mes</span>
            </div>

            <p className="mt-3 text-sm font-light leading-relaxed text-[#7E8F8D]">
              Por clínica, sin cargo por llamada. Menos de lo que cuesta un
              turno perdido por semana.
            </p>

            <ul className="mt-8 space-y-3">
              {PRICING_INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    size={15}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-[#3BB7A8]"
                  />
                  <span className="text-sm font-light leading-relaxed text-[#7E8F8D]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <BookingLink className="mt-9 block rounded-full bg-[#3BB7A8] px-6 py-3.5 text-center text-sm font-medium text-[#06090B] transition-opacity duration-300 hover:opacity-85">
              Empezar con 14 días de prueba
            </BookingLink>

            <p className="mt-5 text-center text-xs font-light leading-relaxed text-[#8FA09E]/85">
              Sin tarjeta para probar. Sin permanencia. Si no le sirve, la
              desconecta en un clic.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
