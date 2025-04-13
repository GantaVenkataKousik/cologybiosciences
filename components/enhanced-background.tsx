"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei"
import EnhancedDNAHelix from "./enhanced-dna-helix"
import MolecularStructure from "./molecular-structure"
import FloatingCells from "./floating-cells"

function FloatingOrbs() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Adjust number and size of orbs based on screen size
  const orbs = isMobile
    ? [
        { position: [-2, 1, -3], scale: 0.8, color: "#40E0D0" },
        { position: [2, -1, -4], scale: 0.6, color: "#4a90e2" },
        { position: [-1, -2, -2], scale: 0.4, color: "#408c5c" },
      ]
    : [
        { position: [-4, 2, -5], scale: 1.2, color: "#40E0D0" },
        { position: [4, -2, -8], scale: 0.8, color: "#4a90e2" },
        { position: [-2, -3, -4], scale: 0.6, color: "#408c5c" },
        { position: [3, 3, -6], scale: 0.9, color: "#40E0D0" },
        { position: [-3, 0, -7], scale: 0.7, color: "#4a90e2" },
      ]

  return (
    <>
      {orbs.map((orb, index) => (
        <Float key={index} speed={1} rotationIntensity={2} floatIntensity={2}>
          <Sphere position={orb.position} args={[orb.scale, 32, 32]}>
            <MeshDistortMaterial
              color={orb.color}
              distort={0.4}
              speed={4}
              metalness={0.5}
              roughness={0.2}
              opacity={0.8}
              transparent
            />
          </Sphere>
        </Float>
      ))}
    </>
  )
}

function ParticleField() {
  const points = useRef()
  const [particleCount, setParticleCount] = useState(2000)

  useEffect(() => {
    const handleResize = () => {
      // Adjust particle count based on screen size
      setParticleCount(window.innerWidth < 768 ? 1000 : 2000)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50
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

export default function EnhancedBackground() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="absolute inset-0 -z-10">
      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingOrbs />
        <ParticleField />
      </Canvas>

      {/* DNA Helix Animation - Left Side - Hide on mobile */}
      {!isMobile && (
        <div className="absolute top-0 left-0 w-1/4 h-full opacity-40 pointer-events-none">
          <EnhancedDNAHelix color1="#40E0D0" color2="#4a90e2" speed={0.8} />
        </div>
      )}

      {/* DNA Helix Animation - Right Side - Hide on mobile */}
      {!isMobile && (
        <div className="absolute top-0 right-0 w-1/4 h-full opacity-40 pointer-events-none">
          <EnhancedDNAHelix color1="#4a90e2" color2="#40E0D0" speed={1.2} />
        </div>
      )}

      {/* Molecular Structure - Bottom - Adjust size on mobile */}
      <div className={`absolute bottom-0 left-0 w-full ${isMobile ? "h-1/4" : "h-1/3"} opacity-30 pointer-events-none`}>
        <MolecularStructure primaryColor="#40E0D0" secondaryColor="#4a90e2" nodeCount={isMobile ? 10 : 20} />
      </div>

      {/* Floating Cells - Middle Right - Hide on mobile */}
      {!isMobile && (
        <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 opacity-30 pointer-events-none">
          <FloatingCells primaryColor="#40E0D0" secondaryColor="#4a90e2" cellCount={8} />
        </div>
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] via-transparent to-[#0A0F1E] opacity-90" />

      {/* Animated Gradient Blobs - Adjust size on mobile */}
      <motion.div
        className={`absolute top-0 left-0 ${isMobile ? "w-[300px] h-[300px]" : "w-[500px] h-[500px]"} rounded-full bg-[#408c5c]/20 blur-[100px]`}
        animate={{
          x: [-200, 0, -200],
          y: [-200, 0, -200],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        className={`absolute bottom-0 right-0 ${isMobile ? "w-[300px] h-[300px]" : "w-[600px] h-[600px]"} rounded-full bg-[#4a90e2]/20 blur-[100px]`}
        animate={{
          x: [200, 0, 200],
          y: [200, 0, 200],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Geometric Shapes - Hide some on mobile */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#40E0D0] rotate-45 animate-pulse" />
        {!isMobile && (
          <div className="absolute top-3/4 right-1/4 w-40 h-40 border-2 border-[#4a90e2] rounded-full animate-pulse" />
        )}
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 border border-[#408c5c] transform rotate-12 animate-pulse" />
      </div>

      {/* Network Lines - Adjust opacity on mobile */}
      <svg className={`absolute inset-0 w-full h-full ${isMobile ? "opacity-10" : "opacity-20"}`}>
        <pattern
          id="network"
          x="0"
          y="0"
          width={isMobile ? "60" : "40"}
          height={isMobile ? "60" : "40"}
          patternUnits="userSpaceOnUse"
        >
          <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="#4a90e2" strokeWidth="0.5" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#network)" />
      </svg>
    </div>
  )
}

