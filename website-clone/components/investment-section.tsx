import { Button } from "@/components/ui/button"

export function InvestmentSection() {
  return (
    <section id="overview" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img 
              src="/images/villa-garden.jpg" 
              alt="Star Hills Lộc An Villa"
              className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary rounded-lg hidden lg:block" />
          </div>

          {/* Content */}
          <div>
            <div className="mb-6">
              <h3 className="text-secondary font-bold text-lg mb-2">TÂM ĐIỂM ĐẦU TƯ</h3>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                SINH LỜI<br />VƯỢT BẬC
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Star Hills Lộc An nằm tại vị trí đắc địa, gần như tiếp giáp TP. Bảo Lộc – 
                một trong các địa phương phát triển hàng đầu tại tỉnh Lâm Đồng, trong thời gian 
                tới thị trường BĐS nơi đây có nhiều lợi thế để gia tăng giá trị (định hướng sáp 
                nhập một phần vào TP. Bảo Lộc, quy hoạch đầu tư phát triển hạ tầng giao thông, 
                thương mại của địa phương,…).
              </p>
              <p>
                Khu nhà vườn sinh thái Star Hills Lộc An nằm trong khu dân cư hiện hữu với nhiều 
                tiện ích liền kề vô cùng thích hợp cho chủ nhân an cư nghỉ dưỡng và đầu tư. 
                Đồng thời, thông qua kết nối vùng bằng tuyến Cao tốc Dầu Giây – Liên Khương 
                đón đầu xu hướng second home.
              </p>
            </div>

            <Button 
              className="mt-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8"
            >
              NHẬN BÁO GIÁ
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
