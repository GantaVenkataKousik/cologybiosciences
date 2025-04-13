"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import ScrollReveal from "@/components/scroll-reveal"
import DNAAnimation from "@/components/dna-animation"
import ThreeDNetworkBackground from "@/components/three-d-network-background"
import { ArrowRight } from "lucide-react"

export default function AboutSection() {
  const { scrollYProgress } = useScroll()
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, 300])
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -200])

  const aboutRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={aboutRef} className="py-20 md:py-28 relative overflow-hidden bg-[#1B2238]">
      <ThreeDNetworkBackground className="opacity-50" />

      <motion.div
        className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] blob bg-[#408c5c]/10"
        style={{ y: parallaxY1 }}
      />
      <motion.div
        className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] blob bg-[#4a90e2]/10"
        style={{ y: parallaxY2 }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-[#D8E6E1] px-5 py-1.5 text-sm font-medium text-[#408C5C]">
                About Cology Biosciences
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                We Do Science Responsibly
              </h2>
              <p className="text-gray-300 md:text-lg">
                Precision driven preclinical research for reliable, cost effective, scientific breakthroughs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#408C5C] hover:bg-[#357a4d] text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Unlock
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#408C5C] hover:bg-[#357a4d] text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  View Our Services
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <motion.div
              className="relative aspect-video overflow-hidden rounded-xl shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/lab-scientist.png"
                alt="Laboratory scientist conducting research"
                width={1280}
                height={720}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#408C5C]/20 to-transparent"></div>
              <div className="absolute top-0 right-0 bottom-0 w-1/2">
                <DNAAnimation
                  className="h-full w-full opacity-30"
                  pairCount={30}
                  rotationSpeed={30}
                  baseColor1="#408c5c"
                  baseColor2="#4a90e2"
                  glowIntensity={1.5}
                />
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

