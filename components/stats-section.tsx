"use client"

import { useEffect, useRef } from "react"
import { Users, FlaskRoundIcon as Flask, Clock, FileText } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function StatsSection() {
  const countersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const counters = countersRef.current?.querySelectorAll(".counter-value")
    if (!counters) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            counters.forEach((counter) => {
              const target = Number.parseInt(counter.getAttribute("data-target") || "0", 10)
              const duration = 2000 // ms
              const increment = target / (duration / 16) // 60fps

              let current = 0
              const updateCounter = () => {
                current += increment
                if (current < target) {
                  ;(counter as HTMLElement).innerText = Math.ceil(current).toString()
                  requestAnimationFrame(updateCounter)
                } else {
                  ;(counter as HTMLElement).innerText = target.toString()
                }
              }

              updateCounter()
            })

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    if (countersRef.current) {
      observer.observe(countersRef.current)
    }

    return () => {
      if (countersRef.current) {
        observer.unobserve(countersRef.current)
      }
    }
  }, [])

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-[#f5f8f7]">
      <div className="container px-4 md:px-6 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-[#408c5c] px-3 py-1 text-sm font-medium text-white">
                Our Impact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-[#408c5c]">
                Trusted by Researchers and Healthcare Professionals
              </h2>
              <p className="mx-auto max-w-[700px] text-[#6B7280] md:text-lg">
                Our commitment to excellence has made us a trusted partner in medical research and diagnostics.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div ref={countersRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <ScrollReveal delay={100}>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md relative overflow-hidden">
              <div className="relative mb-6 z-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#408c5c]">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-5xl font-bold mb-3 text-[#408c5c]">
                  <span className="counter-value" data-target="20">
                    0
                  </span>
                  <span className="text-[#8cc5a7]">+</span>
                </h3>
                <p className="text-[#333333] text-lg font-medium">Clients Worldwide</p>
              </div>

              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 text-[#8cc5a7] text-9xl font-bold">+</div>
                <div className="absolute opacity-5 text-lg text-[#8cc5a7] whitespace-nowrap rotate-12">
                  Years Research Partners Experience Projects Partners
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md relative overflow-hidden">
              <div className="relative mb-6 z-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#408c5c]">
                  <Flask className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-5xl font-bold mb-3 text-[#408c5c]">
                  <span className="counter-value" data-target="60">
                    0
                  </span>
                  <span className="text-[#8cc5a7]">+</span>
                </h3>
                <p className="text-[#333333] text-lg font-medium">Research Projects</p>
              </div>

              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 text-[#8cc5a7] text-9xl font-bold">+</div>
                <div className="absolute opacity-5 text-lg text-[#8cc5a7] whitespace-nowrap rotate-12">
                  Years Research Partners Experience Projects Partners
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md relative overflow-hidden">
              <div className="relative mb-6 z-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#408c5c]">
                  <Clock className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-5xl font-bold mb-3 text-[#408c5c]">
                  <span className="counter-value" data-target="15">
                    0
                  </span>
                  <span className="text-[#8cc5a7]">+</span>
                </h3>
                <p className="text-[#333333] text-lg font-medium">Years of Experience</p>
              </div>

              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 text-[#8cc5a7] text-9xl font-bold">+</div>
                <div className="absolute opacity-5 text-lg text-[#8cc5a7] whitespace-nowrap rotate-12">
                  Years Research Partners Experience Projects Partners
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md relative overflow-hidden">
              <div className="relative mb-6 z-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#408c5c]">
                  <FileText className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-5xl font-bold mb-3 text-[#408c5c]">
                  <span className="counter-value" data-target="5">
                    0
                  </span>
                  <span className="text-[#8cc5a7]">+</span>
                </h3>
                <p className="text-[#333333] text-lg font-medium">R&D Companies Supported</p>
              </div>

              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 text-[#8cc5a7] text-9xl font-bold">+</div>
                <div className="absolute opacity-5 text-lg text-[#8cc5a7] whitespace-nowrap rotate-12">
                  Years Research Partners Experience Projects Partners
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

