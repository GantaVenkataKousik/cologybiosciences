"use client"

import React from "react"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial, Trail } from "@react-three/drei"

function MolecularNetwork({ count = 50, connections = 20 }) {
  const points = useRef()
  const [positions, indices] = React.useMemo(() => {
    const positions = new Float32Array(count * 3)
    const indices = new Uint16Array(connections * 2)

    // Create random points
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

    // Create connections between closest points
    for (let i = 0; i < connections; i++) {
      indices[i * 2] = Math.floor(Math.random() * count)
      indices[i * 2 + 1] = Math.floor(Math.random() * count)
    }

    return [positions, indices]
  }, [count, connections])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.getElapsedTime() * 0.1
      points.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <group ref={points}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#40E0D0" sizeAttenuation transparent opacity={0.8} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="index" count={indices.length} array={indices} itemSize={1} />
        </bufferGeometry>
        <lineBasicMaterial color="#40E0D0" transparent opacity={0.2} />
      </lineSegments>
    </group>
  )
}

function FloatingMolecules() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Float
          key={i}
          speed={1 + Math.random()}
          rotationIntensity={0.5 + Math.random() * 0.5}
          floatIntensity={0.5 + Math.random() * 0.5}
          position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5]}
        >
          <Sphere args={[0.3 + Math.random() * 0.3, 16, 16]}>
            <MeshDistortMaterial
              color="#40E0D0"
              distort={0.4}
              speed={4}
              metalness={0.5}
              roughness={0.2}
              opacity={0.8}
              transparent
            />
          </Sphere>
          <Trail width={2} length={8} color="#40E0D0" attenuation={(width) => width * 0.5} />
        </Float>
      ))}
    </>
  )
}

export default function AnimatedHeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <MolecularNetwork />
        <FloatingMolecules />
      </Canvas>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-transparent to-[#0A1628] opacity-70" />

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full bg-[#40E0D0]/10 blur-[100px]"
        animate={{
          x: ["-10%", "10%", "-10%"],
          y: ["-10%", "10%", "-10%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-1/3 h-1/3 rounded-full bg-[#4a90e2]/10 blur-[100px]"
        animate={{
          x: ["10%", "-10%", "10%"],
          y: ["10%", "-10%", "10%"],
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

