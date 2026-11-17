import { NextRequest, NextResponse } from "next/server";

const excludedPrefixes = ["/api/", "/_next/", "/media/", "/.well-known/"];
const excludedExact = new Set(["/robots.txt", "/sitemap.xml", "/llms.txt", "/openapi.json", "/favicon.ico"]);

function prefersMarkdown(acceptHeader: string): boolean {
  const lower = acceptHeader.toLowerCase();
  const mdIndex = lower.indexOf("text/markdown");
  if (mdIndex === -1) return false;
  const htmlIndex = lower.indexOf("text/html");
  if (htmlIndex === -1) return true;
  return mdIndex < htmlIndex;
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (request.method !== "GET" || excludedExact.has(pathname) || excludedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const accept = request.headers.get("accept") ?? "";
  if (prefersMarkdown(accept)) {
    const rewriteUrl = new URL(`/api/markdown?path=${encodeURIComponent(pathname)}`, request.url);
    return NextResponse.rewrite(rewriteUrl);
  }

  const response = NextResponse.next();
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
