"use client";
import React, { useEffect, useState } from "react";
import { 
  FileCheck, Building, FileText, Sparkles, MapPin, Phone, Mail, 
  Facebook, Youtube, CheckCircle2, ArrowRight, Menu, X, TreePine, 
  Home, Car, TrendingUp, Rocket, Building2, ShieldCheck, Check, 
  PhoneCall, Globe, Users, ChevronRight
} from "lucide-react";

// --- CUSTOM UI COMPONENTS ---
const Button = ({ children, className, variant, size, ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all active:scale-95 shadow-md disabled:opacity-50 cursor-pointer";
  const variants: any = {
    primary: "bg-[#052c24] text-white hover:bg-[#0a4d3f]",
    secondary: "bg-[#c49a5c] text-[#052c24] hover:bg-[#d4aa6c]", 
    outline: "border-2 border-[#c49a5c] text-[#c49a5c] hover:bg-[#c49a5c] hover:text-white"
  };
  const sizes: any = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-10 py-5 text-lg"
  };
  return (
    <button className={`${baseStyles} ${variants[variant || 'primary']} ${sizes[size || 'md']} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- MAIN APPLICATION ---
export default function FullLandingPage() {
  const [bizData, setBizData] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?gid=0&single=true&output=csv";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const host = window.location.hostname.toLowerCase();
        let sub = host.split(".")[0];
        // Xử lý subdomain mặc định
        if (sub === "www" || sub === "localhost" || sub === "xmdn-2" || sub === "constructionxuandinh") {
          sub = "hoanghai09";
        }

        const res = await fetch(SHEET_URL, { cache: "no-store" });
        const text = await res.text();
        
        // --- BỘ PARSE CSV CHỐNG LỆCH CỘT (QUAN TRỌNG NHẤT) ---
        const rows = text.split("\n").map(line => {
          // Regex này nhận diện nội dung trong ngoặc kép là 1 cột duy nhất
          const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
          const matches = line.match(regex);
          return matches ? matches.map(m => m.replace(/^"(.*)"$/, '$1').trim()) : [];
        });

        // Tìm dòng theo subdomain (Cột 0)
        const match = rows.find(r => r[0]?.toLowerCase() === sub) || rows[1];

        if (match) {
          setBizData({
            subdomain: match[0],
            name: match[1],      // Cột B: Tên đầy đủ công ty/dự án
            address: match[2],   // Cột C: Địa chỉ (đã an toàn với dấu phẩy)
            document: match[3],  // Cột D: Mã hồ sơ pháp lý
            phone: match[4],     // Cột E: Số điện thoại
            image: match[5]      // Cột F: Link ảnh
          });
        }
      } catch (e) {
        console.error("Lỗi đồng bộ dữ liệu:", e);
      }
    };
    fetchData();
  }, []);

  if (!bizData) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#052c24] text-white">
      <div className="w-12 h-12 border-4 border-[#c49a5c] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="animate-pulse tracking-widest font-bold">ĐANG TẢI DỮ LIỆU DỰ ÁN...</p>
    </div>
  );

  const province = bizData.address?.split(",").pop()?.trim() || "Lâm Đồng";

  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. HEADER - Sửa lỗi hiển thị tên */}
      <header className="fixed top-0 w-full z-50 bg-[#052c24]/95 backdrop-blur-md border-b border-white/10 text-white">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <a href="#home" className="flex flex-col group">
            <span className="text-xl md:text-2xl font-black text-[#c49a5c] uppercase leading-none group-hover:scale-105 transition-transform">
              {bizData.name}
            </span>
            <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-bold mt-1">Bất động sản nghỉ dưỡng</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8 font-bold text-[11px] uppercase tracking-widest">
            <a href="#overview" className="hover:text-[#c49a5c] transition-colors">Tổng quan</a>
            <a href="#amenities" className="hover:text-[#c49a5c] transition-colors">Tiện ích</a>
            <a href="#investment" className="hover:text-[#c49a5c] transition-colors">Tiềm năng</a>
            <a href="#legal" className="hover:text-[#c49a5c] transition-colors">Pháp lý</a>
            <Button variant="secondary" size="sm" onClick={() => window.open(`tel:${bizData.phone}`)}>
              {bizData.phone}
            </Button>
          </nav>

          <button className="lg:hidden text-[#c49a5c]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION - Đầy đủ thông tin */}
      <section id="home" className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110" 
             style={{ backgroundImage: `url('${bizData.image}')` }}>
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-5xl animate-in fade-in zoom-in duration-1000">
          <p className="text-[#c49a5c] font-bold tracking-[0.5em] uppercase mb-4 text-sm">Tuyệt tác nghỉ dưỡng sinh thái</p>
          <h1 className="text-4xl md:text-8xl font-black text-white mb-8 uppercase leading-[0.9] tracking-tighter">
            {bizData.name} <br/> <span className="text-[#c49a5c]">TẠI {province}</span>
          </h1>
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/20 inline-flex flex-col md:flex-row gap-6 text-left mb-10 text-white">
            <div className="flex items-center gap-2">
              <MapPin className="text-[#c49a5c]" size={18}/> <span className="text-sm font-medium">{bizData.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-[#c49a5c]" size={18}/> <span className="text-sm font-medium">Pháp lý: {bizData.document}</span>
            </div>
          </div>
          <br/>
          <Button variant="secondary" size="lg" className="px-16" onClick={() => document.getElementById('legal')?.scrollIntoView({behavior: 'smooth'})}>
            XEM HỒ SƠ PHÁP LÝ
          </Button>
        </div>
      </section>

      {/* 3. AMENITIES - Phần Tiện ích (Bạn đang bị thiếu) */}
      <section id="amenities" className="py-24 bg-[#052c24] text-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-[#c49a5c] font-bold uppercase tracking-widest text-sm mb-4">Tiện ích ngoại khu</h3>
            <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase leading-tight">Kết nối hoàn hảo <br/> Trong tầm tay</h2>
            <p className="text-white/60 leading-relaxed mb-10 text-lg">
              Tọa lạc tại khu vực dân cư hiện hữu, {bizData.name} giúp chủ nhân dễ dàng tiếp cận hệ thống trường học, chợ, trung tâm y tế và các khu du lịch nổi tiếng chỉ trong 5-10 phút di chuyển.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: TreePine, t: "KDL Sinh thái" },
                { icon: Home, t: "Khu dân cư" },
                { icon: Car, t: "Cao tốc liên tỉnh" },
                { icon: Building2, t: "Hạ tầng đồng bộ" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-[#c49a5c]/20 transition-colors cursor-default">
                  <item.icon className="text-[#c49a5c]" size={24} />
                  <span className="font-bold text-sm uppercase">{item.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#c49a5c]/20 rounded-[3rem] blur-2xl group-hover:bg-[#c49a5c]/30 transition-all"></div>
            <img src={bizData.image} className="relative rounded-[2.5rem] shadow-2xl border border-white/10 object-cover h-[500px] w-full" alt="Vị trí" />
          </div>
        </div>
      </section>

      {/* 4. POTENTIAL - Tiềm năng đầu tư */}
      <section id="investment" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#c49a5c] font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-2 italic">
               <Sparkles size={16}/> Cơ hội đầu tư sinh lời tốt nhất 2024
            </span>
            <h2 className="text-3xl md:text-6xl font-black text-[#052c24] mt-4 uppercase">Tại sao nên chọn {bizData.name}?</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              {[
                `Đón đầu quy hoạch mở rộng đô thị tại ${province}.`,
                "Pháp lý an toàn tuyệt đối, sổ hồng riêng từng nền.",
                "Giá trị thực - Tiềm năng khai thác nghỉ dưỡng cao.",
                "Hạ tầng hoàn thiện, hệ thống thoát nước và điện đầy đủ."
              ].map((text, i) => (
                <div key={i} className="flex gap-5 p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 rounded-full bg-[#052c24] flex items-center justify-center shrink-0 group-hover:bg-[#c49a5c] transition-colors">
                    <Check className="text-white" size={24} />
                  </div>
                  <p className="font-bold text-slate-700 text-lg leading-tight">{text}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#052c24] p-12 rounded-[3.5rem] text-white relative shadow-2xl flex flex-col justify-center border-t-8 border-[#c49a5c]">
              <h3 className="text-3xl font-black mb-6 uppercase">Đăng ký tư vấn</h3>
              <p className="text-white/60 mb-10 text-lg">Liên hệ trực tiếp bộ phận kinh doanh để nhận bảng giá và sơ đồ phân lô mới nhất từ chủ đầu tư.</p>
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-[#c49a5c]/20 flex items-center justify-center">
                  <PhoneCall className="text-[#c49a5c]" size={32} />
                </div>
                <div>
                  <p className="text-[#c49a5c] text-sm font-bold uppercase tracking-widest">Hotline 24/7</p>
                  <p className="text-4xl font-black tracking-tighter">{bizData.phone}</p>
                </div>
              </div>
              <Button variant="secondary" size="lg" className="w-full py-6 text-xl" onClick={() => window.open(`tel:${bizData.phone}`)}>
                GỌI NGAY CHO CHÚNG TÔI
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LEGAL SECTION - Sửa lỗi hiển thị mã số */}
      <section id="legal" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-slate-900 p-12 md:p-20 rounded-[4rem] text-white text-center relative overflow-hidden shadow-2xl border-b-8 border-[#c49a5c]">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#c49a5c] to-transparent"></div>
            <ShieldCheck className="w-24 h-24 text-[#c49a5c] mx-auto mb-8 animate-bounce" />
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">Pháp lý minh bạch</h2>
            <p className="text-white/50 mb-12 text-xl font-medium">Mã số trích lục tài liệu đã được kiểm duyệt hệ thống:</p>
            <div className="bg-white/5 border-2 border-dashed border-[#c49a5c]/50 p-10 rounded-[2.5rem] inline-block mb-10">
              <span className="text-[#c49a5c] text-xs uppercase font-bold tracking-[0.4em] block mb-4">Mã số xác thực (Document ID)</span>
              <span className="text-4xl md:text-7xl font-black text-white tracking-widest select-all uppercase">
                {bizData.document}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold opacity-80 italic uppercase">
              <span>#Sổ_hồng_riêng</span>
              <span className="text-[#c49a5c]">•</span>
              <span>#Thổ_cư_sẵn</span>
              <span className="text-[#c49a5c]">•</span>
              <span>#Sang_tên_ngay</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER - Full thông tin */}
      <footer className="bg-[#052c24] text-white pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-16 mb-20">
          <div>
            <h4 className="text-3xl font-black text-[#c49a5c] mb-6 uppercase tracking-tighter">{bizData.name}</h4>
            <p className="text-white/40 leading-relaxed font-medium italic">
              "Cam kết mang đến những sản phẩm bất động sản có giá trị thực, pháp lý chuẩn chỉnh và tiềm năng sinh lời bền vững cho khách hàng."
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-8 uppercase text-xs tracking-[0.3em] text-white/30">Liên hệ hỗ trợ</h5>
            <div className="space-y-6">
              <div className="flex gap-4 items-start group">
                <MapPin className="text-[#c49a5c] shrink-0 group-hover:scale-110 transition-transform" size={24}/>
                <span className="text-sm font-semibold text-white/70 leading-relaxed">{bizData.address}</span>
              </div>
              <div className="flex gap-4 items-center group">
                <Phone className="text-[#c49a5c] shrink-0 group-hover:scale-110 transition-transform" size={24}/>
                <span className="text-2xl font-black text-white">{bizData.phone}</span>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-8 uppercase text-xs tracking-[0.3em] text-white/30">Kết nối cộng đồng</h5>
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#c49a5c] transition-all cursor-pointer group">
                <Facebook className="group-hover:text-[#052c24] transition-colors" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#c49a5c] transition-all cursor-pointer group">
                <Youtube className="group-hover:text-[#052c24] transition-colors" />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-10 border-t border-white/5 text-center">
          <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.5em]">
            © 2024 {bizData.name}. THIẾT KẾ & VẬN HÀNH BỞI XMDN ECOSYSTEM.
          </p>
        </div>
      </footer>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#052c24] flex flex-col p-8 lg:hidden animate-in fade-in slide-in-from-top">
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-black text-[#c49a5c]">{bizData.name}</span>
            <X size={35} className="text-white" onClick={() => setIsMenuOpen(false)} />
          </div>
          <div className="flex flex-col gap-8 text-2xl font-bold uppercase tracking-tighter text-white/80">
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Trang chủ</a>
            <a href="#amenities" onClick={() => setIsMenuOpen(false)}>Tiện ích</a>
            <a href="#investment" onClick={() => setIsMenuOpen(false)}>Tiềm năng</a>
            <a href="#legal" onClick={() => setIsMenuOpen(false)}>Pháp lý</a>
          </div>
          <div className="mt-auto">
            <Button variant="secondary" size="lg" className="w-full" onClick={() => window.open(`tel:${bizData.phone}`)}>
              GỌI {bizData.phone}
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
