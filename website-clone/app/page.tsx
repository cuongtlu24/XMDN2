
import LandingClient from "./LandingClient";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// ✅ 2 bảng CSV (2 link bạn đưa)
const SHEET_URLS = [
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?gid=1456635708&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?output=csv",
];

type SearchParams = Record<string, string | string[] | undefined>;

function parseCsv(text: string) {
  const lines = (text || "")
    .replace(/\r/g, "")
    .split("\n")
    .filter((l) => l !== ""); // ✅ không trim để giữ đúng dữ liệu cell

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
        result.push(cell); // ✅ giữ nguyên, không trim
        cell = "";
      } else {
        cell += ch;
      }
    }

    result.push(cell); // ✅ giữ nguyên, không trim
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

async function fetchRowsFrom(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch CSV failed: ${res.status} (${url})`);
  const text = await res.text();
  return parseCsv(text);
}

// ✅ gộp 2 bảng: bỏ header trùng của bảng thứ 2 (nếu có)
async function fetchRowsMerged() {
  const [rows1, rows2] = await Promise.all([
    fetchRowsFrom(SHEET_URLS[0]),
    fetchRowsFrom(SHEET_URLS[1]),
  ]);

  const head1 = (rows1?.[0] || []).map((x) => norm(String(x)));
  const head2 = (rows2?.[0] || []).map((x) => norm(String(x)));
  const headerSame =
    head1.length > 0 &&
    head1.length === head2.length &&
    head1.every((v, i) => v === head2[i]);

  const rows2NoHeader = headerSame ? rows2.slice(1) : rows2;

  // ✅ lọc dòng rỗng
  const merged = [...rows1, ...rows2NoHeader].filter((r) =>
    (r || []).some((c) => String(c || "").trim() !== "")
  );

  return merged;
}

export async function generateMetadata(): Promise<Metadata> {
  noStore();

  const h = await headers();
  const hostReal = h.get("host") || "";
  const wanted = norm(subFromHost(hostReal));

  let token = "";

  try {
    if (wanted) {
      const rows = await fetchRowsMerged();
      const match = rows.find((r) => normalizeSlugCell(r?.[0] || "") === wanted);

      // ⚠️ giữ nguyên mapping như code cũ của bạn:
      // "token" đang lấy ở index 6 (cột G). Nếu token của bạn nằm cột H thì đổi 6 -> 7.
      const rawG = (match?.[6] ?? "").toString();
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
    const rows = await fetchRowsMerged();

    debugFirstSlugs = rows.slice(0, 8).map((r) => (r?.[0] || "").toString());

    if (wanted) {
      const match = rows.find((r) => normalizeSlugCell(r?.[0] || "") === wanted);

      if (match) {
        // ✅ giữ nguyên đúng hoa/thường theo sheet (không toUpperCase/trim)
        bizData = {
          subdomain: (match[0] ?? wanted).toString(),
          name: (match[1] ?? "N/A").toString(),
          address: (match[2] ?? "N/A").toString(),
          document: (match[3] ?? "N/A").toString(),
          phone: (match[4] ?? "N/A").toString(),
          image: (match[5] ?? "").toString(),
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
