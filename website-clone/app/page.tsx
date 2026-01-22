"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { InvestmentSection } from "@/components/investment-section"
import { AmenitiesSection } from "@/components/amenities-section"
import { PotentialSection } from "@/components/potential-section"
import { LegalSection } from "@/components/legal-section"
import { FeaturesSection } from "@/components/features-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const [bizData, setBizData] = useState<any>(null);

  // Link CSV từ Google Sheets của bạn (Đảm bảo đã Publish to web định dạng CSV)
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?gid=0&single=true&output=csv";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const host = window.location.hostname.toLowerCase();
        let sub = host.split(".")[0];
        
        // Mặc định nếu chạy local hoặc domain chính không có subdomain
        if (sub === "www" || sub === "localhost" || sub === "constructionxuandinh") {
          sub = "hoanghai09"; 
        }

        const res = await fetch(SHEET_URL, { cache: "no-store" });
        const text = await res.text();
        
        // SỬA LỖI LỆCH CỘT: Sử dụng Regex để parse CSV an toàn
        const rows = text.split("\n").map(row => {
          const matches = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
          return matches ? matches.map(cell => cell.replace(/^"(.*)"$/, '$1').trim()) : [];
        });
        
        // Tìm dòng khớp với Subdomain (Cột A)
        const match = rows.find(r => r[0]?.toLowerCase() === sub);

        if (match) {
          setBizData({
            subdomain: match[0],
            name: match[1],
            address: match[2],
            document: match[3], // Document ID (Cột D)
            phone: match[4],    // Số điện thoại (Cột E)
            image: match[5]     // Link Ảnh (Cột F)
          });
        } else {
          // Phòng hờ lỗi 404: Nếu không khớp subdomain, lấy dòng đầu tiên có dữ liệu
          const defaultData = rows[1]; 
          if (defaultData) {
            setBizData({
              subdomain: defaultData[0],
              name: defaultData[1],
              address: defaultData[2],
              document: defaultData[3],
              phone: defaultData[4],
              image: defaultData[5]
            });
          }
        }
      } catch (e) {
        console.error("Lỗi lấy dữ liệu:", e);
      }
    };
    fetchData();
  }, []);

  if (!bizData) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#052c24] text-white">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium animate-pulse">Đang kết nối dữ liệu dự án...</p>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden">
      <Header biz={bizData} />
      <HeroSection biz={bizData} />
      <InvestmentSection biz={bizData} />
      <AmenitiesSection biz={bizData} />
      <PotentialSection biz={bizData} />
      <LegalSection biz={bizData} />
      <FeaturesSection biz={bizData} />
      <ContactSection biz={bizData} />
      <Footer biz={bizData} />
    </main>
  );
}
