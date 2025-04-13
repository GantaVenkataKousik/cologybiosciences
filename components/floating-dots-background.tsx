"use client"

import { useEffect, useRef } from "react"

interface FloatingDotsBackgroundProps {
  className?: string
  dotCount?: number
  dotColors?: string[]
  connectionDistance?: number
  interactive?: boolean
}

export default function FloatingDotsBackground({
  className = "",
  dotCount = 50,
  dotColors = ["#408c5c", "#4a90e2"],
  connectionDistance = 100,
  interactive = true,
}: FloatingDotsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
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

    // Track mouse movement if interactive
    if (interactive) {
      const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY }
        isMouseMovingRef.current = true

        // Reset mouse movement flag after a delay
        setTimeout(() => {
          isMouseMovingRef.current = false
        }, 100)
      }
      window.addEventListener("mousemove", handleMouseMove)

      // Make sure to remove the event listener in the cleanup function
      return () => {
        window.removeEventListener("resize", resizeCanvas)
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }

    // If not interactive, just return the resize cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }

    // Create particles
    const particles: {
      x: number
      y: number
      size: number
      color: string
      vx: number
      vy: number
      opacity: number
    }[] = []

    for (let i = 0; i < dotCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        color: dotColors[Math.floor(Math.random() * dotColors.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: 0.1 + Math.random() * 0.3,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Apply mouse influence if interactive and mouse is moving
        if (interactive && isMouseMovingRef.current) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            particle.vx -= (dx / distance) * force * 0.2
            particle.vy -= (dy / distance) * force * 0.2
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

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)

            const opacity = (1 - distance / connectionDistance) * 0.1
            ctx.strokeStyle = `${particle.color}${Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")}`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [dotCount, dotColors, connectionDistance, interactive])

  return (
    <div className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}

