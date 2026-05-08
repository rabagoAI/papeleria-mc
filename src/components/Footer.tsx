import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-marino text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Identidad */}
          <div>
            <h3 className="font-display text-2xl font-bold text-dorado mb-3">
              M.C. Papelería
            </h3>
            <p className="text-white/70 text-sm leading-relaxed font-body">
              Tu papelería de confianza en Cobeja, Toledo. Material escolar,
              oficina, fotocopias y punto oficial de Lotería y Apuestas del Estado.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-display text-lg font-semibold text-dorado mb-4">
              Contacto
            </h4>
            <ul className="space-y-3 font-body text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-dorado mt-0.5 shrink-0" />
                <span className="text-white/80">
                  Av. San Francisco, nº 3, local B<br />
                  45291 Cobeja, Toledo
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-dorado shrink-0" />
                <a href="tel:+34925551721" className="text-white/80 hover:text-white transition-colors">
                  925 551 721
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={16} className="text-dorado shrink-0" />
                <a
                  href="https://wa.me/34925551721"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Horario */}
          <div>
            <h4 className="font-display text-lg font-semibold text-dorado mb-4 flex items-center gap-2">
              <Clock size={16} />
              Horario
            </h4>
            <table className="text-sm font-body w-full">
              <tbody>
                {[
                  ['Lun – Vie', '9:30 – 13:30', '17:00 – 20:00'],
                  ['Sábado', '10:00 – 13:30', '—'],
                  ['Domingo', 'Cerrado', ''],
                ].map(([dia, manana, tarde]) => (
                  <tr key={dia} className="border-b border-white/10">
                    <td className="py-1.5 pr-3 text-white/60 font-medium">{dia}</td>
                    <td className="py-1.5 pr-2 text-white/80">{manana}</td>
                    <td className="py-1.5 text-white/80">{tarde}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="golden-divider mt-10 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50 font-body">
          <p>© {currentYear} M.C. Papelería · Todos los derechos reservados</p>
          <div className="flex gap-4">
            <Link to="/contacto" className="hover:text-white/80 transition-colors">
              Aviso Legal
            </Link>
            <Link to="/contacto" className="hover:text-white/80 transition-colors">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
