"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface MoleculeAnimationProps {
  className?: string
  atomColor?: string
  bondColor?: string
  glowIntensity?: number
  rotationSpeed?: number
}

export default function MoleculeAnimation({
  className,
  atomColor = "rgba(64, 140, 92, 0.7)",
  bondColor = "rgba(205, 226, 223, 0.7)",
  glowIntensity = 1,
  rotationSpeed = 1,
}: MoleculeAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const molecule = document.createElement("div")
    molecule.className = "molecule"
    container.appendChild(molecule)

    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    // Create central atom
    const centralAtom = document.createElement("div")
    centralAtom.className = "atom"
    centralAtom.style.width = "30px"
    centralAtom.style.height = "30px"
    centralAtom.style.left = `${containerWidth / 2 - 15}px`
    centralAtom.style.top = `${containerHeight / 2 - 15}px`
    centralAtom.style.backgroundColor = atomColor
    centralAtom.style.boxShadow = `0 0 ${10 * glowIntensity}px ${atomColor}`
    molecule.appendChild(centralAtom)

    // Create orbiting atoms
    const atomCount = 5
    const orbitingAtoms: HTMLDivElement[] = []
    const bonds: HTMLDivElement[] = []

    for (let i = 0; i < atomCount; i++) {
      const atom = document.createElement("div")
      atom.className = "atom"
      atom.style.backgroundColor = atomColor
      atom.style.boxShadow = `0 0 ${10 * glowIntensity}px ${atomColor}`
      molecule.appendChild(atom)
      orbitingAtoms.push(atom)

      const bond = document.createElement("div")
      bond.className = "bond"
      bond.style.backgroundColor = bondColor
      molecule.appendChild(bond)
      bonds.push(bond)
    }

    // Animation function
    const animate = (time: number) => {
      orbitingAtoms.forEach((atom, index) => {
        const t = (time * 0.001 * rotationSpeed + index * ((Math.PI * 2) / atomCount)) % (Math.PI * 2)
        const radius = 80
        const x = Math.cos(t) * radius + (containerWidth / 2 - 10)
        const y = Math.sin(t) * radius + (containerHeight / 2 - 10)

        atom.style.left = `${x}px`
        atom.style.top = `${y}px`

        // Update bond
        const bond = bonds[index]
        const dx = x - (containerWidth / 2 - 15)
        const dy = y - (containerHeight / 2 - 15)
        const length = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)

        bond.style.width = `${length}px`
        bond.style.height = "2px"
        bond.style.left = `${containerWidth / 2}px`
        bond.style.top = `${containerHeight / 2}px`
        bond.style.transform = `rotate(${angle}deg)`
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationRef.current)
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [atomColor, bondColor, glowIntensity, rotationSpeed])

  return (
    <div className="relative">
      <div ref={containerRef} className={`molecule-container ${className || ""}`}></div>

      {/* Add pulsing glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-full blur-xl"></div>
      </motion.div>
    </div>
  )
}

