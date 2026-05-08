import { useState, useId } from 'react'
import { MessageCircle, CheckCircle, AlertCircle, Loader2, Info, ClipboardList } from 'lucide-react'
import Button from '../components/Button'
import { enviarReserva, generarNumeroReserva } from '../services/reservas'
import type { ReservaFormData, FormStatus } from '../types'

const CURSOS = [
  'Infantil 3 años', 'Infantil 4 años', 'Infantil 5 años',
  '1º Primaria', '2º Primaria', '3º Primaria', '4º Primaria', '5º Primaria', '6º Primaria',
  '1º ESO', '2º ESO', '3º ESO', '4º ESO',
  '1º Bachillerato', '2º Bachillerato', 'FP Básica',
]

function minFechaRecogida(): string {
  const d = new Date()
  d.setDate(d.getDate() + 2)
  return d.toISOString().split('T')[0]
}

const INITIAL: ReservaFormData = {
  nombre_alumno: '',
  nombre_tutor: '',
  telefono: '',
  centro_educativo: '',
  curso: '',
  materiales: '',
  fecha_recogida: '',
  observaciones: '',
  politica_privacidad: false,
}

function validar(datos: ReservaFormData): Partial<Record<keyof ReservaFormData, string>> {
  const errores: Partial<Record<keyof ReservaFormData, string>> = {}
  if (!datos.nombre_alumno.trim()) errores.nombre_alumno = 'Indica el nombre del alumno'
  if (!datos.nombre_tutor.trim()) errores.nombre_tutor = 'Indica el nombre del tutor'
  if (!/^(\+34|0034)?[6789]\d{8}$/.test(datos.telefono.replace(/\s/g, '')))
    errores.telefono = 'Introduce un teléfono español válido'
  if (!datos.centro_educativo.trim()) errores.centro_educativo = 'Indica el centro educativo'
  if (!datos.curso) errores.curso = 'Selecciona el curso'
  if (!datos.materiales.trim()) errores.materiales = 'Indica los materiales necesarios'
  if (!datos.fecha_recogida) errores.fecha_recogida = 'Selecciona una fecha de recogida'
  if (!datos.politica_privacidad) errores.politica_privacidad = 'Debes aceptar la política de privacidad'
  return errores
}

export default function Reservas() {
  const id = useId()
  const [form, setForm] = useState<ReservaFormData>(INITIAL)
  const [errores, setErrores] = useState<Partial<Record<keyof ReservaFormData, string>>>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [numReserva, setNumReserva] = useState('')

  function field(name: keyof ReservaFormData) {
    return {
      id: `${id}-${name}`,
      name,
      value: form[name] as string,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [name]: e.target.value }))
        if (errores[name]) setErrores(prev => ({ ...prev, [name]: undefined }))
      },
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nuevosErrores = validar(form)
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }
    setStatus('sending')
    const ok = await enviarReserva(form)
    if (ok) {
      setNumReserva(generarNumeroReserva())
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  const waMsg = `Hola%2C%20quiero%20confirmar%20mi%20reserva%20de%20material%20escolar%20n%C3%BAm.%20${numReserva}`

  if (status === 'success') {
    return (
      <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center bg-gris-suave px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gris-suave p-8 md:p-12 max-w-lg w-full text-center animate-fade-in-up">
          <CheckCircle size={56} className="text-verde mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold text-marino mb-2">
            ¡Reserva recibida!
          </h2>
          <p className="font-body text-gray-600 mb-6 leading-relaxed">
            Hemos recibido tu reserva de material escolar. Te llamaremos para confirmarte
            la disponibilidad y la fecha de recogida.
          </p>
          <div className="bg-gris-suave rounded-2xl p-6 mb-6">
            <p className="font-body text-sm text-gray-500 mb-1">Tu número de reserva</p>
            <p className="font-display text-4xl font-bold text-rojo">{numReserva}</p>
            <p className="font-body text-xs text-gray-400 mt-2">
              Guarda este número para consultar tu reserva
            </p>
          </div>
          <a
            href={`https://wa.me/34925551721?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="lg" className="w-full mb-3">
              <MessageCircle size={20} />
              Confirmar por WhatsApp
            </Button>
          </a>
          <button
            onClick={() => { setStatus('idle'); setForm(INITIAL); setErrores({}) }}
            className="font-body text-sm text-gray-500 hover:text-marino transition-colors"
          >
            Hacer otra reserva
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Cabecera */}
      <section className="bg-marino py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-dorado to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-dorado/20 text-dorado border border-dorado/30 text-xs font-body font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            <ClipboardList size={14} />
            Material Escolar
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Reserva de material escolar
          </h1>
          <p className="font-body text-white/75 text-lg">
            Rellena el formulario y tendremos el material listo para cuando vengas a recogerlo.
            Sin esperas, sin sorpresas.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 15C480 30 240 0 0 15L0 40Z" fill="#FAF8F5" />
          </svg>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Formulario */}
        <div className="bg-white rounded-3xl shadow-sm border border-gris-suave p-6 md:p-10">
          {status === 'error' && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4">
              <AlertCircle size={20} className="text-rojo mt-0.5 shrink-0" />
              <div>
                <p className="font-body font-bold text-rojo text-sm">No hemos podido enviar el formulario</p>
                <p className="font-body text-sm text-gray-600 mt-1">
                  Puedes intentarlo de nuevo o{' '}
                  <a
                    href="https://wa.me/34925551721?text=Hola%2C%20quiero%20reservar%20material%20escolar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-verde font-bold hover:underline"
                  >
                    escribirnos por WhatsApp
                  </a>.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Nombre alumno */}
            <Field
              label="Nombre del alumno *"
              error={errores.nombre_alumno}
              htmlFor={`${id}-nombre_alumno`}
            >
              <input
                type="text"
                placeholder="Nombre y apellidos del alumno"
                className={inputClass(errores.nombre_alumno)}
                {...field('nombre_alumno')}
              />
            </Field>

            {/* Tutor */}
            <Field
              label="Nombre del tutor / padre / madre *"
              error={errores.nombre_tutor}
              htmlFor={`${id}-nombre_tutor`}
            >
              <input
                type="text"
                placeholder="Tu nombre completo"
                className={inputClass(errores.nombre_tutor)}
                {...field('nombre_tutor')}
              />
            </Field>

            {/* Teléfono */}
            <Field
              label="Teléfono de contacto *"
              error={errores.telefono}
              htmlFor={`${id}-telefono`}
            >
              <input
                type="tel"
                placeholder="612 345 678"
                className={inputClass(errores.telefono)}
                {...field('telefono')}
              />
            </Field>

            {/* Centro */}
            <Field
              label="Centro educativo *"
              error={errores.centro_educativo}
              htmlFor={`${id}-centro_educativo`}
            >
              <input
                type="text"
                placeholder="Nombre del colegio o instituto"
                className={inputClass(errores.centro_educativo)}
                {...field('centro_educativo')}
              />
            </Field>

            {/* Curso */}
            <Field
              label="Curso / Nivel *"
              error={errores.curso}
              htmlFor={`${id}-curso`}
            >
              <select
                className={inputClass(errores.curso)}
                id={`${id}-curso`}
                name="curso"
                value={form.curso}
                onChange={(e) => {
                  setForm(prev => ({ ...prev, curso: e.target.value }))
                  if (errores.curso) setErrores(prev => ({ ...prev, curso: undefined }))
                }}
              >
                <option value="">-- Selecciona el curso --</option>
                {CURSOS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            {/* Materiales */}
            <Field
              label="Lista de materiales necesarios *"
              error={errores.materiales}
              htmlFor={`${id}-materiales`}
            >
              <textarea
                rows={5}
                placeholder="Ej: 3 cuadernos cuadrícula, 1 estuche, tijeras punta redonda, pegamento barra, folios A4..."
                className={inputClass(errores.materiales)}
                {...field('materiales')}
              />
            </Field>

            {/* Fecha recogida */}
            <Field
              label="Fecha preferida de recogida *"
              error={errores.fecha_recogida}
              htmlFor={`${id}-fecha_recogida`}
            >
              <input
                type="date"
                min={minFechaRecogida()}
                className={inputClass(errores.fecha_recogida)}
                {...field('fecha_recogida')}
              />
              <p className="font-body text-xs text-gray-500 mt-1">
                Mínimo 48 horas de antelación para preparar el pedido.
              </p>
            </Field>

            {/* Observaciones */}
            <Field
              label="Observaciones adicionales"
              htmlFor={`${id}-observaciones`}
            >
              <textarea
                rows={3}
                placeholder="Cualquier detalle adicional que quieras que sepamos..."
                className={inputClass()}
                {...field('observaciones')}
              />
            </Field>

            {/* Privacidad */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  id={`${id}-politica_privacidad`}
                  checked={form.politica_privacidad}
                  onChange={(e) => {
                    setForm(prev => ({ ...prev, politica_privacidad: e.target.checked }))
                    if (errores.politica_privacidad) setErrores(prev => ({ ...prev, politica_privacidad: undefined }))
                  }}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-rojo focus:ring-rojo shrink-0"
                />
                <span className="font-body text-sm text-gray-600">
                  Acepto la{' '}
                  <a href="/contacto" className="text-rojo font-bold hover:underline">
                    política de privacidad
                  </a>
                  {' '}y el tratamiento de mis datos para gestionar la reserva. *
                </span>
              </label>
              {errores.politica_privacidad && (
                <p className="font-body text-xs text-rojo mt-1 ml-7">{errores.politica_privacidad}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Enviando reserva...
                </>
              ) : (
                <>
                  <ClipboardList size={20} />
                  Enviar reserva
                </>
              )}
            </Button>
          </form>
        </div>

        {/* FAQ */}
        <div className="mt-10 space-y-4">
          <h2 className="font-display text-2xl font-bold text-marino mb-6">
            Preguntas frecuentes
          </h2>
          {[
            {
              q: '¿Cuándo estará listo mi pedido?',
              a: 'Necesitamos un mínimo de 48 horas para preparar el material. Selecciona la fecha con al menos 2 días de antelación.',
            },
            {
              q: '¿Puedo modificar o cancelar la reserva?',
              a: 'Claro que sí. Llámanos al 925 551 721 o escríbenos por WhatsApp y lo gestionamos sin problema.',
            },
            {
              q: '¿Es gratuito reservar?',
              a: 'Sí, reservar es completamente gratuito y sin compromiso. Solo pagas al recoger el material.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white rounded-2xl border border-gris-suave p-5">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-dorado mt-0.5 shrink-0" />
                <div>
                  <p className="font-body font-bold text-marino text-sm mb-1">{q}</p>
                  <p className="font-body text-gray-600 text-sm">{a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string
  error?: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block font-body text-sm font-bold text-marino mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="font-body text-xs text-rojo mt-1 flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  )
}

function inputClass(error?: string) {
  return `
    w-full px-4 py-3 rounded-xl border font-body text-sm transition-colors
    focus:outline-none focus:ring-2 focus:ring-offset-0
    ${error
      ? 'border-rojo bg-red-50 focus:ring-red-300'
      : 'border-gray-200 bg-white focus:border-dorado focus:ring-yellow-200'
    }
  `
}
