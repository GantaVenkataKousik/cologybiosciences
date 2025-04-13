"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"

function NetworkPoints({ count = 100, color = "#ffffff" }) {
  const points = useRef()

  // Generate random points
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5
    }

    return positions
  }, [count])

  // Animation
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.getElapsedTime() * 0.05
      points.current.rotation.y = state.clock.getElapsedTime() * 0.075
    }
  })

  // Create connections between points
  const connections = useMemo(() => {
    const lines = []
    const positions = []
    const threshold = 3 // Maximum distance for connection

    // Extract positions from particlesPosition
    for (let i = 0; i < count; i++) {
      positions.push({
        x: particlesPosition[i * 3],
        y: particlesPosition[i * 3 + 1],
        z: particlesPosition[i * 3 + 2],
      })
    }

    // Create connections between nearby points
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const p1 = positions[i]
        const p2 = positions[j]

        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const dz = p1.z - p2.z

        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (distance < threshold) {
          lines.push(
            <line key={`${i}-${j}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([p1.x, p1.y, p1.z, p2.x, p2.y, p2.z])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color={color} transparent opacity={0.2} />
            </line>,
          )
        }
      }
    }

    return lines
  }, [particlesPosition, count, color])

  return (
    <group>
      <Points ref={points} positions={particlesPosition} stride={3}>
        <PointMaterial transparent color={color} size={0.1} sizeAttenuation depthWrite={false} opacity={0.5} />
      </Points>
      {connections}
    </group>
  )
}

export default function NetworkBackground({ className = "" }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <NetworkPoints count={150} color="#4a90e2" />
      </Canvas>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B2238]/80 via-[#1B2238]/70 to-[#1B2238]/80" />
    </div>
  )
}

