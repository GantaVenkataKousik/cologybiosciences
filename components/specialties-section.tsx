"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Microscope, Dna, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function SpecialtiesSection() {
  const [activeTab, setActiveTab] = useState("preclinical")

  return (
    <section className="py-16 md:py-24 bg-[#f5f7f7]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-[#D8E6E1] px-5 py-1.5 text-sm font-medium text-[#408C5C]">
              Our Specialties
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#408C5C]">
              Areas of Expertise
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              We specialize in various fields of medical research and diagnostics to provide comprehensive solutions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -10, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)" }}
          >
            <Card className="h-full bg-white hover:border-primary transition-colors duration-300">
              <CardContent className="p-3 sm:p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 sm:mb-4">
                  <Microscope className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="text-base sm:text-xl font-bold">Pre-Clinical</h3>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -10, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)" }}
          >
            <Card className="h-full bg-white hover:border-primary transition-colors duration-300">
              <CardContent className="p-3 sm:p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 sm:mb-4">
                  <Dna className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="text-base sm:text-xl font-bold">Molecular</h3>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -10, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)" }}
          >
            <Card className="h-full bg-white hover:border-primary transition-colors duration-300">
              <CardContent className="p-3 sm:p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 sm:mb-4">
                  <Dna className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="text-base sm:text-xl font-bold">Genetic</h3>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -10, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)" }}
          >
            <Card className="h-full bg-white hover:border-primary transition-colors duration-300">
              <CardContent className="p-3 sm:p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 sm:mb-4">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="text-base sm:text-xl font-bold">Diagnostic</h3>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

