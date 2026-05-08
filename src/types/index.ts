export interface ReservaFormData {
  nombre_alumno: string
  nombre_tutor: string
  telefono: string
  centro_educativo: string
  curso: string
  materiales: string
  fecha_recogida: string
  observaciones: string
  politica_privacidad: boolean
}

export interface ContactoFormData {
  nombre: string
  telefono: string
  mensaje: string
}

export type FormStatus = 'idle' | 'sending' | 'success' | 'error'
