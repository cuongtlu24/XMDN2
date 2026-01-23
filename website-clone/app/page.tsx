import { headers } from "next/headers";
import LandingClient from "./LandingClient";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?output=csv";

// CSV parse an toàn (xử lý dấu phẩy trong ngoặc kép + "" -> ")
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
  return (s || "").replace(/^\ufeff/, "").trim().toLowerCase();
}

export default async function Home() {
  // ✅ Lấy subdomain đúng
  let sub = "hoanghai09"; // fallback mặc định

  try {
 const h = headers();

// ✅ Ưu tiên host thật qua proxy
const hostRaw =
  h.get("x-forwarded-host") ||
  h.get("host") ||
  "";

// x-forwarded-host đôi khi có dạng: "blueantlerca.constructionxuandinh.sbs, something"
const host = hostRaw.split(",")[0].trim().toLowerCase();

const first = (host.split(".")[0] || "").toLowerCase();
sub = first;

// ✅ fallback chỉ khi root/local hoặc đang chạy trên vercel domain
if (
  sub === "www" ||
  sub === "localhost" ||
  sub === "constructionxuandinh" ||
  host.endsWith(".vercel.app")
) {
  sub = "hoanghai09";
}


    // ✅ CHỈ fallback khi thật sự là root/local (KHÔNG dùng host.includes("constructionxuandinh"))
    if (sub === "www" || sub === "localhost" || sub === "constructionxuandinh") {
      sub = "hoanghai09";
    }
  } catch (e) {
    console.error("Header error:", e);
  }

  // ✅ Fallback data (để không bao giờ crash)
  let bizData: any = {
    subdomain: sub,
    name: "CÔNG TY ĐANG CẬP NHẬT",
    address: "Đang cập nhật địa chỉ...",
    document: "Đang cập nhật...",
    phone: "0000.000.000",
    image: "",
  };

  // ✅ Fetch + match sheet
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 300 } });
    const text = await res.text();
    const rows = parseCsv(text);

    const wanted = norm(sub);

    // ✅ match mềm: trim + lowercase + bỏ BOM
    const match = rows.find((r) => norm(r?.[0] || "") === wanted);

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
      {/* ✅ FB crawler đọc được ngay trong View Source */}
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

      {/* UI chạy client cho an toàn */}
      <LandingClient bizData={bizData} />
    </>
  );
}
