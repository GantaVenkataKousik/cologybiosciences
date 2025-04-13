"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Microscope, Award, Users, Clock, Target, Shield, Dna, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { Suspense } from "react"
import { Loader } from "@/components/loader"
import AboutHeroSection from "@/components/about-hero-section"

export default function AboutPage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="flex flex-col">
        <AboutHeroSection />
        {/* Founder Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4 text-[#408C5C]">Our Founder</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Meet the visionary behind Cology Biosciences</p>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-36 h-36 rounded-full overflow-hidden flex-shrink-0"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-24%20at%2019.59.37_8a791eae.jpg-yccfD8UXUCevX9Kjv6kSWdab3HZQPW.jpeg"
                  alt="K.M. Sridevi, Founder of Cology Biosciences"
                  width={144}
                  height={144}
                  className="object-cover w-full h-full"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex-grow"
              >
                <h3 className="text-2xl font-bold mb-2 text-[#408C5C]">K.M. Sridevi</h3>
                <p className="text-gray-700 mb-4">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  K.M. Sridevi, Founder and CEO of Cology Biosciences has a decade of in vivo experience in core
                  research and development of Oncology small molecules. Had profound knowledge in drug discovery
                  exclusively worked on Dual PI3K Inhibitors role in respiratory disorders, Non hodgkins lymphoma and
                  inflammatory disorders. Proud to be part of research team who could make the lead molecule clear Phase
                  3 got US FDA approval and 6 more potent drug molecules which showed promising therapeutic outcomes at
                  different phases of clinical trials.
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  She is an active research enthusiast who works passionately and always strive to do science
                  responsibly.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground text-sm">
                    "We are on a relentless mission to reshape the boundaries of scientific discovery, fostering a world
                    where every research endeavor is a stepping stone towards transformative advancements in healthcare
                    and beyond."
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground text-sm">
                    "Unleashing innovation, we envision a future where scientific possibilities know no bounds,
                    transforming lives globally."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm font-medium text-white">
                  Who We Are
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  About Cology Biosciences
                </h2>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden rounded-xl shadow-lg"
              >
                <div className="aspect-[4/3] w-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-24%20at%2019.58.06_b019c441.jpg-TQsT6WdWbW3BZfnMUV05j5yGtqNRxO.jpeg"
                    alt="Laboratory equipment with medical infusion pump"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-60 pointer-events-none"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary">Who We Are</h3>
                  <p className="text-muted-foreground">
                    COLOGY BIOSCIENCES is a start up incubated at Aspire Bionest, University of Hyderabad, which
                    facilitates to optimize the R&D costs by finding innovative solutions to the expensive animal
                    experiments and also contribute commitment to the reliable scientific data.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary">About Us</h3>
                  <p className="text-muted-foreground">
                    We are committed to provide preclinical research platform with a unique blend of expertise, accuracy
                    and reliability. Its simple, innovative and cost effective approach to support your journey of
                    animal experimentation while catering all your pre clinical research needs with high quality,
                    reproducible scientific data to develop herbal formulations and screen New Chemical Entities(NCEs).
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Accomplishments */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm font-medium text-white">
                  Our Achievements
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Accomplishments</h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="text-primary text-xl">✓</div>
                  <p className="text-sm text-gray-700">
                    Currently supporting a US based Oncology start up that exclusively working on solid tumors (KRAS
                    mutations). Could potentially accerelete the drug discovery by aiding their toxicology and
                    Pharmacokinetic departments.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="text-primary text-xl">✓</div>
                  <p className="text-sm text-gray-700">
                    Also, successfully accomplished the <i>in vivo</i> critical dosings accurately like sub-retinal and
                    direct kidney injections in mice for a gene therapy based US company and could aid them to reach
                    their research milestones.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="text-primary text-xl">✓</div>
                  <p className="text-sm text-gray-700">
                    Aided over 10 clients in advancing their research, resulting in the attainment of 5 patents and a
                    significant business milestone valued at 3 crores INR.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="text-primary text-xl">✓</div>
                  <p className="text-sm text-gray-700">
                    Created a streamlined, human-relevant Vitiligo animal model with improved reliability and shorter
                    experimental duration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Areas of Expertise */}
        <section className="py-16 md:py-24 bg-[#f5f7f7]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#D8E6E1] px-5 py-1.5 text-sm font-medium text-[#408C5C]">
                  Our Specialties
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#408C5C]">
                  Areas of Expertise
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                  We specialize in various fields of medical research and diagnostics to provide comprehensive
                  solutions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className="h-full bg-white hover:border-primary transition-colors duration-300">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Microscope className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Pre-Clinical</h3>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className="h-full bg-white hover:border-primary transition-colors duration-300">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Dna className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Molecular</h3>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -10, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className="h-full bg-white hover:border-primary transition-colors duration-300">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Dna className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Genetic</h3>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -10, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className="h-full bg-white hover:border-primary transition-colors duration-300">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Diagnostic</h3>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Research Methods */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-secondary/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm font-medium text-white">
                  Research Methods
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Precision & Care</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                  Our approach combines scientific precision with ethical animal care.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col justify-center space-y-4 order-2 md:order-1"
              >
                <h3 className="text-2xl font-bold text-primary">Precision Animal Handling</h3>
                <p className="text-muted-foreground text-sm">
                  Our experienced technicians employ gentle and precise handling techniques to ensure animal welfare
                  while maintaining research integrity. All procedures follow strict ethical guidelines and are
                  performed by trained professionals.
                </p>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-center">• Humane handling protocols</li>
                  <li className="flex items-center">• Specialized techniques for different species</li>
                  <li className="flex items-center">• Minimally invasive procedures</li>
                  <li className="flex items-center">• Adherence to international welfare standards</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="order-1 md:order-2"
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ixl6wvtblsO1nLRKsPheeIdQ5hhmh4.png"
                        alt="Precise animal handling techniques with proper protective equipment"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-primary">
                  Core Values
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Drives Us</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                  Our core values guide everything we do at Cology Biosciences.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Microscope className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Excellence</h3>
                  <p className="text-muted-foreground text-sm">
                    We strive for excellence in all aspects of our work, from the accuracy of our testing to the quality
                    of our customer service.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Integrity</h3>
                  <p className="text-muted-foreground text-sm">
                    We conduct our business with the highest ethical standards, ensuring transparency, honesty, and
                    accountability in all our interactions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                  <p className="text-muted-foreground text-sm">
                    We believe in the power of collaboration, working closely with our clients and partners to achieve
                    shared goals and advance scientific knowledge.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Reliability</h3>
                  <p className="text-muted-foreground text-sm">
                    Our clients can count on us to deliver accurate results on time, every time, with the highest level
                    of consistency and dependability.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Quality</h3>
                  <p className="text-muted-foreground text-sm">
                    We maintain rigorous quality control standards to ensure the accuracy and reliability of our testing
                    and services.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-muted-foreground text-sm">
                    We continuously seek new and better ways to serve our clients, embracing technological advancements
                    and scientific discoveries.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Partner with Cology Biosciences
                </h2>
                <p className="text-primary-foreground/90 md:text-lg">
                  Join the many researchers, healthcare providers, and pharmaceutical companies who trust us for their
                  laboratory needs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                <Button asChild size="lg" variant="secondary" className="text-primary font-medium">
                  <Link href="/services">Explore Our Services</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  )
}

