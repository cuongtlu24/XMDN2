"use client"

import { useState } from "react"
import { Menu, X, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "TRANG CHỦ", href: "#home" },
  { label: "TỔNG QUAN", href: "#overview" },
  { label: "VỊ TRÍ", href: "#amenities" }, // Khớp với ID của AmenitiesSection
  { label: "GIÁ TRỊ", href: "#investment" },
  { label: "PHÁP LÝ", href: "#legal" },
  { label: "LIÊN HỆ", href: "#contact" },
]

export function Header({ biz }: { biz: any }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-md border-b border-background/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand Name lấy từ Sheets */}
         <a href="#home" className="flex flex-col">
    {/* Tên công ty: To và nổi bật */}
    <span className="text-secondary font-black text-xl md:text-2xl tracking-tighter leading-none uppercase">
      {biz.name}
    </span>
    
    {/* Mã tài liệu: Hiển thị ngay dưới tên công ty, màu vàng nhẹ để phân biệt */}
    <span className="text-secondary/80 text-[11px] font-bold tracking-widest mt-1">
      {biz.document}
    </span>

    {/* Slogan/Sub-brand */}
    <span className="text-background/50 text-[10px] tracking-[0.2em] font-light">
      PREMIUM REAL ESTATE
    </span>
  </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-background/70 hover:text-secondary text-xs font-bold transition-all uppercase tracking-widest"
              >
                {item.label}
              </a>
            ))}
            
            <div className="h-6 w-[1px] bg-background/20 mx-2" />
            
            <a href={`tel:${biz.phone}`} className="flex items-center gap-2 text-secondary hover:scale-105 transition-transform">
              <PhoneCall size={18} />
              <span className="font-bold text-sm">{biz.phone}</span>
            </a>

            <Button 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-6 rounded-full shadow-lg"
            >
              ĐĂNG KÝ NGAY
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-background p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden py-6 border-t border-background/10 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-background/80 hover:text-secondary text-sm font-bold tracking-widest py-2 border-b border-background/5"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-4 pt-4">
                 <a href={`tel:${biz.phone}`} className="flex items-center justify-center gap-3 text-secondary font-bold py-3 bg-secondary/10 rounded-lg">
                  <PhoneCall size={20} />
                  {biz.phone}
                </a>
                <Button 
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-black py-6 rounded-lg uppercase"
                >
                  NHẬN THÔNG TIN DỰ ÁN
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
