"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

interface WoundModelProps {
  day?: number
}

export function WoundModel({ day = 0 }: WoundModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  // Define wound appearance based on healing day
  const getWoundProperties = () => {
    switch (day) {
      case 0:
        return {
          color: "#FF0000",
          size: 1.0,
          depth: 0.3,
          inflammation: 0.1,
          granulation: 0,
          epithelialization: 0,
        }
      case 3:
        return {
          color: "#FF3333",
          size: 0.9,
          depth: 0.25,
          inflammation: 0.4,
          granulation: 0.2,
          epithelialization: 0,
        }
      case 7:
        return {
          color: "#FF6666",
          size: 0.7,
          depth: 0.15,
          inflammation: 0.2,
          granulation: 0.5,
          epithelialization: 0.3,
        }
      case 11:
        return {
          color: "#FF9999",
          size: 0.5,
          depth: 0.1,
          inflammation: 0.1,
          granulation: 0.3,
          epithelialization: 0.6,
        }
      case 15:
        return {
          color: "#FFCCCC",
          size: 0.3,
          depth: 0.05,
          inflammation: 0,
          granulation: 0.1,
          epithelialization: 0.9,
        }
      default:
        return {
          color: "#FF0000",
          size: 1.0,
          depth: 0.3,
          inflammation: 0.1,
          granulation: 0,
          epithelialization: 0,
        }
    }
  }

  const { color, size, depth } = getWoundProperties()

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={hovered ? 1.1 : 1}
    >
      {/* Skin surface */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.2, 32]} />
        <meshStandardMaterial color="#F5DEB3" />
      </mesh>

      {/* Wound area */}
      <mesh position={[0, 0.11, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[size, size, depth, 32]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>

      {/* Day indicator */}
      {active && (
        <Text position={[0, 1, 0]} color="white" fontSize={0.3} anchorX="center" anchorY="middle">
          {day === 0 ? "Initial Wound" : `Day ${day}`}
        </Text>
      )}
    </group>
  )
}

