"use client"

import type React from "react"

import { useRef, useMemo } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface ParallaxContainerProps {
  children: React.ReactNode
  className?: string
  layers?: number
  perspective?: number
}

export default function ParallaxContainer({
  children,
  className = "",
  layers = 5,
  perspective = 1000,
}: ParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Create smoother animations with springs
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Create all transform values at the top level to avoid conditional hook calls
  // Layer 0 (foreground)
  const layer0Y = useTransform(smoothProgress, [0, 1], ["0%", "100%"])
  const layer0Scale = useTransform(smoothProgress, [0, 1], [1, 1.1])
  const layer0Opacity = useTransform(smoothProgress, [0, 0.8], [1, 0])
  const layer0RotateX = useTransform(smoothProgress, [0, 1], [0, 1.5])

  // Layer 1
  const layer1Y = useTransform(smoothProgress, [0, 1], ["0%", "80%"])
  const layer1Scale = useTransform(smoothProgress, [0, 1], [1, 1.08])
  const layer1Opacity = useTransform(smoothProgress, [0, 0.8], [1, 0.5])
  const layer1RotateX = useTransform(smoothProgress, [0, 1], [0, 3])

  // Layer 2
  const layer2Y = useTransform(smoothProgress, [0, 1], ["0%", "60%"])
  const layer2Scale = useTransform(smoothProgress, [0, 1], [1, 1.06])
  const layer2Opacity = useTransform(smoothProgress, [0, 0.8], [1, 0.4])
  const layer2RotateX = useTransform(smoothProgress, [0, 1], [0, 4.5])

  // Layer 3
  const layer3Y = useTransform(smoothProgress, [0, 1], ["0%", "40%"])
  const layer3Scale = useTransform(smoothProgress, [0, 1], [1, 1.04])
  const layer3Opacity = useTransform(smoothProgress, [0, 0.8], [1, 0.3])
  const layer3RotateX = useTransform(smoothProgress, [0, 1], [0, 6])

  // Layer 4
  const layer4Y = useTransform(smoothProgress, [0, 1], ["0%", "20%"])
  const layer4Scale = useTransform(smoothProgress, [0, 1], [1, 1.02])
  const layer4Opacity = useTransform(smoothProgress, [0, 0.8], [1, 0.2])
  const layer4RotateX = useTransform(smoothProgress, [0, 1], [0, 7.5])

  // Create an array of layer transforms
  const layerTransforms = useMemo(() => {
    return [
      { y: layer0Y, scale: layer0Scale, opacity: layer0Opacity, rotateX: layer0RotateX, z: 0 },
      { y: layer1Y, scale: layer1Scale, opacity: layer1Opacity, rotateX: layer1RotateX, z: -50 },
      { y: layer2Y, scale: layer2Scale, opacity: layer2Opacity, rotateX: layer2RotateX, z: -100 },
      { y: layer3Y, scale: layer3Scale, opacity: layer3Opacity, rotateX: layer3RotateX, z: -150 },
      { y: layer4Y, scale: layer4Scale, opacity: layer4Opacity, rotateX: layer4RotateX, z: -200 },
    ].slice(0, layers)
  }, [
    layer0Y,
    layer0Scale,
    layer0Opacity,
    layer0RotateX,
    layer1Y,
    layer1Scale,
    layer1Opacity,
    layer1RotateX,
    layer2Y,
    layer2Scale,
    layer2Opacity,
    layer2RotateX,
    layer3Y,
    layer3Scale,
    layer3Opacity,
    layer3RotateX,
    layer4Y,
    layer4Scale,
    layer4Opacity,
    layer4RotateX,
    layers,
  ])

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Background parallax layers with different depths */}
      {layerTransforms.map((transforms, i) => (
        <motion.div
          key={`layer-${i}`}
          className="absolute inset-0 w-full h-full"
          style={{
            y: transforms.y,
            scale: transforms.scale,
            opacity: transforms.opacity,
            rotateX: transforms.rotateX,
            z: transforms.z,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Only render content in the first layer, others are for parallax effect */}
          {i === 0 ? children : null}
        </motion.div>
      ))}

      {/* Fixed overlay for depth perception */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#0A1628]/80 z-50" />
    </div>
  )
}

