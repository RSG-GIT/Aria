# ARIA — landing page

Landing de una sola página para **Aria**, recepcionista virtual con IA para
clínicas veterinarias y estéticas de mascotas.

Stack: React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Framer Motion · lucide-react

## Comandos

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

## Estructura

```
src/
  App.tsx                  orden de secciones + MotionConfig
  index.css                design tokens, .liquid-glass, loops, reduced-motion
  hooks/
    usePingPongVideo.ts    loop ida y vuelta del video del hero
    useMediaQuery.ts       useIsDesktop / useReducedMotion
  lib/
    content.ts             todo el copy y los datos
    motion.ts              variantes compartidas de entrada
  components/              Navbar, Hero, Problem, Solution, Capabilities,
                           Trust, Testimonials, Pricing, Footer,
                           AudioWave, LiveCallCard, CornerBrackets
public/
  aria-transition.mp4      fondo sticky del hero (4.3 MB)
  aria-frame-01.jpg/.webp  poster del hero + imagen OG
  aria-frame-02.jpg/.webp  fondo de la sección de confianza
```

## Decisiones que conviene conocer

**Ping-pong del video.** `playbackRate = -1` no es confiable: Chrome y Safari lo
vuelven a un valor positivo en silencio. `usePingPongVideo` lo intenta, relee el
valor y, si no quedó, rebobina a mano decrementando `currentTime` en `1/60` por
frame con `requestAnimationFrame`. Verificado: el clip gira en 0.03 s y 5.95 s
sin corte.

**Velos del hero.** La onda del video se mete más a la izquierda de lo que el
diseño asumía, así que el texto no era legible sobre ella. Hay dos degradados
sobre el video: uno horizontal en desktop que despeja la columna izquierda, y
uno vertical en mobile, donde el texto ocupa todo el ancho y el frame pasa a ser
textura. Los dos están en `Hero.tsx` como `FADE_LEFT` y `FADE_MOBILE`.

**Sección de confianza.** La máscara radial del brief deja la imagen más brillante
justo detrás del párrafo. Se agregó `CENTRE_SCRIM`, un degradado radial oscuro
por encima, que le devuelve el centro al texto sin tapar la onda en los bordes.

**No definir un color `base` en `@theme`.** Tailwind 4 genera una utilidad de
color por cada `--color-*`, y `--color-base` produce un `text-base` que pisa la
utilidad de tamaño de fuente del mismo nombre. El token se llama `--color-night`.

**Mobile.** Debajo de 768 px no se monta el `<video>`: se sirve el poster en
`<picture>` con WebP. Ahorra ~4.3 MB de transferencia y el decode en loop.

**Accesibilidad.** Auditoría de contraste sobre los colores compuestos reales
(incluyendo alfas): 0 textos por debajo de AA. El video y las ondas SVG son
`aria-hidden`; el revelado letra por letra expone el párrafo completo en un
`sr-only` y oculta los spans partidos. Focus rings teal en `:focus-visible`.

**Reduced motion.** `MotionConfig reducedMotion="user"` corta las animaciones
inline de Framer Motion (el media query de CSS no las alcanza). Además: sin
loops, sin revelado letra por letra y el video queda pausado en el frame 0.

## Reservas

Los cuatro CTA de agendado (navbar desktop, menú mobile, hero, solución y
pricing) pasan por `BOOKING_URL` en `src/lib/content.ts` y abren la página de
reservas de Google Calendar en una pestaña nueva. Para cambiar el destino de
todos a la vez, se edita esa única constante. `BookingLink` agrega
`target="_blank"` y `rel="noopener noreferrer"` solo cuando la URL es externa,
así que dejarla en `#` durante el desarrollo no rompe nada.

## Pendiente

Siguen en `#`: privacidad, términos y los datos de contacto del footer (que
además deberían ser `mailto:` y `tel:` cuando haya datos reales). Los
testimonios, el precio y el contacto son de muestra.

Las imágenes de `public/` se optimizaron una sola vez con `sharp` (2752×1536 →
1920 de ancho, JPEG q74 + WebP q72; 1.6 MB → ~68 KB cada una). La dependencia se
desinstaló; si hay que repetirlo, `npm i -D sharp` y volver a correr el resize.
