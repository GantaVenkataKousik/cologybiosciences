"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ArrowRight, Beaker, FlaskRoundIcon as Flask, FileText, Info } from "lucide-react"
import ThreeDNetworkBackground from "@/components/three-d-network-background"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PharmacokineticPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

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
          <h1 className="text-4xl font-bold mb-6">Pharmacokinetics & ADME</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Our comprehensive pharmacokinetic services provide detailed insights into how drugs interact with the body,
            from absorption to elimination.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-[#1D2A4A] border-none mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4a90e2]">Critical Surgeries & Specialized Techniques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300">
                  Our team has extensive expertise in specialized surgical techniques that enable precise
                  pharmacokinetic studies. These advanced procedures allow for targeted drug delivery and accurate
                  sampling from specific anatomical sites.
                </p>

                <Tabs defaultValue="cannulation" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-[#2A3A5A]">
                    <TabsTrigger value="cannulation" className="data-[state=active]:bg-[#4a90e2]">
                      Cannulation Procedures
                    </TabsTrigger>
                    <TabsTrigger value="injections" className="data-[state=active]:bg-[#4a90e2]">
                      Specialized Injections
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="cannulation" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-[#2A3A5A] p-4 rounded-lg flex flex-col">
                        <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-y7HqzPlnUiMY6c3xAkMnSOfTB4aELc.png"
                            alt="Femoral artery cannulation procedure"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Femoral Artery Cannulation</h3>
                        <p className="text-sm text-gray-300 flex-grow">
                          Precise catheterization of the femoral artery allowing continuous blood sampling and
                          monitoring of arterial drug concentrations with minimal disturbance to the animal.
                        </p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="mt-2 text-[#4a90e2]">
                                <Info className="h-4 w-4 mr-1" /> Applications
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#1B2238] border-[#4a90e2] text-white max-w-xs">
                              <p>
                                Used for continuous arterial blood sampling, drug infusion studies, and bioavailability
                                assessments requiring arterial access.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="bg-[#2A3A5A] p-4 rounded-lg flex flex-col">
                        <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PFI4gfUHqacLWR0uBmbn0dSnRfC9w6.png"
                            alt="Jugular vein cannulation procedure"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Jugular Vein Cannulation</h3>
                        <p className="text-sm text-gray-300 flex-grow">
                          Strategic placement of a catheter in the jugular vein enabling repeated blood sampling and
                          intravenous drug administration for comprehensive PK profiling.
                        </p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="mt-2 text-[#4a90e2]">
                                <Info className="h-4 w-4 mr-1" /> Applications
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#1B2238] border-[#4a90e2] text-white max-w-xs">
                              <p>
                                Essential for IV administration studies, bioavailability assessments, and long-term PK
                                studies requiring multiple blood draws.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="bg-[#2A3A5A] p-4 rounded-lg flex flex-col">
                        <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pXwnk9lIzUsElZAPUWdHSHtj0UHPpC.png"
                            alt="Triple cannulation procedure"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Triple Cannulation</h3>
                        <p className="text-sm text-gray-300 flex-grow">
                          Advanced technique involving simultaneous cannulation of the jugular vein, hepatic portal
                          vein, and duodenum, allowing for comprehensive first-pass metabolism studies.
                        </p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="mt-2 text-[#4a90e2]">
                                <Info className="h-4 w-4 mr-1" /> Applications
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#1B2238] border-[#4a90e2] text-white max-w-xs">
                              <p>
                                Used for detailed hepatic first-pass metabolism studies, oral bioavailability
                                assessments, and entero-hepatic circulation investigations.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="injections" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#2A3A5A] p-4 rounded-lg flex flex-col">
                        <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m8HIfUKVcJsbAW1O7odhhpstzvpxCw.png"
                            alt="Intracerebral injection procedure"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Intracerebral Injection</h3>
                        <p className="text-sm text-gray-300 flex-grow">
                          Precision-guided direct injection into specific brain regions using stereotaxic equipment,
                          enabling targeted delivery of compounds to the central nervous system.
                        </p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="mt-2 text-[#4a90e2]">
                                <Info className="h-4 w-4 mr-1" /> Applications
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#1B2238] border-[#4a90e2] text-white max-w-xs">
                              <p>
                                Critical for CNS-targeted therapeutics, blood-brain barrier penetration studies, and
                                neurological disorder research requiring direct brain access.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="bg-[#2A3A5A] p-4 rounded-lg flex flex-col">
                        <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4iy7GX8WuwuQU4uvJgrZEuRLIhrd4G.png"
                            alt="Renal artery injection procedure"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Renal Artery Injection</h3>
                        <p className="text-sm text-gray-300 flex-grow">
                          Direct administration of compounds into the renal artery, allowing for kidney-specific drug
                          delivery and assessment of renal drug handling and metabolism.
                        </p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="mt-2 text-[#4a90e2]">
                                <Info className="h-4 w-4 mr-1" /> Applications
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#1B2238] border-[#4a90e2] text-white max-w-xs">
                              <p>
                                Valuable for nephrotoxicity studies, kidney-targeted drug delivery research, and
                                understanding renal clearance mechanisms of novel compounds.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <div className="bg-[#2A3A5A] p-4 rounded-lg flex flex-col mt-6">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <Badge className="mr-2 bg-[#408c5c]">NEW</Badge>
                        Renal Targeted Injections in Mice
                      </h3>

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
                            Precision surgical technique allowing direct administration of compounds into the renal
                            artery for kidney-specific drug delivery studies.
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
                            Confirmation of targeted delivery using specialized dyes, demonstrating precise localization
                            of compounds to kidney tissue.
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm mb-4">
                        Our specialized renal targeted injection techniques enable precise delivery of compounds
                        directly to the kidneys, allowing for:
                      </p>

                      <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
                        <li>Assessment of nephrotoxicity and renal drug handling</li>
                        <li>Evaluation of kidney-specific drug metabolism</li>
                        <li>Development of targeted therapies for kidney diseases</li>
                        <li>Reduced systemic exposure while maximizing renal concentration</li>
                        <li>Detailed pharmacokinetic profiling of renal drug clearance</li>
                      </ul>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="mt-4 text-[#4a90e2] self-start">
                              <Info className="h-4 w-4 mr-1" /> Applications
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-[#1B2238] border-[#4a90e2] text-white max-w-xs">
                            <p>
                              Ideal for nephrotoxicity studies, kidney-targeted drug delivery research, and
                              understanding renal clearance mechanisms of novel compounds. Particularly valuable for
                              developing treatments for kidney diseases with minimal systemic effects.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="bg-[#2A3A5A] p-4 rounded-lg mt-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Badge className="mr-2 bg-[#408c5c]">NEW</Badge>
                    Advanced Surgical Capabilities
                  </h3>
                  <p className="text-gray-300">
                    Our specialized surgical techniques enable precise pharmacokinetic studies that would otherwise be
                    impossible. These procedures allow for:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300 mt-3">
                    <li>Direct sampling from specific anatomical sites</li>
                    <li>Targeted drug delivery to organs of interest</li>
                    <li>Continuous monitoring of drug concentrations</li>
                    <li>Assessment of first-pass metabolism</li>
                    <li>Evaluation of tissue-specific drug distribution</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1D2A4A] border-none">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4a90e2]">In vivo PK Research</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300">
                  Our in vivo pharmacokinetic research provides comprehensive insights into drug behavior within living
                  organisms, helping you make informed decisions throughout the drug development process.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-[#2A3A5A] p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Core PK Services</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Bioavailability assessment</li>
                      <li>Tissue distribution studies</li>
                      <li>PK/PD research correlation</li>
                      <li>Dose escalation studies</li>
                      <li>Dose accumulation studies</li>
                      <li>Dose optimisation studies</li>
                    </ul>
                  </div>

                  <div className="bg-[#2A3A5A] p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Specialized Techniques</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>PK on surgically cannulated rodents</li>
                      <li>Jugular cannulation</li>
                      <li>Femoral cannulation</li>
                      <li>Bile duct cannulation</li>
                      <li>Triple cannulation techniques</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Administration Routes</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                      "Per oral",
                      "Intravenous",
                      "Oral dosing",
                      "Subcutaneous",
                      "Subretinal",
                      "Intra cranial",
                      "Intranasal",
                      "Intratracheal",
                      "Intramuscular",
                      "Opthalmic",
                      "Topical",
                      "Surgically incorporated osmotic pumps",
                    ].map((route, index) => (
                      <div key={index} className="bg-[#2A3A5A] p-3 rounded-lg text-center">
                        <span className="text-gray-300 text-sm sm:text-base whitespace-normal break-words">
                          {route}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Matrix Collection</h3>
                  <p className="text-gray-300 mb-4">
                    We can collect and analyze various biological matrices including:
                  </p>
                  <div className="bg-[#2A3A5A] p-6 rounded-lg">
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Whole blood/Serum/Plasma</li>
                      <li>Bone marrow</li>
                      <li>Cerebrospinal fluid (limited sample volumes)</li>
                      <li>Aqueous humor (limited sample volumes)</li>
                      <li>Saliva sampling</li>
                      <li>Portal blood Collection</li>
                      <li>Blood sampling by cardiac puncture</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Hepatic Models in Rat</h3>
                  <p className="text-gray-300 mb-4">
                    Our specialized hepatic models provide comprehensive insights into liver disease progression and
                    drug metabolism, enabling precise evaluation of hepatotoxicity and efficacy of liver-targeted
                    therapeutics.
                  </p>

                  <div className="bg-[#2A3A5A] p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-white mb-4">Liver Disease Progression Models</h4>

                    <div className="relative h-[400px] w-full mb-6 bg-[#1D2A4A] rounded-lg overflow-hidden">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-26%20211151-YEC45PynUlWlRbuHuJpIm9smcvL7vL.png"
                        alt="Liver disease progression from healthy liver to cirrhosis"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                      <div className="bg-[#1D2A4A] p-3 rounded-lg">
                        <h5 className="text-white font-medium">Healthy Liver</h5>
                        <p className="text-sm text-gray-300">Baseline control</p>
                      </div>
                      <div className="bg-[#1D2A4A] p-3 rounded-lg">
                        <h5 className="text-white font-medium">Steatosis</h5>
                        <p className="text-sm text-gray-300">Fatty liver</p>
                      </div>
                      <div className="bg-[#1D2A4A] p-3 rounded-lg">
                        <h5 className="text-white font-medium">NASH</h5>
                        <p className="text-sm text-gray-300">Non-alcoholic steatohepatitis</p>
                      </div>
                      <div className="bg-[#1D2A4A] p-3 rounded-lg">
                        <h5 className="text-white font-medium">Fibrosis</h5>
                        <p className="text-sm text-gray-300">Scarring stage</p>
                      </div>
                      <div className="bg-[#1D2A4A] p-3 rounded-lg">
                        <h5 className="text-white font-medium">Cirrhosis</h5>
                        <p className="text-sm text-gray-300">Advanced scarring</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h5 className="text-md font-medium text-[#4a90e2] mb-2">Applications:</h5>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm">
                        <li>Evaluation of hepatoprotective compounds</li>
                        <li>Assessment of drug-induced liver injury (DILI)</li>
                        <li>Pharmacokinetic studies in compromised liver function</li>
                        <li>Development of therapeutics for NAFLD/NASH</li>
                        <li>Investigation of liver regeneration mechanisms</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1D2A4A] border-none mt-8 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4a90e2]">Hepatic Models in Rat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300">
                  Our specialized hepatic models provide comprehensive insights into liver disease progression and drug
                  metabolism, enabling precise evaluation of hepatotoxicity and efficacy of liver-targeted therapeutics.
                </p>

                <div className="bg-[#2A3A5A] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-4">Liver Disease Progression Models</h3>

                  <div className="relative h-[400px] w-full mb-6 bg-[#1D2A4A] rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-26%20211151-YEC45PynUlWlRbuHuJpIm9smcvL7vL.png"
                      alt="Liver disease progression from healthy liver to cirrhosis"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                    <div className="bg-[#1D2A4A] p-3 rounded-lg">
                      <h4 className="text-white font-medium">Healthy Liver</h4>
                      <p className="text-sm text-gray-300">Baseline control</p>
                    </div>
                    <div className="bg-[#1D2A4A] p-3 rounded-lg">
                      <h4 className="text-white font-medium">Steatosis</h4>
                      <p className="text-sm text-gray-300">Fatty liver</p>
                    </div>
                    <div className="bg-[#1D2A4A] p-3 rounded-lg">
                      <h4 className="text-white font-medium">NASH</h4>
                      <p className="text-sm text-gray-300">Non-alcoholic steatohepatitis</p>
                    </div>
                    <div className="bg-[#1D2A4A] p-3 rounded-lg">
                      <h4 className="text-white font-medium">Fibrosis</h4>
                      <p className="text-sm text-gray-300">Scarring stage</p>
                    </div>
                    <div className="bg-[#1D2A4A] p-3 rounded-lg">
                      <h4 className="text-white font-medium">Cirrhosis</h4>
                      <p className="text-sm text-gray-300">Advanced scarring</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-medium text-[#4a90e2] mb-3">Applications:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Evaluation of hepatoprotective compounds</li>
                      <li>Assessment of drug-induced liver injury (DILI)</li>
                      <li>Pharmacokinetic studies in compromised liver function</li>
                      <li>Development of therapeutics for NAFLD/NASH</li>
                      <li>Investigation of liver regeneration mechanisms</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1D2A4A] border-none mt-8">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4a90e2]">Case Study: Pharmacokinetic Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-[#2A3A5A] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Pharmacokinetic Studies for Finished Dosage Forms
                  </h3>
                  <p className="text-gray-300 mb-4">
                    We successfully designed and executed PK studies for sublingual films, sublingual tablets, nasal
                    sprays, and eye drops to support clients' 505(b)(2) applications, patent filings, and clinical trial
                    entry.
                  </p>
                  <h4 className="text-lg font-medium text-[#4a90e2] mb-2">Key Achievements:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>
                      Developed customized PK protocols to assess absorption, bioavailability, and systemic exposure
                    </li>
                    <li>Provided rapid and precise data analysis to meet regulatory expectations</li>
                    <li>
                      Enabled clients to achieve key milestones, including patent filings and advancing select
                      candidates into clinical trials
                    </li>
                    <li>
                      Ensured cost-effective and regulatory-compliant study designs to accelerate drug development
                    </li>
                  </ul>
                  <Button asChild className="mt-6 bg-[#4a90e2] hover:bg-[#357abd]">
                    <Link href="/case-studies" className="flex items-center">
                      Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-[#1D2A4A] border-none sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl text-[#4a90e2]">Our PK Expertise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#2A3A5A] p-4 rounded-lg flex items-center space-x-3">
                  <Beaker className="h-8 w-8 text-[#4a90e2]" />
                  <div>
                    <h3 className="font-medium text-white">Comprehensive Analysis</h3>
                    <p className="text-sm text-gray-300">Full ADME profiling</p>
                  </div>
                </div>

                <div className="bg-[#2A3A5A] p-4 rounded-lg flex items-center space-x-3">
                  <Flask className="h-8 w-8 text-[#4a90e2]" />
                  <div>
                    <h3 className="font-medium text-white">Multiple Administration Routes</h3>
                    <p className="text-sm text-gray-300">Specialized delivery methods</p>
                  </div>
                </div>

                <div className="bg-[#2A3A5A] p-4 rounded-lg flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-[#4a90e2]" />
                  <div>
                    <h3 className="font-medium text-white">Regulatory Compliance</h3>
                    <p className="text-sm text-gray-300">Supporting documentation for submissions</p>
                  </div>
                </div>

                <Badge className="w-full justify-center bg-[#408c5c] hover:bg-[#357a4d] py-2">
                  Specialized in Sublingual & Nasal PK
                </Badge>

                <div className="mt-12 text-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-[#408c5c] to-[#4a90e2] text-white text-lg px-10 py-6 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,144,226,0.5)] hover:scale-105"
                  >
                    <Link href="/contact" className="flex items-center gap-2">
                      Request a Consultation
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

