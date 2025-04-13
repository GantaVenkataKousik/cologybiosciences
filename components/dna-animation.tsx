"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface DNAAnimationProps {
  className?: string
  pairCount?: number
  rotationSpeed?: number
  baseColor1?: string
  baseColor2?: string
  connectorColor?: string
}

export default function DNAAnimation({
  className,
  pairCount = 20,
  rotationSpeed = 20,
  baseColor1 = "#408c5c",
  baseColor2 = "#4a90e2",
  connectorColor = "rgba(205, 226, 223, 0.7)",
}: DNAAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const strand = document.createElement("div")
    strand.className = "dna-strand"
    container.appendChild(strand)

    const containerHeight = container.clientHeight
    const spacing = containerHeight / pairCount

    // Create DNA pairs
    for (let i = 0; i < pairCount; i++) {
      const pair = document.createElement("div")
      pair.className = "dna-pair"
      pair.style.top = `${i * spacing}px`
      pair.style.transform = `rotateY(${i * (360 / pairCount)}deg) translateZ(30px)`

      const leftBase = document.createElement("div")
      leftBase.className = "dna-base"
      leftBase.style.backgroundColor = i % 2 === 0 ? baseColor1 : baseColor2
      leftBase.style.opacity = `${0.3 + Math.random() * 0.7}`

      // Add glow effect
      leftBase.style.boxShadow = `0 0 10px ${i % 2 === 0 ? baseColor1 : baseColor2}`

      const rightBase = document.createElement("div")
      rightBase.className = "dna-base"
      rightBase.style.backgroundColor = i % 2 === 0 ? baseColor2 : baseColor1
      rightBase.style.opacity = `${0.3 + Math.random() * 0.7}`

      // Add glow effect
      rightBase.style.boxShadow = `0 0 10px ${i % 2 === 0 ? baseColor2 : baseColor1}`

      const connector = document.createElement("div")
      connector.className = "dna-connector"
      connector.style.backgroundColor = connectorColor

      pair.appendChild(leftBase)
      pair.appendChild(connector)
      pair.appendChild(rightBase)
      strand.appendChild(pair)

      // Add animation for each pair
      const animationDelay = i * 0.1
      pair.style.animation = `pulse 4s ease-in-out ${animationDelay}s infinite`
    }

    // Update the rotation animation
    const styleSheet = document.styleSheets[0]
    const keyframes = `
      @keyframes rotate {
        0% {
          transform: rotateY(0deg);
        }
        100% {
          transform: rotateY(360deg);
        }
      }
    `

    try {
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length)
    } catch (e) {
      console.warn("Could not insert keyframes", e)
    }

    strand.style.animation = `rotate ${rotationSpeed}s linear infinite`

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [pairCount, rotationSpeed, baseColor1, baseColor2, connectorColor])

  return (
    <div className="relative">
      <div ref={containerRef} className={`dna-container ${className || ""}`}></div>

      {/* Add glow effect overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-xl"></div>
      </motion.div>
    </div>
  )
}

