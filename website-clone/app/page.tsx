// app/page.tsx
import LandingClient from "./LandingClient";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import type { Metadata } from "next";


export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const SHEET_URL =
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
  const v = norm(cell).replace(/^https?:\/\//, "").replace(/^www\./, "");
  return (v.split(".")[0] || "").trim().toLowerCase();
}

// ✅ fallback lấy sub từ host nếu cần
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
function extractFbToken(raw: string) {
  const s = (raw || "").trim();

  // Case 1: user pasted full meta tag
  const m1 = s.match(/content\s*=\s*"([^"]+)"/i);
  if (m1?.[1]) return m1[1].trim();

  // Case 2: user pasted "facebook-domain-verification=TOKEN"
  const m2 = s.match(/facebook-domain-verification\s*=\s*([A-Za-z0-9_-]+)/i);
  if (m2?.[1]) return m2[1].trim();

  // Case 3: token only
  if (/^[A-Za-z0-9_-]{10,}$/.test(s)) return s;

  return "";
}

async function fetchRows() {
  const res = await fetch(SHEET_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch CSV failed: ${res.status}`);
  const text = await res.text();
  return parseCsv(text);
}

export async function generateMetadata(): Promise<Metadata> {
  noStore();

  // ưu tiên host thật
  const h = await headers();
  const hostReal = h.get("host") || "";
  const wanted = norm(subFromHost(hostReal));

  let token = "";

  try {
    if (wanted) {
      const rows = await fetchRows();
      const match = rows.find(
        (r) => normalizeSlugCell(r?.[0] || "") === wanted
      );

      // ✅ Cột G = index 6 (token)
      const rawG = (match?.[6] || "").toString();
      token = extractFbToken(rawG);
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
  // ✅ Next 15: searchParams là Promise
  searchParams: Promise<SearchParams>;
}) {
  noStore();

  const sp = await searchParams;

  const hostRaw = typeof sp.__host === "string" ? sp.__host : "";
  const subQ = typeof sp.__sub === "string" ? norm(sp.__sub) : "";

  const DEFAULT_SUB = "";
  const wanted = subQ || norm(subFromHost(hostRaw)) || DEFAULT_SUB;

  let bizData: any = {
    subdomain: wanted,
    name: "CÔNG TY ĐANG CẬP NHẬT",
    address: "Đang cập nhật địa chỉ...",
    document: "Đang cập nhật...",
    phone: "0000.000.000",
    image: "",
  };

  let debugFirstSlugs: string[] = [];

  try {
  const rows = await fetchRows();


    // debug 8 dòng đầu
    debugFirstSlugs = rows.slice(0, 8).map((r) => (r?.[0] || "").toString());

    if (wanted) {
      const match = rows.find(
        (r) => normalizeSlugCell(r?.[0] || "") === wanted
      );

      if (match) {
        bizData = {
          subdomain: match[0] || wanted,
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
        DEBUG hostRaw={hostRaw} | sub={wanted} | firstSlugs=
        {debugFirstSlugs.join(" || ")}
      </div>

      <LandingClient bizData={bizData} />
    </>
  );
}
