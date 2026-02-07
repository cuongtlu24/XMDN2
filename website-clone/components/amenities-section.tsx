import { MapPin, TreePine, Home } from "lucide-react"

const amenities = [
  {
    icon: MapPin,
    title: "Synchronized transportation system",
  },
  {
    icon: TreePine,
    title: "Tourism area",
  },
  {
    icon: Home,
    title: "Residential area",
  },
]

export function AmenitiesSection({ biz }: { biz: any }) {
  return (
    <section id="amenities" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="mb-8">
              <h3 className="text-secondary font-bold text-lg mb-2 uppercase">EXTERNAL AMENITIES</h3>
              <h2 className="text-3xl md:text-4xl font-bold uppercase">
                FULLY<br />EQUIPPED
              </h2>
            </div>

            <p className="text-primary-foreground/90 leading-relaxed mb-8">
              Located in an established residential area at <strong>{biz.address}</strong>, <strong>{biz.name}</strong> is the perfect embodiment when 
              external amenities such as schools, banks, bus stations, tourist areas, supermarkets, 
              markets... are all readily available and adjacent to the area, maximally meeting residential and investment needs.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {amenities.map((amenity, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110">
                    <amenity.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <p className="text-sm font-medium">{amenity.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Map/Location Image */}
          <div className="relative">
            <img 
              // You can use a fixed map image or use image from Sheets if column F is a map image
              src={biz.image || "/images/location-map.jpg"} 
              alt={`Location of ${biz.name}`}
              className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-2xl border-4 border-primary-foreground/10"
            />
            {/* Location Label Overlay */}
            <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              STRATEGIC LOCATION
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
