"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface MolecularStructureProps {
  className?: string
  primaryColor?: string
  secondaryColor?: string
  nodeCount?: number
  speed?: number
}

export default function MolecularStructure({
  className = "",
  primaryColor = "#40E0D0",
  secondaryColor = "#4a90e2",
  nodeCount = 12,
  speed = 1,
}: MolecularStructureProps) {
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

    // Create nodes
    const nodes: {
      x: number
      y: number
      z: number
      radius: number
      color: string
      vx: number
      vy: number
      vz: number
    }[] = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 200 - 100,
        radius: Math.random() * 4 + 2,
        color: i % 2 === 0 ? primaryColor : secondaryColor,
        vx: (Math.random() - 0.5) * 0.5 * speed,
        vy: (Math.random() - 0.5) * 0.5 * speed,
        vz: (Math.random() - 0.5) * 0.5 * speed,
      })
    }

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Update position
        node.x += node.vx
        node.y += node.vy
        node.z += node.vz

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
        if (node.z < -100 || node.z > 100) node.vz *= -1

        // Calculate size based on z-position (perspective)
        const scale = (node.z + 100) / 200
        const radius = node.radius * (0.5 + scale)

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()

        // Draw glow if hovered
        if (isHoveredRef.current) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, radius * 2, 0, Math.PI * 2)
          ctx.fillStyle = `${node.color}33`
          ctx.fill()
        }

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j]
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const dz = node.z - otherNode.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)

            // Opacity based on distance and z-position
            const opacity = (1 - distance / 150) * (0.5 + scale * 0.5)
            ctx.strokeStyle = `${primaryColor}${Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")}`
            ctx.lineWidth = 1
            ctx.stroke()
          }
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
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [primaryColor, secondaryColor, nodeCount, speed])

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#40E0D0]/10 to-transparent blur-xl" />
      </motion.div>
    </div>
  )
}

