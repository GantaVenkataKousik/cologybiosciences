"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface NetworkBackground2DProps {
  className?: string
  color?: string
  nodeCount?: number
  lineOpacity?: number
}

export default function NetworkBackground2D({
  className = "",
  color = "#4a90e2",
  nodeCount = 100,
  lineOpacity = 0.2,
}: NetworkBackground2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

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
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Create nodes with z-depth
    const nodes: {
      x: number
      y: number
      z: number
      size: number
      speed: number
      color: string
    }[] = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 3 - 2, // z-depth (-2 to 1)
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.2 + 0.1,
        color: i % 3 === 0 ? "#4a90e2" : i % 3 === 1 ? "#40E0D0" : "#408c5c",
      })
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with dark blue background
      ctx.fillStyle = "#1B2238"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Sort nodes by z-index for proper depth rendering
      nodes.sort((a, b) => a.z - b.z)

      // Apply mouse parallax
      const parallaxX = (mousePosition.x - 0.5) * 100
      const parallaxY = (mousePosition.y - 0.5) * 100

      // Draw connections first (behind nodes)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Apply parallax based on depth
        const nodeX = node.x + parallaxX * (node.z + 2) * 0.05
        const nodeY = node.y + parallaxY * (node.z + 2) * 0.05

        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j]

          // Apply parallax to other node
          const otherNodeX = otherNode.x + parallaxX * (otherNode.z + 2) * 0.05
          const otherNodeY = otherNode.y + parallaxY * (otherNode.z + 2) * 0.05

          const dx = nodeX - otherNodeX
          const dy = nodeY - otherNodeY
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Only connect nodes that are close enough
          if (distance < 150) {
            // Opacity based on distance and z-depth
            const opacity = (1 - distance / 150) * 0.2 * ((node.z + 2) / 3)

            ctx.beginPath()
            ctx.moveTo(nodeX, nodeY)
            ctx.lineTo(otherNodeX, otherNodeY)
            ctx.strokeStyle = `${node.color}${Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")}`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Update position
        node.x += node.speed * (node.z + 2)
        if (node.x > canvas.width) node.x = 0

        // Apply parallax based on depth
        const nodeX = node.x + parallaxX * (node.z + 2) * 0.05
        const nodeY = node.y + parallaxY * (node.z + 2) * 0.05

        // Size based on z-depth
        const size = node.size * ((node.z + 2) / 3)

        // Opacity based on z-depth
        const opacity = 0.3 + ((node.z + 2) / 3) * 0.7

        ctx.beginPath()
        ctx.arc(nodeX, nodeY, size, 0, Math.PI * 2)
        ctx.fillStyle = `${node.color}${Math.floor(opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()

        // Add glow effect
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, size * 2, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(nodeX, nodeY, size, nodeX, nodeY, size * 2)
        gradient.addColorStop(
          0,
          `${node.color}${Math.floor(opacity * 0.5 * 255)
            .toString(16)
            .padStart(2, "0")}`,
        )
        gradient.addColorStop(1, `${node.color}00`)
        ctx.fillStyle = gradient
        ctx.fill()
      }

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
  }, [nodeCount, mousePosition])

  return (
    <div className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Light beams for enhanced depth effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-1/2 h-screen bg-[#4a90e2]/5 blur-[100px] transform -rotate-45"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            transform: `rotate(-45deg) translateX(${(mousePosition.x - 0.5) * -50}px) translateY(${(mousePosition.y - 0.5) * -50}px)`,
          }}
        />

        <motion.div
          className="absolute bottom-0 right-1/4 w-1/2 h-screen bg-[#40E0D0]/5 blur-[100px] transform rotate-45"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            transform: `rotate(45deg) translateX(${(mousePosition.x - 0.5) * 50}px) translateY(${(mousePosition.y - 0.5) * 50}px)`,
          }}
        />
      </div>
    </div>
  )
}

