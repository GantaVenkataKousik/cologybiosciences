"use client"

import type React from "react"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, Line } from "@react-three/drei"
import * as THREE from "three"
import { motion } from "framer-motion"

// Particle system for the small background dots
function ParticleField() {
  const points = useRef<THREE.Points>(null)
  const particleCount = 300

  // Create random positions for particles
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return positions
  }, [particleCount])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.getElapsedTime() * 0.03
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <Points ref={points} positions={positions} stride={3}>
      <pointsMaterial
        size={0.08}
        color="#4a90e2"
        sizeAttenuation
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// DNA Helix component
function DNAHelix({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, rotationSpeed = 0.2 }) {
  const group = useRef<THREE.Group>(null)

  // Create DNA strand points
  const { strand1Points, strand2Points, connections } = useMemo(() => {
    const strand1Points: number[] = []
    const strand2Points: number[] = []
    const connections: [number[], number[]][] = []

    const strandLength = 30
    const radius = 4
    const height = 20

    for (let i = 0; i < strandLength; i++) {
      const t = i / strandLength
      const angle = t * Math.PI * 4 // 2 full rotations

      const x1 = Math.cos(angle) * radius
      const z1 = Math.sin(angle) * radius
      const y1 = height * (t - 0.5)

      const x2 = Math.cos(angle + Math.PI) * radius
      const z2 = Math.sin(angle + Math.PI) * radius
      const y2 = y1

      strand1Points.push(x1, y1, z1)
      strand2Points.push(x2, y2, z2)

      // Add connections (base pairs) every few steps
      if (i % 2 === 0) {
        connections.push([
          [x1, y1, z1],
          [x2, y2, z2],
        ])
      }
    }

    return { strand1Points, strand2Points, connections }
  }, [])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * rotationSpeed
    }
  })

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      {/* Strand 1 (Blue) */}
      <Line points={strand1Points} color="#4a90e2" lineWidth={2} opacity={0.8} transparent />

      {/* Strand 2 (Green) */}
      <Line points={strand2Points} color="#408c5c" lineWidth={2} opacity={0.8} transparent />

      {/* Base pair connections */}
      {connections.map((points, i) => (
        <Line key={i} points={points} color="#ffffff" lineWidth={1} opacity={0.5} transparent />
      ))}

      {/* Nucleotide spheres for strand 1 (Blue) */}
      {Array.from({ length: strand1Points.length / 3 }).map((_, i) => (
        <mesh key={`s1-${i}`} position={[strand1Points[i * 3], strand1Points[i * 3 + 1], strand1Points[i * 3 + 2]]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#4a90e2" emissive="#4a90e2" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Nucleotide spheres for strand 2 (Green) */}
      {Array.from({ length: strand2Points.length / 3 }).map((_, i) => (
        <mesh key={`s2-${i}`} position={[strand2Points[i * 3], strand2Points[i * 3 + 1], strand2Points[i * 3 + 2]]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#408c5c" emissive="#408c5c" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

// Molecular Cluster component
function MolecularCluster({
  position = [0, 0, 0],
  nodeCount = 6,
  radius = 3,
  scale = 1,
  rotationSpeed = { x: 0.1, y: 0.15, z: 0.05 },
}) {
  const group = useRef<THREE.Group>(null)

  // Create molecular cluster structure
  const { nodes, connections } = useMemo(() => {
    const nodes: [number, number, number, string][] = []
    const connections: [number, number][] = []

    // Central node
    nodes.push([0, 0, 0, Math.random() > 0.5 ? "#4a90e2" : "#408c5c"])

    // Surrounding nodes
    for (let i = 1; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount)
      const theta = Math.sqrt(nodeCount * Math.PI) * phi

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      nodes.push([x, y, z, Math.random() > 0.5 ? "#4a90e2" : "#408c5c"])

      // Connect to central node
      connections.push([0, i])

      // Connect to some neighbors
      if (i > 1 && Math.random() > 0.5) {
        connections.push([i, 1 + Math.floor(Math.random() * (i - 1))])
      }
    }

    return { nodes, connections }
  }, [nodeCount, radius])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = state.clock.getElapsedTime() * rotationSpeed.x
      group.current.rotation.y = state.clock.getElapsedTime() * rotationSpeed.y
      group.current.rotation.z = state.clock.getElapsedTime() * rotationSpeed.z
    }
  })

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Nodes */}
      {nodes.map(([x, y, z, color], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[i === 0 ? 0.5 : 0.3, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.9} />
        </mesh>
      ))}

      {/* Connections */}
      {connections.map(([from, to], i) => (
        <Line
          key={i}
          points={[
            [nodes[from][0], nodes[from][1], nodes[from][2]],
            [nodes[to][0], nodes[to][1], nodes[to][2]],
          ]}
          color="#ffffff"
          lineWidth={1}
          opacity={0.5}
          transparent
        />
      ))}
    </group>
  )
}

// Network of connected nodes
function NetworkNodes({ position = [0, 0, 0], nodeCount = 30, radius = 10, scale = 1 }) {
  const group = useRef<THREE.Group>(null)

  // Create network structure
  const { nodes, connections } = useMemo(() => {
    const nodes: [number, number, number, string, number][] = []
    const connections: [number, number][] = []

    // Create nodes in a spherical arrangement
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount)
      const theta = Math.sqrt(nodeCount * Math.PI) * phi

      // Add some randomness to positions
      const r = radius * (0.7 + Math.random() * 0.3)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      // Color and size
      const color = Math.random() > 0.5 ? "#4a90e2" : "#408c5c"
      const size = 0.1 + Math.random() * 0.2

      nodes.push([x, y, z, color, size])
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const [x1, y1, z1] = nodes[i]
        const [x2, y2, z2] = nodes[j]

        const dx = x1 - x2
        const dy = y1 - y2
        const dz = z1 - z2

        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        // Connect if nodes are close enough
        if (distance < radius * 0.7) {
          connections.push([i, j])
        }
      }
    }

    return { nodes, connections }
  }, [nodeCount, radius])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Nodes */}
      {nodes.map(([x, y, z, color, size], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.9} />
        </mesh>
      ))}

      {/* Connections */}
      {connections.map(([from, to], i) => (
        <Line
          key={i}
          points={[
            [nodes[from][0], nodes[from][1], nodes[from][2]],
            [nodes[to][0], nodes[to][1], nodes[to][2]],
          ]}
          color="#ffffff"
          lineWidth={0.5}
          opacity={0.3}
          transparent
        />
      ))}
    </group>
  )
}

// Mouse interaction handler
function MouseInteraction({ children }: { children: React.ReactNode }) {
  const { camera, mouse, viewport } = useThree()
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleMouseMove = () => {
      setIsMoving(true)
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        setIsMoving(false)
      }, 300)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timeout)
    }
  }, [])

  useFrame(() => {
    if (isMoving) {
      // Subtle camera movement based on mouse position
      camera.position.x += (mouse.x * viewport.width * 0.05 - camera.position.x) * 0.01
      camera.position.y += (mouse.y * viewport.height * 0.05 - camera.position.y) * 0.01
      camera.lookAt(0, 0, 0)
    }
  })

  return <>{children}</>
}

// Main scene component
function Scene() {
  return (
    <MouseInteraction>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a90e2" />

      {/* Background particles */}
      <ParticleField />

      {/* Main network structure */}
      <NetworkNodes position={[0, 0, -5]} nodeCount={40} radius={8} scale={1} />

      {/* DNA Helices */}
      <DNAHelix position={[-8, 3, -15]} rotation={[0.3, 0.5, 0.2]} scale={0.3} rotationSpeed={0.15} />
      <DNAHelix position={[8, -4, -12]} rotation={[0.2, -0.3, 0.1]} scale={0.4} rotationSpeed={0.25} />

      {/* Molecular Clusters */}
      <MolecularCluster
        position={[5, 3, -8]}
        nodeCount={6}
        radius={2}
        scale={1}
        rotationSpeed={{ x: 0.1, y: 0.15, z: 0.05 }}
      />
      <MolecularCluster
        position={[-5, -3, -6]}
        nodeCount={4}
        radius={1.5}
        scale={0.8}
        rotationSpeed={{ x: 0.08, y: 0.12, z: 0.03 }}
      />
    </MouseInteraction>
  )
}

// Performance optimization component
function AdaptiveQuality() {
  const { gl, performance } = useThree()

  useEffect(() => {
    // Start with high quality
    gl.setPixelRatio(window.devicePixelRatio)

    // Monitor performance and adjust quality if needed
    const checkPerformance = () => {
      const fps = performance.regress()

      // If performance is poor, reduce quality
      if (fps < 30) {
        gl.setPixelRatio(Math.max(1, window.devicePixelRatio * 0.75))
      } else if (fps > 55) {
        // If performance is good, increase quality (up to device pixel ratio)
        gl.setPixelRatio(Math.min(window.devicePixelRatio, gl.getPixelRatio() * 1.1))
      }
    }

    const interval = setInterval(checkPerformance, 5000)
    return () => clearInterval(interval)
  }, [gl, performance])

  return null
}

// Main component
export default function ThreeDNetworkBackground({ className = "" }: { className?: string }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Detect if device is likely mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  if (!isMounted) {
    return (
      <div className={`absolute inset-0 bg-[#1B2238] ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2238]/80 via-[#1B2238]/50 to-[#1B2238]/80" />
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]} // Optimize for performance and quality
        performance={{ min: 0.5 }} // Allow ThreeJS to reduce quality if needed
      >
        <Scene />
        <AdaptiveQuality />
      </Canvas>

      {/* Gradient overlays for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B2238]/80 via-[#1B2238]/50 to-[#1B2238]/80 pointer-events-none" />

      {/* Animated gradient blobs for additional depth */}
      <motion.div
        className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full bg-[#4a90e2]/5 blur-[100px] pointer-events-none"
        animate={{
          x: ["-20%", "10%", "-20%"],
          y: ["-10%", "20%", "-10%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-1/3 h-1/3 rounded-full bg-[#408c5c]/5 blur-[100px] pointer-events-none"
        animate={{
          x: ["10%", "-20%", "10%"],
          y: ["20%", "-10%", "20%"],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

