"use client"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Microscope, FlaskRoundIcon as Flask, Dna, ShieldAlert, FileText, Beaker, Rat } from "lucide-react"
import { motion } from "framer-motion"
import ScrollReveal from "@/components/scroll-reveal"
import FloatingMolecules from "@/components/floating-molecules"

export default function ServicesSection() {
  const servicesRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={servicesRef} className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 hexagon-pattern opacity-30"></div>
      <FloatingMolecules className="absolute inset-0" count={8} />

      <div className="container px-4 md:px-6 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-[#D8E6E1] px-5 py-1.5 text-sm font-medium text-[#408C5C]">
                Our Laboratory Services
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-[#408C5C] mt-4">
                Advanced Research Solutions
              </h2>
              <p className="mx-auto max-w-[700px] text-[#6B7280] md:text-lg mt-4">
                Comprehensive research models and diagnostic services for real-time drug discovery programs.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[
            {
              icon: <Beaker className="h-8 w-8 text-white" />,
              title: "Pharmacokinetics & ADME",
              description:
                "Drug absorption, distribution, metabolism & excretion studies with sublingual PK, routes of administration, renal injections, and critical surgeries.",
              link: "/services/pharmacokinetics",
              delay: 100,
            },
            {
              icon: <Flask className="h-8 w-8 text-white" />,
              title: "Pharmacology & Inflammation",
              description:
                "Animal models including hepatic models, wound healing models, obesity models, vitiligo models, dry eye syndrome models, and inflammation models including neutrophil migration and pulmonary neutrophilia.",
              link: "/services/pharmacology",
              delay: 200,
            },
            {
              icon: <ShieldAlert className="h-8 w-8 text-white" />,
              title: "Toxicology & Safety",
              description:
                "Acute, subacute and chronic toxicity studies with comprehensive safety assessment protocols.",
              link: "/services/toxicology",
              delay: 300,
            },
            {
              icon: <Microscope className="h-8 w-8 text-white" />,
              title: "Diagnostics",
              description:
                "Complete haematology, biochemistry & histopathology for 12 species with specialized diagnostic tests.",
              link: "/services/diagnostics",
              delay: 400,
            },
            {
              icon: <Dna className="h-8 w-8 text-white" />,
              title: <span className="italic">In-vitro & In-vivo Analysis</span>,
              description: (
                <>
                  <span className="italic">In-vitro</span> & <span className="italic">In-vivo</span> disease models and
                  mechanistic studies for comprehensive research and development.
                </>
              ),
              link: "/services/analysis",
              delay: 500,
            },
            {
              icon: <FileText className="h-8 w-8 text-white" />,
              title: "Custom Study Design",
              description: "Tailored preclinical solutions for drug development with expert consulting services.",
              link: "/services/custom-studies",
              delay: 700,
            },
            {
              icon: <Rat className="h-8 w-8 text-white" />,
              title: "Regulatory & Compliance",
              description: "GLP/non-GLP studies and IND-enabling research with comprehensive regulatory support.",
              link: "/services/regulatory",
              delay: 900,
            },
          ].map((service, index) => (
            <ScrollReveal key={index} delay={service.delay}>
              <motion.div
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
                  scale: 1.03,
                }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm card-3d border-none shadow-lg h-full">
                  <CardContent className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-[#408C5C]">{service.title}</h3>
                    <p className="text-sm sm:text-base text-[#6B7280] mb-4 sm:mb-6 flex-grow">{service.description}</p>
                    <Link
                      href={service.link}
                      className="group inline-flex items-center text-[#408C5C] font-medium transition-all duration-300 hover:translate-x-1"
                    >
                      Explore
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: index * 0.2,
                        }}
                      >
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </motion.span>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={1000}>
          <div className="mt-16 text-center">
            <Button
              asChild
              size="lg"
              className="bg-[#408C5C] hover:bg-[#357a4d] text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(64,140,92,0.3)]"
            >
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

