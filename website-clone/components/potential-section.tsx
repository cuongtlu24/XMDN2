import { Button } from "@/components/ui/button"
import { FileCheck, Building, FileText, Sparkles } from "lucide-react"

const benefits = [
  { icon: FileCheck, label: "Individual title deed" },
  { icon: Building, label: "Bank support" },
  { icon: FileText, label: "Immediate notarization" },
]

export function PotentialSection({ biz }: { biz: any }) {
  // Safer province extraction to avoid errors if address format is incorrect
  const getProvince = (address: string) => {
    if (!address) return "the area";
    const parts = address.split(",");
    // Get the last element (usually province/city)
    return parts[parts.length - 1]?.trim() || "the area";
  };

  const province = getProvince(biz.address);

  const potentialPoints = [
    `${biz.name} – The focal point connecting the key economic region in ${province}.`,
    `Prime location at ${biz.address}, an area currently being planned for strong expansion and development.`,
    "New eco-urban development: combining tourism, recreation, lakes, waterfalls, and sustainable landscapes.",
    "Focus on developing functional urban areas, commercial services, and modern residential systems.",
    `Leading the highest-level \"residential land\" planning for the 2021-2030 period in the locality.`,
    "Directly benefiting from strategic infrastructure projects: national highway upgrades and interprovincial expressways.",
  ]

  return (
    <section id="investment" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-secondary mb-4">
            <Sparkles className="w-5 h-5 fill-current" />
            <span className="font-bold tracking-widest uppercase text-sm">Best Investment Opportunity</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 uppercase leading-tight">
            INVESTMENT POTENTIAL <br className="hidden md:block" /> AND RESIDENTIAL VALUE AT {biz.name}
          </h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Potential Points */}
          <div className="bg-muted/50 rounded-2xl p-8 md:p-10 border border-muted shadow-sm">
            <ul className="space-y-6">
              {potentialPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-4 group">
                  <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-secondary shrink-0 group-hover:scale-150 transition-transform duration-300" />
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Benefits Icons and CTA */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-all duration-300 border border-muted group">
                  <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/10 group-hover:bg-primary/10">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-bold text-foreground text-xs tracking-tighter">
                    {benefit.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Box Call to Contact */}
            <div className="bg-foreground text-background p-8 rounded-2xl relative overflow-hidden shadow-2xl">
              <div className="relative z-10 text-center">
                <h3 className="text-xl font-bold mb-4">Start your investment journey today</h3>
                <p className="text-background/70 text-sm mb-8">
                  Contact Hotline <span className="text-secondary font-bold text-lg">{biz.phone}</span> to receive the latest price list and location map.
                </p>
                <Button 
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-black px-12 py-8 text-xl rounded-full shadow-lg hover:scale-105 transition-all duration-300 active:scale-95"
                  onClick={() => window.open(`tel:${biz.phone}`)}
                >
                  GET DETAILED QUOTE
                </Button>
              </div>
              
              {/* Background Decoration Effects */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -left-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
