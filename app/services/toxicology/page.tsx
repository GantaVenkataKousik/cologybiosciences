"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ArrowRight, Shield, AlertTriangle, FileText } from "lucide-react"
import ThreeDNetworkBackground from "@/components/three-d-network-background"
import { Badge } from "@/components/ui/badge"

export default function ToxicologyPage() {
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
          <h1 className="text-4xl font-bold mb-6">Toxicology & Toxicokinetics</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Our toxicology services provide detailed safety assessments to support your drug development process with
            reliable data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-[#1D2A4A] border-none">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4a90e2]">Comprehensive Toxicology Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300">
                  Our toxicology services are designed to provide comprehensive safety assessments for your drug
                  candidates, helping you make informed decisions throughout the development process.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#2A3A5A] p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Acute Toxicity Studies</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Single dose and MTD range finding studies in rat and mice</li>
                      <li>Acute oral toxicity study in rat and mice</li>
                      <li>Acute Inhalation toxicity study in rat and mice</li>
                      <li>Acute dermal irritation study in rabbits</li>
                      <li>Acute ocular irritation study in rabbits</li>
                    </ul>
                  </div>

                  <div className="bg-[#2A3A5A] p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Repeated Dose Toxicity</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>
                        14 day Repeated dose toxicity studies in rat and mice by oral, intraperitoneal and intra
                        tracheal routes
                      </li>
                      <li>28 day/90day Repeated dose toxicity studies in rat and mice by oral route</li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-[#2A3A5A] p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Specialized Toxicity Testing</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Genetic toxicity tests & Immunogenicity tests</li>
                      <li>Toxicokinetic group along with toxicology groups</li>
                      <li>Local toxicity tests (allergy and irritation tests)</li>
                      <li>Inhalational toxicity tests of new drug administration technologies</li>
                    </ul>
                  </div>

                  <div className="bg-[#2A3A5A] p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Study Design & Analysis</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Customized study designs based on regulatory requirements</li>
                      <li>Comprehensive data analysis and interpretation</li>
                      <li>Detailed reporting for regulatory submissions</li>
                      <li>Expert consultation on toxicology findings</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <Badge className="bg-[#408c5c] text-white mb-4">Case Study Highlight</Badge>
                  <Card className="bg-[#2A3A5A] border-none">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Toxicology Assessment of Novel Antibiotics
                      </h4>
                      <p className="text-gray-300 mb-4">
                        We conducted a comprehensive toxicology evaluation of a new class of antibiotics, identifying
                        safety profiles and potential concerns before clinical trials, saving significant development
                        costs.
                      </p>
                      <Link href="/case-studies" className="text-[#4a90e2] hover:underline flex items-center">
                        Read the full case study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1D2A4A] border-none mt-8">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4a90e2]">Our Approach to Toxicology</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-[#2A3A5A] p-6 rounded-lg">
                  <p className="text-gray-300 mb-4">
                    At Cology Biosciences, we understand that toxicology studies are critical for advancing your drug
                    candidates through the development pipeline. Our approach combines scientific rigor with practical
                    considerations to provide you with the data you need to make informed decisions.
                  </p>

                  <h3 className="text-lg font-semibold text-white mb-3">Key Benefits:</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Regulatory-compliant study designs</li>
                    <li>Cost-effective approaches that maintain scientific integrity</li>
                    <li>Experienced team with expertise in multiple species and routes of administration</li>
                    <li>Comprehensive data analysis and interpretation</li>
                    <li>Support for regulatory submissions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-[#1D2A4A] border-none sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl text-[#4a90e2]">Toxicology Expertise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#2A3A5A] p-4 rounded-lg flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-[#4a90e2]" />
                  <div>
                    <h3 className="font-medium text-white">Safety Assessment</h3>
                    <p className="text-sm text-gray-300">Comprehensive toxicity evaluation</p>
                  </div>
                </div>

                <div className="bg-[#2A3A5A] p-4 rounded-lg flex items-center space-x-3">
                  <AlertTriangle className="h-8 w-8 text-[#4a90e2]" />
                  <div>
                    <h3 className="font-medium text-white">Risk Identification</h3>
                    <p className="text-sm text-gray-300">Early detection of safety concerns</p>
                  </div>
                </div>

                <div className="bg-[#2A3A5A] p-4 rounded-lg flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-[#4a90e2]" />
                  <div>
                    <h3 className="font-medium text-white">Regulatory Support</h3>
                    <p className="text-sm text-gray-300">Documentation for submissions</p>
                  </div>
                </div>

                <Badge className="w-full justify-center bg-[#408c5c] hover:bg-[#357a4d] py-2">
                  GLP & Non-GLP Studies Available
                </Badge>

                <Button asChild className="w-full bg-[#4a90e2] hover:bg-[#357abd] mt-4">
                  <Link href="/contact">Request a Consultation</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#408c5c] to-[#4a90e2] text-white text-lg px-10 py-6 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,144,226,0.5)] hover:scale-105"
          >
            <Link href="/contact" className="flex items-center gap-2">
              Discuss Your Toxicology Needs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

