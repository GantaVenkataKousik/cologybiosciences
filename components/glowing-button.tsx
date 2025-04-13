"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"

interface GlowingButtonProps extends ButtonProps {
  glowColor?: string
  hoverScale?: number
}

export default function GlowingButton({
  glowColor = "#40E0D0",
  hoverScale = 1.05,
  children,
  className = "",
  ...props
}: GlowingButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 rounded-full blur-xl transition-opacity duration-500"
        style={{
          background: glowColor,
          opacity: isHovered ? 0.5 : 0,
        }}
        animate={{
          scale: isHovered ? 1.2 : 1,
        }}
      />

      <motion.div
        whileHover={{ scale: hoverScale }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Button className={`relative ${className}`} {...props}>
          {children}
        </Button>
      </motion.div>
    </div>
  )
}

