import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variants = {
  primary: 'bg-rojo text-white hover:bg-red-700 focus:ring-red-400',
  secondary: 'bg-marino text-white hover:bg-blue-900 focus:ring-blue-400',
  outline: 'border-2 border-dorado hover:bg-dorado hover:text-white focus:ring-yellow-400',
  whatsapp: 'bg-verde text-white hover:bg-green-700 focus:ring-green-400',
  ghost: 'bg-white/10 border border-white/20 text-white hover:bg-white/20 focus:ring-white/40',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-body font-bold
        rounded-full transition-[transform,background-color] duration-200 active:scale-[0.96]
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-60 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
