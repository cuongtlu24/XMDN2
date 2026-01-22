import { Button } from "@/components/ui/button"

export function InvestmentSection({ biz }: { biz: any }) {
  return (
    <section id="overview" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img 
              // Ưu tiên dùng ảnh từ biz.image, nếu không có thì dùng ảnh mặc định
              src={biz.image || "/images/villa-garden.jpg"} 
              alt={`${biz.name} Villa`}
              className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary rounded-lg hidden lg:block" />
          </div>

          {/* Content */}
          <div>
            <div className="mb-6">
              <h3 className="text-secondary font-bold text-lg mb-2 uppercase">TÂM ĐIỂM ĐẦU TƯ</h3>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                SINH LỜI<br />VƯỢT BẬC
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong>{biz.name}</strong> nằm tại vị trí đắc địa, kết nối thuận tiện với các khu vực 
                phát triển hàng đầu tại tỉnh Lâm Đồng. Trong thời gian tới, thị trường BĐS tại 
                <strong> {biz.address}</strong> và khu vực lân cận có nhiều lợi thế lớn để gia tăng giá trị 
                nhờ quy hoạch đầu tư phát triển hạ tầng giao thông và thương mại của địa phương.
              </p>
              <p>
                Khu nhà vườn sinh thái <strong>{biz.name}</strong> nằm trong khu dân cư hiện hữu với nhiều 
                tiện ích liền kề, vô cùng thích hợp cho chủ nhân an cư nghỉ dưỡng hoặc đầu tư sinh lời. 
                Đồng thời, dự án đón đầu xu hướng "Second Home" thông qua hệ thống kết nối vùng hiện đại, 
                đặc biệt là các tuyến cao tốc chiến lược.
              </p>
            </div>

            <Button 
              className="mt-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 py-6 rounded-lg shadow-md transition-all hover:scale-105"
            >
              NHẬN BÁO GIÁ DỰ ÁN
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
