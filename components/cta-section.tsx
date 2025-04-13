"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"
import HelixAnimation from "@/components/helix-animation"

export default function CtaSection() {
  return (
    <section className="py-20 md:py-28 bg-[#408C5C] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <HelixAnimation className="h-full w-full" color="#ffffff" dotCount={150} glowIntensity={2} speed={1.5} />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Ready to Partner with a Leading Medical Laboratory?
              </h2>
              <p className="text-white/90 md:text-xl">
                Contact us today to discuss how our laboratory services can support your research, clinical trials, or
                diagnostic needs.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-end">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-[#408C5C] font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

