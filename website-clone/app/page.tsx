import { headers } from "next/headers";
import LandingClient from "./LandingClient";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmi6oayoemKBJXEWi4pkVHDsm166ap0XCwbopYrukBQnwj2gERseGlDnJVBrtciHwKEFj5bTqFLGiQ/pub?gid=0&single=true&output=csv";

function parseCsv(text: string) {
  const lines = (text || "").replace(/\r/g, "").split("\n").filter((l) => l.trim() !== "");
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

// ✅ Cột A có thể là slug / domain / url → normalize về slug
function normalizeSlugCell(cell: string) {
  const v = norm(cell)
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "");
  return (v.split(".")[0] || "").trim().toLowerCase();
}

export default async function Home() {
  let sub = "hoanghai09";
  let hostRaw = "";
  let host = "";

  try {
    const h = headers();
    hostRaw = h.get("x-forwarded-host") || h.get("host") || "";
    host = hostRaw.split(",")[0].trim().toLowerCase();

    const parts = host.split(".");
    const first = parts[0] || "";

    // sub.domain.com => lấy sub
    if (parts.length >= 3) sub = first;
    else sub = "hoanghai09";

    if (["www", "localhost", "constructionxuandinh"].includes(sub) || host.endsWith(".vercel.app")) {
      sub = "hoanghai09";
    }
  } catch (e) {
    console.error("Header error:", e);
  }

  // ✅ Fallback đúng: không match thì HIỂN THỊ “ĐANG CẬP NHẬT” (không nhảy qua Hoàng Hải)
  let bizData: any = {
    subdomain: sub,
    name: "CÔNG TY ĐANG CẬP NHẬT",
    address: "Đang cập nhật địa chỉ...",
    document: "Đang cập nhật...",
    phone: "0000.000.000",
    image: "",
  };

  // để debug
  let debugFirstSlugs: string[] = [];

  try {
    const res = await fetch(SHEET_URL, { cache: "no-store" });
    const text = await res.text();
    const rows = parseCsv(text);

    const wanted = norm(sub);

    debugFirstSlugs = rows.slice(0, 6).map((r) => (r?.[0] || "").toString());

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
  } catch (e) {
    console.error("Fetch error:", e);
  }

  return (
    <>
      {/* ✅ FB crawler đọc được ngay */}
      <div style={{ display: "none" }} aria-hidden="true">
        Legal business name: {bizData.name} | Address: {bizData.address} | Phone: {bizData.phone}
      </div>

      {/* ✅ DEBUG ẩn: xem host/sub + vài giá trị cột A để biết vì sao không match */}
      <div style={{ display: "none" }} aria-hidden="true">
        DEBUG hostRaw={hostRaw} | host={host} | sub={sub} | firstSlugs={debugFirstSlugs.join(" || ")}
      </div>

      <LandingClient bizData={bizData} />
    </>
  );
}
