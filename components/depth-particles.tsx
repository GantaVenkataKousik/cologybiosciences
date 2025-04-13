"use client"

import { useRef, useEffect } from "react"

interface Particle {
  x: number
  y: number
  size: number
  color: string
  depth: number
  speedX: number
  speedY: number
  opacity: number
}

interface DepthParticlesProps {
  className?: string
  count?: number
  colors?: string[]
  maxSize?: number
  depthLevels?: number
}

export default function DepthParticles({
  className = "",
  count = 50,
  colors = ["#40E0D0", "#4a90e2", "#408c5c"],
  maxSize = 4,
  depthLevels = 5,
}: DepthParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
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

    // Initialize particles
    particlesRef.current = []
    for (let i = 0; i < count; i++) {
      // Assign random depth level (1 = closest, depthLevels = furthest)
      const depth = Math.floor(Math.random() * depthLevels) + 1

      // Speed and size are affected by depth
      const depthFactor = 1 - depth / (depthLevels + 1)

      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * maxSize * depthFactor + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        depth,
        speedX: (Math.random() - 0.5) * depthFactor * 0.8,
        speedY: (Math.random() - 0.5) * depthFactor * 0.8,
        opacity: 0.2 + depthFactor * 0.8,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Apply mouse influence if mouse is moving
        if (isMouseMovingRef.current) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150 * (particle.depth / depthLevels)

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            const depthFactor = 1 - particle.depth / (depthLevels + 1)
            particle.x -= (dx / distance) * force * depthFactor * 2
            particle.y -= (dy / distance) * force * depthFactor * 2
          }
        }

        // Update position with depth-based speed
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

        // Convert hex color to rgba
        const r = Number.parseInt(particle.color.slice(1, 3), 16)
        const g = Number.parseInt(particle.color.slice(3, 5), 16)
        const b = Number.parseInt(particle.color.slice(5, 7), 16)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`
        ctx.fill()

        // Draw connections between particles at similar depths
        particlesRef.current.forEach((other) => {
          if (particle === other) return

          // Only connect particles at the same depth level
          if (Math.abs(particle.depth - other.depth) > 1) return

          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Connection distance is affected by depth
          const depthFactor = 1 - particle.depth / (depthLevels + 1)
          const maxDistance = 100 * depthFactor

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)

            const opacity = (1 - distance / maxDistance) * 0.2 * particle.opacity
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [count, colors, maxSize, depthLevels])

  return (
    <div className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Add subtle gradient overlays for depth perception */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#0A1628]/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A1628]/30 pointer-events-none" />
    </div>
  )
}

