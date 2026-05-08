import type { ReservaFormData, ContactoFormData } from '../types'

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL as string

export async function enviarReserva(datos: ReservaFormData): Promise<boolean> {
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: 'reserva', ...datos }),
      mode: 'no-cors',
    })
    return true
  } catch (error) {
    console.error('Error enviando reserva:', error)
    return false
  }
}

export async function enviarContacto(datos: ContactoFormData): Promise<boolean> {
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: 'contacto', ...datos }),
      mode: 'no-cors',
    })
    return true
  } catch (error) {
    console.error('Error enviando contacto:', error)
    return false
  }
}

export function generarNumeroReserva(): string {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `MC-${num}`
}
