import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-2xl p-6 shadow-sm border border-gris-suave
        ${hover ? 'card-hover' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
