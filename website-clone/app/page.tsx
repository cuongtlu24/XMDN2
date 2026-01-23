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
  let sub = "hoanghai09"; // Mặc định
  
  try {
    const headerList = headers();
    const host = headerList.get("host") || "";
    sub = host.split(".")[0].toLowerCase();
    
    if (sub === "www" || sub === "localhost" || sub.includes("constructionxuandinh")) {
      sub = "hoanghai09"; 
    }
  } catch (e) {
    console.error("Header error:", e);
  }

  let bizData = {
    subdomain: sub,
    name: "CÔNG TY ĐANG CẬP NHẬT",
    address: "Đang cập nhật địa chỉ...",
    document: "Đang cập nhật...",
    phone: "0000.000.000",
    image: ""
  };

  try {
    const res = await fetch(SHEET_URL, { cache: "no-store" });
    const text = await res.text();
    const rows = parseCsv(text);
    const match = rows.find(r => r[0]?.toLowerCase() === sub);

    if (match) {
      bizData = {
        subdomain: match[0] || sub,
        name: match[1] || "N/A",
        address: match[2] || "N/A",
        document: match[3] || "N/A",
        phone: match[4] || "N/A",
        image: match[5] || ""
      };
    }
  } catch (e) {
    console.error("Fetch error:", e);
  }

  // Truyền bizData xuống LandingClient để render phía client an toàn
  return <LandingClient bizData={bizData} />;
}
