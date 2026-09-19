import {
  Bell,
  CalendarCheck,
  FileText,
  Languages,
  MessageSquare,
  Phone,
  Siren,
  type LucideIcon,
} from 'lucide-react'

/**
 * Página de reservas de Google Calendar (appointment schedule).
 * Todos los CTA de agendado apuntan acá: cambiando esta constante se
 * redirige la página entera.
 */
export const BOOKING_URL = '#'

/** True cuando BOOKING_URL ya apunta a un destino real y externo. */
export const isExternal = (href: string) => /^https?:\/\//.test(href)

export const NAV_LINKS = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Capacidades', href: '#capacidades' },
  { label: 'Precios', href: '#precios' },
]

export const BENEFITS = [
  {
    number: '01',
    title: 'Contesta siempre',
    body: 'Primer tono, a cualquier hora. Mientras usted está en consulta, en cirugía o cerrando la clínica, Aria atiende, escucha y resuelve como lo haría su recepcionista.',
  },
  {
    number: '02',
    title: 'Agenda sola',
    body: 'Consulta su calendario en tiempo real, ofrece los huecos que existen de verdad y confirma el turno antes de cortar. Sin doble reserva, sin planillas que cuadrar después.',
  },
  {
    number: '03',
    title: 'Confirma y recuerda',
    body: 'Manda el recordatorio el día anterior, reprograma al que no puede y le avisa cuando se libera un lugar. Los ausentes dejan de ser un costo fijo.',
  },
]

export const CAPABILITIES: {
  icon: LucideIcon
  title: string
  body: string
}[] = [
  {
    icon: Phone,
    title: 'Atiende llamadas 24/7',
    body: 'Turnos, precios, horarios y ubicación. Sin menús ni «marque uno».',
  },
  {
    icon: CalendarCheck,
    title: 'Agenda, reprograma y cancela',
    body: 'Escribe directo en su calendario y respeta la duración real de cada práctica.',
  },
  {
    icon: MessageSquare,
    title: 'Responde WhatsApp',
    body: 'La misma Aria del teléfono, con el historial completo de la conversación.',
  },
  {
    icon: Bell,
    title: 'Recuerda y confirma',
    body: 'Aviso 24 horas antes y confirmación el mismo día. Menos ausentes, agenda más llena.',
  },
  {
    icon: Languages,
    title: 'Habla español e inglés',
    body: 'Detecta el idioma en los primeros segundos y sigue la llamada sin preguntar.',
  },
  {
    icon: Siren,
    title: 'Detecta urgencias',
    body: 'Reconoce un caso grave, deriva la llamada al instante y avisa al equipo de guardia.',
  },
  {
    icon: FileText,
    title: 'Deja todo por escrito',
    body: 'Motivo, datos del dueño y nombre de la mascota, en su bandeja apenas corta.',
  },
]

export const SEALS = [
  { title: 'Latencia bajo 700 ms', body: 'Responde sin ese silencio que delata a un robot.' },
  { title: 'Cifrado de punta a punta', body: 'Los datos de sus clientes no entrenan ningún modelo.' },
  { title: 'Cada llamada auditable', body: 'Audio y transcripción disponibles para su equipo.' },
]

export const TESTIMONIALS = [
  {
    quote:
      'Dejamos de perder los turnos de los lunes a la mañana. Esa sola hora ya pagaba a Aria.',
    name: 'Dra. Marina Echeverría',
    role: 'Directora · Clínica Veterinaria Sur',
  },
  {
    quote:
      'La pusimos dos semanas para no atender el teléfono en cirugía. No pensamos volver atrás.',
    name: 'Nicolás Arregui',
    role: 'Socio · Centro Veterinario Pilar',
  },
  {
    quote:
      'Ninguna clienta me comentó nada raro. Cuando les conté que era una IA, no me creyeron.',
    name: 'Carolina Ferreyra',
    role: 'Dueña · Estética Canina Bruno',
  },
]

export const PRICING_INCLUDES = [
  'Llamadas ilimitadas, 24 horas, todos los días',
  'Integración con su calendario actual',
  'Recordatorios y confirmaciones automáticas',
  'Derivación de urgencias a su guardia',
  'Resumen escrito de cada llamada',
  'Su mismo número: no hay nada que portar',
  'Ajustes de guion y soporte incluidos',
]

export const FOOTER_LINKS = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Capacidades', href: '#capacidades' },
  { label: 'Precios', href: '#precios' },
  { label: 'Privacidad', href: '#' },
  { label: 'Términos', href: '#' },
]
