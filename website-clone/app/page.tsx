// KHÔNG DÙNG "use client" ở đầu file này để Next.js hiểu đây là Server Component
import { headers } from "next/headers";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { InvestmentSection } from "@/components/investment-section";
import { AmenitiesSection } from "@/components/amenities-section";
import { PotentialSection } from "@/components/potential-section";
import { LegalSection } from "@/components/legal-section";
import { FeaturesSection } from "@/components/features-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?gid=0&single=true&output=csv";

// Hàm parse CSV chạy trực tiếp trên máy chủ
function parseCsv(text: string) {
  return text.split(/\r?\n/).map(line => {
    const result = [];
    let cell = "";
    let inQuotes = false;
    for (let char of line) {
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) {
        result.push(cell.trim());
        cell = "";
      } else cell += char;
    }
    result.push(cell.trim());
    return result;
  });
}

export default async function Home() {
  // 1. Lấy subdomain ngay trên Server (FB sẽ đọc được dữ liệu tương ứng)
  const headerList = headers();
  const host = headerList.get("host") || "";
  let sub = host.split(".")[0].toLowerCase();
  
  if (sub === "www" || sub === "localhost" || sub.includes("constructionxuandinh")) {
    sub = "hoanghai09"; 
  }

  let bizData: any = null;

  try {
    // 2. Fetch dữ liệu từ Google Sheets ngay khi Server xử lý request
    const res = await fetch(SHEET_URL, { cache: "no-store" });
    const text = await res.text();
    const rows = parseCsv(text);
    const match = rows.find(r => r[0]?.toLowerCase() === sub);

    if (match) {
      bizData = {
        subdomain: match[0],
        name: match[1],
        address: match[2],
        document: match[3],
        phone: match[4],
        image: match[5]
      };
    } else {
      const defaultData = rows[1]; 
      if (defaultData) {
        bizData = {
          subdomain: defaultData[0],
          name: defaultData[1],
          address: defaultData[2],
          document: defaultData[3],
          phone: defaultData[4],
          image: defaultData[5]
        };
      }
    }
  } catch (e) {
    console.error("Fetch error:", e);
  }

  // Dự phòng nếu không có dữ liệu
  if (!bizData) {
    bizData = {
      name: "Dữ liệu đang cập nhật",
      address: "Vui lòng liên hệ hotline",
      document: "00000000",
      phone: "0900000000"
    };
  }

  // 3. Render HTML - Lúc này dữ liệu đã nằm sẵn trong các thẻ <h1>, <footer>... 
  // FB crawler sẽ đọc được ngay mà không cần Javascript chạy
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
