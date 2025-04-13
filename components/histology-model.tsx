"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

export function HistologyModel() {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  // Create a microscope slide-like structure
  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={hovered ? 1.1 : 1}
    >
      {/* Glass slide */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshStandardMaterial color="#a0d8ef" transparent={true} opacity={0.6} roughness={0.1} metalness={0.2} />
      </mesh>

      {/* Tissue sample */}
      <mesh position={[0, 0.06, 0]}>
        <planeGeometry args={[2, 1]} />
        <meshStandardMaterial>
          <canvasTexture attach="map" args={[createHistologyTexture()]} />
        </meshStandardMaterial>
      </mesh>

      {/* Slide label */}
      <mesh position={[-1.2, 0.06, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[0.8, 0.4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Label text */}
      <Text
        position={[-1.2, 0.07, 0]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        fontSize={0.1}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        SAMPLE
      </Text>

      {/* Information popup when active */}
      {active && (
        <Text
          position={[0, 0.5, 0]}
          color="white"
          fontSize={0.15}
          maxWidth={2}
          anchorX="center"
          anchorY="middle"
          backgroundColor="#4a90e2"
          padding={0.1}
        >
          Histology Sample
        </Text>
      )}
    </group>
  )
}

// Create a canvas texture that resembles histology
function createHistologyTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 256
  const context = canvas.getContext("2d")

  if (context) {
    // Background
    context.fillStyle = "#f8e0cb"
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Draw cell-like structures
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = 3 + Math.random() * 8

      // Cell body
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.fillStyle = "#e6b8a2"
      context.fill()

      // Cell nucleus
      context.beginPath()
      context.arc(x, y, radius * 0.4, 0, Math.PI * 2)
      context.fillStyle = "#8c4040"
      context.fill()
    }

    // Draw tissue structures
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const width = 30 + Math.random() * 70
      const height = 20 + Math.random() * 40

      context.beginPath()
      context.ellipse(x, y, width, height, Math.random() * Math.PI, 0, Math.PI * 2)
      context.strokeStyle = "#a05a2c"
      context.lineWidth = 2
      context.stroke()
    }

    // Add some staining effects
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 2

      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.fillStyle = `rgba(70, 30, 180, ${Math.random() * 0.3})`
      context.fill()
    }
  }

  return canvas
}

