"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface FloatingMoleculesProps {
  className?: string
  count?: number
}

export default function FloatingMolecules({ className, count = 5 }: FloatingMoleculesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const molecules = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * 40 + 60,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 10 + 15,
    color: i % 2 === 0 ? "#4a90e2" : "#408c5c",
  }))

  return (
    <div ref={ref} className={`relative overflow-hidden ${className || ""}`}>
      <div ref={containerRef} className="absolute inset-0">
        {molecules.map((molecule) => (
          <motion.div
            key={molecule.id}
            className="absolute"
            style={{
              left: `${molecule.x}%`,
              top: `${molecule.y}%`,
              width: molecule.size,
              height: molecule.size,
            }}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 0.7,
                scale: 1,
                transition: {
                  delay: molecule.delay,
                  duration: 1.5,
                  ease: "easeOut",
                },
              },
            }}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: molecule.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Central atom */}
                <circle cx="100" cy="100" r="20" fill={molecule.color} opacity="0.8">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                </circle>

                {/* Orbiting atoms */}
                {[0, 1, 2, 3].map((i) => {
                  const angle = (Math.PI * 2 * i) / 4
                  const x = Math.cos(angle) * 60 + 100
                  const y = Math.sin(angle) * 60 + 100

                  return (
                    <g key={i}>
                      <line x1="100" y1="100" x2={x} y2={y} stroke={molecule.color} strokeWidth="2" opacity="0.5" />
                      <circle cx={x} cy={y} r="10" fill={molecule.color} opacity="0.8">
                        <animate
                          attributeName="opacity"
                          values="0.8;1;0.8"
                          dur={`${2 + i * 0.5}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  )
                })}

                {/* Glow effect */}
                <filter id={`glow-${molecule.id}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                <circle
                  cx="100"
                  cy="100"
                  r="40"
                  fill={molecule.color}
                  opacity="0.3"
                  filter={`url(#glow-${molecule.id})`}
                >
                  <animate attributeName="r" values="40;50;40" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.5;0.3" dur="4s" repeatCount="indefinite" />
                </circle>
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

