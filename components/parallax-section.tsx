"use client"

import { type ReactNode, useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  opacityEffect?: boolean
}

export default function ParallaxSection({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
  opacityEffect = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how far the element is from the viewport
      const distanceFromTop = rect.top
      const elementHeight = rect.height

      // Calculate scroll progress (0 when element enters viewport, 1 when it leaves)
      let progress = 0

      if (distanceFromTop <= windowHeight && distanceFromTop + elementHeight >= 0) {
        progress = 1 - (distanceFromTop + elementHeight) / (windowHeight + elementHeight)
        progress = Math.min(Math.max(progress, 0), 1) // Clamp between 0 and 1
      } else if (distanceFromTop > windowHeight) {
        progress = 0
      } else {
        progress = 1
      }

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate transform values based on direction and scroll progress
  const getTransformValues = () => {
    const distance = 100 * speed
    const progressValue = scrollProgress * distance

    switch (direction) {
      case "up":
        return { y: distance - progressValue, x: 0 }
      case "down":
        return { y: progressValue - distance, x: 0 }
      case "left":
        return { x: distance - progressValue, y: 0 }
      case "right":
        return { x: progressValue - distance, y: 0 }
      default:
        return { y: distance - progressValue, x: 0 }
    }
  }

  const { x, y } = getTransformValues()

  const opacity = opacityEffect ? (scrollProgress < 0.5 ? scrollProgress * 2 : 2 - scrollProgress * 2) : 1

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ x, y, opacity }}
      transition={{ type: "spring", damping: 15 }}
    >
      {children}
    </motion.div>
  )
}

