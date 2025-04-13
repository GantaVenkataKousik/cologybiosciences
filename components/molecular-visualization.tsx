"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Line, Trail, Float } from "@react-three/drei"

function MolecularStructure({ scale = 1, color = "#408c5c" }) {
  const group = useRef()

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  // Create nodes positions
  const nodes = [
    [0, 0, 0], // Center
    [2, 0, 0],
    [-2, 0, 0],
    [0, 2, 0],
    [0, -2, 0],
    [0, 0, 2],
    [0, 0, -2],
  ].map(([x, y, z]) => new THREE.Vector3(x, y, z))

  // Create connections between nodes
  const connections = nodes.slice(1).map((node) => [nodes[0], node])

  return (
    <group ref={group} scale={scale}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <Sphere position={[pos.x, pos.y, pos.z]} args={[0.3, 16, 16]}>
            <meshStandardMaterial
              color={color}
              metalness={0.5}
              roughness={0.2}
              emissive={color}
              emissiveIntensity={0.5}
            />
          </Sphere>
        </Float>
      ))}

      {/* Connections */}
      {connections.map((points, i) => (
        <Trail key={i} width={2} color={color} length={1} decay={1} attenuation={(width) => width}>
          <Line points={points} color={color} lineWidth={1} opacity={0.6} transparent />
        </Trail>
      ))}
    </group>
  )
}

function ParticleField() {
  const points = useRef()
  const particleCount = 200
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.getElapsedTime() * 0.05
      points.current.rotation.y = state.clock.getElapsedTime() * 0.075
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#4a90e2"
        sizeAttenuation
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function MolecularVisualization({ className }: { className?: string }) {
  return (
    <div className={`relative ${className || ""}`}>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />

        {/* Background particles */}
        <ParticleField />

        {/* Main molecular structure */}
        <MolecularStructure scale={1} color="#408c5c" />

        {/* Additional floating structures */}
        <group position={[5, 3, -5]}>
          <MolecularStructure scale={0.5} color="#4a90e2" />
        </group>
        <group position={[-5, -3, -3]}>
          <MolecularStructure scale={0.3} color="#cde2df" />
        </group>
      </Canvas>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-50" />

      {/* Animated glow effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl" />
      </motion.div>
    </div>
  )
}

