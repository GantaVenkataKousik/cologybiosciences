"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"

interface StatProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
}

function AnimatedStat({ value, label, prefix = "", suffix = "", duration = 2 }: StatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const increment = end / (duration * 60)
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 1000 / 60)
      return () => clearInterval(timer)
    }
  }, [value, duration, isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-bold text-white mb-2">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-xl text-gray-300">{label}</div>
    </motion.div>
  )
}

export default function AnimatedStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      <AnimatedStat value={15} suffix="+" label="Years Experience" />
      <AnimatedStat value={500} suffix="+" label="Research Projects" />
      <AnimatedStat value={100} suffix="+" label="Publications" />
      <AnimatedStat value={50} suffix="+" label="Global Partners" />
    </div>
  )
}

