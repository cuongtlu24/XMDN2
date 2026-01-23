import { headers } from "next/headers";
import LandingClient, { BizData } from "./LandingClient";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5dTqFLGiQ/pub?gid=0&single=true&output=csv";

const FALLBACK: BizData = {
  name: "Johnson Marketing LLC",
  address: "123 Wall Street, New York",
  document: "B2025034222",
  phone: "0912 345 678",
  image: "",
};

// ===== SLUG chuẩn hoá =====
function slugify(s: string) {
  return (s || "")
    .trim()
    .toLowerCase()
    .replace(/^\ufeff/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// ===== CSV parser an toàn =====
function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQ = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      if (inQ && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else inQ = !inQ;
      continue;
    }

    if (ch === "," && !inQ) {
      out.push(cur.trim());
      cur = "";
      continue;
    }

    cur += ch;
  }

  out.push(cur.trim());
  return out;
}

function parseCsvSafe(text: string): string[][] {
  return (text || "")
    .replace(/\r/g, "")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean)
    .map(parseCsvLine);
}

// ===== Lấy subdomain an toàn =====
function getSubdomainFromHost(host: string) {
  const h = (host || "").toLowerCase().split(":")[0]; // bỏ port nếu có
  const parts = h.split(".").filter(Boolean);

  // host có thể là: blueantlerca.constructionxuandinh.sbs
  // hoặc: xxxxx.vercel.app
  if (parts.length < 2) return ""; // không đủ để lấy sub

  let sub = parts[0];
  if (sub === "www") sub = parts[1] || "";
  return sub;
}

async function getBizDataFromHostSafe(): Promise<BizData> {
  try {
    const host = headers().get("host") || "";
    const sub = getSubdomainFromHost(host);
    const wanted = slugify(sub);

    // Nếu host/subdomain rỗng → fallback luôn
    if (!wanted) return FALLBACK;

    const res = await fetch(SHEET_URL, {
      next: { revalidate: 300 },
      // timeout “mềm”: nếu Google chậm thì vẫn fallback
      // (Next fetch không có timeout built-in, nên ta xử lý bằng try/catch)
    });

    if (!res.ok) {
      console.error("[CSV] Fetch failed:", res.status, res.statusText);
      return FALLBACK;
    }

    const text = await res.text();
    const rows = parseCsvSafe(text);

    // rows expected: [slug, name, address, document, phone, image]
    const match = rows.find((r) => slugify(r?.[0] || "") === wanted);

    if (!match) return FALLBACK;

    const data: BizData = {
      name: match[1] || FALLBACK.name,
      address: match[2] || FALLBACK.address,
      document: match[3] || FALLBACK.document,
      phone: match[4] || FALLBACK.phone,
      image: (match[5] || "").trim(),
    };

    // Nếu thiếu field chính → fallback để tránh verify sai
    if (!data.name || !data.address || !data.phone) return FALLBACK;

    return data;
  } catch (err: any) {
    console.error("[getBizDataFromHostSafe] ERROR:", err?.message || err);
    return FALLBACK;
  }
}

// ✅ Crawler thấy title đúng legal name ngay từ server
export async function generateMetadata() {
  const data = await getBizDataFromHostSafe();
  return { title: data.name || FALLBACK.name };
}

export default async function Page() {
  const data = await getBizDataFromHostSafe();

  return (
    <>
      {/* ✅ Mồi cho crawler (có trong View Source) */}
      <div style={{ display: "none" }} aria-hidden="true">
        Legal business name: {data.name} | Address: {data.address} | Phone: {data.phone}
      </div>

      <noscript>
        <div>
          Legal business name: {data.name}
          <br />
          Address: {data.address}
          <br />
          Phone: {data.phone}
        </div>
      </noscript>

      <LandingClient data={data} />
    </>
  );
}
