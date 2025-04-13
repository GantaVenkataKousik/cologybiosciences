"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

function DNAStrand({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color1 = "#4a90e2",
  color2 = "#408c5c",
  strandLength = 30,
  radius = 4,
  height = 20,
}) {
  const group = useRef()

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  // Create DNA strand points
  const strand1Points = []
  const strand2Points = []
  const connections = []

  for (let i = 0; i < strandLength; i++) {
    const t = i / strandLength
    const angle = t * Math.PI * 4 // 2 full rotations

    const x1 = Math.cos(angle) * radius
    const z1 = Math.sin(angle) * radius
    const y1 = height * (t - 0.5)

    const x2 = Math.cos(angle + Math.PI) * radius
    const z2 = Math.sin(angle + Math.PI) * radius
    const y2 = y1

    strand1Points.push(new THREE.Vector3(x1, y1, z1))
    strand2Points.push(new THREE.Vector3(x2, y2, z2))

    // Add connections (base pairs) every few steps
    if (i % 2 === 0) {
      connections.push({
        from: [x1, y1, z1],
        to: [x2, y2, z2],
      })
    }
  }

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      {/* Strand 1 */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={strand1Points.length}
            array={new Float32Array(strand1Points.flatMap((p) => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color1} linewidth={2} opacity={0.8} transparent />
      </line>

      {/* Strand 2 */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={strand2Points.length}
            array={new Float32Array(strand2Points.flatMap((p) => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color2} linewidth={2} opacity={0.8} transparent />
      </line>

      {/* Base pairs (connections) */}
      {connections.map((conn, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...conn.from, ...conn.to])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#ffffff" linewidth={1} opacity={0.5} transparent />
        </line>
      ))}

      {/* Nucleotide spheres for strand 1 */}
      {strand1Points.map((point, i) => (
        <mesh key={`s1-${i}`} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={color1} emissive={color1} emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Nucleotide spheres for strand 2 */}
      {strand2Points.map((point, i) => (
        <mesh key={`s2-${i}`} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={color2} emissive={color2} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <DNAStrand position={[0, 0, -20]} scale={0.5} color1="#4a90e2" color2="#408c5c" />
      </Float>

      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.2}>
        <DNAStrand position={[-15, 5, -30]} rotation={[0.3, 0.5, 0.2]} scale={0.3} color1="#408c5c" color2="#4a90e2" />
      </Float>

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <DNAStrand position={[15, -8, -25]} rotation={[0.2, -0.3, 0.1]} scale={0.4} color1="#4a90e2" color2="#408c5c" />
      </Float>

      {/* Add more DNA strands for a fuller effect */}
      <Float speed={0.9} rotationIntensity={0.12} floatIntensity={0.18}>
        <DNAStrand position={[8, 12, -35]} rotation={[0.4, 0.2, -0.3]} scale={0.25} color1="#408c5c" color2="#4a90e2" />
      </Float>

      <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.22}>
        <DNAStrand
          position={[-10, -15, -40]}
          rotation={[-0.2, 0.4, 0.3]}
          scale={0.35}
          color1="#4a90e2"
          color2="#408c5c"
        />
      </Float>
    </>
  )
}

export default function LargeDNABackground({ className }) {
  return (
    <div className={`absolute inset-0 ${className || ""}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  )
}

