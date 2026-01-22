import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-16"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <div className="mb-6">
            <p className="text-background/80 text-sm md:text-base mb-2">Bay Boat Detailing LLC</p>
            <p className="text-background/60 text-xs md:text-sm">Document: B20250065510</p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 leading-tight text-balance">
            STAR HILLS LỘC AN
          </h1>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-secondary mb-6">
            Khu nhà vườn sinh thái
          </h2>

          <p className="text-background/90 text-base md:text-lg leading-relaxed mb-10 max-w-2xl text-pretty">
            Sự xuất hiện của Star Hills tại Lộc An sẽ tiên phong cho xu hướng Second Home, 
            kiến tạo trở thành khu nhà vườn sinh thái lí tưởng, cho phép chủ nhân tận hưởng 
            không khí xanh, bền vững an cư và đầu tư cho tương lai.
          </p>

          {/* Info Card */}
          <div className="bg-background/10 backdrop-blur-sm border border-background/20 rounded-lg p-6 mb-8 max-w-md">
            <h3 className="text-background font-semibold text-lg mb-4">Thông tin tổng quan</h3>
            <ul className="space-y-2 text-background/90 text-sm">
              <li><span className="text-secondary">•</span> Vị trí: Lộc An, Bảo Lâm, Lâm Đồng</li>
              <li><span className="text-secondary">•</span> Tên dự án: Star Hills Lộc An</li>
              <li><span className="text-secondary">•</span> Diện tích đa dạng: 5×20, 6×20, 6×21…</li>
              <li><span className="text-secondary">•</span> Pháp lý: Sổ hồng sẵn công chứng ngay</li>
            </ul>
          </div>

          <Button 
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 py-6 text-base"
          >
            NHẬN BÁO GIÁ
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-background/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-background/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
