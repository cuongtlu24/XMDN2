"use client";
import React, { useEffect, useState } from "react";
import { 
  FileCheck, Building, FileText, Sparkles, MapPin, Phone, Mail, 
  Facebook, Youtube, CheckCircle2, ArrowRight, Menu, X, TreePine, 
  Home, Car, TrendingUp, Rocket, Building2, ShieldCheck, Check, 
  PhoneCall, Globe, Users 
} from "lucide-react";

// --- UI COMPONENTS (Thay thế cho thư mục ui/) ---
const Button = ({ children, className, variant, size, ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all active:scale-95 shadow-md disabled:opacity-50";
  const variants: any = {
    primary: "bg-[#052c24] text-white hover:bg-[#0a4d3f]",
    secondary: "bg-[#c49a5c] text-white hover:bg-[#b3894b]", // Màu vàng đồng
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

const Input = (props: any) => (
  <input {...props} className={`w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#c49a5c] outline-none transition-all ${props.className}`} />
);

// --- MAIN PAGE ---
export default function FullLandingPage() {
  const [bizData, setBizData] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?gid=0&single=true&output=csv";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const host = window.location.hostname.toLowerCase();
        let sub = host.split(".")[0];
        if (sub === "www" || sub === "localhost" || sub === "constructionxuandinh") sub = "hoanghai09";

        const res = await fetch(SHEET_URL, { cache: "no-store" });
        const text = await res.text();
        
        // Regex xử lý CSV: Đảm bảo cột C (Địa chỉ có dấu phẩy) không làm lệch cột D, E
        const rows = text.split("\n").map(row => {
          const matches = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
          return matches ? matches.map(cell => cell.replace(/^"(.*)"$/, '$1').trim()) : [];
        });
        
        const match = rows.find(r => r[0]?.toLowerCase() === sub) || rows[1];
        if (match) {
          setBizData({
            subdomain: match[0],
            name: match[1], // Tên đầy đủ
            address: match[2],
            document: match[3],
            phone: match[4],
            image: match[5]
          });
        }
      } catch (e) { console.error("Lỗi:", e); }
    };
    fetchData();
  }, []);

  if (!bizData) return <div className="h-screen flex items-center justify-center bg-[#052c24] text-white uppercase tracking-widest animate-pulse">Đang tải dữ liệu {bizData?.name}...</div>;

  const province = bizData.address.split(",").pop()?.trim() || "Lâm Đồng";

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* 1. HEADER */}
      <header className="fixed top-0 w-full z-50 bg-[#052c24]/95 backdrop-blur-md text-white border-b border-white/10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black text-[#c49a5c] uppercase leading-none">{bizData.name}</span>
            <span className="text-[9px] tracking-[0.3em] text-white/40 uppercase mt-1">Bất động sản nghỉ dưỡng</span>
          </div>
          <nav className="hidden lg:flex items-center gap-6 font-bold text-[11px] uppercase tracking-widest">
            <a href="#home" className="hover:text-[#c49a5c]">Trang chủ</a>
            <a href="#overview" className="hover:text-[#c49a5c]">Tổng quan</a>
            <a href="#amenities" className="hover:text-[#c49a5c]">Vị trí</a>
            <a href="#investment" className="hover:text-[#c49a5c]">Tiềm năng</a>
            <a href="#legal" className="hover:text-[#c49a5c]">Pháp lý</a>
            <a href="#contact" className="hover:text-[#c49a5c]">Liên hệ</a>
            <Button variant="secondary" size="sm" onClick={() => window.open(`tel:${bizData.phone}`)}>{bizData.phone}</Button>
          </nav>
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      {/* 2. HERO */}
      <section id="home" className="relative h-screen flex items-center justify-center text-center text-white px-4">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${bizData.image}')` }}>
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-4xl animate-in fade-in zoom-in duration-1000">
          <p className="text-[#c49a5c] font-bold tracking-[0.4em] uppercase mb-4 text-xs">Tuyệt tác an cư</p>
          <h1 className="text-4xl md:text-7xl font-black mb-8 uppercase leading-tight tracking-tighter">
            {bizData.name} <br/> <span className="text-[#c49a5c]">TẠI {province}</span>
          </h1>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 inline-block text-left mb-8">
            <p className="text-sm">📍 <strong>Vị trí:</strong> {bizData.address}</p>
            <p className="text-sm">📄 <strong>Pháp lý:</strong> {bizData.document} (Sổ hồng riêng)</p>
          </div>
          <br/>
          <Button variant="secondary" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView()}>NHẬN BÁO GIÁ NGAY</Button>
        </div>
      </section>

      {/* 3. OVERVIEW (InvestmentSection) */}
      <section id="overview" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <img src={bizData.image} className="rounded-[2rem] shadow-2xl" alt="Overview" />
          <div>
            <h3 className="text-[#c49a5c] font-bold uppercase text-sm mb-4 tracking-widest">Tâm điểm đầu tư</h3>
            <h2 className="text-4xl font-black text-[#052c24] mb-6 uppercase">Sinh lời vượt bậc</h2>
            <p className="text-slate-600 leading-relaxed mb-8 font-medium italic">
              "{bizData.name} tọa lạc tại {bizData.address}, đón đầu xu hướng Second Home với không gian xanh và hạ tầng đang phát triển mạnh mẽ."
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
                <TrendingUp className="text-[#c49a5c]" /> <span className="font-bold text-sm">Thanh khoản cao</span>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
                <FileCheck className="text-[#c49a5c]" /> <span className="font-bold text-sm">Sổ hồng sẵn</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AMENITIES */}
      <section id="amenities" className="py-24 bg-[#052c24] text-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase">Tiện ích ngoại khu <br/> <span className="text-[#c49a5c]">Hoàn hảo</span></h2>
            <p className="text-white/60 mb-10 leading-relaxed">Nằm trong khu dân cư hiện hữu, dự án kết nối dễ dàng đến trường học, bệnh viện, chợ và các khu du lịch nổi tiếng tại {province}.</p>
            <div className="grid grid-cols-3 gap-6">
              {[ {icon: MapPin, t: "Giao thông"}, {icon: TreePine, t: "Du lịch"}, {icon: Home, t: "Dân cư"} ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#c49a5c] transition-all">
                    <item.icon className="text-[#c49a5c] group-hover:text-white" />
                  </div>
                  <p className="text-[10px] font-bold uppercase">{item.t}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative p-4 border border-white/10 rounded-3xl">
            <img src={bizData.image} className="rounded-2xl" alt="Map" />
            <div className="absolute top-10 left-10 bg-[#c49a5c] text-white px-4 py-2 rounded-full text-xs font-bold">VỊ TRÍ CHIẾN LƯỢC</div>
          </div>
        </div>
      </section>

      {/* 5. POTENTIAL (PotentialSection) */}
      <section id="investment" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#c49a5c] font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2"><Sparkles size={16}/> Cơ hội hiếm có</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#052c24] mt-4 uppercase">Tiềm năng đầu tư an cư</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              {[
                `${bizData.name} - Tâm điểm kết nối vùng kinh tế ${province}.`,
                "Đón đầu quy hoạch sử dụng đất ở giai đoạn 2021-2030.",
                "Hưởng lợi trực tiếp từ hạ tầng cao tốc liên tỉnh.",
                "Phát triển đô thị sinh thái xanh bền vững."
              ].map((text, i) => (
                <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border-l-4 border-[#c49a5c]">
                  <CheckCircle2 className="text-[#c49a5c] shrink-0" /> <p className="font-bold text-slate-700 text-sm">{text}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#052c24] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-4">Nhận báo giá chi tiết</h3>
              <p className="text-white/50 mb-8 text-sm italic">Liên hệ hotline hoặc để lại thông tin để nhận bảng giá mới nhất tháng này.</p>
              <div className="text-4xl font-black text-[#c49a5c] mb-8 tracking-tighter">{bizData.phone}</div>
              <Button variant="secondary" className="w-full py-5 text-lg" onClick={() => window.open(`tel:${bizData.phone}`)}>GỌI TƯ VẤN NGAY</Button>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#c49a5c]/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURES (FeaturesSection) */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { i: Car, l: "GIAO THÔNG", s: "THUẬN TIỆN" },
              { i: TrendingUp, l: "THANH KHOẢN", s: "CAO" },
              { i: FileCheck, l: "PHÁP LÝ", s: "MINH BẠCH" },
              { i: Users, l: "DÂN CƯ", s: "HIỆN HỮU" },
              { i: Rocket, l: "TIỀM NĂNG", s: "PHÁT TRIỂN" },
              { i: Building2, l: "HẠ TẦNG", s: "ĐỒNG BỘ" }
            ].map((f, i) => (
              <div key={i} className="text-center group p-4">
                <div className="w-14 h-14 bg-[#052c24] text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c49a5c] transition-all"><f.i size={24}/></div>
                <p className="font-black text-[10px] text-slate-900">{f.l}</p>
                <p className="text-[9px] text-slate-400 font-bold">{f.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LEGAL (LegalSection) */}
      <section id="legal" className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto bg-[#052c24] p-12 md:p-20 rounded-[4rem] text-white relative shadow-2xl">
            <ShieldCheck className="w-20 h-20 text-[#c49a5c] mx-auto mb-8" />
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase">Pháp lý minh bạch</h2>
            <p className="text-white/60 mb-12 font-medium">Sổ hồng riêng từng nền - Công chứng sang tên ngay trong ngày.</p>
            <div className="bg-white/10 border border-white/20 p-8 rounded-3xl inline-block">
              <span className="text-[10px] uppercase font-bold text-[#c49a5c] tracking-widest block mb-2">Mã số trích lục tài liệu</span>
              <span className="text-3xl md:text-5xl font-black tracking-tighter">{bizData.document}</span>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {["Sổ hồng riêng", "Sang tên ngay", "Hỗ trợ vay 50-70%", "Thổ cư sẵn"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-[11px] font-bold border border-white/10 italic"><Check size={14} className="text-[#c49a5c]"/> {t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONTACT (ContactSection) */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-black text-[#052c24] mb-6 uppercase">Đầu tư <span className="text-[#c49a5c]">Đắt giá</span> <br/> An nhiên sinh lời</h2>
            <p className="text-slate-600 mb-10 leading-relaxed font-medium">Đội ngũ chuyên viên tư vấn của <strong>{bizData.name}</strong> luôn sẵn sàng hỗ trợ Quý khách 24/7. Đừng bỏ lỡ cơ hội sở hữu bất động sản tiềm năng nhất tại {province}.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm"><Phone className="text-[#c49a5c]"/> <span className="font-bold">{bizData.phone}</span></div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm"><MapPin className="text-[#c49a5c]"/> <span className="font-bold text-sm">{bizData.address}</span></div>
            </div>
          </div>
          <div className="bg-[#052c24] p-10 rounded-[3rem] shadow-2xl">
            {submitted ? (
              <div className="text-center text-white py-10">
                <CheckCircle2 className="w-20 h-20 text-[#c49a5c] mx-auto mb-6" />
                <h3 className="text-2xl font-bold uppercase">Gửi thành công!</h3>
                <p className="text-white/60 mt-4">Chúng tôi sẽ liên hệ lại trong ít phút.</p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <Input placeholder="Họ và tên Quý khách" required />
                <Input type="tel" placeholder="Số điện thoại" required />
                <Input type="email" placeholder="Email nhận báo giá" required />
                <Button variant="secondary" className="w-full py-5 text-lg">ĐĂNG KÝ NHẬN THÔNG TIN</Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 9. FOOTER (FooterSection) */}
      <footer className="bg-[#052c24] text-white pt-24 pb-10 border-t border-white/5">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-16 mb-20">
          <div>
            <h4 className="text-2xl font-black text-[#c49a5c] mb-6 uppercase tracking-tighter">{bizData.name}</h4>
            <p className="text-white/40 leading-relaxed text-sm font-medium italic">"Tận tâm kiến tạo những không gian sống xanh và giá trị đầu tư bền vững cho khách hàng."</p>
          </div>
          <div>
            <h5 className="font-bold mb-8 uppercase text-[10px] tracking-[0.3em] text-white/30">Liên hệ</h5>
            <div className="space-y-6">
              <div className="flex gap-4 items-start"><MapPin className="text-[#c49a5c] shrink-0" size={20}/> <span className="text-sm font-semibold text-white/70">{bizData.address}</span></div>
              <div className="flex gap-4 items-center"><Phone className="text-[#c49a5c] shrink-0" size={20}/> <span className="text-xl font-black text-white">{bizData.phone}</span></div>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-8 uppercase text-[10px] tracking-[0.3em] text-white/30">Kết nối</h5>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#c49a5c] transition-all cursor-pointer"><Facebook /></div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#c49a5c] transition-all cursor-pointer"><Youtube /></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-10 border-t border-white/5 text-center">
          <p className="text-white/20 text-[9px] uppercase font-bold tracking-[0.5em]">© 2024 {bizData.name}. Powered by XMDN Ecosystem.</p>
        </div>
      </footer>

    </div>
  );
}
