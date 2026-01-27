// app/layout.tsx
import { headers } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?output=csv";

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

function subFromHost(host: string) {
  const h = (host || "").trim().toLowerCase().split(":")[0];
  if (!h || h === "localhost" || h.endsWith(".vercel.app")) return "";
  const parts = h.split(".");
  // globalconstruction.constructionxuandinh.sbs => sub = parts[0]
  if (parts.length >= 3) {
    const sub = parts[0];
    if (sub && sub !== "www") return sub;
  }
  return "";
}

function extractFbToken(raw: string) {
  const s = (raw || "").trim();

  // Case 1: user pasted full meta tag
  // <meta name="facebook-domain-verification" content="TOKEN" />
  const m1 = s.match(/content\s*=\s*"([^"]+)"/i);
  if (m1?.[1]) return m1[1].trim();

  // Case 2: user pasted "facebook-domain-verification=TOKEN"
  const m2 = s.match(/facebook-domain-verification\s*=\s*([A-Za-z0-9_-]+)/i);
  if (m2?.[1]) return m2[1].trim();

  // Case 3: token only
  if (/^[A-Za-z0-9_-]{10,}$/.test(s)) return s;

  return "";
}

async function getFbTokenBySub(sub: string) {
  if (!sub) return "";

  const res = await fetch(SHEET_URL, { cache: "no-store" });
  if (!res.ok) return "";

  const text = await res.text();
  const rows = parseCsv(text);

  // cột A = subdomain, cột F = token (index 5)
  const row = rows.find((r) => norm(r?.[0] || "") === norm(sub));
  if (!row) return "";

  const rawF = (row?.[5] || "").toString();
  return extractFbToken(rawF);
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  noStore();

  const h = await headers();
  const host = h.get("host") || "";
  const sub = subFromHost(host);

  let fbToken = "";
  try {
    fbToken = await getFbTokenBySub(sub);
  } catch {
    fbToken = "";
  }

  return (
    <html lang="vi">
      <head>
        {fbToken ? (
          <meta name="facebook-domain-verification" content={fbToken} />
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
