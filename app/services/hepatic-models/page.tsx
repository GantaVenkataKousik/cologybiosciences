"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, Info } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { LiverModel } from "@/components/liver-model"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function HepaticModelsPage() {
  const [activeModel, setActiveModel] = useState("healthy")

  const models = [
    {
      id: "healthy",
      name: "Healthy Liver",
      description: "Normal liver tissue with healthy hepatocytes, organized sinusoids, and proper vascular structure.",
      features: [
        "Normal liver architecture",
        "Healthy hepatocytes with clear cytoplasm",
        "Well-organized sinusoids",
        "Normal portal triads",
        "No inflammation or fibrosis",
      ],
      applications: [
        "Control group for comparative studies",
        "Baseline for drug metabolism studies",
        "Reference for normal liver function",
      ],
    },
    {
      id: "steatosis",
      name: "Steatosis",
      description: "Early stage of fatty liver disease characterized by accumulation of fat in hepatocytes.",
      features: [
        "Macrovesicular fat accumulation in hepatocytes",
        "Microvesicular steatosis",
        "Mild hepatocyte ballooning",
        "Minimal inflammation",
        "No significant fibrosis",
      ],
      applications: ["Early-stage NAFLD research", "Metabolic syndrome studies", "Dietary intervention research"],
    },
    {
      id: "nash",
      name: "NASH",
      description: "Non-alcoholic steatohepatitis with inflammation, hepatocyte injury, and early fibrosis.",
      features: [
        "Steatosis with hepatocyte ballooning",
        "Lobular inflammation",
        "Mallory-Denk bodies",
        "Early perisinusoidal fibrosis",
        "Elevated liver enzymes",
      ],
      applications: ["NASH therapeutic development", "Inflammatory pathway research", "Fibrosis progression studies"],
    },
    {
      id: "fibrosis",
      name: "Fibrosis",
      description: "Progressive scarring of liver tissue with collagen deposition and altered architecture.",
      features: [
        "Bridging fibrosis",
        "Periportal and perisinusoidal collagen deposition",
        "Distorted liver architecture",
        "Activated hepatic stellate cells",
        "Reduced liver function",
      ],
      applications: [
        "Anti-fibrotic drug development",
        "Stellate cell activation research",
        "Extracellular matrix remodeling studies",
      ],
    },
    {
      id: "cirrhosis",
      name: "Cirrhosis",
      description: "End-stage liver disease with extensive fibrosis, nodule formation, and impaired function.",
      features: [
        "Nodular regeneration",
        "Complete architectural distortion",
        "Extensive fibrotic septa",
        "Portal hypertension",
        "Severely compromised liver function",
      ],
      applications: [
        "End-stage liver disease research",
        "Hepatocellular carcinoma studies",
        "Liver regeneration research",
        "Transplantation studies",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#1B2238] text-white pt-24">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">Hepatic Models in Rat</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our comprehensive range of rat hepatic models allows researchers to study the full spectrum of liver disease
            progression, from healthy liver to cirrhosis.
          </p>
        </motion.div>

        <div className="mb-16">
          <div className="bg-[#1D2A4A] rounded-lg overflow-hidden shadow-lg p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-[#4a90e2]">Liver Disease Progression Models</h2>
            <div className="relative">
              <div className="w-full overflow-x-auto pb-4">
                <div className="min-w-[900px] w-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-y9818eNf5jIulRV6rGp7Xwc3Ni88jw.png"
                    alt="Liver disease progression from healthy liver to cirrhosis"
                    width={1200}
                    height={400}
                    className="rounded-lg mx-auto"
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-2 text-center text-sm">
                {["Healthy liver", "Steatosis", "NASH", "Fibrosis", "Cirrhosis"].map((stage, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center gap-1 cursor-help">
                          <span className="font-medium">{stage}</span>
                          <Info className="h-3.5 w-3.5 text-gray-400" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{models[index].description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
            <p className="text-gray-300 mt-6 text-center">
              Visual representation of the progression of liver disease in our rat models, from healthy liver to
              end-stage cirrhosis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="bg-[#1D2A4A] border-none shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="h-[500px] relative">
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  <LiverModel variant={activeModel as any} />
                  <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1} />
                </Canvas>
                <div className="absolute bottom-4 left-4 bg-[#1B2238]/80 px-4 py-2 rounded-md">
                  <p className="text-lg font-semibold">{models.find((m) => m.id === activeModel)?.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <Tabs value={activeModel} onValueChange={setActiveModel} className="w-full">
              <TabsList className="grid grid-cols-5 gap-2 bg-transparent mb-8">
                {models.map((model) => (
                  <TabsTrigger
                    key={model.id}
                    value={model.id}
                    className="data-[state=active]:bg-[#4a90e2] data-[state=active]:text-white"
                  >
                    {model.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {models.map((model) => (
                <TabsContent key={model.id} value={model.id} className="space-y-6">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <h2 className="text-3xl font-bold text-[#4a90e2] mb-4">{model.name}</h2>
                    <p className="text-lg text-gray-300 mb-6">{model.description}</p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                          {model.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Research Applications</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                          {model.applications.map((app, index) => (
                            <li key={index}>{app}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-8">
              <Button className="w-full bg-[#4a90e2] hover:bg-[#357abd] text-white" asChild>
                <Link href="/contact">Request Detailed Information</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-[#1D2A4A] rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Customization Options</h2>
          <p className="text-lg text-gray-300 mb-6">
            Our hepatic models can be customized to meet your specific research needs. We offer various induction
            methods, time points, and additional analyses to support your research objectives.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-[#2A3A5A] border-none">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Induction Methods</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>High-fat diet</li>
                  <li>Methionine-choline deficient diet</li>
                  <li>Carbon tetrachloride (CCl₄)</li>
                  <li>Thioacetamide (TAA)</li>
                  <li>Bile duct ligation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#2A3A5A] border-none">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Analysis Options</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Histopathology</li>
                  <li>Immunohistochemistry</li>
                  <li>Gene expression analysis</li>
                  <li>Protein expression analysis</li>
                  <li>Serum biomarker analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#2A3A5A] border-none">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Study Durations</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Acute (1-7 days)</li>
                  <li>Subacute (2-4 weeks)</li>
                  <li>Chronic (8-16 weeks)</li>
                  <li>Long-term (>16 weeks)</li>
                  <li>Custom time points</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-[#4a90e2] hover:bg-[#357abd] text-white text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(74,144,226,0.5)]"
            >
              <Link href="/contact">Contact Our Research Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

