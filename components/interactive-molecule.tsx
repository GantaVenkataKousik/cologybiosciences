"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Line, Trail, Float } from "@react-three/drei"
import * as THREE from "three"

// Separate the molecule structure into its own component
function MoleculeStructure({ scale = 1, color = "#408c5c", mousePosition = { x: 0, y: 0 }, isHovered = false }) {
  const group = useRef()
  const atomsRef = useRef([])

  useFrame((state) => {
    if (group.current) {
      // Base rotation
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1

      // Mouse interaction
      if (isHovered) {
        group.current.rotation.x += (mousePosition.y * 0.01 - group.current.rotation.x) * 0.1
        group.current.rotation.y += (mousePosition.x * 0.01 - group.current.rotation.y) * 0.1
      }

      // Atom pulsing
      atomsRef.current.forEach((atom, i) => {
        if (atom) {
          const pulseFactor = 0.1 * Math.sin(state.clock.getElapsedTime() * 2 + i)
          atom.scale.set(1 + pulseFactor, 1 + pulseFactor, 1 + pulseFactor)
        }
      })
    }
  })

  // Generate molecule structure
  const atoms = [
    [0, 0, 0], // Center
    [2, 0, 0],
    [-2, 0, 0],
    [0, 2, 0],
    [0, -2, 0],
    [0, 0, 2],
    [0, 0, -2],
  ].map(([x, y, z]) => new THREE.Vector3(x, y, z))

  const bonds = atoms.slice(1).map((atom) => [atoms[0], atom])

  return (
    <group ref={group} scale={scale}>
      {/* Atoms */}
      {atoms.map((pos, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh ref={(el) => (atomsRef.current[i] = el)} position={[pos.x, pos.y, pos.z]}>
            <Sphere args={[0.3, 32, 32]}>
              <meshStandardMaterial
                color={color}
                metalness={0.5}
                roughness={0.2}
                emissive={color}
                emissiveIntensity={isHovered ? 2 : 0.5}
              />
            </Sphere>
          </mesh>
        </Float>
      ))}

      {/* Bonds */}
      {bonds.map((points, i) => (
        <Trail key={i} width={2} color={color} length={1} decay={1} attenuation={(width) => width}>
          <Line points={points} color={color} lineWidth={1} opacity={isHovered ? 0.8 : 0.6} transparent />
        </Trail>
      ))}

      {/* Glow effect */}
      {isHovered && <pointLight position={[0, 0, 0]} color={color} intensity={2} distance={5} />}
    </group>
  )
}

export default function InteractiveMolecule({ className = "", color = "#408c5c" }) {
  const containerRef = useRef()
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <MoleculeStructure color={color} mousePosition={mousePosition} isHovered={isHovered} />
      </Canvas>
    </div>
  )
}

