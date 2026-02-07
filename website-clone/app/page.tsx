// app/page.tsx
import LandingClient from "./LandingClient";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// ✅ Sheet 1 (gid=1456635708) + Sheet 2 (default)
const SHEET_URL_1 =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?gid=1456635708&single=true&output=csv";

const SHEET_URL_2 =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?output=csv";

type SearchParams = Record<string, string | string[] | undefined>;

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
  // giữ logic cũ: cell có thể là "subdomain" hoặc full URL
  const v = norm(cell).replace(/^https?:\/\//, "").replace(/^www\./, "");
  return (v.split(".")[0] || "").trim().toLowerCase();
}

// ✅ lấy sub từ host
function subFromHost(host: string) {
  const h = (host || "").split(",")[0].trim().toLowerCase().split(":")[0];
  if (!h) return "";
  if (h === "localhost") return "";
  if (h.endsWith(".vercel.app")) return "";
  const parts = h.split(".");
  if (parts.length >= 3) {
    const sub = parts[0];
    if (sub && sub !== "www") return sub;
  }
  return "";
}

function hostClean(host: string) {
  return (host || "").split(",")[0].trim().split(":")[0];
}

function extractFbToken(raw: string) {
  const s = (raw || "").trim();

  // Case 1: full meta tag
  const m1 = s.match(/content\s*=\s*"([^"]+)"/i);
  if (m1?.[1]) return m1[1].trim();

  // Case 2: facebook-domain-verification=TOKEN
  const m2 = s.match(/facebook-domain-verification\s*=\s*([A-Za-z0-9_-]+)/i);
  if (m2?.[1]) return m2[1].trim();

  // Case 3: token only
  if (/^[A-Za-z0-9_-]{10,}$/.test(s)) return s;

  return "";
}

// ✅ ưu tiên đúng cột H (index 7), nhưng fallback thêm vài cột để khỏi lệch sheet
function getFbTokenFromRow(row: any[]) {
  const candidates = [
    row?.[7], // H (Veridomain fb html) - theo sheet mới
    row?.[6], // G (nếu ai đó đang dùng cột khác)
    row?.[8], // I (phòng lệch)
  ];
  for (const c of candidates) {
    const t = extractFbToken((c ?? "").toString());
    if (t) return t;
  }
  return "";
}

async function fetchRowsFrom(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch CSV failed: ${res.status}`);
  const text = await res.text();
  return parseCsv(text);
}

// ✅ lấy data từ 2 bảng: tìm sheet 1 trước, không có thì sheet 2
async function findRowBySub(wanted: string) {
  const rows1 = await fetchRowsFrom(SHEET_URL_1);
  const match1 = rows1.find((r) => normalizeSlugCell(r?.[0] || "") === wanted);
  if (match1) return { row: match1, sheetIndex: 1 };

  const rows2 = await fetchRowsFrom(SHEET_URL_2);
  const match2 = rows2.find((r) => normalizeSlugCell(r?.[0] || "") === wanted);
  if (match2) return { row: match2, sheetIndex: 2 };

  return { row: null as any, sheetIndex: 0 };
}

export async function generateMetadata(): Promise<Metadata> {
  noStore();

  const h = await headers();
  const hostReal = hostClean(h.get("host") || "");
  const wanted = norm(subFromHost(hostReal));

  let token = "";

  try {
    if (wanted) {
      const found = await findRowBySub(wanted);
      if (found.row) token = getFbTokenFromRow(found.row);
    }
  } catch {
    token = "";
  }

  return {
    other: token ? { "facebook-domain-verification": token } : {},
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  noStore();

  const sp = await searchParams;

  const hostRaw = typeof sp.__host === "string" ? sp.__host : "";
  const subQ = typeof sp.__sub === "string" ? norm(sp.__sub) : "";

  // ✅ ưu tiên host thật từ request (chuẩn cho vercel)
  const h = await headers();
  const hostReal = hostClean(h.get("host") || hostRaw);

  const DEFAULT_SUB = "";
  const wanted = subQ || norm(subFromHost(hostReal)) || DEFAULT_SUB;

  let bizData: any = {
    // subdomain để dùng hiển thị (giữ theo sheet)
    subdomain: wanted,
    name: "CÔNG TY ĐANG CẬP NHẬT",
    address: "Đang cập nhật địa chỉ...",
    document: "Đang cập nhật...",
    phone: "0000.000.000",
    image: "",
    // ✅ domain thật đang truy cập
    domain: hostReal,
  };

  try {
    if (wanted) {
      const found = await findRowBySub(wanted);

      if (found.row) {
        const r = found.row;

        // map theo kiểu cũ của bạn: A..F
        // A=subdomain, B=name, C=address, D=tax/document, E=phone, F=image (nếu có)
        bizData = {
          subdomain: (r?.[0] || wanted).toString(), // giữ nguyên theo sheet
          name: (r?.[1] || "N/A").toString(),
          address: (r?.[2] || "N/A").toString(),
          document: (r?.[3] || "N/A").toString(),
          phone: (r?.[4] || "N/A").toString(),
          image: (r?.[5] || "").toString(),
          domain: hostReal,
        };
      }
    }
  } catch (e) {
    console.error("Fetch error:", e);
  }

  return <LandingClient bizData={bizData} />;
}
