"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface EnhancedDNAHelixProps {
  className?: string
  color1?: string
  color2?: string
  speed?: number
}

export default function EnhancedDNAHelix({
  className = "",
  color1 = "#40E0D0",
  color2 = "#4a90e2",
  speed = 1,
}: EnhancedDNAHelixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // DNA helix parameters
    const width = canvas.width
    const height = canvas.height
    const baseWidth = 10
    const baseRadius = 4
    const helixRadius = Math.min(width / 6, 60)
    const verticalSpacing = 15
    const basePairs = Math.floor(height / verticalSpacing)

    // Animation loop
    const animate = (time: number) => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, width, height)

      // Draw DNA strands
      const rotationSpeed = time * 0.0005 * speed

      for (let i = 0; i < basePairs; i++) {
        const y = i * verticalSpacing
        const rotation = rotationSpeed + (i * Math.PI) / 10

        // First strand
        const x1 = width / 2 + Math.cos(rotation) * helixRadius
        const x2 = width / 2 + Math.cos(rotation + Math.PI) * helixRadius

        // Draw base pair connection
        ctx.beginPath()
        ctx.moveTo(x1, y)
        ctx.lineTo(x2, y)
        ctx.strokeStyle = `rgba(255, 255, 255, 0.3)`
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw bases
        ctx.beginPath()
        ctx.arc(x1, y, baseRadius, 0, Math.PI * 2)
        ctx.fillStyle = color1
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x2, y, baseRadius, 0, Math.PI * 2)
        ctx.fillStyle = color2
        ctx.fill()

        // Draw strand connections (backbone)
        if (i < basePairs - 1) {
          const nextY = (i + 1) * verticalSpacing
          const nextRotation = rotationSpeed + ((i + 1) * Math.PI) / 10

          const nextX1 = width / 2 + Math.cos(nextRotation) * helixRadius
          const nextX2 = width / 2 + Math.cos(nextRotation + Math.PI) * helixRadius

          // Strand 1
          ctx.beginPath()
          ctx.moveTo(x1, y)
          ctx.lineTo(nextX1, nextY)
          ctx.strokeStyle = color1
          ctx.lineWidth = 2
          ctx.stroke()

          // Strand 2
          ctx.beginPath()
          ctx.moveTo(x2, y)
          ctx.lineTo(nextX2, nextY)
          ctx.strokeStyle = color2
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [color1, color2, speed])

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#40E0D0]/10 to-transparent blur-xl" />
      </motion.div>
    </div>
  )
}

