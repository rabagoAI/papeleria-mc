import { Component, lazy, Suspense, useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useMotionTemplate, useMotionValue, motion, animate } from 'framer-motion'
import { BookOpen, Phone } from 'lucide-react'

const StarsCanvas = lazy(() => import('./StarsCanvas'))

const AURORA_COLORS = ['#1B2A4A', '#8B1A1A', '#D4A017', '#C0392B', '#2C3E6B']

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

export function AuroraHero() {
  const color = useMotionValue(AURORA_COLORS[0])

  useEffect(() => {
    animate(color, AURORA_COLORS, {
      ease: 'easeInOut',
      duration: 12,
      repeat: Infinity,
      repeatType: 'mirror',
    })
  }, [])

  const backgroundImage = useMotionTemplate`radial-gradient(130% 130% at 50% 0%, #0d1829 45%, ${color})`
  const border = useMotionTemplate`1px solid ${color}`
  const boxShadow = useMotionTemplate`0px 4px 28px ${color}`

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative overflow-hidden px-4 py-24 md:py-36 flex flex-col items-center"
    >
      {/* Estrellas 3D — lazy + ErrorBoundary para aislar fallos de WebGL */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CanvasBoundary>
          <Suspense fallback={null}>
            <StarsCanvas />
          </Suspense>
        </CanvasBoundary>
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.span
          style={{ border, boxShadow }}
          className="mb-6 inline-block rounded-full bg-white/5 px-4 py-1.5 text-xs font-body font-bold tracking-widest uppercase text-dorado"
        >
          Cobeja · Toledo · Desde el primer día
        </motion.span>

        <h1
          className="font-display font-bold text-white mb-4 leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
        >
          M.C. Papelería
        </h1>

        <p
          className="font-display italic text-dorado mb-5"
          style={{ fontSize: 'clamp(1.1rem, 3vw, 1.6rem)' }}
        >
          Tu papelería de confianza
        </p>

        <p className="font-body text-white/65 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
          Material escolar y de oficina, fotocopias e impresión, y punto oficial de
          Lotería y Apuestas del Estado.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link to="/reservas">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-rojo text-white font-body font-bold px-7 py-3.5 rounded-full hover:bg-red-700 transition-colors shadow-lg"
            >
              <BookOpen size={19} />
              Reservar Material Escolar
            </motion.button>
          </Link>

          <Link to="/contacto">
            <motion.button
              style={{ border, boxShadow }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-white/5 text-white font-body font-bold px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <Phone size={19} />
              Llámanos
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Wave SVG inferior */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z"
            fill="#FAF8F5"
          />
        </svg>
      </div>
    </motion.section>
  )
}
