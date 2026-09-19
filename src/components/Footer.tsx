import { FOOTER_LINKS } from '../lib/content'

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 md:px-10">
      <div className="border-t border-white/[0.06] py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <a
            href="#"
            className="text-sm font-extralight tracking-[0.3em] text-[#F2F6F5]"
            aria-label="Aria, inicio"
          >
            ARIA
          </a>

          <nav aria-label="Pie de página">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs font-light text-[#8FA09E] transition-colors duration-300 hover:text-[#F2F6F5]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <address className="text-xs font-light not-italic text-[#8FA09E] md:text-right">
            <a
              href="#"
              className="block transition-colors duration-300 hover:text-[#F2F6F5]"
            >
              hola@aria.vet
            </a>
            <a
              href="#"
              className="mt-2 block transition-colors duration-300 hover:text-[#F2F6F5]"
            >
              +54 11 5000 0000
            </a>
          </address>
        </div>

        <p className="mt-12 text-xs font-light text-[#8FA09E]/85">
          © {new Date().getFullYear()} Aria. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
