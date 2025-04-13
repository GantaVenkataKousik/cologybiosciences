"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"

interface AnimatedButtonProps extends ButtonProps {
  glowColor?: string
}

export default function AnimatedButton({ glowColor = "#40E0D0", children, className, ...props }: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative">
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl transition-opacity duration-500"
        style={{
          background: glowColor,
          opacity: isHovered ? 0.3 : 0,
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
      />

      {/* Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Button className={className} {...props}>
          {children}
        </Button>
      </motion.div>
    </div>
  )
}

