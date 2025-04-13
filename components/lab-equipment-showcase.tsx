import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function LabEquipmentShowcase() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JRlmIYMcn5d4AmI8bpvJWkHFmcIBFg.png"
              alt="Advanced IVC rack system for laboratory animals"
              fill
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col justify-center space-y-4">
        <h3 className="text-2xl font-bold text-primary">State-of-the-Art Equipment</h3>
        <p className="text-muted-foreground">
          Our laboratory is equipped with the latest technology for animal housing and research, including advanced IVC
          (Individually Ventilated Cage) systems that ensure optimal conditions for research animals while maintaining
          the highest standards of care.
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Climate-controlled environments for consistent research conditions</li>
          <li>• Advanced ventilation systems for animal welfare</li>
          <li>• Precision monitoring equipment for research integrity</li>
          <li>• Specialized handling facilities for various research models</li>
        </ul>
      </div>
    </div>
  )
}

