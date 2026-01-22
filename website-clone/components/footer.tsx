import { Phone, MapPin, FileText, Globe } from "lucide-react"

export function Footer({ biz }: { biz: any }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16 border-t border-background/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        
        {/* Company Info */}
<div className="space-y-8">
  <div>
    <h3 className="text-xl font-bold mb-4 uppercase tracking-wider text-secondary/80">
      Thông tin liên hệ
    </h3>
    {/* Tên công ty: To, đậm và màu vàng nổi bật */}
    <h4 className="text-3xl md:text-4xl font-black text-secondary mb-2 leading-tight">
      {biz.name}
    </h4>
    <div className="w-24 h-1 bg-secondary/30 rounded-full" />
  </div>
  
  <div className="space-y-6">
    {/* Hotline */}
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
        <Phone className="w-5 h-5 text-secondary-foreground" />
      </div>
      <a href={`tel:${biz.phone}`} className="text-2xl font-bold hover:text-secondary transition-colors">
        HOTLINE: {biz.phone}
      </a>
    </div>

    {/* Địa chỉ */}
    <div className="flex items-start gap-4 group">
      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 mt-1">
        <MapPin className="w-5 h-5 text-secondary" />
      </div>
      <span className="text-lg font-medium leading-snug text-background/90">
        Địa chỉ: {biz.address}
      </span>
    </div>

    {/* Mã tài liệu: To và nổi bật */}
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

    {/* Website */}
    <div className="flex items-center gap-4 group opacity-70">
      <div className="w-10 h-10 rounded-xl bg-background/5 flex items-center justify-center shrink-0">
        <Globe className="w-5 h-5 text-secondary" />
      </div>
      <span className="text-sm font-medium lowercase">
        {biz.subdomain}.constructionxuandinh.sbs
      </span>
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
