"use client";
import React, { useEffect, useState } from "react";
import { 
  FileCheck, Building, FileText, Sparkles, 
  MapPin, Phone, Mail, Facebook, Youtube, 
  CheckCircle2, ArrowRight, Menu, X, TreePine, 
  Home, Car, TrendingUp, Rocket, Building2, 
  ShieldCheck, Check, PhoneCall, Globe
} from "lucide-react";

// --- CẤU HÌNH UI COMPONENTS NHỎ ---
const Button = ({ children, className, ...props }: any) => (
  <button className={`px-6 py-3 rounded-full font-bold transition-all active:scale-95 shadow-md ${className}`} {...props}>
    {children}
  </button>
);

// --- MAIN PAGE COMPONENT ---
export default function FullLandingPage() {
  const [bizData, setBizData] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?gid=0&single=true&output=csv";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const host = window.location.hostname.toLowerCase();
        let sub = host.split(".")[0];
        if (sub === "www" || sub === "localhost" || sub === "constructionxuandinh") {
          sub = "hoanghai09"; 
        }

        const res = await fetch(SHEET_URL, { cache: "no-store" });
        const text = await res.text();
        
        // Regex parse CSV chuẩn xử lý dấu phẩy trong địa chỉ
        const rows = text.split("\n").map(row => {
          const matches = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
          return matches ? matches.map(cell => cell.replace(/^"(.*)"$/, '$1').trim()) : [];
        });
        
        const match = rows.find(r => r[0]?.toLowerCase() === sub) || rows[1];
        if (match) {
          setBizData({
            subdomain: match[0], name: match[1], address: match[2],
            document: match[3], phone: match[4], image: match[5]
          });
        }
      } catch (e) { console.error("Lỗi lấy dữ liệu:", e); }
    };
    fetchData();
  }, []);

  if (!bizData) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#052c24] text-white font-sans">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium animate-pulse uppercase tracking-widest">Đang tải dữ liệu dự án...</p>
      </div>
    );
  }

  const province = bizData.address.split(",").pop()?.trim() || "Lâm Đồng";

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-yellow-500 selection:text-[#052c24]">
      
      {/* 1. HEADER (Gộp từ header.tsx) */}
      <header className="fixed top-0 w-full z-50 bg-[#052c24]/95 backdrop-blur-md text-white border-b border-white/10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black text-yellow-500 uppercase tracking-tighter leading-none">{bizData.name}</span>
            <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-bold mt-1">Premium Real Estate</span>
          </div>
          <nav className="hidden lg:flex items-center gap-8 font-bold text-[12px] uppercase tracking-[0.1em]">
            <a href="#overview" className="hover:text-yellow-500 transition-colors">Tổng quan</a>
            <a href="#amenities" className="hover:text-yellow-500 transition-colors">Vị trí</a>
            <a href="#investment" className="hover:text-yellow-500 transition-colors">Tiềm năng</a>
            <a href="#legal" className="hover:text-yellow-500 transition-colors">Pháp lý</a>
            <Button className="bg-yellow-600 hover:bg-yellow-500 text-white py-2" onClick={() => window.open(`tel:${bizData.phone}`)}>
              {bizData.phone}
            </Button>
          </nav>
          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* 2. HERO (Gộp từ hero-section.tsx) */}
      <section id="home" className="relative h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${bizData.image}')` }}>
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl animate-in fade-in zoom-in duration-1000">
          <p className="text-yellow-500 font-bold tracking-[0.3em] uppercase mb-4 text-sm">Tuyệt tác nghỉ dưỡng sinh thái</p>
          <h1 className="text-4xl md:text-7xl font-black mb-8 uppercase leading-[1.1] tracking-tighter">
            {bizData.name} <br/> <span className="text-yellow-500 italic">TẠI {province}</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
              <MapPin className="text-yellow-500 w-5 h-5"/>
              <span className="text-sm font-semibold">{bizData.address}</span>
            </div>
          </div>
          <Button className="bg-yellow-600 hover:bg-yellow-500 text-white px-12 py-8 text-xl font-black rounded-full shadow-2xl hover:scale-105 transition-all" onClick={() => window.location.href='#legal'}>
            NHẬN HỒ SƠ PHÁP LÝ
          </Button>
        </div>
      </section>

      {/* 3. POTENTIAL (Gộp từ potential-section.tsx) */}
      <section id="investment" className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 text-yellow-600 mb-4 uppercase font-bold tracking-widest text-xs">
              <Sparkles className="w-4 h-4" /> <span>Cơ hội hiếm có</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#052c24] uppercase leading-tight">Tiềm năng đầu tư <br/> & an cư tại {bizData.name}</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                `Tâm điểm kết nối vùng kinh tế tại ${province}.`,
                `Đón đầu quy hoạch sử dụng đất giai đoạn 2021-2030.`,
                "Hạ tầng chiến lược với các tuyến cao tốc sắp hình thành.",
                "Không gian sống sinh thái thác hồ tự nhiên đẳng cấp."
              ].map((text, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow border-l-8 border-yellow-500">
                  <CheckCircle2 className="w-6 h-6 text-yellow-600 shrink-0" />
                  <p className="font-bold text-slate-700">{text}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#052c24] p-12 rounded-[3rem] text-white relative shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 italic text-yellow-500">Bắt đầu hành trình đầu tư ngay</h3>
              <p className="text-white/60 mb-10 leading-relaxed">Liên hệ Hotline để nhận bảng giá chi tiết, sơ đồ vị trí và tham quan dự án miễn phí hàng tuần.</p>
              <div className="text-4xl font-black text-white mb-8 tracking-tighter">{bizData.phone}</div>
              <Button className="w-full bg-yellow-500 text-[#052c24] py-6 text-xl font-black rounded-2xl hover:bg-yellow-400">
                NHẬN BÁO GIÁ QUA ZALO
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LEGAL (Gộp từ legal-section.tsx) */}
      <section id="legal" className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto bg-slate-50 p-12 md:p-20 rounded-[4rem] border-2 border-dashed border-slate-200 relative">
            <ShieldCheck className="w-24 h-24 text-yellow-600 mx-auto mb-8" />
            <h2 className="text-4xl font-black mb-6 uppercase text-[#052c24]">Pháp lý minh bạch 100%</h2>
            <p className="text-slate-500 mb-12 text-lg font-medium">Sổ hồng riêng từng nền - Công chứng sang tên trong ngày.</p>
            <div className="inline-flex flex-col items-center bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <span className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-2">Mã số tài liệu / Trích lục</span>
              <span className="text-3xl md:text-5xl font-black text-yellow-600 tracking-tighter">{bizData.document}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER (Gộp từ footer.tsx) */}
      <footer className="bg-[#052c24] text-white pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-16 mb-20">
          <div>
            <h4 className="text-2xl font-black text-yellow-500 mb-6 uppercase tracking-tighter">{bizData.name}</h4>
            <p className="text-white/50 leading-relaxed font-medium">Chuyên trang bất động sản nghỉ dưỡng sinh thái hàng đầu tại {province}. Cam kết an tâm - sinh lời - pháp lý vững vàng.</p>
          </div>
          <div>
            <h5 className="font-bold mb-8 uppercase text-xs tracking-[0.3em] text-white/30">Liên hệ trực tiếp</h5>
            <ul className="space-y-6">
              <li className="flex gap-4"><MapPin className="text-yellow-500 w-6 h-6 shrink-0"/> <span className="text-sm font-semibold text-white/80 leading-relaxed">{bizData.address}</span></li>
              <li className="flex gap-4"><Phone className="text-yellow-500 w-6 h-6 shrink-0"/> <span className="text-xl font-black text-white">{bizData.phone}</span></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-8 uppercase text-xs tracking-[0.3em] text-white/30">Mạng xã hội</h5>
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-yellow-500 transition-all cursor-pointer group"><Facebook className="group-hover:text-[#052c24]"/></div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-yellow-500 transition-all cursor-pointer group"><Youtube className="group-hover:text-[#052c24]"/></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-10 border-t border-white/5 text-center">
          <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.4em]">© 2024 {bizData.name}. Hệ thống quản trị bởi XMDN Ecosystem.</p>
        </div>
      </footer>

    </div>
  );
}
