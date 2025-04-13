"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MolecularVisualization from "./molecular-visualization"
import FloatingParticles from "./floating-particles"

export default function MolecularSection() {
  return (
    <section className="relative min-h-screen py-20 overflow-hidden">
      {/* Background Effects */}
      <FloatingParticles className="opacity-20" particleCount={100} color="#408c5c" connectionDistance={200} />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Advanced Molecular Testing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our molecular testing services utilize cutting-edge technology to analyze DNA, RNA, and proteins for
            research and diagnostic purposes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Visualization */}
          <div className="h-[600px] relative order-2 lg:order-1">
            <MolecularVisualization className="w-full h-full" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <Tabs defaultValue="molecular" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="pre-clinical">Pre-Clinical</TabsTrigger>
                <TabsTrigger value="molecular">Molecular</TabsTrigger>
                <TabsTrigger value="genetic">Genetic</TabsTrigger>
                <TabsTrigger value="diagnostic">Diagnostic</TabsTrigger>
              </TabsList>

              <TabsContent value="molecular" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold mb-4">Comprehensive Molecular Analysis</h3>
                  <p className="text-gray-600 mb-6">
                    We offer comprehensive molecular testing solutions with high sensitivity and specificity, utilizing
                    the latest technologies and methodologies.
                  </p>

                  {/* Service List */}
                  {[
                    "PCR and real-time PCR analysis",
                    "Next-generation sequencing",
                    "Protein expression and purification",
                    "Biomarker discovery and validation",
                  ].map((service, index) => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 mb-4"
                    >
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span>{service}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              {/* Add similar content for other tabs */}
            </Tabs>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-0 right-0 w-1/3 h-full opacity-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent blur-3xl" />
      </motion.div>
    </section>
  )
}

