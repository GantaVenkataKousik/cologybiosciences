"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function ResearchMethods() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col justify-center space-y-4 order-2 md:order-1"
      >
        <h3 className="text-2xl font-bold text-primary">Precision Animal Handling</h3>
        <p className="text-muted-foreground">
          Our experienced technicians employ gentle and precise handling techniques to ensure animal welfare while
          maintaining research integrity. All procedures follow strict ethical guidelines and are performed by trained
          professionals.
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-center">• Humane handling protocols</li>
          <li className="flex items-center">• Specialized techniques for different species</li>
          <li className="flex items-center">• Minimally invasive procedures</li>
          <li className="flex items-center">• Adherence to international welfare standards</li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="order-1 md:order-2"
      >
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ixl6wvtblsO1nLRKsPheeIdQ5hhmh4.png"
                alt="Precise animal handling techniques with proper protective equipment"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

