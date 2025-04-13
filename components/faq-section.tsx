"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ScrollReveal from "@/components/scroll-reveal"
import DNAAnimation from "@/components/dna-animation"

export default function FaqSection() {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 hexagon-pattern opacity-10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-20">
        <DNAAnimation className="h-full w-full" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-primary flex justify-between">
              FAQ
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl gradient-text">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Find answers to common questions about our laboratory services.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-primary/10">
                <AccordionTrigger className="text-lg font-medium py-4 transition-all hover:text-primary">
                  What services does your laboratory offer?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  Our laboratory offers a comprehensive range of services including pre-clinical research, diagnostic
                  testing, clinical trial support, laboratory services, quality assurance, and consultation services. We
                  provide tailored solutions to meet the specific needs of researchers, healthcare providers, and
                  pharmaceutical companies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-primary/10">
                <AccordionTrigger className="text-lg font-medium py-4 transition-all hover:text-primary">
                  How do I access my test results?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  You can access your test results through our secure client portal. After creating an account, you can
                  log in at any time to view and download your results. We also provide options for receiving results
                  via email or physical mail, depending on your preferences and privacy requirements.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-primary/10">
                <AccordionTrigger className="text-lg font-medium py-4 transition-all hover:text-primary">
                  What is the turnaround time for test results?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  Turnaround times vary depending on the type of test and service requested. Routine tests typically
                  have results available within 24-48 hours, while more complex analyses may take 3-7 business days. For
                  urgent requests, we offer expedited services with results available in as little as 4-6 hours for
                  certain tests.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-primary/10">
                <AccordionTrigger className="text-lg font-medium py-4 transition-all hover:text-primary">
                  How do I submit samples to your laboratory?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  We provide several options for sample submission. You can schedule a pickup service, use our prepaid
                  shipping materials, or deliver samples directly to our facility. All samples should be properly
                  labeled and accompanied by the appropriate requisition forms. Our client services team can provide
                  detailed instructions for specific sample types.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b border-primary/10">
                <AccordionTrigger className="text-lg font-medium py-4 transition-all hover:text-primary">
                  What quality control measures do you have in place?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  We maintain rigorous quality control protocols that exceed industry standards. Our laboratory is
                  accredited by relevant regulatory bodies, and we participate in proficiency testing programs. We
                  implement multiple levels of quality checks, including instrument calibration, control sample testing,
                  and result verification by qualified professionals.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b border-primary/10">
                <AccordionTrigger className="text-lg font-medium py-4 transition-all hover:text-primary">
                  Can you customize testing protocols for specific research needs?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  Yes, we specialize in developing customized testing protocols to meet specific research requirements.
                  Our team of scientists and consultants works closely with clients to understand their objectives and
                  design appropriate methodologies. We can adapt existing protocols or develop entirely new approaches
                  based on your unique needs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

