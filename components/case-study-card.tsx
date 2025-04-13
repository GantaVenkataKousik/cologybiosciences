"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ArrowRight, CheckCircle } from "lucide-react"

interface CaseStudyCardProps {
  id: number
  category: string
  challenge: string
  solution: string
  outcomes: string[]
  icon: React.ReactNode
  color: string
}

export function CaseStudyCard({ id, category, challenge, solution, outcomes, icon, color }: CaseStudyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="case-study-card"
    >
      <Card className="bg-[#1D2A4A] border-none h-full overflow-hidden">
        <CardContent className="p-0">
          <div className={`${color} p-4 flex items-center justify-between`}>
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">{icon}</div>
              <div>
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  Case Study {id}
                </Badge>
                <h3 className="text-xl font-bold text-white mt-1">{category}</h3>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronDown className={`h-6 w-6 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </Button>
          </div>

          <div className="p-6">
            <h4 className="font-semibold text-[#4a90e2] mb-2">CHALLENGE:</h4>
            <p className="text-gray-300 mb-4">{challenge}</p>

            <h4 className="font-semibold text-[#408c5c] mb-2">SOLUTION:</h4>
            <p className="text-gray-300 mb-4">{solution}</p>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <h4 className="font-semibold text-[#e67e22] mb-2 mt-4">OUTCOMES:</h4>
                  <ul className="space-y-2">
                    {outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start space-x-2 text-gray-300">
                        <CheckCircle className="h-5 w-5 text-[#408c5c] shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              className="mt-4 text-[#4a90e2] hover:text-[#4a90e2] hover:bg-[#4a90e2]/10 p-0 h-auto"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show Less" : "Read More"}
              <ArrowRight
                className={`ml-2 h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
              />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

