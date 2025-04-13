"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface VitiligoModelProps {
  stage?: "early" | "moderate" | "advanced"
}

export function VitiligoModel({ stage = "moderate" }: VitiligoModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }

    if (meshRef.current) {
      // Subtle breathing animation
      meshRef.current.scale.x = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02
      meshRef.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02
      meshRef.current.scale.z = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02
    }
  })

  // Define model properties based on vitiligo stage
  const getModelProperties = () => {
    switch (stage) {
      case "early":
        return {
          baseColor: "#8B4513", // Brown
          patchColor: "#F5DEB3", // Light tan
          patchSize: 0.2,
          patchCount: 3,
        }
      case "moderate":
        return {
          baseColor: "#8B4513",
          patchColor: "#F5DEB3",
          patchSize: 0.3,
          patchCount: 7,
        }
      case "advanced":
        return {
          baseColor: "#8B4513",
          patchColor: "#F5DEB3",
          patchSize: 0.4,
          patchCount: 12,
        }
      default:
        return {
          baseColor: "#8B4513",
          patchColor: "#F5DEB3",
          patchSize: 0.3,
          patchCount: 7,
        }
    }
  }

  const { baseColor, patchColor, patchSize, patchCount } = getModelProperties()

  // Generate random but fixed positions for vitiligo patches
  const generatePatchPositions = () => {
    const positions = []
    const seed = stage === "early" ? 42 : stage === "moderate" ? 123 : 789

    for (let i = 0; i < patchCount; i++) {
      // Use a deterministic "random" approach based on the seed and index
      const x = Math.sin(seed * (i + 1) * 0.1) * 0.7
      const y = Math.cos(seed * (i + 2) * 0.1) * 0.7
      const z = Math.sin(seed * (i + 3) * 0.1) * Math.cos(seed * (i + 4) * 0.1) * 0.7

      positions.push([x, y, z])
    }

    return positions
  }

  const patchPositions = generatePatchPositions()

  return (
    <group ref={groupRef}>
      {/* Mouse body */}
      <mesh ref={meshRef} position={[0, 0, 0]} scale={[1, 0.7, 0.5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={baseColor} roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Vitiligo patches */}
      {patchPositions.map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <sphereGeometry args={[patchSize, 16, 16]} />
          <meshStandardMaterial color={patchColor} roughness={0.7} metalness={0.1} transparent opacity={0.9} />
        </mesh>
      ))}

      {/* Mouse ears */}
      <mesh position={[0.7, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={baseColor} roughness={0.8} />
      </mesh>

      <mesh position={[-0.7, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={baseColor} roughness={0.8} />
      </mesh>

      {/* Mouse nose */}
      <mesh position={[0, 0, 0.5]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#000000" roughness={0.5} />
      </mesh>

      {/* Mouse tail */}
      <mesh position={[0, -0.8, -0.5]} rotation={[Math.PI / 2, 0, 0]} scale={[0.1, 1, 0.1]}>
        <cylinderGeometry args={[0.1, 0.05, 2, 16]} />
        <meshStandardMaterial color={baseColor} roughness={0.8} />
      </mesh>
    </group>
  )
}

