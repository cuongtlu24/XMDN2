import { Button } from "@/components/ui/button"

export function InvestmentSection({ biz }: { biz: any }) {
  return (
    <section id="overview" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img 
              // Prioritize using image from biz.image, if not available use default image
              src={biz.image || "/images/villa-garden.jpg"} 
              alt={`${biz.name} Villa`}
              className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary rounded-lg hidden lg:block" />
          </div>

          {/* Content */}
          <div>
            <div className="mb-6">
              <h3 className="text-secondary font-bold text-lg mb-2 uppercase">INVESTMENT FOCAL POINT</h3>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                EXCEPTIONAL<br />RETURNS
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong>{biz.name}</strong> is located in a prime position, conveniently connected to leading 
                development areas in Lam Dong province. In the near future, the real estate market at 
                <strong> {biz.address}</strong> and surrounding areas has significant advantages for value appreciation 
                thanks to local infrastructure development and commercial planning.
              </p>
              <p>
                The eco-garden villa complex <strong>{biz.name}</strong> is located in an established residential area with many 
                adjacent amenities, perfectly suitable for residential relaxation or profitable investment. 
                At the same time, the project leads the "Second Home" trend through modern regional connectivity systems, 
                especially strategic highway routes.
              </p>
            </div>

            <Button 
              className="mt-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 py-6 rounded-lg shadow-md transition-all hover:scale-105"
            >
              GET PROJECT QUOTE
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
