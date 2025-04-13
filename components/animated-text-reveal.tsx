"use client"

import { motion } from "framer-motion"

interface AnimatedTextRevealProps {
  text: string
  className?: string
  delay?: number
}

export default function AnimatedTextReveal({ text, className = "", delay = 0 }: AnimatedTextRevealProps) {
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  }

  return (
    <motion.div className={className} variants={container} initial="hidden" animate="visible">
      {words.map((word, idx) => (
        <motion.span key={idx} variants={child} className="inline-block mr-2">
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

