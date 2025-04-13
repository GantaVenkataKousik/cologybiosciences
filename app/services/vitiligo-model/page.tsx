"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ArrowRight } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { VitiligoModel } from "@/components/vitiligo-model"

export default function VitiligoModelPage() {
  const [activeStage, setActiveStage] = useState("moderate")
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  const stages = [
    {
      id: "early",
      name: "Early Stage",
      description: "Initial stage of vitiligo with small, localized patches of depigmentation.",
      features: [
        "Small, isolated patches of depigmentation",
        "Limited to specific areas",
        "Minimal immune cell infiltration",
        "Early melanocyte loss",
        "Responsive to early intervention",
      ],
      applications: [
        "Early intervention studies",
        "Prevention research",
        "Initial immune response analysis",
        "Biomarker identification",
      ],
    },
    {
      id: "moderate",
      name: "Moderate Stage",
      description: "Intermediate stage with expanding areas of depigmentation and increased immune activity.",
      features: [
        "Expanding patches of depigmentation",
        "Multiple affected areas",
        "Moderate immune cell infiltration",
        "Significant melanocyte destruction",
        "Variable response to treatment",
      ],
      applications: [
        "Treatment efficacy studies",
        "Immune modulation research",
        "Repigmentation mechanism studies",
        "Comparative treatment trials",
      ],
    },
    {
      id: "advanced",
      name: "Advanced Stage",
      description: "Extensive depigmentation with widespread loss of melanocytes and chronic immune activation.",
      features: [
        "Extensive depigmentation",
        "Widespread affected areas",
        "Significant immune cell infiltration",
        "Near-complete melanocyte loss in affected areas",
        "Resistant to conventional treatments",
      ],
      applications: [
        "Advanced treatment strategies",
        "Chronic disease management",
        "Novel therapeutic approaches",
        "Long-term outcome studies",
      ],
    },
  ]

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const heroSection = document.getElementById("hero-section")
      if (heroSection) {
        heroSection.style.transform = `translateY(${scrollPosition * 0.3}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#1B2238] text-white">
      {/* Hero Section with Parallax */}
      <div className="relative h-[50vh] overflow-hidden">
        <div id="hero-section" className="absolute inset-0 bg-[#2A3A5A] flex items-center justify-center">
          <motion.div className="text-center z-10 px-4" style={{ opacity, y }}>
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Vitiligo in C57BL/6 Mouse Model
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Advanced research model for studying depigmentation disorders
            </motion.p>
          </motion.div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1B2238] pointer-events-none"></div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <Button
            asChild
            variant="outline"
            className="border-[#4a90e2] text-[#4a90e2] hover:bg-[#4a90e2] hover:text-white"
          >
            <Link href="/services" className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Services
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="bg-[#1D2A4A] border-none shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="h-[500px] relative">
                <Canvas>
                  <ambientLight intensity={0.7} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  <Environment preset="city" />
                  <VitiligoModel stage={activeStage as any} />
                  <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1} />
                </Canvas>
                <div className="absolute bottom-4 left-4 bg-[#1B2238]/80 px-4 py-2 rounded-md">
                  <p className="text-lg font-semibold">{stages.find((s) => s.id === activeStage)?.name}</p>
                </div>

                <motion.div
                  className="absolute top-4 right-4 bg-[#4a90e2] text-white px-3 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  Interactive Model
                </motion.div>
              </div>
            </CardContent>
          </Card>

          <div>
            <Tabs value={activeStage} onValueChange={setActiveStage} className="w-full">
              <TabsList className="grid grid-cols-3 gap-2 bg-transparent mb-8">
                {stages.map((stage) => (
                  <TabsTrigger
                    key={stage.id}
                    value={stage.id}
                    className="data-[state=active]:bg-[#4a90e2] data-[state=active]:text-white"
                  >
                    {stage.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {stages.map((stage) => (
                <TabsContent key={stage.id} value={stage.id} className="space-y-6">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <h2 className="text-3xl font-bold text-[#4a90e2] mb-4">{stage.name}</h2>
                    <p className="text-lg text-gray-300 mb-6">{stage.description}</p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                          {stage.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.3 }}
                            >
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Research Applications</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                          {stage.applications.map((app, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index + 0.5, duration: 0.3 }}
                            >
                              {app}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-8">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Button className="w-full bg-[#4a90e2] hover:bg-[#357abd] text-white group" asChild>
                  <Link href="/contact" className="flex items-center justify-center">
                    <span>Request Detailed Information</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-[#1D2A4A] rounded-lg p-8 shadow-lg mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Model Development</h2>
          <p className="text-lg text-gray-300 mb-6">
            Our Vitiligo in C57BL/6 mouse model is developed using a combination of genetic and environmental factors to
            induce depigmentation that closely resembles human vitiligo. The model exhibits progressive loss of
            melanocytes and autoimmune responses similar to those observed in human patients.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-[#2A3A5A] border-none h-full">
              <CardHeader>
                <CardTitle className="text-xl text-[#4a90e2]">Induction Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Genetic modification</li>
                  <li>Chemical induction</li>
                  <li>Autoimmune stimulation</li>
                  <li>Stress-induced models</li>
                  <li>Combination approaches</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#2A3A5A] border-none h-full">
              <CardHeader>
                <CardTitle className="text-xl text-[#4a90e2]">Analysis Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Quantitative depigmentation assessment</li>
                  <li>Immunohistochemistry</li>
                  <li>Flow cytometry</li>
                  <li>Gene expression analysis</li>
                  <li>Melanocyte quantification</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#2A3A5A] border-none h-full">
              <CardHeader>
                <CardTitle className="text-xl text-[#4a90e2]">Study Applications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Pathogenesis research</li>
                  <li>Treatment efficacy testing</li>
                  <li>Immune modulation studies</li>
                  <li>Repigmentation mechanisms</li>
                  <li>Biomarker discovery</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-[#1D2A4A] rounded-lg p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6">Research Applications</h2>
          <p className="text-lg text-gray-300 mb-6">
            The Vitiligo in C57BL/6 mouse model is an invaluable tool for researchers studying the pathogenesis,
            progression, and treatment of vitiligo and other depigmentation disorders.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
              <Card className="bg-[#2A3A5A] border-none h-full hover:shadow-[0_10px_30px_-5px_rgba(74,144,226,0.3)] transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-[#4a90e2]">Therapeutic Development</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Our vitiligo model provides an excellent platform for testing novel therapeutic approaches,
                    including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>Topical treatments</li>
                    <li>Systemic medications</li>
                    <li>Immunomodulatory therapies</li>
                    <li>Phototherapy approaches</li>
                    <li>Combination treatments</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
              <Card className="bg-[#2A3A5A] border-none h-full hover:shadow-[0_10px_30px_-5px_rgba(74,144,226,0.3)] transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-[#4a90e2]">Pathogenesis Research</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">Investigate the underlying mechanisms of vitiligo development:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>Autoimmune processes</li>
                    <li>Genetic factors</li>
                    <li>Environmental triggers</li>
                    <li>Melanocyte biology</li>
                    <li>Stress-related mechanisms</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="text-center mt-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-[#4a90e2] hover:bg-[#357abd] text-white text-lg px-8 py-6 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,144,226,0.5)]"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Contact Our Research Team
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

