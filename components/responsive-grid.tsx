"use client"

import { type ReactNode, Children } from "react"
import { motion } from "framer-motion"

interface ResponsiveGridProps {
  children: ReactNode
  className?: string
  columns?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: string
  staggerDelay?: number
}

export default function ResponsiveGrid({
  children,
  className = "",
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = "gap-6",
  staggerDelay = 0.1,
}: ResponsiveGridProps) {
  const { sm = 1, md = 2, lg = 3, xl = 4 } = columns

  const gridClassName = `grid ${gap} ${
    sm === 1 ? "grid-cols-1" : sm === 2 ? "grid-cols-2" : sm === 3 ? "grid-cols-3" : "grid-cols-4"
  } ${md === 1 ? "md:grid-cols-1" : md === 2 ? "md:grid-cols-2" : md === 3 ? "md:grid-cols-3" : "md:grid-cols-4"} ${
    lg === 1 ? "lg:grid-cols-1" : lg === 2 ? "lg:grid-cols-2" : lg === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
  } ${
    xl === 1 ? "xl:grid-cols-1" : xl === 2 ? "xl:grid-cols-2" : xl === 3 ? "xl:grid-cols-3" : "xl:grid-cols-4"
  } ${className}`

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Convert children to array to map over them
  const childrenArray = Children.toArray(children)

  return (
    <motion.div
      className={gridClassName}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

