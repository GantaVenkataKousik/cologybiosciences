"use client"

import { useEffect, useRef } from "react"

export default function BoneStructure() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Draw bone structure
    const drawBone = (x: number, y: number, width: number, height: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Main bone shaft
      ctx.beginPath()
      ctx.roundRect(-width / 2, -height / 6, width, height / 3, height / 6)
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      ctx.fill()
      ctx.strokeStyle = "rgba(64, 224, 208, 0.5)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Bone ends
      const endWidth = width * 0.3
      const endHeight = height * 0.8

      // Left end
      ctx.beginPath()
      ctx.ellipse(-width / 2, 0, endWidth / 2, endHeight / 2, 0, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      ctx.fill()
      ctx.strokeStyle = "rgba(64, 224, 208, 0.5)"
      ctx.stroke()

      // Right end
      ctx.beginPath()
      ctx.ellipse(width / 2, 0, endWidth / 2, endHeight / 2, 0, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      ctx.fill()
      ctx.strokeStyle = "rgba(64, 224, 208, 0.5)"
      ctx.stroke()

      ctx.restore()
    }

    const bones: Array<{
      x: number
      y: number
      width: number
      height: number
      rotation: number
      rotationSpeed: number
    }> = []

    // Create bones
    for (let i = 0; i < 5; i++) {
      bones.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 100 + 100,
        height: Math.random() * 40 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      })
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bones.forEach((bone) => {
        bone.rotation += bone.rotationSpeed
        drawBone(bone.x, bone.y, bone.width, bone.height, bone.rotation)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}

