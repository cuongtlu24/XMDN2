import { Phone, MapPin, FileText } from "lucide-react"

const footerLinks = [
  { label: "Trang chủ", href: "#home" },
  { label: "Giới thiệu", href: "#overview" },
  { label: "Vị trí", href: "#location" },
  { label: "Liên hệ", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 border-t border-background/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-2">THÔNG TIN LIÊN HỆ</h3>
            <h4 className="text-secondary font-semibold mb-4">Bay Boat Detailing LLC</h4>
            <div className="space-y-3 text-background/80 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary" />
                <span>HOTLINE: +13466285112</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary mt-1" />
                <span>Address: 209 SILVER LEAF DR APT D, WATSONVILLE, CA 95076</span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-secondary" />
                <span>Document: B20250065510</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Về chúng tôi</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-background/70 hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-4">Menu</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-background/70 hover:text-background transition-colors">TRANG CHỦ</a></li>
              <li><a href="#overview" className="text-background/70 hover:text-background transition-colors">TỔNG QUAN</a></li>
              <li><a href="#location" className="text-background/70 hover:text-background transition-colors">VỊ TRÍ</a></li>
              <li><a href="#amenities" className="text-background/70 hover:text-background transition-colors">TIỆN ÍCH</a></li>
              <li><a href="#investment" className="text-background/70 hover:text-background transition-colors">GIÁ TRỊ ĐẦU TƯ</a></li>
              <li><a href="#legal" className="text-background/70 hover:text-background transition-colors">PHÁP LÝ</a></li>
              <li><a href="#contact" className="text-background/70 hover:text-background transition-colors">LIÊN HỆ</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/10 text-center text-background/50 text-xs">
          <p>© 2025 Star Hills Lộc An. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
