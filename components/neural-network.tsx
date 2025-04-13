"use client"

import { useEffect, useRef } from "react"

interface Neuron {
  x: number
  y: number
  connections: number[]
  pulseOffset: number
  pulseIntensity: number
}

export default function NeuralNetwork() {
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

    // Create neurons
    const neurons: Neuron[] = []
    const neuronCount = 15

    for (let i = 0; i < neuronCount; i++) {
      neurons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
        pulseOffset: Math.random() * Math.PI * 2,
        pulseIntensity: Math.random() * 0.5 + 0.5,
      })
    }

    // Create connections
    neurons.forEach((neuron, i) => {
      const connectionCount = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < connectionCount; j++) {
        const target = Math.floor(Math.random() * neuronCount)
        if (target !== i && !neuron.connections.includes(target)) {
          neuron.connections.push(target)
        }
      }
    })

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      neurons.forEach((neuron, i) => {
        neuron.connections.forEach((targetIndex) => {
          const target = neurons[targetIndex]
          const dx = target.x - neuron.x
          const dy = target.y - neuron.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Pulse effect
          const pulse = Math.sin(time * 0.001 + neuron.pulseOffset) * 0.5 + 0.5
          const alpha = (1 - distance / 300) * 0.3 * pulse * neuron.pulseIntensity

          if (alpha > 0) {
            ctx.beginPath()
            ctx.moveTo(neuron.x, neuron.y)
            ctx.lineTo(target.x, target.y)
            ctx.strokeStyle = `rgba(64, 224, 208, ${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()

            // Draw pulse traveling along the connection
            const pulsePosition = (time * 0.0002 + neuron.pulseOffset) % 1
            const pulseX = neuron.x + dx * pulsePosition
            const pulseY = neuron.y + dy * pulsePosition

            ctx.beginPath()
            ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(64, 224, 208, ${alpha * 2})`
            ctx.fill()
          }
        })
      })

      // Draw neurons
      neurons.forEach((neuron) => {
        const pulse = Math.sin(time * 0.001 + neuron.pulseOffset) * 0.5 + 0.5
        const radius = 3 + pulse * 2

        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(64, 224, 208, ${0.5 + pulse * 0.5})`
        ctx.fill()

        // Glow effect
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, radius * 2, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(neuron.x, neuron.y, 0, neuron.x, neuron.y, radius * 2)
        gradient.addColorStop(0, `rgba(64, 224, 208, ${0.3 * pulse})`)
        gradient.addColorStop(1, "rgba(64, 224, 208, 0)")
        ctx.fillStyle = gradient
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate(0)

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}

