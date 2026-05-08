import { Link } from 'react-router-dom'
import {
  Printer, Copy, BookOpen, Briefcase, Newspaper, Gift,
  Ticket, Clock, Phone, ChevronRight, Star
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import { AuroraHero } from '../components/AuroraHero'

const SERVICIOS = [
  { icon: Copy, label: 'Fotocopias', desc: 'B/N y color, tamaño A4 y A3' },
  { icon: Printer, label: 'Impresión', desc: 'Documentos, fotos y trabajos' },
  { icon: BookOpen, label: 'Encuadernación', desc: 'Espiral, tapa dura y térmica' },
  { icon: Briefcase, label: 'Material Oficina', desc: 'Carpetas, archivadores y más' },
  { icon: Newspaper, label: 'Prensa', desc: 'Periódicos y revistas diarias' },
  { icon: Gift, label: 'Regalos', desc: 'Detalles para cada ocasión' },
]

const HORARIO = [
  { dia: 'Lunes – Viernes', manana: '9:30 – 13:30', tarde: '17:00 – 20:00' },
  { dia: 'Sábado', manana: '10:00 – 13:30', tarde: '—' },
  { dia: 'Domingo', manana: 'Cerrado', tarde: '' },
]

export default function Home() {
  return (
    <div className="pt-16 md:pt-20">
      {/* HERO */}
      <AuroraHero />

      {/* BLOQUES DESTACADOS */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-marino mb-3">
            ¿Qué encontrarás aquí?
          </h2>
          <div className="golden-divider" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Papelería */}
          <Link to="/papeleria" className="group">
            <Card className="border-2 border-transparent group-hover:border-dorado h-full transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-gris-suave rounded-xl p-4 shrink-0">
                  <BookOpen size={32} className="text-rojo" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-marino mb-2">
                    Papelería & Material Escolar
                  </h3>
                  <p className="font-body text-gray-600 text-sm leading-relaxed mb-4">
                    Todo lo que necesitas para el cole, la oficina o tus proyectos creativos.
                    Cuadernos, bolígrafos, carpetas, material de manualidades y mucho más.
                  </p>
                  <span className="inline-flex items-center gap-1 text-rojo font-body font-bold text-sm group-hover:gap-2 transition-all">
                    Ver productos <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </Card>
          </Link>

          {/* Lotería */}
          <Link to="/loteria" className="group">
            <Card className="border-2 border-transparent group-hover:border-dorado h-full transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-gris-suave rounded-xl p-4 shrink-0">
                  <Ticket size={32} className="text-dorado" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-marino mb-2">
                    Lotería del Estado
                  </h3>
                  <p className="font-body text-gray-600 text-sm leading-relaxed mb-4">
                    Punto oficial de Lotería y Apuestas del Estado. Lotería Nacional,
                    Primitiva, Bonoloto, Euromillones y mucho más. ¡Quizás hoy es tu día!
                  </p>
                  <span className="inline-flex items-center gap-1 text-dorado font-body font-bold text-sm group-hover:gap-2 transition-all">
                    Ver juegos <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="bg-gris-suave py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-marino mb-3">
              Nuestros servicios
            </h2>
            <div className="golden-divider" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SERVICIOS.map(({ icon: Icon, label, desc }, i) => (
              <Card
                key={label}
                className={`text-center animate-fade-in-up stagger-${i + 1}`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-rojo/10 rounded-full p-3">
                    <Icon size={24} className="text-rojo" />
                  </div>
                  <h3 className="font-body font-bold text-marino text-sm">{label}</h3>
                  <p className="font-body text-gray-500 text-xs leading-relaxed hidden sm:block">
                    {desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA RESERVAS */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-rojo rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white to-transparent" />
          <div className="relative">
            <Star size={32} className="text-dorado mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              ¿Empezamos el cole?
            </h2>
            <p className="font-body text-white/85 text-lg max-w-xl mx-auto mb-8">
              Reserva el material escolar de tus hijos y lo tendremos listo para cuando vengas a recogerlo.
              Sin esperas, sin agobios.
            </p>
            <Link to="/reservas">
              <Button size="lg" variant="outline">
                Reservar material ahora
                <ChevronRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* HORARIO + MAPA */}
      <section className="bg-gris-suave py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Horario */}
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <Clock size={24} className="text-dorado" />
                <h2 className="font-display text-2xl font-bold text-marino">
                  Horario de apertura
                </h2>
              </div>
              <table className="w-full font-body text-sm">
                <tbody>
                  {HORARIO.map(({ dia, manana, tarde }) => (
                    <tr key={dia} className="border-b border-gris-suave last:border-0">
                      <td className="py-3 pr-4 font-bold text-marino">{dia}</td>
                      <td className="py-3 pr-2 text-gray-600">{manana}</td>
                      <td className="py-3 text-gray-600">{tarde}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 pt-4 border-t border-gris-suave">
                <a
                  href="tel:+34925551721"
                  className="inline-flex items-center gap-2 text-rojo font-body font-bold hover:underline"
                >
                  <Phone size={16} />
                  925 551 721
                </a>
              </div>
            </Card>

            {/* Mapa */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gris-suave h-72 md:h-80">
              <iframe
                title="Ubicación M.C. Papelería"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3052.4!2d-3.73!3d39.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6888b0000000001%3A0x0!2sAv.%20San%20Francisco%2C%203%2C%2045291%20Cobeja%2C%20Toledo!5e0!3m2!1ses!2ses!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
