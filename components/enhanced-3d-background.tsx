"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"
import { motion } from "framer-motion"

// Mouse tracking for parallax effect
function MouseParallax({ children }: { children: React.ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Convert mouse position to normalized coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative w-full h-full">
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate3d(${mousePosition.x * 20}px, ${mousePosition.y * 20}px, 0)`,
          transition: "transform 0.1s ease-out",
        }}
      />
    </div>
  )
}

function NetworkPoints({ count = 200, color = "#4a90e2", mousePosition = { x: 0, y: 0 } }) {
  const pointsRef = useRef()
  const { viewport } = useThree()

  // Generate random points with z-depth - FIXED VERSION
  const particlesPosition = useRef(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20 // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20 // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5 // z (biased towards negative for depth)
    }
    return positions
  }).current()

  // Animation
  useFrame((state) => {
    if (pointsRef.current) {
      // Rotate slowly
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.03
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04

      // Apply mouse movement for parallax
      pointsRef.current.position.x = mousePosition.x * 0.5
      pointsRef.current.position.y = mousePosition.y * 0.5
    }
  })

  // Create connections between points
  const connections = useRef([])

  useEffect(() => {
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
          lines.push({
            points: [p1.x, p1.y, p1.z, p2.x, p2.y, p2.z],
            opacity: 0.2 * (1 - distance / threshold),
          })
        }
      }
    }

    connections.current = lines
  }, [count, particlesPosition])

  return (
    <group>
      <Points ref={pointsRef} positions={particlesPosition} stride={3}>
        <PointMaterial
          transparent
          color={color}
          size={0.15}
          sizeAttenuation
          depthWrite={false}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {connections.current.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array(line.points)}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} transparent opacity={line.opacity} />
        </line>
      ))}
    </group>
  )
}

function Scene({ mousePosition }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4a90e2" />

      {/* Multiple layers for depth */}
      <NetworkPoints count={100} color="#4a90e2" mousePosition={mousePosition} />
      <NetworkPoints count={50} color="#40E0D0" mousePosition={mousePosition} />
    </>
  )
}

export default function Enhanced3DBackground({ className = "" }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Convert mouse position to normalized coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 2]} // Optimize for performance and quality
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>

      {/* Dramatic lighting effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B2238]/90 via-[#1B2238]/70 to-[#1B2238]/90" />

      {/* Light beams */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-1/2 h-screen bg-[#4a90e2]/5 blur-[100px] transform -rotate-45"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 right-1/4 w-1/2 h-screen bg-[#40E0D0]/5 blur-[100px] transform rotate-45"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}

