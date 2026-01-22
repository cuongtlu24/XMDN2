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

    {/* About & Trust */}
<div className="bg-secondary/5 p-8 rounded-3xl border border-secondary/20 shadow-xl relative overflow-hidden">
  <h3 className="text-xl font-black mb-6 uppercase tracking-[0.2em] text-secondary border-b border-secondary/20 pb-2 inline-block">
    Cam kết dịch vụ
  </h3>
  
  <p className="text-xl md:text-2xl leading-relaxed font-bold italic mb-8 text-background/90">
    "{biz.name} tự hào là đơn vị cung cấp các sản phẩm bất động sản vườn sinh thái với pháp lý minh bạch, sổ hồng riêng từng nền, hỗ trợ khách hàng tối đa trong quá trình giao dịch."
  </p>

  <div className="pt-6 border-t border-secondary/30">
    <div className="flex items-center gap-3">
      {/* Icon Shield để tăng độ uy tín */}
      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          className="w-5 h-5 text-secondary-foreground stroke-[3]"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>
      
      {/* Verified Document: To, Vàng, Nổi bật */}
      <p className="text-xl md:text-2xl uppercase tracking-tighter text-secondary font-black">
        Verified Document: <span className="underline decoration-2 underline-offset-4">{biz.document}</span>
      </p>
    </div>
    
    <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 mt-2 font-bold ml-11">
      Hệ thống xác thực dữ liệu thời gian thực
    </p>
  </div>

  {/* Hiệu ứng trang trí chìm phía sau */}
  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />
</div>

       {/* Bottom Bar */}
<div className="mt-20 pt-10 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-6 text-background/40 text-[12px] uppercase tracking-[0.2em] font-bold">
  {/* Bản quyền */}
  <p>© {currentYear} {biz.name}. All rights reserved.</p>
  
  {/* Đơn vị phát triển: Đã thay đổi theo ý bạn */}
  <p className="flex items-center gap-2">
    <span>Phát triển bởi</span>
    <span className="text-secondary/60 hover:text-secondary transition-colors duration-300">
      {biz.name}
    </span>
  </p>
</div>
          
      </div>
    </footer>
  )
}
