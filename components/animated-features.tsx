"use client"

import { motion } from "framer-motion"
import { Microscope, FlaskRoundIcon as Flask, Dna, Brain, Award, Users } from "lucide-react"

const features = [
  {
    icon: Microscope,
    title: "Advanced Equipment",
    description: "State-of-the-art laboratory equipment and facilities",
  },
  {
    icon: Flask,
    title: "Precise Testing",
    description: "Accurate and reliable testing procedures",
  },
  {
    icon: Dna,
    title: "Genetic Analysis",
    description: "Comprehensive genetic testing and research",
  },
  {
    icon: Brain,
    title: "Expert Team",
    description: "Highly qualified scientists and researchers",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "ISO certified laboratory processes",
  },
  {
    icon: Users,
    title: "Collaborative Research",
    description: "Partnerships with leading institutions",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export default function AnimatedFeatures() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <feature.icon className="w-8 h-8 text-[#40E0D0]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

