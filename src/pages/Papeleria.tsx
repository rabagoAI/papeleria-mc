import { Link } from 'react-router-dom'
import {
  GraduationCap, Briefcase, Printer, Scissors, Gift,
  Newspaper, ChevronRight, Package
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

const CATEGORIAS = [
  {
    icon: GraduationCap,
    label: 'Material Escolar',
    desc: 'Cuadernos, libros de texto, estuches, mochilas, reglas, compases y todo lo que necesita el alumno.',
    color: 'text-rojo',
    bg: 'bg-red-50',
  },
  {
    icon: Briefcase,
    label: 'Material de Oficina',
    desc: 'Archivadores, carpetas, bolígrafos, rotuladores, clips, grapas, sobres y material de escritorio.',
    color: 'text-marino',
    bg: 'bg-blue-50',
  },
  {
    icon: Printer,
    label: 'Impresión y Fotocopias',
    desc: 'Fotocopias en B/N y color, impresión de documentos, fotografías, trabajos académicos y encuadernación.',
    color: 'text-dorado',
    bg: 'bg-yellow-50',
  },
  {
    icon: Scissors,
    label: 'Manualidades',
    desc: 'Cartulinas, gomas EVA, pinturas, pinceles, pegamento, tijeras y materiales para proyectos creativos.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Gift,
    label: 'Regalos y Detalles',
    desc: 'Tarjetas de felicitación, papel de regalo, lazos, agendas, marcos y pequeños detalles para cada momento.',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
  },
  {
    icon: Newspaper,
    label: 'Prensa y Revistas',
    desc: 'Periódicos nacionales y locales, revistas de actualidad, programación y entretenimiento cada día.',
    color: 'text-verde',
    bg: 'bg-green-50',
  },
]

const PLACEHOLDER_ITEMS = [
  'Cuadernos y libretas', 'Bolígrafos y plumas', 'Lápices de colores',
  'Rotuladores', 'Reglas y escuadras', 'Compases', 'Mochilas escolares',
  'Estuches y portalápices', 'Pegamentos y colas', 'Tijeras escolares',
  'Carpetas y archivadores', 'Folios y papel', 'Sobres y tarjetas',
  'Celo y cintas adhesivas', 'Grapas y grapadora', 'Post-its',
]

export default function Papeleria() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Cabecera */}
      <section className="bg-marino py-16 md:py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-dorado to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-dorado/20 text-dorado border border-dorado/30 text-xs font-body font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            <Package size={14} />
            Papelería & Oficina
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Todo lo que necesitas
          </h1>
          <p className="font-body text-white/75 text-lg leading-relaxed">
            Desde el primer lápiz hasta el último archivador. En M.C. Papelería encontrarás
            material escolar, de oficina, manualidades, prensa y regalos.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 15C480 30 240 0 0 15L0 40Z" fill="#FAF8F5" />
          </svg>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-marino mb-3">
            Nuestras categorías
          </h2>
          <div className="golden-divider" />
          <p className="font-body text-gray-500 mt-4 max-w-xl mx-auto">
            Amplio surtido de productos para todas las edades y necesidades.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIAS.map(({ icon: Icon, label, desc, color, bg }, i) => (
            <Card
              key={label}
              className={`animate-fade-in-up stagger-${i + 1}`}
            >
              <div className={`${bg} rounded-xl p-4 inline-flex mb-4`}>
                <Icon size={28} className={color} />
              </div>
              <h3 className="font-display text-xl font-bold text-marino mb-2">
                {label}
              </h3>
              <p className="font-body text-gray-600 text-sm leading-relaxed">
                {desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Galería / Grid de productos */}
      <section className="bg-gris-suave py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-marino mb-3">
              Algunos de nuestros productos
            </h2>
            <div className="golden-divider" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {PLACEHOLDER_ITEMS.map((item, i) => (
              <div
                key={item}
                className={`bg-white rounded-xl p-4 text-center shadow-sm border border-gris-suave card-hover animate-fade-in-up stagger-${Math.min(i + 1, 7)}`}
              >
                <div className="w-full aspect-square bg-gris-suave rounded-lg mb-3 flex items-center justify-center">
                  <Package size={32} className="text-gray-300" />
                </div>
                <p className="font-body text-sm font-medium text-marino">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-center font-body text-gray-500 text-sm mt-6">
            * Surtido sujeto a disponibilidad. Consulta disponibilidad en tienda.
          </p>
        </div>
      </section>

      {/* Servicios de copia */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-marino rounded-3xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold mb-4">
                Servicio de fotocopias e impresión
              </h2>
              <ul className="font-body text-white/80 space-y-3">
                {[
                  'Fotocopias en blanco y negro y color',
                  'Tamaños A4 y A3',
                  'Impresión de documentos y trabajos',
                  'Fotografías en diferentes tamaños',
                  'Encuadernación espiral y tapa dura',
                  'Plastificado de documentos',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <ChevronRight size={16} className="text-dorado shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <Printer size={80} className="text-dorado mx-auto mb-4 opacity-80" />
              <p className="font-body text-white/70 text-sm">
                Trae tu documento en USB, correo o en papel. Lo tendremos listo en minutos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA reservas */}
      <section className="bg-gris-suave py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <GraduationCap size={40} className="text-rojo mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold text-marino mb-4">
            ¿Necesitas material escolar?
          </h2>
          <p className="font-body text-gray-600 mb-8 leading-relaxed">
            Rellena el formulario de reserva y preparamos todo el material de tus hijos
            con antelación. Sin esperas al volver al cole.
          </p>
          <Link to="/reservas">
            <Button size="lg">
              Reservar material escolar
              <ChevronRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
