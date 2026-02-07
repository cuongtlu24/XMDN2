import { Car, TrendingUp, FileCheck, Users, Rocket, Building2 } from "lucide-react"

const features = [
  { icon: Car, label: "TRANSPORTATION", sublabel: "CONVENIENT" },
  { icon: TrendingUp, label: "LIQUIDITY", sublabel: "HIGH" },
  { icon: FileCheck, label: "LEGAL", sublabel: "TRANSPARENT" },
  { icon: Users, label: "COMMUNITY", sublabel: "ESTABLISHED" },
  { icon: Rocket, label: "POTENTIAL", sublabel: "DEVELOPMENT" },
  { icon: Building2, label: "INFRASTRUCTURE", sublabel: "SYNCHRONIZED" },
]

export function FeaturesSection() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <p className="font-bold text-foreground text-sm">{feature.label}</p>
              <p className="text-primary font-semibold text-sm">{feature.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
