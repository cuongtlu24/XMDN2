import LandingClient from "./LandingClient";
import { headers } from "next/headers";

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?gid=0&single=true&output=csv";

// Hàm parse CSV chuyên dụng chạy trên Server
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
  // Lấy subdomain từ headers
  const headerList = headers();
  const host = headerList.get("host") || "";
  let sub = host.split(".")[0].toLowerCase();
  
  if (sub === "www" || sub === "localhost" || sub.includes("constructionxuandinh")) {
    sub = "hoanghai09"; 
  }

  let bizData = null;

  try {
    // Fetch dữ liệu ngay trên Server
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
      // Mặc định nếu không tìm thấy subdomain
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
    console.error("Lỗi Server Fetch:", e);
  }

  // Fallback nếu có lỗi xảy ra để trang web không bị trắng
  if (!bizData) {
    bizData = {
      subdomain: "error",
      name: "Dữ liệu đang được cập nhật",
      address: "Vui lòng quay lại sau",
      document: "N/A",
      phone: "N/A",
      image: ""
    };
  }

  // Truyền dữ liệu trực tiếp vào Client Component
  return <LandingClient bizData={bizData} />;
}
