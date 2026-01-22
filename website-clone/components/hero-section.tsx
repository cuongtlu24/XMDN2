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
  // Tạo giá trị mặc định nếu dữ liệu Sheets bị trống
  const companyName = biz.name || "Đang cập nhật tên đơn vị";
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
            <p className="text-background/60 text-xs md:text-sm tracking-widest uppercase">
              DOCUMENT: {biz.document || "N/A"}
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 leading-tight text-balance uppercase tracking-tight">
            {companyName}
          </h1>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-secondary mb-6 italic">
            Khu nhà vườn sinh thái tiêu chuẩn
          </h2>

          <p className="text-background/90 text-base md:text-lg leading-relaxed mb-10 max-w-2xl text-pretty">
            Sự xuất hiện của chúng tôi tại khu vực sẽ tiên phong cho xu hướng Second Home, 
            kiến tạo trở thành không gian sống lí tưởng, cho phép chủ nhân tận hưởng 
            không khí xanh, bền vững an cư và đầu tư cho tương lai.
          </p>

          <div className="bg-background/10 backdrop-blur-md border border-background/20 rounded-lg p-6 mb-8 max-w-md shadow-2xl">
            <h3 className="text-background font-semibold text-lg mb-4 border-b border-background/20 pb-2">Thông tin tổng quan</h3>
            <ul className="space-y-3 text-background/90 text-sm">
              <li className="flex gap-2">
                <span className="text-secondary font-bold">•</span> 
                <span><strong>Vị trí:</strong> {biz.address || "Đang cập nhật"}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary font-bold">•</span> 
                <span><strong>Đơn vị:</strong> {companyName}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary font-bold">•</span> 
                <span><strong>Hotline:</strong> {biz.phone || "Liên hệ trực tiếp"}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary font-bold">•</span> 
                <span><strong>Pháp lý:</strong> {biz.document || "Đang xác minh"} (Sổ hồng sẵn)</span>
              </li>
            </ul>
          </div>

          <Button 
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-10 py-7 text-lg shadow-lg hover:scale-105 transition-transform"
          >
            NHẬN BÁO GIÁ NGAY
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
