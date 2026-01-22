import { Button } from "@/components/ui/button"
import { FileCheck, Building, FileText, Sparkles } from "lucide-react"

const benefits = [
  { icon: FileCheck, label: "Sổ hồng riêng" },
  { icon: Building, label: "Hỗ trợ ngân hàng" },
  { icon: FileText, label: "Công chứng sang tên ngay" },
]

export function PotentialSection({ biz }: { biz: any }) {
  // Tách tỉnh/thành phố từ địa chỉ để hiển thị linh hoạt hơn
  const addressParts = biz.address.split(",");
  const province = addressParts[addressParts.length - 1]?.trim() || "khu vực";

  const potentialPoints = [
    `${biz.name} – Tâm điểm kết nối vùng kinh tế trọng điểm tại ${province}.`,
    `Vị trí đắc địa tại ${biz.address}, khu vực đang được quy hoạch mở rộng và phát triển mạnh mẽ.`,
    "Phát triển đô thị sinh thái mới: kết hợp du lịch nghỉ dưỡng, hồ, thác và cảnh quan nông nghiệp bền vững.",
    "Chú trọng phát triển các đô thị chức năng, thương mại dịch vụ và hệ thống dân cư hiện đại.",
    `Đón đầu quy hoạch sử dụng "đất ở" mức cao nhất giai đoạn 2021 - 2030 tại địa phương.`,
    "Hưởng lợi trực tiếp từ các dự án hạ tầng chiến lược: nâng cấp quốc lộ và các tuyến cao tốc kết nối liên tỉnh.",
  ]

  return (
    <section id="investment" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-secondary mb-4">
            <Sparkles className="w-5 h-5 fill-current" />
            <span className="font-bold tracking-widest uppercase text-sm">Cơ hội hiếm có</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 uppercase">
            TIỀM NĂNG ĐẦU TƯ <br className="hidden md:block" /> VÀ AN CƯ TẠI {biz.name}
          </h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Potential Points */}
          <div className="bg-muted/50 rounded-2xl p-8 md:p-10 border border-muted shadow-sm">
            <ul className="space-y-6">
              {potentialPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-4 group">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-secondary shrink-0 group-hover:scale-150 transition-transform" />
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Benefits Icons & Action */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow border border-muted">
                  <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/10">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-bold text-foreground text-xs uppercase tracking-tighter">
                    {benefit.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-foreground text-background p-8 rounded-2xl relative overflow-hidden">
              <div className="relative z-10 text-center">
                <h3 className="text-xl font-bold mb-4">Bắt đầu hành trình đầu tư ngay hôm nay</h3>
                <p className="text-background/70 text-sm mb-8">
                  Liên hệ Hotline <span className="text-secondary font-bold">{biz.phone}</span> để nhận bảng giá và sơ đồ vị trí mới nhất.
                </p>
                <Button 
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-black px-12 py-8 text-xl rounded-full shadow-2xl hover:scale-105 transition-transform"
                >
                  NHẬN BÁO GIÁ CHI TIẾT
                </Button>
              </div>
              {/* Trang trí background */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
