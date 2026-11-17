import type { MetadataRoute } from "next";
import { companySeeds, editorialSeeds, type EditorialItem } from "@doingbusiness/domain";

function siteOrigin(): string {
  const raw = process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3010";
  return raw.replace(/\/+$/, "");
}

const sectionRoutes = {
  news: "/stiri",
  interview: "/interviuri",
  article: "/articole",
  event: "/evenimente"
} as const;

function editorialItemPath(item: EditorialItem): string {
  if (item.sectionTag === "leader-insights") {
    return `/video-interviuri/${item.slug}`;
  }
  if (item.sectionTag === "webinarii") {
    return `/webinarii/${item.slug}`;
  }
  return `${sectionRoutes[item.kind]}/${item.slug}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteOrigin();
  const now = new Date("2026-11-16T08:00:00.000Z");

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/editorial`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/companii`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/top-companii`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/stiri`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${base}/interviuri`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/video-interviuri`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/articole`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${base}/articles`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/business-drive`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/evenimente`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/evenimente/ceo-conference`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/evenimente/alte-evenimente`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/evenimente/business-evolution`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/webinarii`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/despre-noi`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/linkleaders`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/business-development`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/dezvoltarea-afacerii`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/en`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/llms.txt`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/openapi.json`, lastModified: now, changeFrequency: "monthly", priority: 0.6 }
  ];

  const editorialPages: MetadataRoute.Sitemap = editorialSeeds.map((item) => ({
    url: `${base}${editorialItemPath(item)}`,
    lastModified: new Date(item.publishedAt),
    changeFrequency: "weekly",
    priority: 0.75
  }));

  const companyPages: MetadataRoute.Sitemap = companySeeds.map((company) => ({
    url: `${base}/companii/${company.cui}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8
  }));

  return [...staticPages, ...editorialPages, ...companyPages];
}
