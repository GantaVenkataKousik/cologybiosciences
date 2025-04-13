"use client"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronRight } from "lucide-react"
import ThreeDNetworkBackground from "@/components/three-d-network-background"

export default function HeroSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#1B2238]">
      <ThreeDNetworkBackground />

      <div className="absolute inset-0 z-10">
        <motion.div className="absolute top-0 left-0 w-full h-full" style={{ y }}>
          <div className="container mx-auto h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative z-20 space-y-8">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-7xl font-bold text-white leading-tight"
                >
                  Laboratory
                  <br />
                  Services for
                  <br />
                  Medical
                  <br />
                  Research
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl md:text-2xl text-gray-300"
                >
                  State-of-the-art facilities and expert scientists to support your research needs
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#408C5C] hover:bg-[#357a4d] text-white text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(64,140,92,0.5)]"
                  >
                    Explore
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.span>
                  </Link>
                </motion.div>
              </div>

              <div className="hidden lg:block h-[600px] relative">
                {/* We don't need additional content here as the background animation covers this area */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1B2238] via-transparent to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#1B2238] to-transparent opacity-90"></div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{
          y: [0, 10, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-white rounded-full"
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}

