import type { ReactNode } from 'react'
import { BOOKING_URL, isExternal } from '../lib/content'

/**
 * Cualquier CTA que lleve a reservar un turno. Centraliza el destino y, cuando
 * BOOKING_URL ya es una URL real, agrega target/rel para abrirla en una pestaña
 * nueva sin exponer el opener.
 */
export function BookingLink({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const external = isExternal(BOOKING_URL)

  return (
    <a
      href={BOOKING_URL}
      className={className}
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
    >
      {children}
    </a>
  )
}
