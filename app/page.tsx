"use client"

import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import SpecialtiesSection from "@/components/specialties-section"
import StatsSection from "@/components/stats-section"
import TestimonialSection from "@/components/testimonial-section"
import FaqSection from "@/components/faq-section"
import CtaSection from "@/components/cta-section"
import { Suspense } from "react"
import { Loader } from "@/components/loader"

export default function Home() {
  return (
    <div className="flex flex-col relative">
      <Suspense fallback={<Loader />}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <SpecialtiesSection />
        <StatsSection />
        <TestimonialSection />
        <FaqSection />
        <CtaSection />

        <div className=""></div>
      </Suspense>
    </div>
  )
}

