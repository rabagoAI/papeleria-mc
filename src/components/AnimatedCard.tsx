import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface AnimatedCardProps {
  children: ReactNode
  color?: string
  delay?: number
  className?: string
}

export default function AnimatedCard({
  children,
  color = '#C0392B',
  delay = 0,
  className = '',
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        boxShadow: `0 0 0 2px ${color}55, 0 6px 28px ${color}28`,
        borderColor: `${color}40`,
      }}
      className={`bg-white rounded-2xl border p-6 transition-transform duration-200 hover:-translate-y-1 ${className}`}
    >
      {children}
    </motion.div>
  )
}
