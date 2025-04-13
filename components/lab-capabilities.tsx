"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function LabCapabilities() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">State-of-the-Art Research Facilities</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our advanced laboratory is equipped with cutting-edge technology and staffed by experienced researchers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <CardContent className="p-0 relative aspect-[4/3]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XwDsOC8JdevZHe14r8tG9j2MUIyj6P.png"
                alt="Advanced laboratory equipment and research"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold text-white">Advanced Testing Equipment</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0 relative aspect-[4/3]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-f2lMXPuLdSE365f0eKqqHWOKgRMU1U.png"
                alt="Animal model research"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold text-white">Specialized Animal Models</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

