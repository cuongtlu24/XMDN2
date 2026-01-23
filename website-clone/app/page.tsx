import { headers } from "next/headers";
import LandingClient from "./LandingClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?output=csv";

// CSV parse an toàn (xử lý dấu phẩy trong ngoặc kép + "" -> ")
function parseCsv(text: string) {
  const lines = (text || "")
    .replace(/\r/g, "")
    .split("\n")
    .filter((l) => l.trim() !== "");

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

function normalizeSlugCell(cell: string) {
  const v = norm(cell).replace(/^https?:\/\//, "").replace(/^www\./, "");
  return (v.split(".")[0] || "").trim().toLowerCase();
}

export default async function Home() {
  // ===== LẤY SUBDOMAIN TỪ MIDDLEWARE HEADERS =====
  let sub = "";
  let hostRaw = "";

  try {
    const h = headers();
    sub = (h.get("x-subdomain") || "").trim().toLowerCase();
    hostRaw = h.get("x-host-raw") || "";
  } catch (e) {
    console.error("Header error:", e);
  }

  // Nếu root domain muốn map mặc định thì set ở đây
  const DEFAULT_SUB = ""; // ví dụ: "hoanghai09"
  if (!sub) sub = DEFAULT_SUB;

  // fallback data
  let bizData: any = {
    subdomain: sub,
    name: "CÔNG TY ĐANG CẬP NHẬT",
    address: "Đang cập nhật địa chỉ...",
    document: "Đang cập nhật...",
    phone: "0000.000.000",
    image: "",
  };

  let debugFirstSlugs: string[] = [];

  // ===== FETCH SHEET + MATCH =====
  try {
    const res = await fetch(SHEET_URL, { cache: "no-store" });
    const text = await res.text();
    const rows = parseCsv(text);

    debugFirstSlugs = rows.slice(0, 8).map((r) => (r?.[0] || "").toString());

    const wanted = norm(sub);
    if (wanted) {
      const match = rows.find((r) => normalizeSlugCell(r?.[0] || "") === wanted);

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
    }
  } catch (e) {
    console.error("Fetch error:", e);
  }

  return (
    <>
      <div style={{ display: "none" }} aria-hidden="true">
        <h1>{bizData.name}</h1>
        <p>Address: {bizData.address}</p>
        <p>Tax/Document: {bizData.document}</p>
        <p>Phone: {bizData.phone}</p>
      </div>

      <div style={{ display: "none" }} aria-hidden="true">
        DEBUG hostRaw={hostRaw} | sub={sub} | firstSlugs={debugFirstSlugs.join(" || ")}
      </div>

      <LandingClient bizData={bizData} />
    </>
  );
}
