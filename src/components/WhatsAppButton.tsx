import { MessageCircle } from 'lucide-react'

const WA_URL =
  'https://wa.me/34925551721?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n%20sobre%20M.C.%20Papelar%C3%ADa'

export default function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-verde text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 flex items-center gap-0 group"
    >
      <MessageCircle size={26} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-body font-bold text-sm ml-0 group-hover:ml-2">
        ¿Hablamos?
      </span>
    </a>
  )
}
