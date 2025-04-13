"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function LabShowcase() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JRlmIYMcn5d4AmI8bpvJWkHFmcIBFg.png"
                alt="State-of-the-art animal housing facility with IVC racks"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col justify-center space-y-4"
      >
        <h3 className="text-2xl font-bold text-primary">Advanced Research Facilities</h3>
        <p className="text-muted-foreground">
          Our state-of-the-art laboratory is equipped with modern IVC systems and environmental controls, ensuring
          optimal conditions for research animals and maintaining the highest standards of care and scientific
          integrity.
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-center">• Advanced Individual Ventilated Cage (IVC) systems</li>
          <li className="flex items-center">• Precise environmental control systems</li>
          <li className="flex items-center">• Modern animal housing facilities</li>
          <li className="flex items-center">• Dedicated research spaces</li>
        </ul>
      </motion.div>
    </div>
  )
}

