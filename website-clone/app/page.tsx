// website-clone/app/page.tsx
import { headers } from "next/headers";
import LandingClient, { BizData } from "../components/LandingClient";

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

// ===== CSV parser =====
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
      } else {
        inQ = !inQ;
      }
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

function parseCsv(text: string) {
  return text
    .replace(/\r/g, "")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean)
    .map(parseCsvLine);
}

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5dTqFLGiQ/pub?gid=0&single=true&output=csv";

async function getBizDataFromHost(): Promise<BizData> {
  const host = (headers().get("host") || "").toLowerCase();

  let sub = host.split(".")[0] || "";
  if (sub === "www") sub = host.split(".")[1] || "";
  const wanted = slugify(sub);

  // Cache nhẹ cho ổn định + nhanh (5 phút)
  const res = await fetch(SHEET_URL, { next: { revalidate: 300 } });
  const text = await res.text();
  const rows = parseCsv(text);

  const match = rows.find((r) => slugify(r[0] || "") === wanted);

  if (match) {
    return {
      name: match[1] || "",
      address: match[2] || "",
      document: match[3] || "",
      phone: match[4] || "",
      image: (match[5] || "").trim(),
    };
  }

  // Fallback (giữ y như bạn đang dùng)
  return {
    name: "Johnson Marketing LLC",
    address: "123 Wall Street, New York",
    document: "B2025034222",
    phone: "0912 345 678",
    image: "",
  };
}

// ✅ Crawler thấy title đúng legal name ngay từ server
export async function generateMetadata() {
  const data = await getBizDataFromHost();
  return { title: data.name };
}

export default async function Page() {
  const data = await getBizDataFromHost();

  return (
    <>
      {/* ✅ Mồi cho Facebook crawler: có trong HTML source ngay lập tức */}
      <div style={{ display: "none" }} aria-hidden="true">
        Legal business name: {data.name} | Address: {data.address} | Phone: {data.phone}
      </div>

      {/* ✅ Nếu crawler không chạy JS vẫn thấy */}
      <noscript>
        <div>
          Legal business name: {data.name}
          <br />
          Address: {data.address}
          <br />
          Phone: {data.phone}
        </div>
      </noscript>

      {/* UI giữ nguyên */}
      <LandingClient data={data} />
    </>
  );
}
