"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface ProteinStructureProps {
  className?: string
  primaryColor?: string
  secondaryColor?: string
}

export default function ProteinStructure({
  className = "",
  primaryColor = "#40E0D0",
  secondaryColor = "#4a90e2",
}: ProteinStructureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const isMouseOverRef = useRef(false)

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
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseEnter = () => {
      isMouseOverRef.current = true
    }

    const handleMouseLeave = () => {
      isMouseOverRef.current = false
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Create protein structure
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(canvas.width, canvas.height) * 0.4

    // Alpha helix points
    const helixPoints: { x: number; y: number; z: number }[] = []
    const turns = 5
    const pointsPerTurn = 8
    const totalPoints = turns * pointsPerTurn

    for (let i = 0; i < totalPoints; i++) {
      const angle = (i / pointsPerTurn) * Math.PI * 2
      const z = (i / totalPoints) * 2 - 1
      const x = Math.cos(angle) * radius * 0.3
      const y = Math.sin(angle) * radius * 0.3 + z * radius

      helixPoints.push({ x, y, z })
    }

    // Beta sheet points
    const sheetPoints: { x: number; y: number; z: number }[] = []
    const rows = 4
    const cols = 6

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = (col / (cols - 1) - 0.5) * radius * 1.2
        const y = (row / (rows - 1) - 0.5) * radius * 0.8
        const z = Math.sin(row * Math.PI) * 0.2

        sheetPoints.push({ x, y, z })
      }
    }

    // Animation loop
    const animate = (time: number) => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Rotation angles
      let rotationX = time * 0.0005
      let rotationY = time * 0.0003
      const rotationZ = time * 0.0002

      // Mouse interaction
      if (isMouseOverRef.current) {
        const mouseXRatio = (mouseRef.current.x / canvas.width - 0.5) * 2
        const mouseYRatio = (mouseRef.current.y / canvas.height - 0.5) * 2

        rotationX += mouseYRatio * 0.5
        rotationY += mouseXRatio * 0.5
      }

      // Draw alpha helix
      const transformedHelixPoints = helixPoints.map((point) => {
        // Apply 3D rotation
        const { x, y, z } = rotatePoint(point.x, point.y, point.z, rotationX, rotationY, rotationZ)

        // Project to 2D
        return {
          x: x + centerX,
          y: y + centerY,
          z: z,
        }
      })

      // Sort points by z-index for proper rendering
      transformedHelixPoints.sort((a, b) => a.z - b.z)

      // Draw connections
      for (let i = 0; i < transformedHelixPoints.length - 1; i++) {
        const point = transformedHelixPoints[i]
        const nextPoint = transformedHelixPoints[i + 1]

        ctx.beginPath()
        ctx.moveTo(point.x, point.y)
        ctx.lineTo(nextPoint.x, nextPoint.y)

        // Color and width based on z-position
        const zAvg = (point.z + nextPoint.z) / 2
        const opacity = 0.5 + (zAvg + 1) * 0.25
        ctx.strokeStyle =
          primaryColor +
          Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.lineWidth = 3
        ctx.stroke()
      }

      // Draw points
      transformedHelixPoints.forEach((point) => {
        const size = 4 + (point.z + 1) * 2
        const opacity = 0.7 + (point.z + 1) * 0.15

        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fillStyle =
          primaryColor +
          Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()
      })

      // Draw beta sheet
      const transformedSheetPoints = sheetPoints.map((point) => {
        // Apply 3D rotation
        const { x, y, z } = rotatePoint(point.x, point.y, point.z, rotationX, rotationY + Math.PI / 2, rotationZ)

        // Project to 2D
        return {
          x: x + centerX,
          y: y + centerY,
          z: z,
        }
      })

      // Sort points by z-index
      transformedSheetPoints.sort((a, b) => a.z - b.z)

      // Draw sheet connections
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 1; col++) {
          const idx = row * cols + col
          const point = transformedSheetPoints[idx]
          const nextPoint = transformedSheetPoints[idx + 1]

          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(nextPoint.x, nextPoint.y)

          // Color and width based on z-position
          const zAvg = (point.z + nextPoint.z) / 2
          const opacity = 0.5 + (zAvg + 1) * 0.25
          ctx.strokeStyle =
            secondaryColor +
            Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }

      // Draw vertical connections
      for (let row = 0; row < rows - 1; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col
          const point = transformedSheetPoints[idx]
          const nextPoint = transformedSheetPoints[idx + cols]

          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(nextPoint.x, nextPoint.y)

          // Color and width based on z-position
          const zAvg = (point.z + nextPoint.z) / 2
          const opacity = 0.5 + (zAvg + 1) * 0.25
          ctx.strokeStyle =
            secondaryColor +
            Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }

      // Draw points
      transformedSheetPoints.forEach((point) => {
        const size = 3 + (point.z + 1) * 1.5
        const opacity = 0.7 + (point.z + 1) * 0.15

        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fillStyle =
          secondaryColor +
          Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Helper function for 3D rotation
    function rotatePoint(x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number) {
      // Rotate around X axis
      const y1 = y * Math.cos(rotX) - z * Math.sin(rotX)
      const z1 = y * Math.sin(rotX) + z * Math.cos(rotX)

      // Rotate around Y axis
      const x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY)
      const z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY)

      // Rotate around Z axis
      const x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ)
      const y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ)

      return { x: x3, y: y3, z: z2 }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [primaryColor, secondaryColor])

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

