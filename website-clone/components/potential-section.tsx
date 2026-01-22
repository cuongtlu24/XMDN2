import { Button } from "@/components/ui/button"
import { FileCheck, Building, FileText } from "lucide-react"

const benefits = [
  { icon: FileCheck, label: "Sổ hồng riêng" },
  { icon: Building, label: "Hỗ trợ ngân hàng" },
  { icon: FileText, label: "Công chứng sang tên ngay" },
]

const potentialPoints = [
  "Bảo Lâm – 1 trong 4 vùng kinh tế trọng điểm tỉnh Lâm Đồng.",
  "Lộc An sáp nhập vào TP. Bảo Lộc.",
  "Phát triển đô thị sinh thái mới: du lịch sinh thái rừng, thác, hồ; du lịch văn hóa, cảnh quan nông nghiệp…",
  "Chú trọng phát triển các đô thị chức năng công nghiệp, thương mại dịch vụ. Hệ thống dân cư đô thị và nông thôn mới.",
  "UBND huyện Bảo Lâm đề nghị phê duyệt chỉ tiêu sử dụng \"đất ở\" theo mức cao nhất giai đoạn 2021 - 2030.",
  "Xây dựng các dự án hạ tầng mang tính chiến lược: xây dựng nút giao thông kết nối Dầu Giây – Đà Lạt; nâng cấp quốc lộ 20, 55…"
]

export function PotentialSection() {
  return (
    <section id="investment" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            TIỀM NĂNG ĐẦU TƯ VÀ AN CƯ
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Benefits */}
          <div className="bg-muted rounded-lg p-8">
            <ul className="space-y-4">
              {potentialPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg">•</span>
                  <p className="text-muted-foreground leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Benefits Icons */}
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-10 h-10 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground text-sm">{benefit.label}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button 
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-10"
              >
                NHẬN BÁO GIÁ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
