"use client"

import { useEffect, useState, useRef } from "react"

interface ResponsiveBackgroundProps {
  className?: string
  primaryColor?: string
  secondaryColor?: string
  density?: number
  speed?: number
}

export default function ResponsiveBackground({
  className = "",
  primaryColor = "#40E0D0",
  secondaryColor = "#4a90e2",
  density = 30,
  speed = 1,
}: ResponsiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const isMouseMovingRef = useRef(false)

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      isMouseMovingRef.current = true

      // Reset mouse movement flag after a delay
      setTimeout(() => {
        isMouseMovingRef.current = false
      }, 100)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Canvas animation
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Calculate responsive density based on screen size
    const responsiveDensity = Math.max(
      10,
      Math.floor((density * (dimensions.width * dimensions.height)) / (1920 * 1080)),
    )

    // Create particles
    const particles: {
      x: number
      y: number
      size: number
      color: string
      vx: number
      vy: number
      originalX: number
      originalY: number
    }[] = []

    for (let i = 0; i < responsiveDensity; i++) {
      const x = Math.random() * dimensions.width
      const y = Math.random() * dimensions.height
      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        size: Math.random() * 3 + 1,
        color: i % 2 === 0 ? primaryColor : secondaryColor,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

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
        if (particle.x < 0 || particle.x > dimensions.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > dimensions.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Adjust connection distance based on screen size
          const maxDistance = Math.min(150, dimensions.width / 10)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)

            const opacity = 0.2 * (1 - distance / maxDistance)
            ctx.strokeStyle = `${particle.color}${Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")}`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, primaryColor, secondaryColor, density, speed])

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-transparent to-[#0A1628] opacity-70 pointer-events-none" />

      {/* Animated gradient blobs */}

      <div
        className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full bg-[#40E0D0]/10 blur-[100px] pointer-events-none"
        style={{
          animation: `moveGradient 20s linear infinite`,
          "--gradient-color-1": "#40E0D0",
          "--gradient-color-2": "transparent",
        }}
      />

      <div
        className="absolute bottom-0 right-0 w-1/3 h-1/3 rounded-full bg-[#4a90e2]/10 blur-[100px] pointer-events-none"
        style={{
          animation: `moveGradient 25s linear infinite reverse`,
          "--gradient-color-1": "#4a90e2",
          "--gradient-color-2": "transparent",
        }}
      />
    </div>
  )
}

