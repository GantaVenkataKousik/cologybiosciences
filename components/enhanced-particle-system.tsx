"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface EnhancedParticleSystemProps {
  className?: string
  theme?: "light" | "dark"
  density?: number
  interactiveRadius?: number
  particleSize?: number
}

export default function EnhancedParticleSystem({
  className = "",
  theme = "dark",
  density = 50,
  interactiveRadius = 100,
  particleSize = 2,
}: EnhancedParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      originalX: number
      originalY: number
      color: string
      opacity: number
    }>
  >([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Initialize particles
    const colors = theme === "dark" ? ["#408c5c", "#4a90e2", "#cde2df"] : ["#408c5c80", "#4a90e280", "#cde2df80"]

    particlesRef.current = []
    for (let i = 0; i < density; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        originalX: Math.random() * canvas.width,
        originalY: Math.random() * canvas.height,
        size: Math.random() * particleSize + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, i) => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < interactiveRadius) {
          const angle = Math.atan2(dy, dx)
          const force = (interactiveRadius - distance) / interactiveRadius
          particle.x -= Math.cos(angle) * force * 2
          particle.y -= Math.sin(angle) * force * 2
        } else {
          // Return to original position
          particle.x += (particle.originalX - particle.x) * 0.05
          particle.y += (particle.originalY - particle.y) * 0.05
        }

        // Update position with boundaries
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()

        // Draw connections
        particlesRef.current.forEach((other, j) => {
          if (i === j) return
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            const alpha = 0.1 * (1 - distance / 150)
            const alphaHex = Math.floor(alpha * 255)
              .toString(16)
              .padStart(2, "0")
            ctx.strokeStyle = `${particle.color.slice(0, 7)}${alphaHex}`
            ctx.lineWidth = 1
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [theme, density, interactiveRadius, particleSize])

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
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
        <div
          className={`absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl ${
            theme === "light" ? "opacity-30" : "opacity-50"
          }`}
        />
      </motion.div>
    </div>
  )
}

