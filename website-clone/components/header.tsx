"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "TRANG CHỦ", href: "#home" },
  { label: "TỔNG QUAN", href: "#overview" },
  { label: "VỊ TRÍ", href: "#location" },
  { label: "TIỆN ÍCH", href: "#amenities" },
  { label: "GIÁ TRỊ ĐẦU TƯ", href: "#investment" },
  { label: "PHÁP LÝ", href: "#legal" },
  { label: "LIÊN HỆ", href: "#contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="text-background font-bold text-lg">
            Star Hills LLC
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-background/80 hover:text-background text-sm font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-6"
            >
              ĐĂNG KÝ
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-background p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden py-4 border-t border-background/20">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-background/80 hover:text-background text-sm font-medium transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold mt-2"
              >
                ĐĂNG KÝ
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
