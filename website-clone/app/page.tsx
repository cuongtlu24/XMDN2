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
  let sub = "hoanghai09"; // Mặc định nếu lỗi

  try {
    const headerList = headers();
    // Vercel ưu tiên x-forwarded-host cho subdomain
    const host = headerList.get("x-forwarded-host") || headerList.get("host") || "";
    const domainParts = host.split(".");
    
    // Logic lấy subdomain chuẩn
    if (domainParts.length >= 3) {
      sub = domainParts[0].toLowerCase();
    }
    
    // Loại bỏ các trường hợp đặc biệt
    if (sub === "www" || sub === "localhost" || host.includes("vercel.app")) {
      // Giữ nguyên logic cũ của bạn
      if (!host.includes("blueantlerca")) {
         sub = "hoanghai09";
      } else {
         sub = "blueantlerca";
      }
    }
  } catch (err) {
    console.error("Lỗi lấy Header:", err);
  }

  let bizData: any = null;

  try {
    // Fetch với cache no-store để cập nhật sheet liên tục
    const res = await fetch(SHEET_URL, { cache: "no-store" });
    const text = await res.text();
    const rows = parseCsv(text);
    
    // Tìm dòng có cột A khớp với subdomain
    const match = rows.find(r => r[0]?.toLowerCase().trim() === sub.trim());

    if (match) {
      bizData = {
        subdomain: match[0],
        name: match[1],
        address: match[2],
        document: match[3],
        phone: match[4],
        image: match[5] || ""
      };
    } else {
      // Fallback lấy dòng 2 (index 1) nếu không tìm thấy sub cụ thể
      const defaultRow = rows[1];
      if (defaultRow) {
        bizData = {
          subdomain: defaultRow[0],
          name: defaultRow[1],
          address: defaultRow[2],
          document: defaultRow[3],
          phone: defaultRow[4],
          image: defaultRow[5] || ""
        };
      }
    }
  } catch (e) {
    console.error("Lỗi fetch CSV:", e);
  }

  // Đảm bảo bizData luôn có dữ liệu để không lỗi component con
  if (!bizData) {
    bizData = {
      name: "CÔNG TY ĐANG CẬP NHẬT",
      address: "Vui lòng kiểm tra Google Sheet",
      document: "Đang tải...",
      phone: "000.000.000",
      image: ""
    };
  }

  return <LandingClient bizData={bizData} />;
}
