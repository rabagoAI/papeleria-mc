import { useEffect, type ReactNode } from 'react'
import { motion, useMotionValue, useMotionTemplate, animate } from 'framer-motion'

// Paleta del proyecto: rojo → dorado → verde → marino → dorado → rojo
const COLORS = ['#C0392B', '#D4A017', '#2E7D52', '#1B2A4A', '#D4A017', '#C0392B']
const CYCLE = 9 // segundos por ciclo completo

interface AnimatedCardProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function AnimatedCard({ children, delay = 0, className = '' }: AnimatedCardProps) {
  const color = useMotionValue(COLORS[0])
  const boxShadow = useMotionTemplate`0 0 0 2px ${color}55, 0 6px 28px ${color}28`
  const borderColor = useMotionTemplate`${color}40`

  useEffect(() => {
    const controls = animate(color, COLORS, {
      duration: CYCLE,
      delay,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    })
    return controls.stop
  }, [color, delay])

  return (
    <motion.div
      style={{ boxShadow, borderColor }}
      className={`bg-white rounded-2xl border p-6 transition-transform duration-200 hover:-translate-y-1 ${className}`}
    >
      {children}
    </motion.div>
  )
}
