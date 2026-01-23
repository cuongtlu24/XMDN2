import { NextRequest, NextResponse } from "next/server";

function getSubFromHost(host: string) {
  const h = (host || "").split(",")[0].trim().toLowerCase().split(":")[0]; // bỏ port + trường hợp "a,b"
  if (!h) return "";

  // bỏ các host không cần
  if (h === "localhost") return "";
  if (h.endsWith(".vercel.app")) return "";

  const parts = h.split(".");
  // johnson.constructionxuandinh.sbs => ["johnson","constructionxuandinh","sbs"]
  if (parts.length >= 3) {
    const sub = parts[0];
    if (sub && sub !== "www") return sub;
  }
  return "";
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const host =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    "";

  const sub = getSubFromHost(host);

  // Inject vào query để page.tsx đọc được chắc chắn
  if (!url.searchParams.has("__host")) url.searchParams.set("__host", host);
  if (!url.searchParams.has("__sub")) url.searchParams.set("__sub", sub);

  return NextResponse.rewrite(url);
}

// áp cho tất cả route trừ asset
export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml|images).*)"],
};
