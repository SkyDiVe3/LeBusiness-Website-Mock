import type { MetadataRoute } from "next";

function siteOrigin(): string {
  const raw = process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3010";
  return raw.replace(/\/+$/, "");
}

export default function robots(): MetadataRoute.Robots {
  const base = siteOrigin();
  return {
    rules: [
      {
        userAgent: ["*", "GPTBot", "ClaudeBot", "PerplexityBot", "Googlebot"],
        allow: ["/", "/companii", "/stiri", "/interviuri", "/evenimente", "/articole", "/despre-noi", "/contact", "/en", "/llms.txt", "/openapi.json"],
        disallow: ["/admin/", "/api/contact"]
      }
    ],
    sitemap: `${base}/sitemap.xml`
  };
}
