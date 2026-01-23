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
  // Lấy host đầy đủ (ví dụ: blueprintcapital.constructionxuandinh.sbs)
  const host = headerList.get("x-forwarded-host") || headerList.get("host") || "";
  
  let sub = "";

  // LOGIC NHẬN DIỆN SUBDOMAIN MỚI:
  const parts = host.split(".");
  
  if (parts.length >= 3) {
    // Nếu có từ 3 thành phần trở lên (sub.domain.ltd), lấy cái đầu tiên
    sub = parts[0].toLowerCase();
  } else {
    // Nếu chỉ có 2 thành phần (domain.ltd), đây là trang chủ
    sub = "hoanghai09";
  }

  // Xử lý ngoại lệ cho www hoặc localhost
  if (sub === "www" || sub === "localhost" || sub === "constructionxuandinh") {
    sub = "hoanghai09";
  }

  let bizData: any = null;

  try {
    const res = await fetch(SHEET_URL, { cache: "no-store" });
    const text = await res.text();
    const rows = parseCsv(text);
    
    // Tìm kiếm chính xác subdomain trong cột A của Google Sheet
    // .trim() để loại bỏ khoảng trắng thừa trong file CSV
    const match = rows.find(r => r[0]?.toLowerCase().trim() === sub);

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
      // Nếu không tìm thấy trong sheet, dùng dòng đầu tiên làm mặc định
      const defaultRow = rows[1];
      if (defaultRow) {
        bizData = {
          subdomain: sub, // Vẫn giữ sub để biết đang ở đâu
          name: defaultRow[1],
          address: defaultRow[2],
          document: defaultRow[3],
          phone: defaultRow[4],
          image: defaultRow[5] || ""
        };
      }
    }
  } catch (e) {
    console.error("Lỗi fetch:", e);
  }

  // Dự phòng cuối cùng
  if (!bizData) {
    bizData = {
      subdomain: sub,
      name: "Dữ liệu đang cập nhật",
      address: "Vui lòng kiểm tra lại Google Sheet",
      document: "N/A",
      phone: "N/A",
      image: ""
    };
  }

  return <LandingClient bizData={bizData} />;
}
