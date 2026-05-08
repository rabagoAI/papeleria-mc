import { useState, useEffect } from 'react'
import { Ticket, ExternalLink, AlertTriangle, Star, Clock } from 'lucide-react'

const JUEGOS = [
  {
    nombre: 'Lotería Nacional',
    desc: 'El sorteo más tradicional de España. Sorteos el jueves y el sábado.',
    color: 'bg-red-600',
    textColor: 'text-red-600',
    borderColor: 'border-red-200',
    bgLight: 'bg-red-50',
    emoji: '🔴',
  },
  {
    nombre: 'La Primitiva',
    desc: 'Elige 6 números del 1 al 49 y gana el bote. Sorteos los jueves y sábados.',
    color: 'bg-verde',
    textColor: 'text-verde',
    borderColor: 'border-green-200',
    bgLight: 'bg-green-50',
    emoji: '🟢',
  },
  {
    nombre: 'Bonoloto',
    desc: 'Como la Primitiva pero con más sorteos semanales y precios más accesibles.',
    color: 'bg-blue-600',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    bgLight: 'bg-blue-50',
    emoji: '🔵',
  },
  {
    nombre: 'El Gordo de la Primitiva',
    desc: 'El sorteo con el mayor bote garantizado. Todos los domingos.',
    color: 'bg-orange-500',
    textColor: 'text-orange-500',
    borderColor: 'border-orange-200',
    bgLight: 'bg-orange-50',
    emoji: '🟠',
  },
  {
    nombre: 'Euromillones',
    desc: 'El gran bote europeo. Sorteos todos los martes y viernes.',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600',
    borderColor: 'border-yellow-200',
    bgLight: 'bg-yellow-50',
    emoji: '⭐',
  },
  {
    nombre: 'La Quiniela',
    desc: 'Pronostica los resultados de la jornada de fútbol y gana premios.',
    color: 'bg-emerald-800',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-200',
    bgLight: 'bg-emerald-50',
    emoji: '⚽',
  },
  {
    nombre: 'ONCE / Cupón',
    desc: 'El cupón de la ONCE. Sorteos diarios con muchos números premiados.',
    color: 'bg-yellow-400',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
    bgLight: 'bg-yellow-50',
    emoji: '🎟️',
  },
]

function getNavidadTarget(): Date {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 11, 22) // 22 dic año actual
  if (now > thisYear) {
    return new Date(now.getFullYear() + 1, 11, 22)
  }
  return thisYear
}

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(() => target.getTime() - Date.now())

  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000)
    return () => clearInterval(id)
  }, [target])

  const total = Math.max(0, diff)
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / 1000 / 60 / 60) % 24)
  const days = Math.floor(total / 1000 / 60 / 60 / 24)

  return { days, hours, minutes, seconds }
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[64px] text-center">
        <span className="font-body font-black text-3xl md:text-4xl tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="font-body text-xs font-bold uppercase tracking-wider mt-2 text-white/80">
        {label}
      </span>
    </div>
  )
}

export default function Loteria() {
  const target = getNavidadTarget()
  const { days, hours, minutes, seconds } = useCountdown(target)

  return (
    <div className="pt-16 md:pt-20">
      {/* Cabecera */}
      <section className="bg-marino py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-dorado to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-dorado/20 text-dorado border border-dorado/30 text-xs font-body font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            <Ticket size={14} />
            Punto Oficial
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Lotería y Apuestas del Estado
          </h1>
          <p className="font-body text-white/75 text-lg">
            Punto oficial de venta autorizado por Loterías y Apuestas del Estado.
            Todos los juegos, en tu papelería de confianza.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 15C480 30 240 0 0 15L0 40Z" fill="#FAF8F5" />
          </svg>
        </div>
      </section>

      {/* Grid de juegos */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-marino mb-3">
            Juegos disponibles
          </h2>
          <div className="golden-divider" />
          <p className="font-body text-gray-500 mt-4">
            Venta exclusivamente presencial en nuestra tienda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {JUEGOS.map(({ nombre, desc, textColor, borderColor, bgLight, emoji }, i) => (
            <div
              key={nombre}
              className={`
                rounded-2xl border-2 ${borderColor} ${bgLight} p-6 card-hover
                animate-fade-in-up stagger-${Math.min(i + 1, 7)}
              `}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{emoji}</span>
                <h3 className={`font-display text-xl font-bold ${textColor}`}>
                  {nombre}
                </h3>
              </div>
              <p className="font-body text-gray-600 text-sm leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Countdown Navidad */}
      <section className="bg-rojo py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <Star size={36} className="text-dorado mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            El Gordo de Navidad
          </h2>
          <p className="font-body text-white/80 mb-8 text-lg">
            El sorteo más esperado del año. 22 de diciembre de {target.getFullYear()}.
          </p>

          <div className="flex items-center justify-center gap-4 md:gap-6 mb-8">
            <CountdownUnit value={days} label="Días" />
            <span className="font-body font-black text-3xl text-white/60 mb-6">:</span>
            <CountdownUnit value={hours} label="Horas" />
            <span className="font-body font-black text-3xl text-white/60 mb-6">:</span>
            <CountdownUnit value={minutes} label="Min" />
            <span className="font-body font-black text-3xl text-white/60 mb-6">:</span>
            <CountdownUnit value={seconds} label="Seg" />
          </div>

          <div className="flex items-center justify-center gap-2 bg-white/10 rounded-2xl px-6 py-3 max-w-sm mx-auto">
            <Clock size={16} className="text-dorado" />
            <p className="font-body text-sm text-white/80">
              ¡Pide ya tu décimo en la papelería!
            </p>
          </div>
        </div>
      </section>

      {/* Comprobar número */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-marino mb-4">
          ¿Tienes un número premiado?
        </h2>
        <p className="font-body text-gray-600 mb-8">
          Comprueba tus números directamente en el portal oficial de Loterías y Apuestas del Estado.
        </p>
        <a
          href="https://www.loteriasyapuestas.es"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-marino text-white px-6 py-3 rounded-full font-body font-bold hover:bg-blue-900 transition-colors"
        >
          <ExternalLink size={18} />
          Comprobar en loteriasyapuestas.es
        </a>
      </section>

      {/* Nota legal */}
      <section className="bg-gris-suave py-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-3 bg-white rounded-2xl border border-gris-suave p-5">
            <AlertTriangle size={20} className="text-dorado shrink-0 mt-0.5" />
            <div className="font-body text-sm text-gray-600">
              <p className="font-bold text-marino mb-1">Aviso importante</p>
              <p>
                Venta exclusivamente presencial. Los juegos de azar pueden crear adicción.
                Juega con responsabilidad. <strong>Solo mayores de 18 años.</strong>{' '}
                Si crees que puedes tener un problema, llama al{' '}
                <strong>900 200 225</strong> (gratuito y confidencial).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
