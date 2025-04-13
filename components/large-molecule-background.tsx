"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere } from "@react-three/drei"

function MoleculeNode({ position, size = 1, color = "#4a90e2", connections = [] }) {
  return (
    <group position={position}>
      <Sphere args={[size * 0.5, 16, 16]}>
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} emissive={color} emissiveIntensity={0.5} />
      </Sphere>

      {connections.map((target, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={
                new Float32Array([0, 0, 0, target[0] - position[0], target[1] - position[1], target[2] - position[2]])
              }
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} opacity={0.5} transparent />
        </line>
      ))}
    </group>
  )
}

function FloatingMolecule({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const group = useRef()

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  // Define molecule structure
  const nodes = [
    { position: [0, 0, 0], size: 1.2, color: "#4a90e2" },
    { position: [3, 0, 0], size: 0.8, color: "#408c5c" },
    { position: [-2, 2, 1], size: 0.7, color: "#408c5c" },
    { position: [-2, -2, -1], size: 0.7, color: "#408c5c" },
    { position: [1, 3, -2], size: 0.9, color: "#4a90e2" },
    { position: [2, -3, 2], size: 0.9, color: "#4a90e2" },
  ]

  // Define connections between nodes
  const connections = [
    { from: 0, to: [1, 2, 3, 4, 5] },
    { from: 1, to: [4, 5] },
    { from: 2, to: [3] },
    { from: 4, to: [5] },
  ]

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5} position={position}>
      <group ref={group} scale={scale} rotation={rotation}>
        {nodes.map((node, i) => (
          <MoleculeNode
            key={i}
            position={node.position}
            size={node.size}
            color={node.color}
            connections={connections
              .filter((conn) => conn.from === i)
              .flatMap((conn) => conn.to.map((to) => nodes[to].position))}
          />
        ))}
      </group>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <FloatingMolecule scale={0.15} position={[-5, 2, -5]} rotation={[0.5, 0.2, 0]} />
      <FloatingMolecule scale={0.2} position={[5, -2, -10]} rotation={[0.2, 0.5, 0.3]} />
      <FloatingMolecule scale={0.25} position={[8, 4, -15]} rotation={[0.1, 0.3, 0.2]} />
      <FloatingMolecule scale={0.18} position={[-8, -3, -12]} rotation={[0.3, 0.1, 0.4]} />
      <FloatingMolecule scale={0.3} position={[0, 8, -20]} rotation={[0.4, 0.2, 0.1]} />

      {/* Add more floating molecules for a fuller effect */}
      <FloatingMolecule scale={0.12} position={[-12, 5, -25]} rotation={[0.2, 0.4, 0.1]} />
      <FloatingMolecule scale={0.22} position={[12, -5, -18]} rotation={[0.3, 0.2, 0.5]} />
      <FloatingMolecule scale={0.16} position={[3, -8, -22]} rotation={[0.1, 0.5, 0.2]} />
      <FloatingMolecule scale={0.28} position={[-10, -10, -30]} rotation={[0.5, 0.3, 0.1]} />
    </>
  )
}

export default function LargeMoleculeBackground({ className }) {
  return (
    <div className={`absolute inset-0 ${className || ""}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  )
}

