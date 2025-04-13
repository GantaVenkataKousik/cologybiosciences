"use client"

import { useRef, useEffect } from "react"

interface DNANetworkBackgroundProps {
  className?: string
}

export default function DNANetworkBackground({ className = "" }: DNANetworkBackgroundProps) {
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

    // Create background particles
    const particles: {
      x: number
      y: number
      size: number
      color: string
      opacity: number
    }[] = []

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.7 ? "#408c5c" : "#4a90e2",
        opacity: 0.1 + Math.random() * 0.3,
      })
    }

    // Create 3D DNA helix
    const dnaStrands: {
      points: {
        x: number
        y: number
        z: number
        size: number
        color: string
        originalX: number
        originalY: number
        originalZ: number
      }[]
      centerX: number
      centerY: number
      radius: number
      height: number
      rotationX: number
      rotationY: number
      rotationZ: number
      rotationSpeedX: number
      rotationSpeedY: number
      rotationSpeedZ: number
    }[] = []

    // Create a 3D DNA strand
    const createDNAStrand = (
      centerX: number,
      centerY: number,
      radius: number,
      height: number,
      pointCount: number,
      rotationSpeedY: number,
    ) => {
      const points: {
        x: number
        y: number
        z: number
        size: number
        color: string
        originalX: number
        originalY: number
        originalZ: number
      }[] = []

      // Create helix points in 3D space
      for (let i = 0; i < pointCount; i++) {
        const angle = (i / pointCount) * Math.PI * 4
        const x1 = centerX + Math.cos(angle) * radius
        const z1 = Math.sin(angle) * radius
        const y1 = centerY + (i / pointCount) * height - height / 2

        const x2 = centerX + Math.cos(angle + Math.PI) * radius
        const z2 = Math.sin(angle + Math.PI) * radius
        const y2 = y1

        points.push({
          x: x1,
          y: y1,
          z: z1,
          originalX: x1,
          originalY: y1,
          originalZ: z1,
          size: 3 + Math.random() * 2,
          color: i % 2 === 0 ? "#4a90e2" : "#408c5c",
        })

        points.push({
          x: x2,
          y: y2,
          z: z2,
          originalX: x2,
          originalY: y2,
          originalZ: z2,
          size: 3 + Math.random() * 2,
          color: i % 2 === 0 ? "#408c5c" : "#4a90e2",
        })
      }

      return {
        points,
        centerX,
        centerY,
        radius,
        height,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        rotationSpeedX: 0.001,
        rotationSpeedY: rotationSpeedY,
        rotationSpeedZ: 0.0005,
      }
    }

    // Create main DNA strand in the center
    dnaStrands.push(createDNAStrand(canvas.width * 0.6, canvas.height * 0.5, 80, 400, 12, 0.005))

    // Create smaller DNA strand in the top left
    dnaStrands.push(createDNAStrand(canvas.width * 0.2, canvas.height * 0.2, 40, 200, 8, 0.008))

    // Create molecular clusters
    const molecularClusters: {
      x: number
      y: number
      z: number
      nodes: {
        x: number
        y: number
        z: number
        size: number
        color: string
        originalX: number
        originalY: number
        originalZ: number
      }[]
      connections: { from: number; to: number }[]
      rotationX: number
      rotationY: number
      rotationZ: number
      rotationSpeedX: number
      rotationSpeedY: number
      rotationSpeedZ: number
    }[] = []

    // Create a molecular cluster in 3D
    const createMolecularCluster = (
      centerX: number,
      centerY: number,
      centerZ: number,
      nodeCount: number,
      radius: number,
    ) => {
      const nodes: {
        x: number
        y: number
        z: number
        size: number
        color: string
        originalX: number
        originalY: number
        originalZ: number
      }[] = []
      const connections: { from: number; to: number }[] = []

      // Create central node
      nodes.push({
        x: centerX,
        y: centerY,
        z: centerZ,
        originalX: centerX,
        originalY: centerY,
        originalZ: centerZ,
        size: 10 + Math.random() * 5,
        color: Math.random() > 0.5 ? "#4a90e2" : "#408c5c",
      })

      // Create surrounding nodes in 3D space
      for (let i = 1; i < nodeCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / nodeCount)
        const theta = Math.sqrt(nodeCount * Math.PI) * phi

        const x = centerX + radius * Math.sin(phi) * Math.cos(theta)
        const y = centerY + radius * Math.sin(phi) * Math.sin(theta)
        const z = centerZ + radius * Math.cos(phi)

        nodes.push({
          x,
          y,
          z,
          originalX: x,
          originalY: y,
          originalZ: z,
          size: 5 + Math.random() * 5,
          color: Math.random() > 0.5 ? "#4a90e2" : "#408c5c",
        })

        // Connect to central node
        connections.push({ from: 0, to: i })

        // Connect to some neighbors
        if (i > 1 && Math.random() > 0.5) {
          connections.push({ from: i, to: 1 + Math.floor(Math.random() * (i - 1)) })
        }
      }

      return {
        x: centerX,
        y: centerY,
        z: centerZ,
        nodes,
        connections,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        rotationSpeedX: 0.001 * (Math.random() - 0.5),
        rotationSpeedY: 0.002 * (Math.random() - 0.5),
        rotationSpeedZ: 0.001 * (Math.random() - 0.5),
      }
    }

    // Create a few molecular clusters
    molecularClusters.push(createMolecularCluster(canvas.width * 0.8, canvas.height * 0.3, 0, 6, 60))
    molecularClusters.push(createMolecularCluster(canvas.width * 0.3, canvas.height * 0.7, 0, 4, 40))

    // 3D rotation function
    const rotate3D = (
      x: number,
      y: number,
      z: number,
      centerX: number,
      centerY: number,
      centerZ: number,
      rotationX: number,
      rotationY: number,
      rotationZ: number,
    ) => {
      // Translate point to origin
      const dx = x - centerX
      const dy = y - centerY
      const dz = z - centerZ

      // Rotate around X axis
      const newY = dy * Math.cos(rotationX) - dz * Math.sin(rotationX)
      let newZ = dy * Math.sin(rotationX) + dz * Math.cos(rotationX)

      // Rotate around Y axis
      const newX = dx * Math.cos(rotationY) + newZ * Math.sin(rotationY)
      newZ = -dx * Math.sin(rotationY) + newZ * Math.cos(rotationY)

      // Rotate around Z axis
      const finalX = newX * Math.cos(rotationZ) - newY * Math.sin(rotationZ)
      const finalY = newX * Math.sin(rotationZ) + newY * Math.cos(rotationZ)

      // Translate back
      return {
        x: finalX + centerX,
        y: finalY + centerY,
        z: newZ + centerZ,
      }
    }

    // Animation loop
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#1B2238"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw background particles
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()
      })

      // Update and draw DNA strands with 3D rotation
      dnaStrands.forEach((strand) => {
        // Update rotation angles
        strand.rotationX += strand.rotationSpeedX
        strand.rotationY += strand.rotationSpeedY
        strand.rotationZ += strand.rotationSpeedZ

        // Apply 3D rotation to all points
        strand.points.forEach((point) => {
          const rotated = rotate3D(
            point.originalX,
            point.originalY,
            point.originalZ,
            strand.centerX,
            strand.centerY,
            0,
            strand.rotationX,
            strand.rotationY,
            strand.rotationZ,
          )

          point.x = rotated.x
          point.y = rotated.y
          point.z = rotated.z
        })

        // Sort points by z-index for proper depth rendering
        const sortedPoints = [...strand.points].sort((a, b) => a.z - b.z)

        // Draw connections between adjacent points (DNA backbone)
        for (let i = 0; i < sortedPoints.length - 2; i += 2) {
          // Connect backbone points
          ctx.beginPath()
          ctx.moveTo(sortedPoints[i].x, sortedPoints[i].y)
          ctx.lineTo(sortedPoints[i + 2].x, sortedPoints[i + 2].y)
          ctx.strokeStyle = sortedPoints[i].color + "99"
          ctx.lineWidth = 1
          ctx.stroke()

          // Connect opposite backbone
          ctx.beginPath()
          ctx.moveTo(sortedPoints[i + 1].x, sortedPoints[i + 1].y)
          ctx.lineTo(sortedPoints[i + 3].x, sortedPoints[i + 3].y)
          ctx.strokeStyle = sortedPoints[i + 1].color + "99"
          ctx.lineWidth = 1
          ctx.stroke()

          // Connect base pairs
          ctx.beginPath()
          ctx.moveTo(sortedPoints[i].x, sortedPoints[i].y)
          ctx.lineTo(sortedPoints[i + 1].x, sortedPoints[i + 1].y)
          ctx.strokeStyle = "#ffffff33"
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // Draw points with size based on z-position for 3D effect
        sortedPoints.forEach((point) => {
          // Scale size based on z-position for perspective
          const perspectiveScale = 1 + point.z / 500
          const displaySize = point.size * perspectiveScale

          // Adjust opacity based on z-position
          const opacity = 0.5 + (point.z + 100) / 400

          ctx.beginPath()
          ctx.arc(point.x, point.y, displaySize, 0, Math.PI * 2)
          ctx.fillStyle =
            point.color +
            Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")
          ctx.fill()
        })
      })

      // Update and draw molecular clusters with 3D rotation
      molecularClusters.forEach((cluster) => {
        // Update rotation angles
        cluster.rotationX += cluster.rotationSpeedX
        cluster.rotationY += cluster.rotationSpeedY
        cluster.rotationZ += cluster.rotationSpeedZ

        // Apply 3D rotation to all nodes
        cluster.nodes.forEach((node) => {
          const rotated = rotate3D(
            node.originalX,
            node.originalY,
            node.originalZ,
            cluster.x,
            cluster.y,
            cluster.z,
            cluster.rotationX,
            cluster.rotationY,
            cluster.rotationZ,
          )

          node.x = rotated.x
          node.y = rotated.y
          node.z = rotated.z
        })

        // Sort nodes by z-index for proper depth rendering
        const sortedNodes = [...cluster.nodes].sort((a, b) => a.z - b.z)

        // Draw connections first
        cluster.connections.forEach(({ from, to }) => {
          const fromNode = sortedNodes[from]
          const toNode = sortedNodes[to]

          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)

          // Adjust opacity based on z-position
          const avgZ = (fromNode.z + toNode.z) / 2
          const opacity = 0.1 + (avgZ + 100) / 400

          ctx.strokeStyle =
            "#ffffff" +
            Math.floor(opacity * 50)
              .toString(16)
              .padStart(2, "0")
          ctx.lineWidth = 1
          ctx.stroke()
        })

        // Draw nodes with size based on z-position for 3D effect
        sortedNodes.forEach((node) => {
          // Scale size based on z-position for perspective
          const perspectiveScale = 1 + node.z / 300
          const displaySize = node.size * perspectiveScale

          // Adjust opacity based on z-position
          const opacity = 0.5 + (node.z + 100) / 400

          ctx.beginPath()
          ctx.arc(node.x, node.y, displaySize, 0, Math.PI * 2)
          ctx.fillStyle =
            node.color +
            Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")
          ctx.fill()
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
  }, [])

  return (
    <div className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}

