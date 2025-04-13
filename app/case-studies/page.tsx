"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ArrowRight, CheckCircle, Beaker, FileText, Award, Target, Microscope } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ThreeDNetworkBackground from "@/components/three-d-network-background"

// Case studies data
const caseStudies = [
  {
    id: 1,
    category: "Wound Healing",
    challenge:
      "To select the best, simplest, and most cost-effective model for wound healing while ensuring comprehensive data for product launch within a single short-term experiment.",
    solution:
      "Cology Biosciences customized an optimized wound healing study design to maximize data collection in a single short-term experiment.",
    outcomes: [
      "Identified and implemented a simple, reproducible, and cost-efficient wound healing model.",
      "Designed a study to capture key efficacy, safety, and histological endpoints in one experiment.",
      "Ensured data relevance for regulatory submission and product launch strategy.",
      "Delivered a detailed report with statistically validated conclusions to support decision-making.",
    ],
    icon: <Microscope className="h-10 w-10" />,
    color: "bg-[#408c5c]",
  },
  {
    id: 2,
    category: "Vitiligo Model",
    challenge:
      "To develop a mouse model for vitiligo that is more human-relevant, less mortal, cost-effective, and capable of accelerating drug screening and IP generation.",
    solution:
      "Cology Biosciences customized an innovative vitiligo mouse model with superior translational relevance and reduced mortality.",
    outcomes: [
      "Developed a more effective disease model with a shorter study duration than existing models.",
      "Enabled screening of 6+ drug candidates at their dosage form level.",
      "Facilitated the client in securing 6+ patents in the vitiligo treatment space.",
      "Provided a robust, affordable model that enhanced drug discovery and clinical translation.",
    ],
    icon: <Target className="h-10 w-10" />,
    color: "bg-[#4a90e2]",
  },
  {
    id: 3,
    category: "Pharmacokinetics",
    challenge:
      "To conduct pharmacokinetic (PK) studies for finished dosage forms—sublingual films, sublingual tablets, nasal sprays, and eye drops—to support clients' 505(b)(2) applications, patent filings, and clinical trial entry.",
    solution: "Cology Biosciences successfully designed and executed PK studies tailored to each dosage form.",
    outcomes: [
      "Developed customized PK protocols to assess absorption, bioavailability, and systemic exposure.",
      "Provided rapid and precise data analysis to meet regulatory expectations.",
      "Enabled clients to achieve key milestones, including patent filings and advancing select candidates into clinical trials.",
      "Ensured cost-effective and regulatory-compliant study designs to accelerate drug development.",
    ],
    icon: <Beaker className="h-10 w-10" />,
    color: "bg-[#8e44ad]",
  },
  {
    id: 4,
    category: "Dry Eye Syndrome",
    challenge:
      "To develop and optimize a nasal spray for inducing natural tears in dry eye syndrome, enabling the client to identify a lead formulation with robust data.",
    solution:
      "Cology Biosciences designed a customized study to screen and quantify the efficacy of nasal spray formulations.",
    outcomes: [
      "Screened 5+ drug formulations to evaluate their tear-inducing potential.",
      "Successfully quantified tear volume using two or more measurement techniques for precise assessment.",
      "Enabled the client to rapidly identify a lead formulation with strong preclinical validation.",
      "Provided robust, data-driven insights to support further development and regulatory submissions.",
    ],
    icon: <FileText className="h-10 w-10" />,
    color: "bg-[#e74c3c]",
  },
  {
    id: 5,
    category: "Hepatotoxicity Model",
    challenge:
      "To evaluate the hepatoprotective potential of stem cell therapy by developing a human-relevant hepatotoxicity model and providing comprehensive preclinical data for regulatory and scientific validation.",
    solution:
      "Cology Biosciences designed a fully customized hepatotoxicity animal model aligned with human intended use.",
    outcomes: [
      "Developed a clinically relevant liver injury model tailored to the client's therapy.",
      "Conducted end-to-end analysis, including serum biomarkers, extensive histopathology, and mechanistic insights.",
      "Provided a single-study design that addressed major research questions, streamlining drug development.",
      "Generated robust data that was reviewed by top liver science pioneers and selected for presentation at The Liver Meeting.",
      "Enabled the client to secure a publication, patent, and poster presentation, positioning the therapy for clinical trials.",
    ],
    icon: <Award className="h-10 w-10" />,
    color: "bg-[#f39c12]",
  },
  {
    id: 6,
    category: "Metabolic Disorders",
    challenge:
      "To evaluate the lipid-lowering potential of a test item and generate meaningful preclinical data for further development.",
    solution:
      "Cology Biosciences designed a highly strategic and insightful study that uncovered unexpected therapeutic potential.",
    outcomes: [
      "Developed a well-structured study design targeting obesity and fatty liver.",
      "Conducted comprehensive clinical and postmortem analyses, identifying additional benefits beyond lipid reduction.",
      "Discovered that the test item had the potential to become the first vaccine for obesity and fatty liver.",
      "Provided robust scientific data that transformed the product's positioning and paved the way for breakthrough innovation in metabolic disorders.",
    ],
    icon: <Beaker className="h-10 w-10" />,
    color: "bg-[#2ecc71]",
  },
  {
    id: 7,
    category: "Renal Drug Delivery",
    challenge:
      "To develop a targeted drug delivery approach for mice renal cells, requiring precise and complex surgical techniques to optimize efficacy.",
    solution:
      "Cology Biosciences successfully established and optimized multiple advanced mouse surgical techniques for targeted renal delivery.",
    outcomes: [
      "Developed renal artery injection, retrourethral injection, and direct kidney injection methodologies.",
      "Overcame surgical and drug distribution challenges to ensure efficient renal targeting.",
      "Provided continuous R&D support to refine the lead formulation for enhanced renal uptake.",
      "Enabled the client to explore new avenues in renal-targeted drug therapies, paving the way for breakthrough treatments.",
    ],
    icon: <Target className="h-10 w-10" />,
    color: "bg-[#3498db]",
  },
  {
    id: 8,
    category: "Microbiome Analysis",
    challenge:
      "To evaluate the gut microbiota-modulating potential of a test item through a long-term preclinical study with comprehensive microbiome analysis.",
    solution: "Cology Biosciences designed and executed a 14-week study with meticulous data collection and analysis.",
    outcomes: [
      "Conducted short-chain fatty acid (SCFA) analysis to assess microbial metabolic activity.",
      "Performed metagenomics of fecal matter at multiple time points, providing a dynamic view of microbiome shifts.",
      "Ensured a hassle-free, well-structured study that maintained high scientific rigor.",
      "Delivered highly robust, publication-ready data, transforming a simple client idea into an in-depth scientific discovery.",
    ],
    icon: <Microscope className="h-10 w-10" />,
    color: "bg-[#9b59b6]",
  },
  {
    id: 9,
    category: "Infectious Disease",
    challenge:
      "To develop a cost-effective in vivo mouse model for dengue virus that allows screening of potential drug candidates despite budget constraints.",
    solution:
      "Cology Biosciences successfully established a dengue virus model in normal mice, enabling efficient drug screening.",
    outcomes: [
      "Designed a budget-friendly yet scientifically robust in vivo model.",
      "Screened 5+ drug candidates, assessing their antiviral efficacy.",
      "Identified one lead compound that significantly reduced fever, decreased viral load, and increased platelet count.",
      "Validated findings using immunohistochemistry, ensuring mechanistic insights and translational value.",
    ],
    icon: <FileText className="h-10 w-10" />,
    color: "bg-[#e67e22]",
  },
]

export default function CaseStudiesPage() {
  const [expandedCase, setExpandedCase] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>("All")

  const categories = ["All", ...Array.from(new Set(caseStudies.map((study) => study.category)))]

  const filteredCaseStudies =
    activeFilter === "All" ? caseStudies : caseStudies.filter((study) => study.category === activeFilter)

  const toggleExpand = (id: number) => {
    setExpandedCase(expandedCase === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-[#1B2238] text-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <ThreeDNetworkBackground />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-8 text-center"
          >
            <div className="inline-block rounded-lg bg-[#408c5c] px-4 py-2 text-sm font-medium text-white">
              CASE STUDIES
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
              Client Success Stories
            </h1>
            <p className="max-w-[700px] text-lg text-gray-300 md:text-xl">
              Discover how our innovative research solutions have helped clients overcome challenges and achieve
              breakthrough results
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-[#1D2A4A]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={activeFilter === category ? "default" : "outline"}
                className={`${
                  activeFilter === category
                    ? "bg-[#408c5c] hover:bg-[#357a4d]"
                    : "text-black border-white/20 hover:bg-[#408c5c]/10"
                } whitespace-nowrap`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 md:py-24 bg-[#1B2238]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCaseStudies.map((study) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: study.id * 0.1 }}
                className="relative"
              >
                <Card className="bg-[#1D2A4A] border-none h-full overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`${study.color} p-4 flex items-center justify-between`}>
                      <div className="flex items-center space-x-3">
                        <div className="bg-white/20 p-2 rounded-full">{study.icon}</div>
                        <div>
                          <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                            Case Study {study.id}
                          </Badge>
                          <h3 className="text-xl font-bold text-white mt-1">{study.category}</h3>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10 rounded-full"
                        onClick={() => toggleExpand(study.id)}
                      >
                        <ChevronDown
                          className={`h-6 w-6 transition-transform duration-300 ${
                            expandedCase === study.id ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </div>

                    <div className="p-6">
                      <h4 className="font-semibold text-[#4a90e2] mb-2">CHALLENGE:</h4>
                      <p className="text-gray-300 mb-4">{study.challenge}</p>

                      <h4 className="font-semibold text-[#408c5c] mb-2">SOLUTION:</h4>
                      <p className="text-gray-300 mb-4">{study.solution}</p>

                      <AnimatePresence>
                        {expandedCase === study.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <h4 className="font-semibold text-[#e67e22] mb-2 mt-4">OUTCOMES:</h4>
                            <ul className="space-y-2">
                              {study.outcomes.map((outcome, index) => (
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
                        onClick={() => toggleExpand(study.id)}
                      >
                        {expandedCase === study.id ? "Show Less" : "Read More"}
                        <ArrowRight
                          className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                            expandedCase === study.id ? "rotate-90" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#408c5c]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Ready to Discuss Your Research Needs?</h2>
              <p className="text-white/90 max-w-2xl">
                Our team of experts is ready to help you design and implement customized research solutions for your
                specific challenges.
              </p>
            </div>
            <Button size="lg" className="bg-white text-[#408c5c] hover:bg-white/90" asChild>
              <Link href="/contact">
                Contact Our Research Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

