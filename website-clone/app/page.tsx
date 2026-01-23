import { headers } from "next/headers";
import LandingClient from "./LandingClient";

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?gid=0&single=true&output=csv";

// ✅ Bước trung gian: Làm sạch chuỗi tuyệt đối
function clean(s: string) {
  return (s || "")
    .replace(/^\ufeff/, "") // Xóa ký tự BOM của Google
    .trim()
    .toLowerCase();
}

function parseCsv(text: string) {
  // Loại bỏ dòng trống và làm sạch dữ liệu đầu vào
  const lines = (text || "").replace(/\r/g, "").split("\n").filter(line => line.trim() !== "");
  
  return lines.map((line) => {
    const result: string[] = [];
    let cell = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { cell += '"'; i++; } 
        else { inQuotes = !inQuotes; }
        continue;
      }
      if (ch === "," && !inQuotes) { result.push(cell.trim()); cell = ""; } 
      else { cell += ch; }
    }
    result.push(cell.trim());
    return result;
  });
}

export default async function Home() {
  let sub = "hoanghai09"; 

  try {
    const h = headers();
    const hostRaw = h.get("x-forwarded-host") || h.get("host") || "";
    // Lấy phần đầu tiên của host (ví dụ blueantlerca)
    const host = hostRaw.split(",")[0].trim().toLowerCase();
    const parts = host.split(".");
    
    // Nếu có subdomain thật (3 phần trở lên như sub.domain.com)
    if (parts.length >= 3) {
      sub = parts[0];
    } else {
      sub = "hoanghai09";
    }

    // Chống ghi đè nếu là domain chính
    if (["www", "localhost", "constructionxuandinh"].includes(sub)) {
      sub = "hoanghai09";
    }
  } catch (e) {
    console.error("Header error:", e);
  }

  let bizData: any = null;

  try {
    // ✅ Gọi link trung gian Google Sheet
    const res = await fetch(SHEET_URL, { 
       cache: "no-store",
       headers: { 'Content-Type': 'text/csv; charset=utf-8' } 
    });
    const text = await res.text();
    const rows = parseCsv(text);
    
    const wanted = clean(sub);

    // ✅ LOGIC MATCH MỚI: So sánh sau khi đã làm sạch cả 2 bên
    const match = rows.find((r) => clean(r[0]) === wanted);

    if (match) {
      bizData = {
        subdomain: match[0],
        name: match[1],
        address: match[2],
        document: match[3],
        phone: match[4],
        image: match[5] || "",
      };
    } else {
      // Nếu không tìm thấy, lấy dòng 2 (index 1) làm default
      const defaultRow = rows[1];
      if (defaultRow) {
        bizData = {
          subdomain: sub,
          name: defaultRow[1],
          address: defaultRow[2],
          document: defaultRow[3],
          phone: defaultRow[4],
          image: defaultRow[5] || "",
        };
      }
    }
  } catch (e) {
    console.error("Fetch error:", e);
  }

  // Chặn lỗi cuối cùng
  if (!bizData) {
    bizData = { subdomain: sub, name: "DỮ LIỆU LỖI", address: "Vui lòng xem lại Sheet", document: "N/A", phone: "N/A" };
  }

  return (
    <>
      {/* HTML tĩnh cho FB Crawler */}
      <div style={{ display: "none" }} aria-hidden="true">
        <h1>{bizData.name}</h1>
        <p>Business Name: {bizData.name}</p>
        <p>Address: {bizData.address}</p>
        <p>Document: {bizData.document}</p>
        <p>Phone: {bizData.phone}</p>
      </div>

      <LandingClient bizData={bizData} />
    </>
  );
}
