"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Line } from "@react-three/drei"
import type * as THREE from "three"

interface MoleculeModelProps {
  scale?: number
  color?: string
  type?: "water" | "dna" | "protein" | "lipid"
}

export function MoleculeModel({ scale = 1, color = "#4a90e2", type = "water" }: MoleculeModelProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  // Generate molecule structure based on type
  const renderMolecule = () => {
    switch (type) {
      case "water":
        return renderWaterMolecule()
      case "dna":
        return renderDNAFragment()
      case "protein":
        return renderProteinStructure()
      case "lipid":
        return renderLipidMolecule()
      default:
        return renderWaterMolecule()
    }
  }

  const renderWaterMolecule = () => (
    <>
      {/* Oxygen atom */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Hydrogen atoms */}
      <mesh position={[0.3, 0.2, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
      </mesh>

      <mesh position={[-0.3, 0.2, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Bonds */}
      <Line
        points={[
          [0, 0, 0],
          [0.3, 0.2, 0],
        ]}
        color={color}
        lineWidth={3}
      />

      <Line
        points={[
          [0, 0, 0],
          [-0.3, 0.2, 0],
        ]}
        color={color}
        lineWidth={3}
      />
    </>
  )

  const renderDNAFragment = () => {
    const points1 = []
    const points2 = []
    const connections = []

    // Create a small DNA helix
    for (let i = 0; i < 5; i++) {
      const angle = i * 0.6
      const x = Math.cos(angle) * 0.5
      const z = Math.sin(angle) * 0.5
      const y = i * 0.2 - 0.4

      points1.push([x, y, z])
      points2.push([-x, y, -z])

      if (i % 2 === 0) {
        connections.push([
          [x, y, z],
          [-x, y, -z],
        ])
      }
    }

    return (
      <>
        {/* DNA strands */}
        <Line points={points1} color={color} lineWidth={3} />

        <Line points={points2} color="#408c5c" lineWidth={3} />

        {/* Base pairs */}
        {connections.map((points, i) => (
          <Line key={i} points={points} color="#ffffff" lineWidth={2} />
        ))}

        {/* Nucleotides */}
        {points1.map((point, i) => (
          <mesh key={`p1-${i}`} position={point as [number, number, number]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}

        {points2.map((point, i) => (
          <mesh key={`p2-${i}`} position={point as [number, number, number]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#408c5c" />
          </mesh>
        ))}
      </>
    )
  }

  const renderProteinStructure = () => {
    // Simple alpha helix structure
    const points = []
    for (let i = 0; i < 20; i++) {
      const angle = i * 0.5
      const x = Math.cos(angle) * 0.3
      const z = Math.sin(angle) * 0.3
      const y = i * 0.1 - 1
      points.push([x, y, z])
    }

    return (
      <>
        <Line points={points} color={color} lineWidth={4} />

        {points.map((point, i) => (
          <mesh key={i} position={point as [number, number, number]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={i % 3 === 0 ? "#ff4d4d" : i % 3 === 1 ? "#4dff4d" : "#4d4dff"} />
          </mesh>
        ))}
      </>
    )
  }

  const renderLipidMolecule = () => (
    <>
      {/* Phosphate head */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#ff9900" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Glycerol backbone */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>

      {/* Fatty acid tails */}
      <Line
        points={[
          [0, 0.2, 0],
          [0.2, -0.8, 0],
        ]}
        color={color}
        lineWidth={3}
      />

      <Line
        points={[
          [0, 0.2, 0],
          [-0.2, -0.8, 0],
        ]}
        color={color}
        lineWidth={3}
      />

      {/* Carbon atoms in tails */}
      {[0.2, 0, -0.2, -0.4, -0.6, -0.8].map((y, i) => (
        <mesh key={`right-${i}`} position={[0.2, y, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
      ))}

      {[0.2, 0, -0.2, -0.4, -0.6, -0.8].map((y, i) => (
        <mesh key={`left-${i}`} position={[-0.2, y, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
      ))}
    </>
  )

  return (
    <group ref={groupRef} scale={scale}>
      {renderMolecule()}
    </group>
  )
}

