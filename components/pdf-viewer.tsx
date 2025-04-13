"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from "lucide-react"

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PDFViewerProps {
  url: string
  title: string
}

export function PDFViewer({ url, title }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.0)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => Math.min(Math.max(1, prevPageNumber + offset), numPages))
  }

  function zoomIn() {
    setScale((prevScale) => Math.min(prevScale + 0.2, 2.0))
  }

  function zoomOut() {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.6))
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 mb-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-primary">{title}</h2>
          <Button variant="outline" size="sm" onClick={() => window.open(url, "_blank")}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={zoomOut} disabled={scale <= 0.6}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={zoomIn} disabled={scale >= 2.0}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            className="border rounded-lg overflow-auto max-h-[70vh]"
            loading={
              <div className="flex justify-center items-center h-[600px] w-full">
                <div className="animate-pulse h-full w-full bg-gray-100 rounded"></div>
              </div>
            }
            error={
              <div className="flex justify-center items-center h-[600px] w-full bg-gray-50 rounded-lg">
                <div className="text-center p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading PDF</h3>
                  <p className="text-gray-500">The PDF could not be loaded. Please try downloading it instead.</p>
                </div>
              </div>
            }
          >
            <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} scale={scale} />
          </Document>
        </div>

        <div className="flex justify-between items-center mt-6">
          <Button variant="outline" size="sm" onClick={() => changePage(-1)} disabled={pageNumber <= 1}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {pageNumber} of {numPages}
          </span>
          <Button variant="outline" size="sm" onClick={() => changePage(1)} disabled={pageNumber >= numPages}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

