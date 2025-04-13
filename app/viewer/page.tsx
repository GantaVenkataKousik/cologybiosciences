"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { PDFViewer } from "@/components/pdf-viewer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ViewerPage() {
  const searchParams = useSearchParams()
  const pdfUrl = searchParams.get("pdf")
  const title = searchParams.get("title") || "PDF Document"
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="container mx-auto py-16 px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-3xl mx-auto text-center">
          <div className="animate-pulse h-8 w-64 bg-gray-200 rounded mx-auto mb-8"></div>
          <div className="animate-pulse h-[600px] w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!pdfUrl) {
    return (
      <div className="container mx-auto py-16 px-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">PDF Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested PDF could not be found.</p>
          <Button asChild>
            <Link href="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>
      </div>
      <PDFViewer url={pdfUrl} title={title} />
    </div>
  )
}

