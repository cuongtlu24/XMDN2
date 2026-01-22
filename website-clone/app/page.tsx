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

  // Link CSV từ Google Sheets của bạn
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?gid=0&single=true&output=csv";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const host = window.location.hostname.toLowerCase();
        let sub = host.split(".")[0];
        if (sub === "www" || sub === "localhost") sub = "hoanghai09"; // Mặc định để test

        const res = await fetch(SHEET_URL, { cache: "no-store" });
        const text = await res.text();
        const rows = text.split("\n").map(row => row.split(","));
        
        // Tìm dòng khớp với Subdomain (Cột A)
        const match = rows.find(r => r[0]?.trim().toLowerCase() === sub);

        if (match) {
          setBizData({
            subdomain: match[0],
            name: match[1],
            address: match[2],
            document: match[3],
            phone: match[4],
            image: match[5]
          });
        }
      } catch (e) {
        console.error("Lỗi lấy dữ liệu:", e);
      }
    };
    fetchData();
  }, []);

  if (!bizData) return <div className="h-screen flex items-center justify-center bg-[#052c24] text-white">Đang kết nối dữ liệu...</div>;

  return (
    <main>
      {/* Truyền dữ liệu vào từng Component thông qua thuộc tính (props) */}
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
