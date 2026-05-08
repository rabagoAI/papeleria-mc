import { Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export default function StarsCanvas() {
  return (
    <Canvas>
      <Stars radius={60} count={2000} factor={4} fade speed={1.5} />
    </Canvas>
  )
}
