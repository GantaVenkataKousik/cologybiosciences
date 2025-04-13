"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

interface LiverModelProps {
  variant?: "healthy" | "steatosis" | "nash" | "fibrosis" | "cirrhosis" | "fatty"
}

export function LiverModel({ variant = "healthy" }: LiverModelProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  // Define colors and distortion based on liver condition
  const getModelProperties = () => {
    switch (variant) {
      case "healthy":
        return { color: "#8B0000", distort: 0.2, roughness: 0.4 }
      case "steatosis":
        return { color: "#B22222", distort: 0.3, roughness: 0.5 }
      case "nash":
        return { color: "#CD5C5C", distort: 0.4, roughness: 0.6 }
      case "fibrosis":
        return { color: "#E9967A", distort: 0.5, roughness: 0.7 }
      case "cirrhosis":
        return { color: "#F08080", distort: 0.6, roughness: 0.8 }
      case "fatty":
        return { color: "#FFB6C1", distort: 0.4, roughness: 0.6 }
      default:
        return { color: "#8B0000", distort: 0.2, roughness: 0.4 }
    }
  }

  const { color, distort, roughness } = getModelProperties()

  return (
    <group>
      {/* Main liver lobe */}
      <mesh ref={meshRef} position={[0, 0, 0]} scale={[1.2, 0.8, 0.6]}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial color={color} distort={distort} speed={1} roughness={roughness} metalness={0.2} />
      </mesh>

      {/* Secondary liver lobe */}
      <mesh position={[0.8, -0.3, 0]} scale={[0.7, 0.5, 0.4]}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial color={color} distort={distort * 0.8} speed={1} roughness={roughness} metalness={0.2} />
      </mesh>
    </group>
  )
}

