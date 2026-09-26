import { Link } from 'react-router-dom'
import { BookOpen, Phone } from 'lucide-react'
import Button from './Button'

export function AuroraHero() {
  return (
    <section className="relative overflow-hidden bg-marino px-4 pt-16 md:pt-24 pb-24 md:pb-32 flex flex-col items-center">
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-dorado to-transparent" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="mb-6 inline-flex items-center gap-2 bg-dorado/20 text-dorado border border-dorado/30 rounded-full px-4 py-1.5 text-xs font-body font-bold tracking-widest uppercase">
          Cobeja · Toledo · Desde el primer día
        </span>

        <h1
          className="font-display font-bold text-white mb-4 leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
        >
          M.C. Papelería
        </h1>

        <p className="font-body text-white/65 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
          Tu papelería de confianza en Cobeja: material escolar, fotocopias e
          impresión, y punto oficial de Lotería y Apuestas del Estado.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link to="/reservas">
            <Button size="lg" className="shadow-lg">
              <BookOpen size={19} />
              Reservar Material Escolar
            </Button>
          </Link>

          <Link to="/contacto">
            <Button size="lg" variant="ghost">
              <Phone size={19} />
              Llámanos
            </Button>
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
    </section>
  )
}
