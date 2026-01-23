import { headers } from "next/headers";
import LandingClient from "./LandingClient";

// ✅ CẬP NHẬT LINK CHUẨN (Có gid=0 và single=true)
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?gid=0&single=true&output=csv";

function parseCsv(text: string) {
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

function norm(s: string) {
  return (s || "").replace(/^\ufeff/, "").trim().toLowerCase();
}

export default async function Home() {
  let sub = "hoanghai09"; 

  try {
    const h = headers();
    // ✅ Lấy host chính xác nhất từ Vercel
    const hostRaw = h.get("x-forwarded-host") || h.get("host") || "";
    const host = hostRaw.split(",")[0].trim().toLowerCase();
    
    // Tách lấy phần đầu tiên trước dấu chấm
    const parts = host.split(".");
    const first = parts[0] || "";

    // ✅ LOGIC SUBDOMAIN CHẶT CHẼ
    if (parts.length >= 3) {
      // Nếu là sub.domain.com -> lấy sub
      sub = first;
    } else {
      // Nếu là domain.com -> lấy mặc định
      sub = "hoanghai09";
    }

    // Các trường hợp ép về mặc định
    if (["www", "localhost", "constructionxuandinh"].includes(sub)) {
      sub = "hoanghai09";
    }
  } catch (e) {
    console.error("Header error:", e);
  }

  let bizData: any = null;

  try {
    // ✅ Fetch dữ liệu mới nhất (không cache quá lâu để test cho chuẩn)
    const res = await fetch(SHEET_URL, { next: { revalidate: 0 } });
    const text = await res.text();
    const rows = parseCsv(text);
    const wanted = norm(sub);

    // ✅ Tìm kiếm khớp subdomain
    const match = rows.find((r) => norm(r?.[0] || "") === wanted);

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
      // Nếu ko khớp sub cụ thể, lấy dòng 2 (index 1) làm mặc định thay vì gán cứng
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

  // Fallback cuối cùng nếu lỗi mạng/sheet
  if (!bizData) {
    bizData = { subdomain: sub, name: "CÔNG TY ĐANG CẬP NHẬT", address: "Vui lòng kiểm tra Sheet", document: "N/A", phone: "000", image: "" };
  }

  return (
    <>
      {/* Cấu trúc này giúp Bot Facebook đọc được ngay dữ liệu pháp lý */}
      <div style={{ display: "none" }} aria-hidden="true">
        <h1>{bizData.name}</h1>
        <p>Address: {bizData.address}</p>
        <p>Tax/Document: {bizData.document}</p>
        <p>Phone: {bizData.phone}</p>
      </div>

      <LandingClient bizData={bizData} />
    </>
  );
}
