import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/papeleria', label: 'Papelería' },
  { to: '/reservas', label: 'Reservar Material' },
  { to: '/loteria', label: 'Lotería' },
  { to: '/contacto', label: 'Contacto' },
]

const WA_URL = 'https://wa.me/34925551721?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n%20sobre%20M.C.%20Papelar%C3%ADa'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md'
          : 'bg-white/95 backdrop-blur-sm shadow-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-tight">
            <span className="font-display font-bold text-xl md:text-2xl text-marino">
              M.C. Papelería
            </span>
            <span className="text-xs text-dorado font-body tracking-wider hidden sm:block">
              Cobeja · Toledo
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-body font-medium transition-colors ${
                    isActive
                      ? 'text-rojo font-bold'
                      : 'text-marino hover:text-rojo'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* WhatsApp CTA */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-verde text-white px-4 py-2 rounded-full text-sm font-body font-bold hover:bg-green-700 transition-colors"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-marino"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gris-suave px-4 pb-4 animate-fade-in">
          <nav className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-md text-base font-body font-medium border-b border-gris-suave last:border-0 ${
                    isActive ? 'text-rojo font-bold' : 'text-marino'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 bg-verde text-white px-4 py-3 rounded-full font-body font-bold"
              onClick={() => setMenuOpen(false)}
            >
              <MessageCircle size={18} />
              Escríbenos por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
