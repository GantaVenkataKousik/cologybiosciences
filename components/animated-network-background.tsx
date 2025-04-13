"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface AnimatedNetworkBackgroundProps {
  className?: string
  color1?: string
  color2?: string
  density?: number
}

export default function AnimatedNetworkBackground({
  className = "",
  color1 = "#408c5c", // Green
  color2 = "#4a90e2", // Blue
  density = 100,
}: AnimatedNetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const isMouseMovingRef = useRef(false)

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

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      isMouseMovingRef.current = true

      // Reset mouse movement flag after a delay
      setTimeout(() => {
        isMouseMovingRef.current = false
      }, 100)
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Create particles
    const particles: {
      x: number
      y: number
      size: number
      color: string
      vx: number
      vy: number
      depth: number
      opacity: number
    }[] = []

    for (let i = 0; i < density; i++) {
      const depth = Math.random() * 3 - 1.5 // -1.5 to 1.5
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? color1 : color2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        depth,
        opacity: 0.3 + Math.random() * 0.5,
      })
    }

    // Create DNA helix points
    const helixPoints: {
      x: number
      y: number
      size: number
      color: string
      angle: number
      radius: number
      speed: number
      depth: number
    }[] = []

    const helixCount = 2
    const pointsPerHelix = 30

    for (let h = 0; h < helixCount; h++) {
      const centerX = canvas.width * (0.3 + h * 0.4)
      const centerY = canvas.height * 0.5
      const radius = 100 + h * 50
      const color = h % 2 === 0 ? color1 : color2
      const direction = h % 2 === 0 ? 1 : -1

      for (let i = 0; i < pointsPerHelix; i++) {
        const angle = (i / pointsPerHelix) * Math.PI * 4
        helixPoints.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + (i / pointsPerHelix) * canvas.height * 0.8 - canvas.height * 0.4,
          size: 2 + Math.random() * 2,
          color,
          angle,
          radius,
          speed: 0.001 * direction,
          depth: 0,
        })
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Apply mouse influence if mouse is moving
        if (isMouseMovingRef.current) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            particle.vx -= (dx / distance) * force * 0.5
            particle.vy -= (dy / distance) * force * 0.5
          }
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()

        // Draw connections
        particles.forEach((other, j) => {
          if (i === j) return

          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Only connect particles that are close enough
          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)

            const opacity = (1 - distance / 100) * 0.2
            ctx.strokeStyle = `${particle.color}${Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")}`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      // Update and draw DNA helix
      helixPoints.forEach((point, i) => {
        // Update position
        point.angle += point.speed
        point.x = point.radius * Math.cos(point.angle) + canvas.width / 2

        // Draw point
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2)
        ctx.fillStyle = point.color
        ctx.fill()

        // Draw connections to next point in helix
        if (i < helixPoints.length - 1 && helixPoints[i + 1].color === point.color) {
          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(helixPoints[i + 1].x, helixPoints[i + 1].y)
          ctx.strokeStyle = `${point.color}99`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // Draw cross connections (base pairs)
        if (i % 2 === 0 && i < helixPoints.length - 1) {
          const oppositeIndex = i + 1
          if (oppositeIndex < helixPoints.length) {
            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(helixPoints[oppositeIndex].x, helixPoints[oppositeIndex].y)
            ctx.strokeStyle = "#ffffff33"
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
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
  }, [color1, color2, density])

  return (
    <div className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B2238]/80 via-transparent to-[#1B2238]/80 pointer-events-none" />

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full bg-[#408c5c]/10 blur-[100px] pointer-events-none"
        animate={{
          x: ["-20%", "10%", "-20%"],
          y: ["-10%", "20%", "-10%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-1/3 h-1/3 rounded-full bg-[#4a90e2]/10 blur-[100px] pointer-events-none"
        animate={{
          x: ["10%", "-20%", "10%"],
          y: ["20%", "-10%", "20%"],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

