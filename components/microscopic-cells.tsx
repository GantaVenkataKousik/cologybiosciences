"use client"

import { useEffect, useRef } from "react"

interface Cell {
  x: number
  y: number
  size: number
  rotation: number
  speed: number
  color: string
  type: "circle" | "bacteria" | "virus"
}

export default function MicroscopicCells() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // Create cells
    const cells: Cell[] = []
    const cellCount = 20
    const colors = ["#40E0D0", "#4a90e2", "#408c5c"]
    const types: ("circle" | "bacteria" | "virus")[] = ["circle", "bacteria", "virus"]

    for (let i = 0; i < cellCount; i++) {
      cells.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        rotation: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
      })
    }

    // Draw cell types
    const drawCell = (cell: Cell) => {
      ctx.save()
      ctx.translate(cell.x, cell.y)
      ctx.rotate(cell.rotation)
      ctx.globalAlpha = 0.6

      switch (cell.type) {
        case "circle":
          ctx.beginPath()
          ctx.arc(0, 0, cell.size, 0, Math.PI * 2)
          ctx.strokeStyle = cell.color
          ctx.lineWidth = 2
          ctx.stroke()
          // Add nucleus
          ctx.beginPath()
          ctx.arc(0, 0, cell.size * 0.3, 0, Math.PI * 2)
          ctx.fillStyle = cell.color
          ctx.fill()
          break

        case "bacteria":
          ctx.beginPath()
          ctx.ellipse(0, 0, cell.size * 1.5, cell.size * 0.7, 0, 0, Math.PI * 2)
          ctx.strokeStyle = cell.color
          ctx.lineWidth = 2
          ctx.stroke()
          // Add details
          for (let i = 0; i < 3; i++) {
            ctx.beginPath()
            ctx.arc(cell.size * 0.5 - i * cell.size * 0.4, 0, cell.size * 0.15, 0, Math.PI * 2)
            ctx.fillStyle = cell.color
            ctx.fill()
          }
          break

        case "virus":
          // Core
          ctx.beginPath()
          ctx.arc(0, 0, cell.size * 0.7, 0, Math.PI * 2)
          ctx.fillStyle = cell.color
          ctx.globalAlpha = 0.3
          ctx.fill()
          // Spikes
          const spikes = 8
          for (let i = 0; i < spikes; i++) {
            const angle = (i * Math.PI * 2) / spikes
            ctx.beginPath()
            ctx.moveTo(Math.cos(angle) * cell.size * 0.7, Math.sin(angle) * cell.size * 0.7)
            ctx.lineTo(Math.cos(angle) * cell.size * 1.2, Math.sin(angle) * cell.size * 1.2)
            ctx.strokeStyle = cell.color
            ctx.lineWidth = 2
            ctx.stroke()
          }
          break
      }

      ctx.restore()
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      cells.forEach((cell) => {
        // Update position
        cell.x += Math.cos(cell.rotation) * cell.speed
        cell.y += Math.sin(cell.rotation) * cell.speed
        cell.rotation += 0.001

        // Wrap around screen
        if (cell.x < -cell.size) cell.x = canvas.width + cell.size
        if (cell.x > canvas.width + cell.size) cell.x = -cell.size
        if (cell.y < -cell.size) cell.y = canvas.height + cell.size
        if (cell.y > canvas.height + cell.size) cell.y = -cell.size

        drawCell(cell)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}

