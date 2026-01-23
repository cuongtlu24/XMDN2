import { headers } from "next/headers";
import LandingClient from "./LandingClient";

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?gid=0&single=true&output=csv";

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
  const headerList = headers();
  
  // Ưu tiên lấy subdomain từ x-forwarded-host (chuẩn cho Vercel/Proxy)
  const host = headerList.get("x-forwarded-host") || headerList.get("host") || "";
  
  const hostParts = host.split(".");
  let sub = hostParts[0].toLowerCase();
  
  // Kiểm tra nếu là domain chính hoặc localhost thì dùng default
  if (
    sub === "www" || 
    sub === "localhost" || 
    host.includes("constructionxuandinh.sbs") && hostParts.length <= 2 ||
    sub === "constructionxuandinh"
  ) {
    sub = "hoanghai09"; 
  }

  let bizData: any = null;

  try {
    const res = await fetch(SHEET_URL, { cache: "no-store" });
    const text = await res.text();
    const rows = parseCsv(text);
    
    // Tìm dòng khớp subdomain (Cột A)
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
      // Nếu không khớp, lấy dòng đầu tiên sau header (Dòng 2) làm mẫu
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

  // Fallback an toàn tuyệt đối
  if (!bizData) {
    bizData = {
      subdomain: sub,
      name: "CÔNG TY ĐANG CẬP NHẬT",
      address: "Vui lòng kiểm tra lại Google Sheets",
      document: "00000000",
      phone: "0900000000",
      image: ""
    };
  }

  return <LandingClient bizData={bizData} />;
}
