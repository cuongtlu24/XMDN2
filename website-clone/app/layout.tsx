"use client";
import { useEffect, useState } from "react";
import React from "react"

import {
  Phone,
  MapPin,
  Menu,
  X,
  CheckCircle2,
  Home,
  Trees,
  Mountain,
  Car,
  Building2,
  Landmark,
  FileCheck,
  BadgeCheck,
  Banknote,
  Send,
} from "lucide-react";

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Smooth scroll
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest?.("a[href^='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      setMobileMenuOpen(false);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const bg = "#052c24";
  const gold = "#c4a52e";

  const nav = [
    { label: "Trang chủ", href: "#home" },
    { label: "Tổng quan", href: "#tongquan" },
    { label: "Vị trí", href: "#vitri" },
    { label: "Tiện ích", href: "#tienich" },
    { label: "Giá trị đầu tư", href: "#giatri" },
    { label: "Pháp lý", href: "#phaply" },
    { label: "Liên hệ", href: "#lienhe" },
  ];

  const amenities = [
    { icon: Car, title: "Giao thông đồng bộ", desc: "Kết nối vùng thuận tiện di chuyển" },
    { icon: Mountain, title: "Khu du lịch", desc: "Phát triển dịch vụ du lịch sinh thái" },
    { icon: Building2, title: "Khu dân cư", desc: "Dân cư hiện hữu, tiện ích liền kề" },
    { icon: Landmark, title: "Trung tâm hành chính", desc: "Gần UBND xã, trường học, chợ" },
    { icon: Trees, title: "Cảnh quan thiên nhiên", desc: "Không khí trong lành, xanh mát" },
    { icon: Home, title: "Second Home", desc: "Lý tưởng cho nghỉ dưỡng cuối tuần" },
  ];

  const potentials = [
    { icon: CheckCircle2, title: "Vị trí đắc địa", desc: "Gần TP. Bảo Lộc, giao thông thuận tiện" },
    { icon: CheckCircle2, title: "Tiềm năng tăng giá", desc: "Khu vực đang phát triển mạnh" },
    { icon: CheckCircle2, title: "Hạ tầng hoàn thiện", desc: "Đường nội bộ, điện, nước đầy đủ" },
    { icon: CheckCircle2, title: "Cộng đồng văn minh", desc: "Quy hoạch bài bản, an ninh tốt" },
  ];

  const legals = [
    { icon: FileCheck, title: "Sổ hồng riêng", desc: "Công chứng sang tên ngay" },
    { icon: BadgeCheck, title: "Pháp lý minh bạch", desc: "Đất ở nông thôn, xây dựng tự do" },
    { icon: Banknote, title: "Hỗ trợ vay ngân hàng", desc: "Lên đến 70% giá trị" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen text-white" style={{ background: bg }}>
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur" style={{ background: `${bg}ee` }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest"
              style={{ background: `${bg}99` }}
            >
              Xác minh
            </span>
            <h1 className="font-bold text-lg md:text-xl uppercase tracking-wider" style={{ color: gold }}>
              Star Hills Lộc An
            </h1>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-white/80 hover:text-white transition">
                {item.label}
              </a>
            ))}
            <a
              href="#dangky"
              className="px-5 py-2.5 rounded-xl font-bold shadow-lg hover:scale-105 transition"
              style={{ background: gold, color: bg }}
            >
              Đăng ký
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10" style={{ background: bg }}>
            <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-3">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 rounded-xl border border-white/10 text-xs font-semibold uppercase tracking-widest text-white/80 hover:bg-white/5 transition text-center"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section id="home" className="max-w-7xl mx-auto px-4 md:px-6 pt-8 md:pt-12">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src="/images/hero-bg.jpg"
            alt="Star Hills Lộc An"
            className="w-full h-[500px] md:h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/20 bg-black/40">
                <CheckCircle2 size={16} style={{ color: gold }} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">
                  Xác minh doanh nghiệp
                </span>
              </div>

              <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase leading-tight">
                Star Hills <span style={{ color: gold }}>Lộc An</span>
              </h2>

              <h3 className="mt-2 text-xl md:text-2xl font-semibold text-white/90">Khu nhà vườn sinh thái</h3>

              <p className="mt-4 text-white/85 max-w-2xl leading-relaxed text-sm md:text-base">
                Sự xuất hiện của Star Hills tại Lộc An sẽ tiên phong cho xu hướng Second Home, kiến tạo trở thành khu
                nhà vườn sinh thái lý tưởng, cho phép chủ nhân tận hưởng không khí xanh, bền vững an cư và đầu tư cho
                tương lai.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#dangky"
                  className="px-6 py-3 rounded-xl font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition text-center"
                  style={{ background: gold, color: bg }}
                >
                  Nhận báo giá
                </a>
                <a
                  href="#lienhe"
                  className="px-6 py-3 rounded-xl font-bold uppercase tracking-widest border border-white/20 hover:bg-white/10 transition text-center"
                >
                  Liên hệ
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TỔNG QUAN ===== */}
      <section id="tongquan" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">
          Thông tin <span style={{ color: gold }}>tổng quan</span>
        </h3>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
            <div className="font-bold uppercase tracking-widest text-sm" style={{ color: gold }}>
              Thông tin dự án
            </div>
            <div className="mt-4 text-white/85 text-sm leading-relaxed space-y-2">
              <p>• Vị trí: Lộc An, Bảo Lâm, Lâm Đồng</p>
              <p>• Tên dự án: Star Hills Lộc An</p>
              <p>• Diện tích: 5×20, 6×20, 6×21...</p>
              <p>• Pháp lý: Sổ hồng sẵn công chứng ngay</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:col-span-2 hover:bg-white/10 transition">
            <div className="text-xs font-bold uppercase tracking-widest text-white/60">Tâm điểm đầu tư</div>
            <div className="mt-2 text-2xl md:text-3xl font-bold uppercase">
              Sinh lời <span style={{ color: gold }}>vượt bậc</span>
            </div>
            <p className="mt-4 text-white/85 text-sm leading-relaxed">
              Star Hills Lộc An nằm tại vị trí đắc địa, gần như tiếp giáp TP. Bảo Lộc – một trong các địa phương phát
              triển hàng đầu tại tỉnh Lâm Đồng. Đây là cơ hội đầu tư sinh lời cao với tiềm năng tăng giá vượt trội.
            </p>
            <a
              href="#dangky"
              className="inline-flex mt-5 px-6 py-2.5 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition"
              style={{ background: gold, color: bg }}
            >
              Nhận báo giá
            </a>
          </div>
        </div>

        <div className="mt-8">
          <img
            src="/images/villa-garden.jpg"
            alt="Villa garden"
            className="w-full h-auto rounded-2xl border border-white/10 shadow-xl"
          />
        </div>
      </section>

      {/* ===== VỊ TRÍ ===== */}
      <section id="vitri" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider" style={{ color: gold }}>
            Vị trí dự án
          </h3>
          <p className="mt-3 text-white/85 text-sm leading-relaxed max-w-2xl mx-auto">
            Star Hills Lộc An nằm tại vị trí đắc địa, gần như tiếp giáp TP. Bảo Lộc – một trong các địa phương phát
            triển hàng đầu tại tỉnh Lâm Đồng.
          </p>
        </div>
        <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          <img src="/images/location-map.jpg" alt="Location map" className="w-full h-auto object-cover" />
        </div>
      </section>

      {/* ===== TIỆN ÍCH ===== */}
      <section id="tienich" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider" style={{ color: gold }}>
            Tiện ích ngoại khu
          </h3>
          <p className="mt-3 text-white/85 text-sm">Hệ thống tiện ích đồng bộ, đáp ứng mọi nhu cầu sinh hoạt</p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: `${gold}22` }}>
                <item.icon size={28} style={{ color: gold }} />
              </div>
              <div className="mt-4 font-bold text-base">{item.title}</div>
              <div className="mt-2 text-white/75 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GIÁ TRỊ ĐẦU TƯ ===== */}
      <section id="giatri" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider" style={{ color: gold }}>
            Giá trị đầu tư
          </h3>
          <p className="mt-3 text-white/85 text-sm">Tiềm năng sinh lời vượt trội từ vị trí chiến lược</p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {potentials.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition flex gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: `${gold}22` }}>
                <item.icon size={24} style={{ color: gold }} />
              </div>
              <div>
                <div className="font-bold text-base">{item.title}</div>
                <div className="mt-1 text-white/75 text-sm">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PHÁP LÝ ===== */}
      <section id="phaply" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider" style={{ color: gold }}>
            Pháp lý minh bạch
          </h3>
          <p className="mt-3 text-white/85 text-sm">Sổ hồng riêng từng nền, công chứng sang tên ngay</p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {legals.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: `${gold}22` }}>
                <item.icon size={28} style={{ color: gold }} />
              </div>
              <div className="mt-4 font-bold text-base">{item.title}</div>
              <div className="mt-2 text-white/75 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ĐĂNG KÝ ===== */}
      <section id="dangky" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="rounded-2xl border border-white/10 p-6 md:p-10" style={{ background: `${bg}cc` }}>
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider" style={{ color: gold }}>
              Đăng ký nhận thông tin
            </h3>
            <p className="mt-3 text-white/85 text-sm">Để lại thông tin để nhận báo giá và ưu đãi mới nhất</p>
          </div>

          {formSubmitted ? (
            <div className="mt-8 text-center">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ background: `${gold}22` }}>
                <CheckCircle2 size={32} style={{ color: gold }} />
              </div>
              <p className="mt-4 text-lg font-semibold">Cảm ơn bạn đã đăng ký!</p>
              <p className="mt-2 text-white/75 text-sm">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Họ và tên *"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-white/40 text-sm transition placeholder:text-white/50"
              />
              <input
                type="tel"
                placeholder="Số điện thoại *"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-white/40 text-sm transition placeholder:text-white/50"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-white/40 text-sm transition placeholder:text-white/50 sm:col-span-2"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition sm:col-span-2"
                style={{ background: gold, color: bg }}
              >
                <Send size={18} />
                Gửi đăng ký
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ===== LIÊN HỆ ===== */}
      <section id="lienhe" className="border-t border-white/10" style={{ background: "#031d18" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-white/60">Thông tin liên hệ</div>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold uppercase tracking-wider" style={{ color: gold }}>
              Star Hills Lộc An
            </h2>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-white/60">Menu</div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-white/80">
                {nav.map((item) => (
                  <a key={item.href} href={item.href} className="hover:text-white transition">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-white/60">Hotline</div>
              <div className="flex items-center gap-3 text-white/85">
                <Phone size={18} style={{ color: gold }} />
                <span className="text-base font-semibold">0912 345 678</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-white/60">Địa chỉ</div>
              <div className="flex items-start gap-3 text-white/85">
                <MapPin size={18} style={{ color: gold }} className="mt-0.5 shrink-0" />
                <span className="text-sm">Lộc An, Bảo Lâm, Lâm Đồng</span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 text-center text-xs text-white/60 font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} Star Hills Lộc An. All rights reserved.
          </div>
        </div>
      </section>

      {/* ===== FLOATING CTA ===== */}
      <a
        href="#dangky"
        className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full font-bold shadow-2xl hover:scale-110 transition text-xs uppercase tracking-widest"
        style={{ background: "#dc2626", color: "white" }}
      >
        Đăng ký ngay
      </a>
    </div>
  );
}
