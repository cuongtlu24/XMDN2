import { Button } from "@/components/ui/button"
import { Check, ShieldCheck } from "lucide-react"

const legalPoints = [
  "Individual title deed for each lot",
  "Immediate notarized transfer",
  "Bank support with preferential rates",
  "Rural residential land zoning",
]

export function LegalSection({ biz }: { biz: any }) {
  return (
    <section id="legal" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-6">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Transparent Verification</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase">
            COMPLETE LEGAL DOCUMENTATION
          </h2>
          
          <p className="text-primary-foreground/70 mb-8 italic">
            Legal information for <strong>{biz.name}</strong> has been verified and transparently disclosed.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-10 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-4 text-left mb-8">
              <div className="p-4 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10">
                <p className="text-xs opacity-50 uppercase mb-1">Ownership Unit</p>
                <p className="font-bold text-lg">{biz.name}</p>
              </div>
              <div className="p-4 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10">
                <p className="text-xs opacity-50 uppercase mb-1">Document Code / Tax ID</p>
                <p className="font-bold text-lg text-secondary tracking-widest">{biz.document}</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {legalPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-3 bg-primary-foreground/10 px-5 py-2.5 rounded-full border border-primary-foreground/5">
                  <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-secondary-foreground" />
                  </div>
                  <span className="text-sm font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm text-primary-foreground/60 max-w-xl mx-auto">
              All legal documents related to the project at <strong>{biz.address}</strong> are ready to be provided to customers upon request for direct consultation.
            </p>
            <Button 
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-12 py-7 text-lg rounded-full shadow-lg transition-all hover:scale-105"
            >
              DOWNLOAD LEGAL DOCUMENTS
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
