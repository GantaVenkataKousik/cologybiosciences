"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import FloatingDotsBackground from "./floating-dots-background"

export default function AboutHeroSection() {
  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Floating dots background */}
      <FloatingDotsBackground dotCount={70} dotColors={["#408c5c", "#4a90e2"]} className="opacity-40" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-block rounded-lg bg-[#D8E6E1] px-5 py-1.5 text-sm font-medium text-[#408C5C] mb-6">
              About Cology Biosciences
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[#408C5C] mb-6">
              Leading the Way in Medical Laboratory Excellence
            </h1>

            <p className="text-gray-600 text-lg mb-8">
              At Cology Biosciences, we are committed to providing a preclinical research platform with a unique blend
              of expertise, accuracy, and reliability. Our innovative and cost-effective approach supports your journey
              of scientific discovery while delivering high-quality, reproducible data.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#408C5C] hover:bg-[#357a4d] text-white font-medium transition-all duration-300 hover:scale-105"
              >
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all duration-300"
              >
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

