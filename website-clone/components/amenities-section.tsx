import { MapPin, TreePine, Home } from "lucide-react"

const amenities = [
  {
    icon: MapPin,
    title: "Hệ thống giao thông đồng bộ",
  },
  {
    icon: TreePine,
    title: "Khu du lịch",
  },
  {
    icon: Home,
    title: "Khu dân cư",
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
              <h3 className="text-secondary font-bold text-lg mb-2 uppercase">TIỆN ÍCH NGOẠI KHU</h3>
              <h2 className="text-3xl md:text-4xl font-bold uppercase">
                ĐÁP ỨNG<br />ĐẦY ĐỦ
              </h2>
            </div>

            <p className="text-primary-foreground/90 leading-relaxed mb-8">
              Nằm trong khu dân cư hiện hữu tại <strong>{biz.address}</strong>, <strong>{biz.name}</strong> chính là kết tinh hoàn hảo khi 
              các tiện ích ngoại khu: trường học, ngân hàng, bến xe, khu du lịch, siêu thị, 
              chợ… đều có sẵn và liền kề khu vực, đáp ứng được tối đa nhu cầu an cư và đầu tư.
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
              // Bạn có thể dùng ảnh bản đồ cố định hoặc dùng ảnh từ Sheets nếu cột F là ảnh bản đồ
              src={biz.image || "/images/location-map.jpg"} 
              alt={`Vị trí ${biz.name}`}
              className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-2xl border-4 border-primary-foreground/10"
            />
            {/* Overlay nhãn vị trí */}
            <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              VỊ TRÍ CHIẾN LƯỢC
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
