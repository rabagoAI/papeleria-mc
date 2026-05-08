import { useState, useId } from 'react'
import { Phone, MessageCircle, MapPin, Clock, CheckCircle, AlertCircle, Loader2, Mail } from 'lucide-react'
import Button from '../components/Button'
import { enviarContacto } from '../services/reservas'
import type { ContactoFormData, FormStatus } from '../types'

const HORARIO = [
  { dia: 'Lunes', manana: '9:30 – 13:30', tarde: '17:00 – 20:00' },
  { dia: 'Martes', manana: '9:30 – 13:30', tarde: '17:00 – 20:00' },
  { dia: 'Miércoles', manana: '9:30 – 13:30', tarde: '17:00 – 20:00' },
  { dia: 'Jueves', manana: '9:30 – 13:30', tarde: '17:00 – 20:00' },
  { dia: 'Viernes', manana: '9:30 – 13:30', tarde: '17:00 – 20:00' },
  { dia: 'Sábado', manana: '10:00 – 13:30', tarde: '—' },
  { dia: 'Domingo', manana: 'Cerrado', tarde: '' },
]

const INITIAL: ContactoFormData = { nombre: '', telefono: '', mensaje: '' }

export default function Contacto() {
  const id = useId()
  const [form, setForm] = useState<ContactoFormData>(INITIAL)
  const [errores, setErrores] = useState<Partial<Record<keyof ContactoFormData, string>>>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errores[name as keyof ContactoFormData]) {
      setErrores(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function validar() {
    const e: Partial<Record<keyof ContactoFormData, string>> = {}
    if (!form.nombre.trim()) e.nombre = 'Indica tu nombre'
    if (!/^(\+34|0034)?[6789]\d{8}$/.test(form.telefono.replace(/\s/g, '')))
      e.telefono = 'Introduce un teléfono español válido'
    if (!form.mensaje.trim()) e.mensaje = 'Escribe tu mensaje'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validar()
    if (Object.keys(errs).length > 0) { setErrores(errs); return }
    setStatus('sending')
    const ok = await enviarContacto(form)
    setStatus(ok ? 'success' : 'error')
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Cabecera */}
      <section className="bg-marino py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-dorado to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-dorado/20 text-dorado border border-dorado/30 text-xs font-body font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            <Mail size={14} />
            Contacto
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Estamos aquí para ayudarte
          </h1>
          <p className="font-body text-white/75 text-lg">
            Llámanos, escríbenos o pásate por la tienda. Estaremos encantados de atenderte.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 15C480 30 240 0 0 15L0 40Z" fill="#FAF8F5" />
          </svg>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Columna izquierda */}
          <div className="space-y-6">
            {/* Teléfono */}
            <div className="bg-white rounded-2xl border border-gris-suave p-6 card-hover">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-50 rounded-xl p-3">
                  <Phone size={24} className="text-rojo" />
                </div>
                <h2 className="font-display text-xl font-bold text-marino">Teléfono</h2>
              </div>
              <a
                href="tel:+34925551721"
                className="font-body text-2xl font-black text-rojo hover:underline block"
              >
                925 551 721
              </a>
              <p className="font-body text-sm text-gray-500 mt-1">
                Llámanos en horario de apertura
              </p>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-2xl border border-gris-suave p-6 card-hover">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-50 rounded-xl p-3">
                  <MessageCircle size={24} className="text-verde" />
                </div>
                <h2 className="font-display text-xl font-bold text-marino">WhatsApp</h2>
              </div>
              <a
                href="https://wa.me/34925551721?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" className="w-full">
                  <MessageCircle size={18} />
                  Abrir WhatsApp
                </Button>
              </a>
            </div>

            {/* Dirección */}
            <div className="bg-white rounded-2xl border border-gris-suave p-6 card-hover">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-50 rounded-xl p-3">
                  <MapPin size={24} className="text-marino" />
                </div>
                <h2 className="font-display text-xl font-bold text-marino">Dirección</h2>
              </div>
              <address className="font-body not-italic text-gray-700 text-base leading-relaxed">
                Av. San Francisco, nº 3, local B<br />
                45291 Cobeja, Toledo
              </address>
              <a
                href="https://maps.google.com/?q=Av.+San+Francisco+3+Cobeja+Toledo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 font-body text-sm text-rojo font-bold hover:underline"
              >
                Ver en Google Maps →
              </a>
            </div>

            {/* Horario */}
            <div className="bg-white rounded-2xl border border-gris-suave p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-50 rounded-xl p-3">
                  <Clock size={24} className="text-dorado" />
                </div>
                <h2 className="font-display text-xl font-bold text-marino">Horario</h2>
              </div>
              <table className="w-full font-body text-sm">
                <tbody>
                  {HORARIO.map(({ dia, manana, tarde }) => (
                    <tr
                      key={dia}
                      className={`border-b border-gris-suave last:border-0 ${
                        dia === 'Domingo' ? 'text-gray-400' : ''
                      }`}
                    >
                      <td className="py-2 pr-4 font-bold text-marino w-32">{dia}</td>
                      <td className="py-2 pr-3">{manana}</td>
                      <td className="py-2">{tarde}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-6">
            {/* Formulario contacto */}
            <div className="bg-white rounded-2xl border border-gris-suave p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold text-marino mb-6">
                Envíanos un mensaje
              </h2>

              {status === 'success' ? (
                <div className="text-center py-8 animate-fade-in-up">
                  <CheckCircle size={48} className="text-verde mx-auto mb-4" />
                  <p className="font-display text-xl font-bold text-marino mb-2">
                    ¡Mensaje recibido!
                  </p>
                  <p className="font-body text-gray-600 text-sm">
                    Te responderemos lo antes posible.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm(INITIAL) }}
                    className="mt-4 font-body text-sm text-rojo font-bold hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {status === 'error' && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-sm">
                      <AlertCircle size={16} className="text-rojo shrink-0 mt-0.5" />
                      <span className="font-body text-gray-700">
                        No se pudo enviar. Llámanos al{' '}
                        <a href="tel:+34925551721" className="text-rojo font-bold">925 551 721</a>.
                      </span>
                    </div>
                  )}

                  <div>
                    <label htmlFor={`${id}-nombre`} className="block font-body text-sm font-bold text-marino mb-1.5">
                      Tu nombre *
                    </label>
                    <input
                      type="text"
                      id={`${id}-nombre`}
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="¿Cómo te llamas?"
                      className={inputCls(errores.nombre)}
                    />
                    {errores.nombre && <Err msg={errores.nombre} />}
                  </div>

                  <div>
                    <label htmlFor={`${id}-telefono`} className="block font-body text-sm font-bold text-marino mb-1.5">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id={`${id}-telefono`}
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="612 345 678"
                      className={inputCls(errores.telefono)}
                    />
                    {errores.telefono && <Err msg={errores.telefono} />}
                  </div>

                  <div>
                    <label htmlFor={`${id}-mensaje`} className="block font-body text-sm font-bold text-marino mb-1.5">
                      Mensaje *
                    </label>
                    <textarea
                      id={`${id}-mensaje`}
                      name="mensaje"
                      value={form.mensaje}
                      onChange={handleChange}
                      rows={5}
                      placeholder="¿En qué podemos ayudarte?"
                      className={inputCls(errores.mensaje)}
                    />
                    {errores.mensaje && <Err msg={errores.mensaje} />}
                  </div>

                  <Button type="submit" className="w-full" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <><Loader2 size={18} className="animate-spin" />Enviando...</>
                    ) : (
                      <><Mail size={18} />Enviar mensaje</>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Mapa */}
            <div className="rounded-2xl overflow-hidden border border-gris-suave shadow-sm h-72">
              <iframe
                title="Mapa M.C. Papelería Cobeja"
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
      </div>
    </div>
  )
}

function Err({ msg }: { msg: string }) {
  return (
    <p className="font-body text-xs text-rojo mt-1 flex items-center gap-1">
      <AlertCircle size={12} />
      {msg}
    </p>
  )
}

function inputCls(error?: string) {
  return `
    w-full px-4 py-3 rounded-xl border font-body text-sm transition-colors
    focus:outline-none focus:ring-2 focus:ring-offset-0
    ${error
      ? 'border-rojo bg-red-50 focus:ring-red-300'
      : 'border-gray-200 bg-white focus:border-dorado focus:ring-yellow-200'
    }
  `
}
