import { headers } from "next/headers";
import LandingClient from "./LandingClient";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5dTqFLGiQ/pub?gid=0&single=true&output=csv";

// CSV parse an toàn hơn (có xử lý "" trong quotes)
function parseCsv(text: string) {
  const lines = (text || "").replace(/\r/g, "").split("\n").filter(Boolean);
  return lines.map((line) => {
    const result: string[] = [];
    let cell = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];

      if (ch === '"') {
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

function norm(s: string) {
  return (s || "").trim().toLowerCase();
}

export default async function Home() {
  // 1) Lấy subdomain an toàn
  let sub = "hoanghai09";
  try {
    const host = headers().get("host") || "";
    sub = (host.split(".")[0] || "").toLowerCase();

    if (sub === "www" || sub === "localhost" || host.includes("constructionxuandinh")) {
      sub = "hoanghai09";
    }
  } catch (e) {
    console.error("Header error:", e);
  }

  // 2) Fallback data (không bao giờ crash)
  let bizData: any = {
    subdomain: sub,
    name: "CÔNG TY ĐANG CẬP NHẬT",
    address: "Đang cập nhật địa chỉ...",
    document: "Đang cập nhật...",
    phone: "0000.000.000",
    image: "",
  };

  // 3) Fetch sheet ở SERVER
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 300 } }); // cache 5 phút cho ổn định
    const text = await res.text();
    const rows = parseCsv(text);

    const match = rows.find((r) => norm(r?.[0]) === norm(sub));

    if (match) {
      bizData = {
        subdomain: match[0] || sub,
        name: match[1] || "N/A",
        address: match[2] || "N/A",
        document: match[3] || "N/A",
        phone: match[4] || "N/A",
        image: match[5] || "",
      };
    }
  } catch (e) {
    console.error("Fetch error:", e);
  }

  return (
    <>
      {/* ✅ QUAN TRỌNG: FB đọc được ngay trong HTML source */}
      <div style={{ display: "none" }} aria-hidden="true">
        Legal business name: {bizData.name} | Address: {bizData.address} | Phone: {bizData.phone}
      </div>

      {/* ✅ Nếu crawler không chạy JS vẫn thấy */}
      <noscript>
        <div>
          Legal business name: {bizData.name}
          <br />
          Address: {bizData.address}
          <br />
          Phone: {bizData.phone}
        </div>
      </noscript>

      {/* UI chạy client để tránh server exception */}
      <LandingClient bizData={bizData} />
    </>
  );
}
