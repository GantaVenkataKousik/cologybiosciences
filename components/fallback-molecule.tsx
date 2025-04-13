"use client"

import { useRef, useEffect } from "react"

interface FallbackMoleculeProps {
  className?: string
  color?: string
}

export default function FallbackMolecule({ className = "", color = "#408c5c" }: FallbackMoleculeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const isHoveredRef = useRef(false)

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

    // Mouse events
    const handleMouseEnter = () => {
      isHoveredRef.current = true
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
    }

    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Define molecule structure
    const atoms = [
      { x: canvas.width / 2, y: canvas.height / 2, size: 30 }, // Center
      { x: canvas.width / 2 + 100, y: canvas.height / 2, size: 20 },
      { x: canvas.width / 2 - 100, y: canvas.height / 2, size: 20 },
      { x: canvas.width / 2, y: canvas.height / 2 + 100, size: 20 },
      { x: canvas.width / 2, y: canvas.height / 2 - 100, size: 20 },
      { x: canvas.width / 2 + 70, y: canvas.height / 2 + 70, size: 20 },
      { x: canvas.width / 2 - 70, y: canvas.height / 2 - 70, size: 20 },
    ]

    // Animation loop
    const animate = (time: number) => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw bonds
      ctx.beginPath()
      atoms.slice(1).forEach((atom) => {
        ctx.moveTo(atoms[0].x, atoms[0].y)
        ctx.lineTo(atom.x, atom.y)
      })
      ctx.strokeStyle = `${color}99`
      ctx.lineWidth = 5
      ctx.stroke()

      // Draw atoms with pulsing effect
      atoms.forEach((atom, i) => {
        const pulseFactor = 0.1 * Math.sin(time * 0.002 + i)
        const size = atom.size * (1 + pulseFactor)

        ctx.beginPath()
        ctx.arc(atom.x, atom.y, size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()

        // Glow effect
        if (isHoveredRef.current) {
          ctx.beginPath()
          ctx.arc(atom.x, atom.y, size * 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `${color}33`
          ctx.fill()
        }
      })

      // Rotate the entire molecule
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const rotationSpeed = 0.0005

      atoms.forEach((atom, i) => {
        if (i === 0) return // Skip center atom

        // Calculate position relative to center
        const x = atom.x - centerX
        const y = atom.y - centerY

        // Apply rotation
        const cos = Math.cos(time * rotationSpeed)
        const sin = Math.sin(time * rotationSpeed)

        atom.x = centerX + x * cos - y * sin
        atom.y = centerY + x * sin + y * cos
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [color])

  return <canvas ref={canvasRef} className={`w-full h-full ${className || ""}`} />
}

