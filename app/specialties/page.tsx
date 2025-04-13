"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

const specialties = [
  {
    title: "Critical Surgeries",
    items: [
      "Jugular, femoral and bile duct cannulation individual as well triple cannulation.",
      "Expertise in animal micro surgeries with utmost accuracy and reliability.",
      "Successfully established various complex surgeries like direct kidney injection, retrograde urethral injection, direct renal artery injections in rat and mice.",
      "High precision and accurate dosing by different routes even intra tracheal repeated dosing.",
      "Olfactory bulbectomy model in rat as a model of depression.",
      "Osmotic pump implantation by surgery.",
      "Effect of verapamil on pharmacokinetics of compound.",
      "Toxicity studies and PK studies for micronized dry powder formulations.",
      "Intranasal and sublingual dosing in rabbits.",
    ],
  },
  {
    title: "Complex matrix/sample collections",
    items: [
      "Blood collection from different routes",
      "CSF collection",
      "Tissue collection and processing",
      "Bile collection",
    ],
  },
  {
    title: "Customized animal models",
    items: ["Depression models", "Anxiety models", "Pain models", "Inflammation models"],
  },
  {
    title: "Product launch oriented pilot studies",
    items: [
      "Bioavailability studies",
      "Drug-drug interaction studies",
      "Method development and validation",
      "Stability studies",
    ],
  },
  {
    title: "Unique techniques with high precision and accuracy",
    items: [
      "Micro-sampling techniques",
      "Advanced surgical procedures",
      "Specialized drug administration methods",
      "Precise analytical techniques",
    ],
  },
]

export default function SpecialtiesPage() {
  const [expandedItem, setExpandedItem] = useState<string | null>("item-0")

  return (
    <div className="container mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">Our Specialties</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive pharmacological research capabilities and specialized services
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Accordion type="single" collapsible value={expandedItem} onValueChange={setExpandedItem} className="space-y-4">
          {specialties.map((specialty, index) => (
            <AccordionItem
              key={`item-${index}`}
              value={`item-${index}`}
              className="specialties-accordion overflow-hidden"
            >
              <AccordionTrigger className="specialties-trigger">{specialty.title}</AccordionTrigger>
              <AccordionContent className="specialties-content">
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  {specialty.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: itemIndex * 0.1,
                      }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  )
}

