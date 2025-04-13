"use client"

import { useRef, useEffect } from "react"

interface FloatingCellsProps {
  className?: string
  cellCount?: number
  primaryColor?: string
  secondaryColor?: string
}

export default function FloatingCells({
  className = "",
  cellCount = 15,
  primaryColor = "#40E0D0",
  secondaryColor = "#4a90e2",
}: FloatingCellsProps) {
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

    // Create cells
    const cells: {
      x: number
      y: number
      radius: number
      nucleusRadius: number
      color: string
      nucleusColor: string
      vx: number
      vy: number
      angle: number
      rotationSpeed: number
    }[] = []

    for (let i = 0; i < cellCount; i++) {
      const radius = Math.random() * 30 + 20
      cells.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        nucleusRadius: radius * 0.4,
        color: i % 2 === 0 ? primaryColor : secondaryColor,
        nucleusColor: i % 2 === 0 ? secondaryColor : primaryColor,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      })
    }

    // Animation loop
    const animate = (time: number) => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw cells
      cells.forEach((cell) => {
        // Update position
        cell.x += cell.vx
        cell.y += cell.vy
        cell.angle += cell.rotationSpeed

        // Bounce off edges
        if (cell.x - cell.radius < 0 || cell.x + cell.radius > canvas.width) cell.vx *= -1
        if (cell.y - cell.radius < 0 || cell.y + cell.radius > canvas.height) cell.vy *= -1

        // Draw cell membrane (with pulsing effect)
        const pulsingFactor = 1 + Math.sin(time * 0.001) * 0.05

        // Outer glow
        const gradient = ctx.createRadialGradient(cell.x, cell.y, 0, cell.x, cell.y, cell.radius * 1.5)
        gradient.addColorStop(0, `${cell.color}33`)
        gradient.addColorStop(1, "transparent")

        ctx.beginPath()
        ctx.arc(cell.x, cell.y, cell.radius * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Cell membrane
        ctx.beginPath()
        ctx.arc(cell.x, cell.y, cell.radius * pulsingFactor, 0, Math.PI * 2)
        ctx.fillStyle = `${cell.color}66`
        ctx.fill()
        ctx.strokeStyle = cell.color
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw nucleus
        ctx.beginPath()
        ctx.arc(cell.x, cell.y, cell.nucleusRadius, 0, Math.PI * 2)
        ctx.fillStyle = cell.nucleusColor
        ctx.fill()

        // Draw organelles
        for (let i = 0; i < 3; i++) {
          const angle = cell.angle + (i * Math.PI * 2) / 3
          const distance = cell.radius * 0.6
          const orgX = cell.x + Math.cos(angle) * distance
          const orgY = cell.y + Math.sin(angle) * distance

          ctx.beginPath()
          ctx.arc(orgX, orgY, cell.radius * 0.15, 0, Math.PI * 2)
          ctx.fillStyle = `${cell.nucleusColor}99`
          ctx.fill()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [cellCount, primaryColor, secondaryColor])

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

