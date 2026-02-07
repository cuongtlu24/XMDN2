import { Button } from "@/components/ui/button"

interface BizProps {
  biz: {
    subdomain: string;
    name: string;
    address: string;
    document: string;
    phone: string;
    image: string;
  }
}

export function HeroSection({ biz }: BizProps) {
  // Create default values if Sheets data is empty
  const companyName = biz.name || "Updating company name";
  const bgImage = biz.image || "/images/hero-bg.jpg";

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-16"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{ backgroundImage: `url('${bgImage}')` }}
      >
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <div className="mb-6 animate-in fade-in slide-in-from-left duration-500">
            <p className="text-background/80 text-sm md:text-base mb-2 font-medium">
              {companyName}
            </p>
            <p className="text-background/60 text-xs md:text-sm tracking-widest ">
              DOCUMENT: {biz.document || "N/A"}
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 leading-tight text-balance  tracking-tight">
            {companyName}
          </h1>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-secondary mb-6 italic">
            Eco-friendly garden villa complex with premium standards
          </h2>

          <p className="text-background/90 text-base md:text-lg leading-relaxed mb-10 max-w-2xl text-pretty">
            Our presence in this area pioneers the Second Home trend, 
            creating an ideal living space that allows homeowners to enjoy 
            fresh air, sustainable living, and investment opportunities for the future.
          </p>

          <div className="bg-background/10 backdrop-blur-md border border-background/20 rounded-lg p-6 mb-8 max-w-md shadow-2xl">
            <h3 className="text-background font-semibold text-lg mb-4 border-b border-background/20 pb-2">General Information</h3>
            <ul className="space-y-3 text-background/90 text-sm">
              <li className="flex gap-2">
                <span className="text-secondary font-bold">•</span> 
                <span><strong>Location:</strong> {biz.address || "Updating"}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary font-bold">•</span> 
                <span><strong>Developer:</strong> {companyName}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary font-bold">•</span> 
                <span><strong>Hotline:</strong> {biz.phone || "Contact directly"}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary font-bold">•</span> 
                <span><strong>Legal:</strong> {biz.document || "Under verification"} (Title deed ready)</span>
              </li>
            </ul>
          </div>

          <Button 
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-10 py-7 text-lg shadow-lg hover:scale-105 transition-transform"
          >
            GET QUOTE NOW
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-background/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-background/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
