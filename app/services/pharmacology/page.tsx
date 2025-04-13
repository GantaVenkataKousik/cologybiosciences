"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ArrowRight } from "lucide-react"
import ThreeDNetworkBackground from "@/components/three-d-network-background"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function PharmacologyPage() {
  const [activeTab, setActiveTab] = useState("inflammation")

  return (
    <div className="min-h-screen bg-[#1B2238] text-white">
      <div className="absolute inset-0 z-0">
        <ThreeDNetworkBackground className="opacity-50" />
      </div>

      <div className="container mx-auto py-20 px-4 relative z-10">
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
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-6">Pharmacology & Disease Models</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Our pharmacology services include a wide range of animal models to support your research needs, from
            inflammation models to specialized disease models.
          </p>
        </motion.div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-transparent mb-8">
            <TabsTrigger
              value="inflammation"
              className="data-[state=active]:bg-[#4a90e2] data-[state=active]:text-white"
            >
              Inflammation
            </TabsTrigger>
            <TabsTrigger
              value="respiratory"
              className="data-[state=active]:bg-[#4a90e2] data-[state=active]:text-white"
            >
              Respiratory
            </TabsTrigger>
            <TabsTrigger value="diabetes" className="data-[state=active]:bg-[#4a90e2] data-[state=active]:text-white">
              Diabetes
            </TabsTrigger>
            <TabsTrigger value="nash" className="data-[state=active]:bg-[#4a90e2] data-[state=active]:text-white">
              NASH
            </TabsTrigger>
            <TabsTrigger
              value="dermatology"
              className="data-[state=active]:bg-[#4a90e2] data-[state=active]:text-white"
            >
              Dermatology
            </TabsTrigger>
            <TabsTrigger value="other" className="data-[state=active]:bg-[#4a90e2] data-[state=active]:text-white">
              Other Models
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inflammation" className="space-y-8">
            <Card className="bg-[#1D2A4A] border-none">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4a90e2]">Inflammation Models</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#2A3A5A] p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">LPS-Induced Models</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>LPS induced neutrophil migration in rat air pouch model</li>
                      <li>LPS induced pulmonary neutrophilia in mice/rat model</li>
                      <li>LPS induced TNF-alpha in mouse/rat model</li>
                      <li>Endotoxin induced Uveitis in rat model</li>
                    </ul>
                  </div>

                  <div className="bg-[#2A3A5A] p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Arthritis Models</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Collagen induced arthritis in rat model</li>
                      <li>Adjuvant induced arthritis in rat model</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <Badge className="bg-[#408c5c] text-white mb-4">Case Study Highlight</Badge>
                  <Card className="bg-[#2A3A5A] border-none">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Novel Anti-Inflammatory Compound Efficacy Study
                      </h4>
                      <p className="text-gray-300 mb-4">
                        We evaluated a novel anti-inflammatory compound in multiple disease models, demonstrating
                        significant reduction in inflammatory markers and potential therapeutic applications.
                      </p>
                      <Link href="/case-studies" className="text-[#4a90e2] hover:underline flex items-center">
                        Read the full case study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="respiratory" className="space-y-8">
            <Card className="bg-[#1D2A4A] border-none">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4a90e2]">Respiratory Models</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-[#2A3A5A] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">COPD & Fibrosis Models</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Acute/chronic Cigarette smoke induced COPD in mice model</li>
                    <li>Acute/Chronic Cigarette smoke extract induced COPD in mice model</li>
                    <li>Bleomycin induced pulmonary fibrosis in rat model</li>
                    <li>
                      Single dose LPS induced acute respiratory distress syndrome in mice to screen drugs for lower
                      respiratory tract infections
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diabetes" className="space-y-8">
            <Card className="bg-[#1D2A4A] border-none">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4a90e2]">Diabetes Models</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-[#2A3A5A] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Insulin Resistance & Metabolic Models</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Streptozotocin –Nicotinamide induced insulin resistance model</li>
                    <li>High fat diet induced non alcoholic steatohepatitis in mice model</li>
                    <li>High fat diet and Streptozotocin induced insulin resistance model</li>
                    <li>Oral glucose tolerance test in mice</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <Badge className="bg-[#408c5c] text-white mb-4">Case Study Highlight</Badge>
                  <Card className="bg-[#2A3A5A] border-none">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Diabetes Model for Incretin-Based Therapies
                      </h4>
                      <p className="text-gray-300 mb-4">
                        We developed specialized diabetes models for evaluating incretin-based therapies, providing
                        pharmaceutical companies with reliable preclinical data for drug development decisions.
                      </p>
                      <Link href="/case-studies" className="text-[#4a90e2] hover:underline flex items-center">
                        Read the full case study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nash" className="space-y-8">
            <Card className="bg-[#1D2A4A] border-none">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4a90e2]">Non-Alcoholic Steatohepatitis (NASH) Models</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-[#2A3A5A] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">NASH Models</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Methionine and choline deficient diet induced NASH in mice</li>
                    <li>High fat diet induced NASH in mice</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <Badge className="bg-[#408c5c] text-white mb-4">Case Study Highlight</Badge>
                  <Card className="bg-[#2A3A5A] border-none">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Hepatic Model Validation for NASH Drug Development
                      </h4>
                      <p className="text-gray-300 mb-4">
                        We conducted comprehensive validation of our proprietary NASH hepatic model, providing critical
                        insights for pharmaceutical companies developing treatments for non-alcoholic steatohepatitis.
                      </p>
                      <Link href="/case-studies" className="text-[#4a90e2] hover:underline flex items-center">
                        Read the full case study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dermatology" className="space-y-8">
            <Card className="bg-[#1D2A4A] border-none">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4a90e2]">Dermatology Models</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-[#2A3A5A] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Skin Disease Models</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Chemical induced vitiligo disease in mouse model</li>
                    <li>Oxazolone induced dermatitis mouse model</li>
                    <li>Imiquimod induced psoriasis mouse model</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <Badge className="bg-[#408c5c] text-white mb-4">Case Study Highlight</Badge>
                  <Card className="bg-[#2A3A5A] border-none">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-white mb-2">Vitiligo Mouse Model Development</h4>
                      <p className="text-gray-300 mb-4">
                        We developed a mouse model for vitiligo that is more human-relevant, less mortal, and
                        cost-effective, enabling the client to secure 6+ patents in the vitiligo treatment space.
                      </p>
                      <Link href="/case-studies" className="text-[#4a90e2] hover:underline flex items-center">
                        Read the full case study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other" className="space-y-8">
            <Card className="bg-[#1D2A4A] border-none">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4a90e2]">Additional Disease Models</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#2A3A5A] p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Xenografts Models</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Syngeneic mouse models for EL4 lymphoma cell lines in mice</li>
                      <li>Mouse 4T1 breast tumor model in mice</li>
                    </ul>
                  </div>

                  <div className="bg-[#2A3A5A] p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Renal Models</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Renoprotective effect of compound or extracts in chemical induced nephrotoxicity</li>
                      <li>
                        Effect of small molecules in Unilateral Ureteral Obstruction surgery induced renal fibrosis
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#2A3A5A] p-6 rounded-lg mt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Sexual Disorder Models</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Cavernosal nerve injury model by surgery in rats to induce Erectile dysfunction</li>
                    <li>
                      Models of erectile dysfunction based on specific predisposing conditions like diabetes,
                      Hypercholesteremia, arteriogenic ED
                    </li>
                    <li>Aphrodisiac screening methods in rodents like mounting behavior and mating performance</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <Badge className="bg-[#408c5c] text-white mb-4">Case Study Highlight</Badge>
                  <Card className="bg-[#2A3A5A] border-none">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Targeted Drug Delivery for Mice Renal Cells
                      </h4>
                      <p className="text-gray-300 mb-4">
                        We developed multiple advanced mouse surgical techniques for targeted renal delivery, enabling
                        the client to explore new avenues in renal-targeted drug therapies.
                      </p>
                      <Link href="/case-studies" className="text-[#4a90e2] hover:underline flex items-center">
                        Read the full case study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#408c5c] to-[#4a90e2] text-white text-lg px-10 py-6 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,144,226,0.5)] hover:scale-105"
          >
            <Link href="/contact" className="flex items-center gap-2">
              Discuss Your Research Needs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

