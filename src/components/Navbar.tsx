import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../lib/content'
import { BookingLink } from './BookingLink'
import { EASE } from '../lib/motion'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  // Highlight the pill for whichever section owns the top third of the screen.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Lock the page behind the fullscreen mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a
            href="#"
            className="text-sm font-extralight tracking-[0.3em] text-[#F2F6F5]"
            aria-label="Aria, inicio"
          >
            ARIA
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block rounded-full px-4 py-2 text-xs font-light text-[#8FA09E] transition-colors duration-300 hover:text-[#F2F6F5] ${
                    active === link.href
                      ? 'border border-[#3BB7A8]/60 text-[#F2F6F5]'
                      : 'border border-transparent'
                  }`}
                  aria-current={active === link.href ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <BookingLink className="hidden rounded-full bg-[#3BB7A8] px-5 py-2 text-xs font-medium text-[#06090B] transition-opacity duration-300 hover:opacity-85 md:block">
              Escuchar a Aria
            </BookingLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
              className="text-[#F2F6F5] transition-colors duration-300 hover:text-[#3BB7A8] md:hidden"
            >
              <Menu size={22} strokeWidth={1.25} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="text-sm font-extralight tracking-[0.3em] text-[#F2F6F5]">
                ARIA
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="text-[#F2F6F5] transition-colors duration-300 hover:text-[#3BB7A8]"
              >
                <X size={22} strokeWidth={1.25} />
              </button>
            </div>

            <ul className="flex flex-1 flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.05, ease: EASE }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-2xl font-light text-[#F2F6F5]"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.15 + NAV_LINKS.length * 0.05,
                  ease: EASE,
                }}
              >
                <BookingLink className="mt-2 block rounded-full bg-[#3BB7A8] px-7 py-3 text-sm font-medium text-[#06090B]">
                  Escuchar a Aria
                </BookingLink>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
