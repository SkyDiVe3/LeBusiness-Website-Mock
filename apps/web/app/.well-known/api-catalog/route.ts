import { NextResponse } from "next/server";

export function GET(): NextResponse {
  const siteUrl = (process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3010").replace(/\/+$/, "");

  const catalog = {
    linkset: [
      {
        anchor: `${siteUrl}/api/companies`,
        "service-desc": [{ href: `${siteUrl}/openapi.json`, type: "application/openapi+json" }],
        "service-doc": [{ href: `${siteUrl}/llms.txt`, type: "text/markdown" }]
      },
      {
        anchor: `${siteUrl}/api/health`,
        "service-desc": [{ href: `${siteUrl}/openapi.json`, type: "application/openapi+json" }]
      }
    ]
  };

  return new NextResponse(JSON.stringify(catalog, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, max-age=300"
    }
  });
}
