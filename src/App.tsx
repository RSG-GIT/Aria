import { MotionConfig } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Solution } from './components/Solution'
import { Capabilities } from './components/Capabilities'
import { Trust } from './components/Trust'
import { Testimonials } from './components/Testimonials'
import { Pricing } from './components/Pricing'
import { Footer } from './components/Footer'

export default function App() {
  return (
    // Framer Motion writes inline styles, so the CSS media query in index.css
    // cannot reach it — `reducedMotion="user"` is what drops the travel and
    // leaves plain opacity fades when the OS asks for less movement.
    <MotionConfig reducedMotion="user">
      {/* Fixed, so it sits outside the hero's stacking context and stays on top. */}
      <Navbar />

      <main>
        {/* Hero owns the pinned video plus the problem section that scrolls over it. */}
        <Hero />

        {/* Opaque and above the pinned backdrop, which is still painting at z-0. */}
        <div className="relative z-10 bg-[#06090B]">
          <Solution />
          <Capabilities />
          <Trust />
          <Testimonials />
          <Pricing />
          <Footer />
          <div aria-hidden="true" className="h-[10vh]" />
        </div>
      </main>
    </MotionConfig>
  )
}
