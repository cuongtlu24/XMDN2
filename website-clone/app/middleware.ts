import { NextRequest, NextResponse } from "next/server";

function getSubdomainFromHost(hostRaw: string) {
  const host = (hostRaw || "").split(",")[0].trim().toLowerCase();
  if (!host) return "";

  // bỏ port
  const hostname = host.split(":")[0];

  // bỏ các host không muốn
  if (
    hostname === "constructionxuandinh.sbs" ||
    hostname === "www.constructionxuandinh.sbs" ||
    hostname.endsWith(".vercel.app") ||
    hostname === "localhost"
  ) {
    return "";
  }

  const parts = hostname.split(".");
  if (parts.length >= 3) {
    const sub = parts[0];
    if (sub === "www") return "";
    return sub;
  }

  return "";
}

export function middleware(req: NextRequest) {
  const hostRaw =
    req.headers.get("x-forwarded-host") || req.headers.get("host") || "";

  const sub = getSubdomainFromHost(hostRaw);

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-subdomain", sub);
  requestHeaders.set("x-host-raw", hostRaw);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

// chạy cho tất cả routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
