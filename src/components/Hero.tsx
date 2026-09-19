import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { usePingPongVideo } from '../hooks/usePingPongVideo'
import { useIsDesktop, useReducedMotion } from '../hooks/useMediaQuery'
import { BookingLink } from './BookingLink'
import { LiveCallCard } from './LiveCallCard'
import { Problem } from './Problem'
import { EASE } from '../lib/motion'

const FADE_BOTTOM = 'linear-gradient(to bottom, transparent, #06090B)'

// The wave sweeps further left than the brief assumed at wide viewports, so the
// copy column needs its own backdrop. Solid at the edge, gone by the midpoint.
const FADE_LEFT =
  'linear-gradient(to right, #06090B 0%, #06090B 26%, rgba(6,9,11,0.88) 42%, rgba(6,9,11,0.45) 60%, transparent 82%)'

// On a phone the copy is full-width, so there is no empty column to clear —
// the frame drops back to a texture and only surfaces below the fold.
const FADE_MOBILE =
  'linear-gradient(to bottom, #06090B 0%, rgba(6,9,11,0.94) 34%, rgba(6,9,11,0.72) 58%, rgba(6,9,11,0.35) 78%, transparent 100%)'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isDesktop = useIsDesktop()
  const reduced = useReducedMotion()

  // Below 768px we never ship the video at all — the poster carries the frame,
  // which saves the visitor ~4 MB and the battery drain of a looping decode.
  const playVideo = isDesktop && !reduced

  usePingPongVideo(videoRef, playVideo)

  return (
    <div className="relative z-0">
      {/* Pinned backdrop: stays put while the hero and the problem scroll over it. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {isDesktop ? (
          <video
            ref={videoRef}
            aria-hidden="true"
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster="/aria-frame-01.jpg"
            className="h-full w-full object-cover"
          >
            <source src="/aria-transition.mp4" type="video/mp4" />
          </video>
        ) : (
          // Eager and high priority: on a phone this is the LCP element.
          <picture>
            <source srcSet="/aria-frame-01.webp" type="image/webp" />
            <img
              src="/aria-frame-01.jpg"
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </picture>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 md:hidden"
          style={{ background: FADE_MOBILE }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden md:block md:w-[74%]"
          style={{ background: FADE_LEFT }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[45%]"
          style={{ background: FADE_BOTTOM }}
        />
      </div>

      {/* Everything from here up to the end of the problem section rides on top. */}
      <div className="relative z-10 -mt-[100vh]">
        <section className="mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-6 pt-28 pb-16 md:min-h-screen md:px-10 md:pt-24 md:pb-24">
          <div className="grid items-end gap-12 md:grid-cols-12">
            {/* The video leaves the left third and the upper half empty on purpose. */}
            <motion.div
              className="md:col-span-7 lg:col-span-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            >
              <h1 className="text-4xl leading-[1.05] font-light tracking-tight text-[#F2F6F5] sm:text-5xl md:text-6xl lg:text-7xl">
                Ninguna llamada
                <br />
                perdida. Ningún
                <br />
                paciente{' '}
                <span className="font-serif text-[#3BB7A8] italic">menos.</span>
              </h1>

              <p className="mt-6 max-w-md text-base font-light text-[#7E8F8D]">
                Aria atiende el teléfono de su clínica las 24 horas, agenda los
                turnos en su calendario y confirma cada cita. Con voz natural,
                en español.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-6">
                <BookingLink className="rounded-full bg-[#3BB7A8] px-7 py-3 text-sm font-medium text-[#06090B] transition-opacity duration-300 hover:opacity-85">
                  Escuchar a Aria
                </BookingLink>
                <a
                  href="#como-funciona"
                  className="group inline-flex items-center gap-2 text-sm font-light text-[#8FA09E] transition-colors duration-300 hover:text-[#F2F6F5]"
                >
                  Ver cómo funciona
                  <ArrowDown
                    size={15}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </a>
              </div>

              <p className="mt-8 text-xs font-light text-[#8FA09E]/85">
                Sin instalar nada. Su mismo número de siempre.
              </p>
            </motion.div>

            <motion.div
              className="md:col-span-5 md:flex md:justify-end lg:col-span-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            >
              <LiveCallCard />
            </motion.div>
          </div>
        </section>

        <Problem />
      </div>
    </div>
  )
}
