"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    id: 1,
    content:
      "We have worked with Cology on an important rodent study. The study was well conducted and a good reported presented. Dr. Sridevi the CEO, is through and experienced and adds high value to the study design and execution. We plan to do several studies with Cology.",
    author: "Dr. Uday Saxena",
    role: "Utopia Therapeutics",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    content:
      "The team at Cology Biosciences consistently delivers high-quality results with exceptional turnaround times. Their commitment to excellence is evident in every aspect of their service.",
    author: "Dr. Shashi Bhushan",
    role: "CEO, Eliciton Innovations PVT Ltd",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    content:
      "We have recently completed our animal trial, and I would like to commend Cology Biosciences for their exceptional professionalism, diligence, and timeliness throughout the process. Their commitment to conducting the trial and acquiring data was evident at every stage. I strongly recommend their services for any future preclinical research needs.",
    author: "Dr. Sairam Atluri",
    role: "CEO, Tulasi Therapeutics",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    content:
      "Cology has been exceptional in taking on new challenges and providing innovative solutions tailored to our specific requirements. Their flexibility with timelines has been invaluable, especially for startups like ours working with CROs like Cology. Sridevi, in particular, has always been open to exploring new methodologies and stepping outside her comfort zone. I'm truly impressed by the dedication and drive of their team.",
    author: "Poulami",
    role: "CEO of HelEx",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

// Dummy component to avoid errors. Replace with actual implementation if available.
const ThreeDNetworkBackground = () => {
  return <div />
}

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setActiveIndex((prev) => {
      if (newDirection === 1) {
        return prev === testimonials.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1
    })
  }

  if (!mounted) {
    return (
      <section className="py-20 md:py-32 relative overflow-hidden bg-[#e5eeed]">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block rounded-lg bg-[#408c5c] px-4 py-2 text-sm font-medium text-white mb-4">
              CASE STUDIES
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[#1B2238]">Our Testimonals</h2>
          </div>
          <div className="max-w-4xl mx-auto relative min-h-[300px] flex items-center justify-center">
            <p className="text-gray-500">Loading testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-[#e5eeed]">
      <div className="absolute inset-0 z-0">
        <ThreeDNetworkBackground />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block rounded-lg bg-[#408c5c] px-4 py-2 text-sm font-medium text-white mb-4">
            CASE STUDIES
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[#1B2238]">Our Testimonals</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative min-h-[300px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              className="absolute w-full"
            >
              <Card className="bg-white backdrop-blur-lg shadow-xl border-[#408c5c] border-4 p-8 md:p-12">
                <Quote className="h-12 w-12 text-[#408c5c]/20 mb-6" />
                <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                  "{testimonials[activeIndex].content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[#408c5c]/20">
                    <Image
                      src={testimonials[activeIndex].avatar || "/placeholder.svg?height=100&width=100"}
                      alt={testimonials[activeIndex].author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{testimonials[activeIndex].author}</h4>
                    <p className="text-gray-600">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 z-10 border-2 border-[#408c5c]"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-[#408c5c]" />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 z-10 border-2 border-[#408c5c]"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-[#408c5c]" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1)
                setActiveIndex(index)
              }}
              className={`h-2 transition-all duration-300 rounded-full ${
                index === activeIndex ? "w-8 bg-[#408c5c]" : "w-2 bg-gray-300 hover:bg-[#408c5c]/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

