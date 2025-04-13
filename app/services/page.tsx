"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Beaker, FlaskRoundIcon as Flask, Microscope, FileText, Pill } from "lucide-react"
import Image from "next/image"
import ThreeDNetworkBackground from "@/components/three-d-network-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("pharmacokinetics")

  // Prevent scroll restoration on page load
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual"
      }
      window.scrollTo(0, 0)
    }
    return () => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto"
      }
    }
  }, [])

  // Add this effect to handle URL parameters on page load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      const tab = url.searchParams.get("tab")
      const category = url.searchParams.get("category")

      // Set active tab based on either tab or category parameter
      if (tab) {
        setActiveTab(tab)
      } else if (category) {
        setActiveTab(category)
      }
    }
  }, [])

  const renderTabContent = () => {
    switch (activeTab) {
      case "pharmacokinetics":
        return (
          <div className="bg-[#1D2A4A] rounded-lg p-6 w-full">
            <h2 className="text-2xl text-[#4a90e2] font-bold mb-2">Pharmacokinetics & ADME</h2>
            <p className="text-gray-300 mb-6">Drug absorption, distribution, metabolism & excretion studies</p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Beaker className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>In vivo PK research</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Bioavailability</li>
                    <li>Tissue distribution</li>
                    <li>PK/PD research</li>
                    <li>Dose escalation studies</li>
                    <li>Dose accumulation studies</li>
                    <li>Dose optimisation studies</li>
                    <li>PK on surgically cannulated rodents (Jugular, femoral and bile duct cannulation)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Flask className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Administration routes (even for repeated dosing)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="bg-[#2A3A5A] rounded-lg overflow-hidden">
                      <h4 className="text-white font-medium p-3 bg-[#1D2A4A]">Different routes of administration</h4>
                      <div className="p-4">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            Intravenous injection
                            <div className="relative h-40 w-full mt-2 rounded-md overflow-hidden">
                              <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nZbHfJ47ASCioDjUpZf8BjluejDyqM.png"
                                alt="Intravenous injection"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </li>
                          <li>
                            Slow infusion injection for 2-3minutes
                            <div className="relative h-40 w-full mt-2 rounded-md overflow-hidden">
                              <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-26%20210358-g6gftizL5oxTxhzX0I6G16C7FS4dGj.png"
                                alt="Slow infusion injection"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </li>
                          <li>
                            Intramuscular
                            <div className="relative h-40 w-full mt-2 rounded-md overflow-hidden">
                              <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-26%20210407-DDvKhYjsXEFgdPQdoaa9B0kCjTi5cs.png"
                                alt="Intramuscular"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </li>
                          <li>
                           Intraperitoneal
                            <div className="relative h-40 w-full mt-2 rounded-md overflow-hidden">
                              <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-26%20210400-Lec2CSErAUvF6bqhackEwNZc7N4uVX.png"
                                alt="Intraperitoneal"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </li>
                          <li>
                            Oral Dosing
                            <div className="relative h-40 w-full mt-2 rounded-md overflow-hidden">
                              <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-26%20210403-DEFMBuTTHFmFyi0SmFW4af3X2XJfb1.png"
                                alt="Intramuscular injection"
                                fill
                                className="Oral Dosing"
                              />
                            </div>
                          </li>
                          <li>
                            Subretinal injection
                            <div className="relative h-40 w-full mt-2 rounded-md overflow-hidden">
                              <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-26%20210409-OS25dhCDuW80tq3C0euwpNMTPXOOKg.png"
                                alt="Subretinal injection"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </li>
                          <li>Per oral</li>
                          <li>Intravenous</li>
                          <li>Intramuscular</li>
                          <li>Subcutaneous</li>
                          <li>Subretinal, intra cranial</li>
                          <li>Intranasal</li>
                          <li>Intratracheal (Repeated 7d/14d/28days dosing of micronized dry powder formulations)</li>
                          <li>Intraperitoneal</li>
                          <li>Opthalmic</li>
                          <li>Topical</li>
                          <li>Surgically incorporated osmotic pumps</li>
                          <li>Slow infusion injection for 2-3 minutes</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-[#2A3A5A] rounded-lg overflow-hidden">
                      <h4 className="text-white font-medium p-3 bg-[#1D2A4A]">Sublingual and oral administration</h4>
                      <div className="p-4">
                        <p className="mb-3">Specialized administration techniques for PK studies:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Sublingual tablet dosing</li>
                          <li>Sublingual film dosing</li>
                          <li>Oral dosing techniques</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Pill className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Sublingual and Oral PK Studies</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="bg-[#2A3A5A] rounded-lg overflow-hidden">
                      <h4 className="text-white font-medium p-3 bg-[#1D2A4A]">Sublingual and Oral PK in Rabbits</h4>
                      <div className="p-4">
                        <div className="grid grid-cols-1 gap-4 mb-4">
                          <div className="bg-[#1D2A4A]/50 p-3 rounded-lg">
                            <p className="text-sm mb-2">Specialized administration techniques:</p>
                            <ul className="list-disc pl-5 space-y-6">
                              <li>
                                Oral dosing
                                <div className="relative h-40 w-full mt-2 rounded-md overflow-hidden">
                                  <Image
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-26%20204832-3kuB4nFeHqEzpAsgEsFkFXSSmNrTvg.png"
                                    alt="Oral dosing in rabbits"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </li>
                              <li>
                                Sublingual dosing
                                <div className="relative h-40 w-full mt-2 rounded-md overflow-hidden">
                                  <Image
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-26%20204838-BXnreOFuZ2LIVxYCLzRSYcbyLuA5kX.png"
                                    alt="Sublingual dosing in rabbits"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </li>
                              <li>
                                Sublingual tablet dosing
                                <div className="relative h-40 w-full mt-2 rounded-md overflow-hidden">
                                  <Image
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-26%20204844-vgt74KYA1r5z3ggLh6d34SWwsfbDaA.png"
                                    alt="Sublingual tablet dosing in rabbits"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </li>
                              <li>
                                Sublingual film dosing
                                <div className="relative h-40 w-full mt-2 rounded-md overflow-hidden">
                                  <Image
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-26%20204850-EW0NEjMeKCEehJ76MQulKcf15FSr4n.png"
                                    alt="Sublingual film dosing in rabbits"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </li>
                              <li>Comparative bioavailability studies</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#2A3A5A] rounded-lg overflow-hidden">
                      <h4 className="text-white font-medium p-3 bg-[#1D2A4A]">Sublingual Dosage Forms</h4>
                      <div className="p-4">
                        <div className="grid grid-cols-1 gap-4 mb-4">
                          <div className="bg-[#1D2A4A]/50 p-3 rounded-lg">
                            <p className="text-sm mb-2">Specialized formulation testing:</p>
                            <ul className="list-disc pl-5 space-y-2">
                              <li>Sublingual tablet dosing</li>
                              <li>Sublingual film dosing</li>
                              <li>Dissolution profile correlation</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#2A3A5A] p-4 rounded-lg mt-4">
                    <h4 className="text-white font-medium mb-3">Advantages of Our Sublingual PK Studies</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Precise administration techniques for consistent dosing</li>
                      <li>Comparative bioavailability assessment between oral and sublingual routes</li>
                      <li>Specialized handling of both tablet and film formulations</li>
                      <li>Detailed PK profiling with multiple sampling timepoints</li>
                      <li>Correlation of in-vivo performance with in-vitro dissolution profiles</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Matrix collected can be any of the Following</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <p className="mb-2">We can collect and analyze various biological matrices including:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Whole blood/Serum/Plasma</li>
                    <li>Bone marrow</li>
                    <li>Cerebrospinal fluid (limited sample volumes)</li>
                    <li>Aqueous humor (limited sample volumes)</li>
                    <li>Saliva sampling</li>
                    <li>Portal blood Collection</li>
                    <li>Blood sampling by cardiac puncture</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Beaker className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Critical Surgeries & Specialized Techniques</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="bg-[#2A3A5A] rounded-lg overflow-hidden">
                      <h4 className="text-white font-medium p-3 bg-[#1D2A4A]">Cannulation Procedures</h4>
                      <div className="p-4">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            Femoral artery cannulation
                            <div className="relative h-32 w-full mt-2">
                              <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-y7HqzPlnUiMY6c3xAkMnSOfTB4aELc.png"
                                alt="Femoral artery cannulation"
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <p className="text-xs mt-1">
                              Precise catheterization of the femoral artery allowing continuous blood sampling.
                            </p>
                          </li>
                          <li>
                            Jugular vein cannulation
                            <div className="relative h-32 w-full mt-2">
                              <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PFI4gfUHqacLWR0uBmbn0dSnRfC9w6.png"
                                alt="Jugular vein cannulation"
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <p className="text-xs mt-1">
                              Strategic placement of a catheter in the jugular vein enabling repeated blood sampling.
                            </p>
                          </li>
                          <li>
                            Triple cannulation (Jugular, hepatic and duodenal)
                            <div className="relative h-32 w-full mt-2">
                              <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pXwnk9lIzUsElZAPUWdHSHtj0UHPpC.png"
                                alt="Triple cannulation"
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <p className="text-xs mt-1">
                              Advanced technique involving simultaneous cannulation of the jugular vein, hepatic portal
                              vein, and duodenum.
                            </p>
                          </li>
                          <li>Portal vein cannulation</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-[#2A3A5A] rounded-lg overflow-hidden">
                      <h4 className="text-white font-medium p-3 bg-[#1D2A4A]">Renal Targeted Injections</h4>
                      <div className="p-4">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            Direct renal artery injection
                            <div className="relative h-32 w-full mt-2">
                              <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4iy7GX8WuwuQU4uvJgrZEuRLIhrd4G.png"
                                alt="Renal artery injection"
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <p className="text-xs mt-1">
                              Direct administration of compounds into the renal artery, allowing for kidney-specific
                              drug delivery.
                            </p>
                          </li>
                          <li>
                            Intracerebral injection
                            <div className="relative h-32 w-full mt-2">
                              <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m8HIfUKVcJsbAW1O7odhhpstzvpxCw.png"
                                alt="Intracerebral injection"
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <p className="text-xs mt-1">
                              Precision-guided direct injection into specific brain regions using stereotaxic equipment.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span className="text-lg">Renal Targeted Injections in Mice</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="bg-[#1D2A4A] p-4 rounded-lg">
                      <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Yg4NgMj4JxGqMrQ1tZq8sCXH3gANz6.png"
                          alt="Direct renal artery injection procedure"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="text-md font-semibold text-white mb-2">Direct Renal Artery Injection</h4>
                      <p className="text-sm text-gray-300">
                        Precision surgical technique allowing direct administration of compounds into the renal artery
                        for kidney-specific drug delivery studies.
                      </p>
                    </div>

                    <div className="bg-[#1D2A4A] p-4 rounded-lg">
                      <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7EnTKyenZuU0oRqQhhlAVabr6ycRF4.png"
                          alt="Kidneys with dye showing targeted delivery"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="text-md font-semibold text-white mb-2">Visualization with Dye</h4>
                      <p className="text-sm text-gray-300">
                        Confirmation of targeted delivery using specialized dyes, demonstrating precise localization of
                        compounds to kidney tissue.
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4">
                    Our specialized renal targeted injection techniques enable precise delivery of compounds directly to
                    the kidneys, allowing for:
                  </p>

                  <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
                    <li>Assessment of nephrotoxicity and renal drug handling</li>
                    <li>Evaluation of kidney-specific drug metabolism</li>
                    <li>Development of targeted therapies for kidney diseases</li>
                    <li>Reduced systemic exposure while maximizing renal concentration</li>
                    <li>Detailed pharmacokinetic profiling of renal drug clearance</li>
                  </ul>

                  <div className="mt-4 bg-[#2A3A5A] p-4 rounded-lg">
                    <h4 className="text-md font-semibold text-white mb-2">Applications</h4>
                    <p className="text-sm text-gray-300">
                      Ideal for nephrotoxicity studies, kidney-targeted drug delivery research, and understanding renal
                      clearance mechanisms of novel compounds. Particularly valuable for developing treatments for
                      kidney diseases with minimal systemic effects.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Hepatic Models in rat</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <div className="space-y-6">
                    <div className="bg-[#2A3A5A] rounded-lg overflow-hidden">
                      <h4 className="text-white font-medium p-3 bg-[#1D2A4A]"></h4>
                      <div className="p-4">
                        <div className="mb-4">
                          <div className="relative h-64 w-full">
                            <Image
                              src="https://5twbphftab2huwdx.public.blob.vercel-storage.com/Screenshot%202025-03-26%20211151-27vTNGgOFqoHmbSbUXrl5U6kUR6sOu.png"
                              alt="Hole board apparatus for testing anxiolytic agents"
                              fill
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Anti obesity and fatty liver model in rat</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <div className="space-y-6">
                    <div className="bg-[#2A3A5A] rounded-lg overflow-hidden">
                      <h4 className="text-white font-medium p-3 bg-[#1D2A4A]">Obesity and fatty liver in rat</h4>
                      <div className="p-4">
                        <div className="mb-4">
                          <div className="relative h-64 w-full">
                            <Image
                              src="https://5twbphftab2huwdx.public.blob.vercel-storage.com/Screenshot%202025-03-26%20212110-XIXJjivFo0gEqn04B78VrdFGwLL8wQ.png"
                              alt="Hole board apparatus for testing anxiolytic agents"
                              fill
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#2A3A5A] rounded-lg overflow-hidden">
                      <h4 className="text-white font-medium p-3 bg-[#1D2A4A]">Healthy rat</h4>
                      <div className="p-4">
                        <div className="mb-4">
                          <div className="relative h-64 w-full">
                            <Image
                              src="https://5twbphftab2huwdx.public.blob.vercel-storage.com/Screenshot%202025-03-26%20212115-LcmpMzzYj3BDVVMv5BQgCByBoeurMt.png"
                              alt="Hole board apparatus for testing anxiolytic agents"
                              fill
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Excision wound model</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <div className="space-y-6">
                    <div className="bg-[#2A3A5A] rounded-lg overflow-hidden">
                      <h4 className="text-white font-medium p-3 bg-[#1D2A4A]"></h4>
                      <div className="p-4">
                        <div className="mb-4">
                          <div className="relative h-64 w-full">
                            <Image
                              src="https://5twbphftab2huwdx.public.blob.vercel-storage.com/Screenshot%202025-03-26%20212258-YakDto8ZQN7sjbRgVVW5GzLbWt7G6u.png"
                              alt="Hole board apparatus for testing anxiolytic agents"
                              fill
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-13" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Schrimer Tear Test- To quantify tear volume</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <div className="space-y-6">
                    <div className="bg-[#2A3A5A] rounded-lg overflow-hidden">
                      <h4 className="text-white font-medium p-3 bg-[#1D2A4A]"></h4>
                      <div className="p-4">
                        <div className="mb-4">
                          <div className="relative h-64 w-full">
                            <Image
                              src="https://5twbphftab2huwdx.public.blob.vercel-storage.com/Screenshot%202025-03-26%20212308-px6mZMtsPAeOdOQCNPJRLvk92XWp8f.png"
                              alt="Schrimer Tear Test"
                              fill
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-6">
              <Badge className="bg-[#408c5c] text-white mb-4">Case Study Highlight</Badge>
              <Card className="bg-[#2A3A5A] border-none">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Pharmacokinetic Studies for Finished Dosage Forms
                  </h4>
                  <p className="text-gray-300 mb-4">
                    We successfully designed and executed PK studies for sublingual films, sublingual tablets, nasal
                    sprays, and eye drops to support clients' 505(b)(2) applications, patent filings, and clinical trial
                    entry.
                  </p>
                  <Link href="/case-studies" className="text-[#4a90e2] hover:underline flex items-center">
                    Read the full case study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "pharmacology":
        return (
          <div className="bg-[#1D2A4A] rounded-lg p-6 w-full">
            <h2 className="text-2xl text-[#4a90e2] font-bold mb-2">Pharmacology & Disease Models</h2>
            <p className="text-gray-300 mb-6">Specialized animal models for comprehensive research</p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Inflammation Models</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>LPS induced neutrophil migration in rat air pouch model</li>
                    <li>LPS induced pulmonary neutrophilia in mice/rat model</li>
                    <li>LPS induced TNF-alpha in mouse/rat model</li>
                    <li>Endotoxin induced Uveitis in rat model</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Arthritis models</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Collagen induced arthritis in rat model</li>
                    <li>Adjuvant induced arthritis in rat model</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Respiratory models</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Acute/chronic Cigarette smoke induced COPD in mice model</li>
                    <li>Acute/Chronic Cigarette smoke extract induced COPD in mice model</li>
                    <li>Bleomycin induced pulmonary fibrosis in rat model</li>
                    <li>
                      Single dose LPS induced acute respiratory distress syndrome in mice to screen drugs for lower
                      respiratory tract infections
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Diabetes models</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Streptozotocin –Nicotinamide induced insulin resistance model</li>
                    <li>High fat diet induced non alcoholic steatohepatitis in mice model</li>
                    <li>High fat diet and Streptozotocin induced insulin resistance model</li>
                    <li>Oral glucose tolerance test in mice</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Non alcoholic steatohepatitis (NASH) models</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Methionine and choline deficient diet induced NASH in mice</li>
                    <li>High fat diet induced NASH in mice</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Xenografts models</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Syngeneic mouse models for EL4 lymphoma cell lines in mice</li>
                    <li>Mouse 4T1 breast tumor model in mice</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Renal models</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Renoprotective effect of compound or extracts in chemical induced nephrotoxicity</li>
                    <li>Effect of small molecules in Unilateral Ureteral Obstruction surgery induced renal fibrosis</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Dermatology models</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Chemical induced vitiligo disease in mouse model</li>
                        <li>Vitiligo in C57BL/6 mouse model</li>
                        <li>Oxazolone induced dermatitis mouse model</li>
                        <li>Imiquimod induced psoriasis mouse model</li>
                      </ul>
                    </div>
                    <div className="bg-[#2A3A5A] rounded-lg overflow-hidden">
                      <h4 className="text-white font-medium p-3 bg-[#1D2A4A]">Vitiligo Model Features</h4>
                      <div className="p-4">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Progressive depigmentation</li>
                          <li>Immune response monitoring</li>
                          <li>Melanocyte assessment</li>
                          <li>Treatment response evaluation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Sexual disorder models</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Cavernosal nerve injury model by surgery in rats to induce Erectile dysfunction</li>
                    <li>
                      Models of erectile dysfunction based on specific predisposing conditions like diabetes,
                      Hypercholesteremia, arteriogenic ED
                    </li>
                    <li>Aphrodisiac screening methods in rodents like mounting behavior and mating performance</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="border-b border-[#2A3A5A]">
                <AccordionTrigger className="text-white hover:text-[#4a90e2] py-4">
                  <div className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-[#4a90e2]" />
                    <span>Central Nervous System Drug Testing</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pl-7">
                  <div className="space-y-6">
                    <div className="bg-[#2A3A5A] rounded-lg overflow-hidden">
                      <h4 className="text-white font-medium p-3 bg-[#1D2A4A]">Anxiolytic Agents Testing</h4>
                      <div className="p-4">
                        <div className="mb-4">
                          <div className="relative h-64 w-full">
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ac8yxD3M5vY0styzXWf4HyIj88YcCa.png"
                              alt="Hole board apparatus for testing anxiolytic agents"
                              fill
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <p className="text-sm mt-2 text-center">Hole board apparatus for testing anxiolytic agents</p>
                        </div>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Evaluation of exploratory behavior and anxiety levels</li>
                          <li>Quantification of head-dipping behavior</li>
                          <li>Assessment of anxiolytic drug efficacy</li>
                          <li>Dose-response relationship studies</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-[#2A3A5A] rounded-lg overflow-hidden">
                      <h4 className="text-white font-medium p-3 bg-[#1D2A4A]">Hypnotic Agents Testing</h4>
                      <div className="p-4">
                        <div className="mb-4">
                          <div className="relative h-64 w-full">
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YqLOGjGW1xovTzRPP6Vs4TxS58zBJb.png"
                              alt="Elevated plus maze for testing hypnotic agents"
                              fill
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <p className="text-sm mt-2 text-center">Elevated plus maze for testing hypnotic agents</p>
                        </div>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Assessment of sedative and hypnotic effects</li>
                          <li>Evaluation of open vs. closed arm exploration</li>
                          <li>Measurement of risk assessment behaviors</li>
                          <li>Screening of novel sleep-inducing compounds</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-[#2A3A5A] rounded-lg overflow-hidden">
                      <h4 className="text-white font-medium p-3 bg-[#1D2A4A]">Muscle Relaxant Testing</h4>
                      <div className="p-4">
                        <div className="mb-4">
                          <div className="relative h-64 w-full">
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IniUKzWnRBk9AvxM9dp3XFW5YwJMCh.png"
                              alt="Rotarod apparatus for testing muscle relaxants"
                              fill
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <p className="text-sm mt-2 text-center">Rotarod apparatus for testing muscle relaxants</p>
                        </div>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Evaluation of motor coordination and balance</li>
                          <li>Assessment of skeletal muscle relaxation</li>
                          <li>Measurement of fall latency and endurance</li>
                          <li>Screening of centrally-acting muscle relaxants</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )
      case "toxicology":
        return (
          <div className="bg-[#1D2A4A] rounded-lg p-6 w-full">
            <h2 className="text-2xl text-[#4a90e2] font-bold mb-2">Toxicology & Toxicokinetics</h2>
            <p className="text-gray-300 mb-6">Comprehensive toxicity studies for drug development</p>

            <div className="bg-[#2A3A5A] p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Our Toxicology Services</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Single dose and MTD range finding studies in rat and mice</li>
                <li>Acute oral toxicity study in rat and mice</li>
                <li>Acute Inhalation toxicity study in rat and mice</li>
                <li>Acute dermal irritation study in rabbits</li>
                <li>Inhalational toxicity tests of new drug administration technologies</li>
                <li>Acute ocular irritation study in rabbits</li>
                <li>
                  14 day Repeated dose toxicity studies in rat and mice by oral, intraperitoneal and intra tracheal
                  routes
                </li>
                <li>28 day/90day Repeated dose toxicity studies in rat and mice by oral route</li>
                <li>Genetic toxicity tests & Immunogenicity tests</li>
                <li>Toxicokinetic group along with toxicology groups</li>
                <li>Local toxicity tests (allergy and irritation tests)</li>
              </ul>
            </div>

            <div className="mt-6">
              <Badge className="bg-[#408c5c] text-white mb-4">Case Study Highlight</Badge>
              <Card className="bg-[#2A3A5A] border-none">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Hepatoprotective Potential of Stem Cell Therapy
                  </h4>
                  <p className="text-gray-300 mb-4">
                    We designed a fully customized hepatotoxicity animal model aligned with human intended use, enabling
                    the client to secure a publication, patent, and poster presentation.
                  </p>
                  <Link href="/case-studies" className="text-[#4a90e2] hover:underline flex items-center">
                    Read the full case study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#1B2238] text-white">
      <div className="absolute inset-0 z-0">
        <ThreeDNetworkBackground className="opacity-50" />
      </div>

      <div className="container mx-auto py-20 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">Our Laboratory Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced research solutions with comprehensive research models and diagnostic services for real-time drug
            discovery programs.
          </p>
        </motion.div>

        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                url: "https://5twbphftab2huwdx.public.blob.vercel-storage.com/AutochemXpert-TZ9OMrPAthNu0jFZjnLqEeSk5H97e7.jpg",
                alt: "Precision laboratory testing with colored samples",
                title: "Advanced Testing",
                description: "State-of-the-art <i>in-vitro</i> & <i>in-vivo</i> laboratory analysis",
              },
              {
                url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6QL4kn66DTog8LtKT7kqHnekdtUr1a.png",
                alt: "Laboratory mouse model",
                title: "Animal Models",
                description: "Specialized <i>in-vivo</i> models for research and testing",
              },
              {
                url: "https://5twbphftab2huwdx.public.blob.vercel-storage.com/Hemat-ATjtAlW5T2sLfNhbJnuxdvuP2Riu41.jpg",
                alt: "Researcher conducting analysis",
                title: "Expert Analysis",
                description: "Professional research staff and advanced analytical capabilities",
              },
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-200" dangerouslySetInnerHTML={{ __html: image.description }}></p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Left side - Tab navigation */}
          <div className="w-full md:w-1/4">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  setActiveTab("pharmacokinetics")
                  const url = new URL(window.location.href)
                  url.searchParams.set("tab", "pharmacokinetics")
                  url.searchParams.set("category", "pharmacokinetics")
                  window.history.pushState({}, "", url)
                }}
                className={`text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "pharmacokinetics"
                    ? "bg-[#4a90e2] text-white"
                    : "bg-[#1D2A4A] text-white hover:bg-[#2A3A5A]"
                }`}
              >
                Pharmacokinetics
              </button>
              <button
                onClick={() => {
                  setActiveTab("pharmacology")
                  const url = new URL(window.location.href)
                  url.searchParams.set("tab", "pharmacology")
                  url.searchParams.set("category", "pharmacology")
                  window.history.pushState({}, "", url)
                }}
                className={`text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "pharmacology"
                    ? "bg-[#4a90e2] text-white"
                    : "bg-[#1D2A4A] text-white hover:bg-[#2A3A5A]"
                }`}
              >
                Pharmacology
              </button>
              <button
                onClick={() => {
                  setActiveTab("toxicology")
                  const url = new URL(window.location.href)
                  url.searchParams.set("tab", "toxicology")
                  url.searchParams.set("category", "toxicology")
                  window.history.pushState({}, "", url)
                }}
                className={`text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "toxicology" ? "bg-[#4a90e2] text-white" : "bg-[#1D2A4A] text-white hover:bg-[#2A3A5A]"
                }`}
              >
                <span className="whitespace-normal">Toxicology & Toxicokinetics</span>
              </button>
            </div>
          </div>

          {/* Right side - Content area */}
          <div className="w-full md:w-3/4">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  )
}

