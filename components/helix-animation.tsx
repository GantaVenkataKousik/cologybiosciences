"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface HelixAnimationProps {
  className?: string
  dotCount?: number
  color?: string
  glowIntensity?: number
  speed?: number
}

export default function HelixAnimation({
  className,
  dotCount = 100,
  color = "#408c5c",
  glowIntensity = 1,
  speed = 1,
}: HelixAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const helix = document.createElement("div")
    helix.className = "helix"
    container.appendChild(helix)

    const dots: HTMLDivElement[] = []
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    // Create helix dots
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("div")
      dot.className = "helix-dot"
      dot.style.backgroundColor = color

      // Add glow effect
      dot.style.boxShadow = `0 0 ${5 * glowIntensity}px ${color}`

      helix.appendChild(dot)
      dots.push(dot)
    }

    // Animation function
    const animate = (time: number) => {
      dots.forEach((dot, index) => {
        const t = (time * 0.001 * speed + index * 0.1) % (Math.PI * 2)
        const x = Math.sin(t) * containerWidth * 0.25 + containerWidth * 0.5
        const y = (index / dotCount) * containerHeight
        const size = 2 + Math.sin(t) * 4
        const opacity = 0.3 + Math.sin(t) * 0.5

        dot.style.left = `${x}px`
        dot.style.top = `${y}px`
        dot.style.width = `${size}px`
        dot.style.height = `${size}px`
        dot.style.opacity = `${opacity}`
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
  }, [dotCount, color, glowIntensity, speed])

  return (
    <div className="relative">
      <div ref={containerRef} className={`helix-container ${className || ""}`}></div>

      {/* Add animated glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent blur-xl"></div>
      </motion.div>
    </div>
  )
}

