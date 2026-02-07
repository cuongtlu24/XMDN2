// app/page.tsx
import LandingClient from "./LandingClient";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// ✅ 2 CSV tables
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
  const v = norm(cell).replace(/^https?:\/\//, "").replace(/^www\./, "");
  return (v.split(".")[0] || "").trim().toLowerCase();
}

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

async function fetchRowsFrom(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch CSV failed: ${res.status}`);
  const text = await res.text();
  return parseCsv(text);
}

async function fetchRowsSafe(url: string) {
  try {
    return await fetchRowsFrom(url);
  } catch {
    return [] as string[][];
  }
}

function findRowBySub(rows: string[][], wanted: string) {
  if (!wanted) return null;
  return (
    rows.find((r) => normalizeSlugCell((r?.[0] || "").toString()) === wanted) ||
    null
  );
}

// ✅ GET EMAIL FROM COLUMN K (INDEX 10)
function pickEmail(row: string[]) {
  const v = (row?.[10] || "").toString().trim();
  if (v && v.includes("@")) return v;
  
  // Fallback scan if column K is empty
  const any = row.find((c) => (c || "").toString().includes("@"));
  return (any || "").toString().trim();
}

// ✅ GET FB TOKEN FROM COLUMN G (INDEX 6)
function pickFbToken(row: string[]) {
  const raw = (row?.[6] || "").toString();
  const t = extractFbToken(raw);
  if (t) return t;
  
  // Fallback scan other columns
  for (const c of row) {
    const token = extractFbToken((c || "").toString());
    if (token) return token;
  }
  return "";
}

// ✅ GET OG IMAGE URL FROM COLUMN P (INDEX 15)
function pickOgImage(row: string[]) {
  const v = (row?.[15] || "").toString().trim();
  if (v && (v.startsWith('http://') || v.startsWith('https://') || v.startsWith('/'))) {
    return v;
  }
  return "";
}

// ✅ DYNAMIC METADATA - GET CORRECT COLUMNS
export async function generateMetadata(): Promise<Metadata> {
  noStore();

  const h = await headers();
  const hostReal = h.get("host") || "";
  const wanted = norm(subFromHost(hostReal));

  let token = "";
  let ogImageUrl = "";
  let companyName = "Premium Real Estate System";
  let companyDesc = "Specialized in resort real estate, transparent legal documentation, individual title deeds.";

  const [rows1, rows2] = await Promise.all([
    fetchRowsSafe(SHEET_URL_1),
    fetchRowsSafe(SHEET_URL_2),
  ]);

  const match1 = findRowBySub(rows1, wanted);
  const match2 = match1 ? null : findRowBySub(rows2, wanted);
  const match = match1 || match2;

  if (match) {
    token = pickFbToken(match);
    ogImageUrl = pickOgImage(match);
    
    // Column B (index 1): Company name
    const name = (match[1] || "").toString().trim();
    if (name && name !== "N/A") {
      companyName = name;
    }
    
    // Column C (index 2): Address
    const addr = (match[2] || "").toString().trim();
    if (addr && addr !== "N/A") {
      companyDesc = `Premium real estate at ${addr}. Transparent legal documentation, individual title deeds.`;
    }
  }

  // ✅ PROCESS OG IMAGE URL
  let finalOgImage = "";
  if (ogImageUrl) {
    // If it's a relative path, add domain
    if (ogImageUrl.startsWith('/')) {
      finalOgImage = `https://${hostReal}${ogImageUrl}`;
    } else {
      finalOgImage = ogImageUrl;
    }
  } else {
    // Fallback image
    finalOgImage = `https://${hostReal}/images/villa-garden.jpg`;
  }

  return {
    title: companyName,
    description: companyDesc,
    
    // ✅ DYNAMIC OPEN GRAPH
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url: `https://${hostReal}/`,
      siteName: companyName,
      title: companyName,
      description: companyDesc,
      images: [
        {
          url: finalOgImage,
          width: 1200,
          height: 630,
          alt: `${companyName} - Premium Real Estate`,
        }
      ],
    },
    
    // ✅ TWITTER CARD
    twitter: {
      card: 'summary_large_image',
      title: companyName,
      description: companyDesc,
      images: [finalOgImage],
    },
    
    // ✅ FACEBOOK DOMAIN VERIFICATION
    other: token ? { "facebook-domain-verification": token } : {},
    
    // ✅ CANONICAL URL
    alternates: {
      canonical: `https://${hostReal}/`,
    },
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  noStore();

  const sp = await searchParams;

  const h = await headers();
  const hostReal = (h.get("host") || "").split(":")[0];

  const subQ = typeof sp.__sub === "string" ? norm(sp.__sub) : "";
  const wanted = subQ || norm(subFromHost(hostReal)) || "";

  const [rows1, rows2] = await Promise.all([
    fetchRowsSafe(SHEET_URL_1),
    fetchRowsSafe(SHEET_URL_2),
  ]);

  const match1 = findRowBySub(rows1, wanted);
  const match2 = match1 ? null : findRowBySub(rows2, wanted);
  const match = match1 || match2;

  let bizData: any = {
    subdomain: wanted,
    host: hostReal,
    name: "COMPANY UPDATING",
    address: "Updating address...",
    document: "Updating...",
    phone: "0000.000.000",
    email: "",
    image: "",
  };

  if (match) {
    bizData = {
      subdomain: normalizeSlugCell(match[0] || wanted) || wanted,
      host: hostReal,
      name: (match[1] || "N/A").toString(),      // Column B
      address: (match[2] || "N/A").toString(),   // Column C
      document: (match[3] || "N/A").toString(),  // Column D (Tax ID)
      phone: (match[4] || "N/A").toString(),     // Column E
      email: pickEmail(match),                   // Column K
      image: (match[5] || "").toString(),        // Column F (if available)
    };
  }

  return <LandingClient bizData={bizData} />;
}
