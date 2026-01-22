import { Phone, MapPin, FileText, Globe, ShieldCheck } from "lucide-react"

export function Footer({ biz }: { biz: any }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16 border-t border-background/10">
      <div className="container mx-auto px-4">
        {/* Điều chỉnh Grid để cân bằng 3 cột */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
          
          {/* CỘT 1: THÔNG TIN LIÊN HỆ */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider text-secondary/80">
                Thông tin liên hệ
              </h3>
              <h4 className="text-3xl md:text-4xl font-black text-secondary mb-2 leading-tight">
                {biz.name}
              </h4>
              <div className="w-24 h-1 bg-secondary/30 rounded-full" />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-secondary-foreground" />
                </div>
                <a href={`tel:${biz.phone}`} className="text-2xl font-bold hover:text-secondary transition-colors">
                  HOTLINE: {biz.phone}
                </a>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-lg font-medium leading-snug text-background/90">
                  Địa chỉ: {biz.address}
                </span>
              </div>

              <div className="flex items-center gap-4 group bg-secondary/10 p-4 rounded-2xl border border-secondary/20">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black text-secondary tracking-[0.2em]">Hồ sơ pháp lý</span>
                  <span className="text-xl font-black text-secondary tracking-wider uppercase">
                    Mã tài liệu: {biz.document}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 group opacity-70">
                <div className="w-10 h-10 rounded-xl bg-background/5 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-sm font-medium lowercase italic underline underline-offset-4 decoration-secondary/30">
                  {biz.subdomain}.constructionxuandinh.sbs
                </span>
              </div>
            </div>
          </div>

          {/* CỘT 2: DANH MỤC (Căn giữa tuyệt đối) */}
          <div className="flex flex-col items-center justify-center text-center lg:pt-10">
            <h3 className="text-2xl font-black mb-8 uppercase tracking-[0.2em] text-secondary">
              Danh mục
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Trang chủ", href: "#home" },
                { label: "Tổng quan dự án", href: "#overview" },
                { label: "Tiện ích khu vực", href: "#amenities" },
                { label: "Giá trị đầu tư", href: "#investment" },
                { label: "Pháp lý minh bạch", href: "#legal" },
                { label: "Liên hệ tư vấn", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-lg font-bold text-background/60 hover:text-secondary transition-all hover:scale-110 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 3: CAM KẾT DỊCH VỤ */}
          <div className="bg-secondary/5 p-8 rounded-3xl border border-secondary/20 shadow-xl relative overflow-hidden">
            <h3 className="text-xl font-black mb-6 uppercase tracking-[0.2em] text-secondary border-b border-secondary/20 pb-2 inline-block">
              Cam kết dịch vụ
            </h3>
            
            <p className="text-xl md:text-2xl leading-relaxed font-bold italic mb-8 text-background/90">
              "{biz.name} tự hào là đơn vị cung cấp các sản phẩm bất động sản vườn sinh thái với pháp lý minh bạch, sổ hồng riêng từng nền, hỗ trợ khách hàng tối đa trong quá trình giao dịch."
            </p>

            <div className="pt-6 border-t border-secondary/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0 shadow-lg shadow-secondary/20">
                  <ShieldCheck className="w-6 h-6 text-secondary-foreground" />
                </div>
                <p className="text-xl md:text-2xl uppercase tracking-tighter text-secondary font-black">
                  Verified Document: <span className="underline decoration-2 underline-offset-4">{biz.document}</span>
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 mt-3 font-bold ml-12">
                Hệ thống xác thực dữ liệu thời gian thực
              </p>
            </div>
            {/* Hiệu ứng trang trí chìm */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-20 pt-10 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-6 text-background/40 text-[12px] uppercase tracking-[0.2em] font-bold">
          <p>© {currentYear} {biz.name}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Phát triển bởi</span>
            <span className="text-secondary hover:text-white transition-colors duration-300">
              {biz.name}
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
