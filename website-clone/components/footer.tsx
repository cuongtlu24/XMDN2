import { Phone, MapPin, FileText, Globe } from "lucide-react"

export function Footer({ biz }: { biz: any }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16 border-t border-background/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider text-secondary">
                Thông tin liên hệ
              </h3>
              <h4 className="text-lg font-semibold mb-6">{biz.name}</h4>
            </div>
            
            <div className="space-y-4 text-background/80 text-sm">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Phone className="w-4 h-4 text-secondary" />
                </div>
                <a href={`tel:${biz.phone}`} className="hover:text-secondary transition-colors font-medium">
                  HOTLINE: {biz.phone}
                </a>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors mt-1">
                  <MapPin className="w-4 h-4 text-secondary" />
                </div>
                <span className="leading-relaxed">
                  Địa chỉ: {biz.address}
                </span>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <FileText className="w-4 h-4 text-secondary" />
                </div>
                <span>Mã tài liệu: {biz.document}</span>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Globe className="w-4 h-4 text-secondary" />
                </div>
                <span className="lowercase">{biz.subdomain}.constructionxuandinh.sbs</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Danh mục</h3>
            <ul className="grid grid-cols-1 gap-3">
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
                    className="text-background/60 hover:text-secondary text-sm transition-all flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Trust */}
          <div className="bg-background/5 p-6 rounded-xl border border-background/10">
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">Cam kết dịch vụ</h3>
            <p className="text-background/60 text-sm leading-relaxed italic mb-4">
              "{biz.name} tự hào là đơn vị cung cấp các sản phẩm bất động sản vườn sinh thái với pháp lý minh bạch, sổ hồng riêng từng nền, hỗ trợ khách hàng tối đa trong quá trình giao dịch."
            </p>
            <div className="pt-4 border-t border-background/10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">
                Verified Document: {biz.document}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4 text-background/40 text-[11px] uppercase tracking-widest">
          <p>© {currentYear} {biz.name}. All rights reserved.</p>
          <p>Phát triển bởi XMDN Team</p>
        </div>
      </div>
    </footer>
  )
}
