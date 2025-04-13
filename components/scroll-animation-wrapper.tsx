"use client"

import { type ReactNode, useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ScrollAnimationWrapperProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
  animation?: "fade" | "slide-up" | "slide-right" | "slide-left" | "zoom" | "none" | "3d-up" | "3d-rotate"
  depth?: number
}

export default function ScrollAnimationWrapper({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  animation = "fade",
  depth = 50,
}: ScrollAnimationWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            if (once) {
              observer.unobserve(currentRef)
            }
          } else if (!once) {
            setIsInView(false)
          }
        })
      },
      { threshold },
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [once, threshold])

  // Define all animation variants at the top level
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const slideUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  const slideRightVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  }

  const slideLeftVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  }

  const zoomVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  }

  const threeD_upVariants = {
    hidden: { opacity: 0, y: 50, z: -depth, rotateX: 10 },
    visible: { opacity: 1, y: 0, z: 0, rotateX: 0 },
  }

  const threeD_rotateVariants = {
    hidden: { opacity: 0, rotateY: -15, z: -depth },
    visible: { opacity: 1, rotateY: 0, z: 0 },
  }

  const noneVariants = {
    hidden: {},
    visible: {},
  }

  // Select the appropriate variants based on animation type
  let variants
  switch (animation) {
    case "fade":
      variants = fadeVariants
      break
    case "slide-up":
      variants = slideUpVariants
      break
    case "slide-right":
      variants = slideRightVariants
      break
    case "slide-left":
      variants = slideLeftVariants
      break
    case "zoom":
      variants = zoomVariants
      break
    case "3d-up":
      variants = threeD_upVariants
      break
    case "3d-rotate":
      variants = threeD_rotateVariants
      break
    case "none":
      variants = noneVariants
      break
    default:
      variants = fadeVariants
  }

  // Determine transition type
  const transitionType = animation.includes("3d") ? "spring" : "tween"
  const transitionProps = animation.includes("3d")
    ? { duration, delay, type: transitionType, damping: 20, stiffness: 100 }
    : { duration, delay, type: transitionType }

  return (
    <motion.div
      ref={ref}
      className={`${className} ${animation.includes("3d") ? "preserve-3d" : ""}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transitionProps}
    >
      {children}
    </motion.div>
  )
}

