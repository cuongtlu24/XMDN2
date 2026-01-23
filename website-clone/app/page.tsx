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

type BizData = {
  subdomain: string;
  name: string;
  address: string;
  document: string;
  phone: string;
  image?: string;
};

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5dTqFLGiQ/pub?gid=0&single=true&output=csv";

// ===== CSV parser an toàn (xử lý dấu phẩy trong ngoặc kép) =====
function parseCsv(text: string): string[][] {
  const lines = (text || "").replace(/\r/g, "").split("\n").filter(Boolean);
  return lines.map((line) => {
    const result: string[] = [];
    let cell = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        // xử lý "" -> "
        if (inQuotes && line[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }

      if (ch === "," && !inQuotes) {
        result.push(cell.trim());
        cell = "";
      } else {
        cell += ch;
      }
    }
    result.push(cell.trim());
    return result;
  });
}

function normalizeSub(s: string) {
  return (s || "").trim().toLowerCase();
}

function getSubdomainFromHost(host: string) {
  const h = (host || "").toLowerCase().split(":")[0]; // bỏ port
  const parts = h.split(".").filter(Boolean);
  if (parts.length < 2) return "";

  let sub = parts[0];
  if (sub === "www") sub = parts[1] || "";
  return sub;
}

async function getBizDataServer(): Promise<BizData> {
  const host = headers().get("host") || "";
  let sub = getSubdomainFromHost(host);

  // fallback cho local / domain không có sub
  if (!sub || sub === "localhost" || sub === "constructionxuandinh") {
    sub = "hoanghai09";
  }

  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 300 } });
    if (!res.ok) {
      console.error("[CSV] fetch failed:", res.status, res.statusText);
      return {
        subdomain: sub,
        name: "Business",
        address: "",
        document: "",
        phone: "",
      };
    }

    const text = await res.text();
    const rows = parseCsv(text);

    const wanted = normalizeSub(sub);

    const match = rows.find((r) => normalizeSub(r?.[0] || "") === wanted);

    const row = match || rows.find((r) => (r?.[0] || "").trim().length > 0) || [];

    return {
      subdomain: row[0] || sub,
      name: row[1] || "Business",
      address: row[2] || "",
      document: row[3] || "",
      phone: row[4] || "",
      image: row[5] || "",
    };
  } catch (e: any) {
    console.error("[getBizDataServer] error:", e?.message || e);
    return {
      subdomain: sub,
      name: "Business",
      address: "",
      document: "",
      phone: "",
    };
  }
}

export async function generateMetadata() {
  const biz = await getBizDataServer();
  return { title: biz.name || "Business" };
}

export default async function Home() {
  const bizData = await getBizDataServer();

  return (
    <main className="overflow-x-hidden">
      {/* ✅ QUAN TRỌNG: FB crawler sẽ thấy trong HTML source */}
      <div style={{ display: "none" }} aria-hidden="true">
        Legal business name: {bizData.name} | Address: {bizData.address} | Phone: {bizData.phone}
      </div>

      <noscript>
        <div>
          Legal business name: {bizData.name}
          <br />
          Address: {bizData.address}
          <br />
          Phone: {bizData.phone}
        </div>
      </noscript>

      {/* ✅ GIỮ NGUYÊN TOÀN BỘ COMPONENT CỦA BẠN */}
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
