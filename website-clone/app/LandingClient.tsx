"use client";

import { useEffect, useState } from "react";
import { Phone, MapPin, Menu, X, CheckCircle2 } from "lucide-react";

export type BizData = {
  name: string;
  address: string;
  document: string;
  phone: string;
  image?: string;
};

// ===== SLUG chuẩn hoá =====
function slugify(s: string) {
  return (s || "")
    .trim()
    .toLowerCase()
    .replace(/^\ufeff/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// ===== ẢNH fallback =====
const FALLBACKS = [
  "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1800&auto=format&fit=crop",
];

function pickFallback(key: string) {
  const s = slugify(key);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return FALLBACKS[h % FALLBACKS.length];
}

export default function LandingClient({ data }: { data: BizData }) {
  const [mobile, setMobile] = useState(false);

  // Set browser tab title = tên doanh nghiệp
  useEffect(() => {
    if (data?.name) document.title = data.name;
  }, [data?.name]);

  // Smooth scroll for in-page anchors
  useEffect(() => {
    const handler = (e: any) => {
      const a = e.target?.closest?.("a[href^='#']");
      if (!a) return;
      const href = a.getAttribute("href");
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      setMobile(false);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const bg = "#052c24";
  const gold = "#c4a52e";

  const heroImage =
    (data.image || "").trim().length > 5
      ? (data.image || "").trim()
      : pickFallback(typeof window !== "undefined" ? window.location.hostname : "site");

  const nav = [
    { t: "TRANG CHỦ", h: "#home" },
    { t: "TỔNG QUAN", h: "#tongquan" },
    { t: "VỊ TRÍ", h: "#vitri" },
    { t: "TIỆN ÍCH", h: "#tienich" },
    { t: "GIÁ TRỊ ĐẦU TƯ", h: "#giatridautu" },
    { t: "PHÁP LÝ", h: "#phaply" },
    { t: "ĐĂNG KÝ", h: "#dangky" },
    { t: "LIÊN HỆ", h: "#lienhe" },
  ];

  return (
    <div className="min-h-screen text-white" style={{ background: bg, color: "white" }}>
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-[100] border-b border-white/10 backdrop-blur bg-[#052c24]/95">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 md:py-6 flex items-center justify-between gap-6">
          {/* Left: Brand */}
          <div className="min-w-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full border border-white/10 bg-[#031d18]/60 text-[10px] font-black uppercase tracking-[4px] text-white/80">
                XÁC MINH
              </span>

              <h1
                className="font-black text-lg md:text-xl uppercase tracking-[3px] truncate"
                style={{ color: gold }}
                title={data.name}
              >
                {data.name}
              </h1>
            </div>

            <div className="mt-1 text-[11px] md:text-sm font-extrabold uppercase tracking-widest text-white/80">
              Document: <span style={{ color: gold }}>{data.document}</span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10 xl:gap-12 text-[12px] font-black uppercase tracking-widest">
            {nav.map((x) => (
              <a key={x.h} href={x.h} className="text-white/80 hover:text-white transition">
                {x.t}
              </a>
            ))}

            <a
              href="#dangky"
              className="px-6 py-3 rounded-2xl shadow-xl hover:scale-[1.03] transition font-black"
              style={{ background: gold, color: "white" }}
            >
              ĐĂNG KÝ
            </a>
          </nav>

          {/* Mobile */}
          <button
            className="lg:hidden p-2 rounded-xl border border-white/10 hover:bg-white/5 transition"
            onClick={() => setMobile((v) => !v)}
            aria-label="Menu"
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>

        {mobile && (
          <div className="lg:hidden border-t border-white/10 bg-[#052c24]">
            <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-4">
              {nav.map((x) => (
                <a
                  key={x.h}
                  href={x.h}
                  className="px-3 py-3 rounded-xl border border-white/10 text-[11px] font-black uppercase tracking-widest text-white/85 hover:bg-white/5 transition"
                >
                  {x.t}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section id="home" className="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-14">
        <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
          <img src={heroImage} alt="hero" className="w-full h-[520px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#052c24] via-[#052c24]/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-white/10 bg-[#031d18]/55">
                <CheckCircle2 size={18} style={{ color: gold }} />
                <span className="text-[11px] font-black uppercase tracking-[4px] text-white/85">
                  Xác minh doanh nghiệp
                </span>
              </div>

              {/* ⚠️ Nếu web Blue Antler thì bạn nên đổi phần này theo data.name hoặc nội dung phù hợp */}
              <h1 className="mt-5 text-5xl md:text-7xl font-black uppercase leading-[1.15] tracking-tight">
                {data.name.split(" ").slice(0, 2).join(" ")}{" "}
                <span style={{ color: gold }}>{data.name.split(" ").slice(2).join(" ")}</span>
              </h1>

              <p className="mt-4 text-white/90 max-w-3xl leading-relaxed text-base md:text-lg">
                Business verification website. Legal name, address, and phone are shown clearly for compliance.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#dangky"
                  className="px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition text-center"
                  style={{ background: gold, color: "white" }}
                >
                  NHẬN THÔNG TIN
                </a>

                <a
                  href="#lienhe"
                  className="px-8 py-4 rounded-2xl font-black uppercase tracking-widest border border-white/15 hover:bg-white/5 transition text-center"
                >
                  LIÊN HỆ
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/10 bg-[#031d18] mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="text-center">
            <div className="text-sm md:text-base font-black uppercase tracking-widest text-white/70">
              BUSINESS INFORMATION
            </div>
            <h2 className="mt-2 font-black text-3xl md:text-4xl uppercase tracking-widest" style={{ color: gold }}>
              {data.name}
            </h2>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <div className="text-[12px] font-black uppercase tracking-widest text-white/60">Hotline</div>
              <div className="flex items-center gap-3 text-white/85">
                <Phone size={18} style={{ color: gold }} />
                <span className="text-base font-extrabold">{data.phone}</span>
              </div>
            </div>

            <div className="space-y-3 md:col-span-2">
              <div className="text-[12px] font-black uppercase tracking-widest text-white/60">Address</div>
              <div className="flex items-start gap-3 text-white/85">
                <MapPin size={18} style={{ color: gold }} className="mt-0.5" />
                <div className="text-sm leading-relaxed">{data.address}</div>
              </div>

              <div className="text-sm font-extrabold text-white/80 uppercase tracking-widest">
                Document: <span style={{ color: gold }}>{data.document}</span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 text-center text-xs md:text-sm text-white/70 font-black uppercase tracking-widest">
            © {new Date().getFullYear()} BUSINESS VERIFICATION SYSTEM
          </div>
        </div>
      </footer>
    </div>
  );
}
