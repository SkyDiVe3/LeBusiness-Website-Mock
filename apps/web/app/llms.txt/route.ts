import { companySeeds, editorialSeeds, getCountyName, type EditorialItem } from "@doingbusiness/domain";
import { NextResponse } from "next/server";

const sectionPaths = {
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
  return `${sectionPaths[item.kind]}/${item.slug}`;
}

export function GET(): NextResponse {
  const siteUrl = (process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3010").replace(/\/+$/, "");

  const companyLines = companySeeds.map((company) => {
    const latest = company.financials[0];
    const turnover = latest ? `${latest.turnoverRon} RON (${latest.fiscalYear})` : "N/A";
    return `- [${company.displayName}](${siteUrl}/companii/${company.cui}): CUI ${company.cui}, CAEN ${company.caenCode} (${company.caenActivity}), ${getCountyName(company.countyCode)}, cifra de afaceri ${turnover}`;
  });

  const editorialLines = editorialSeeds.map(
    (item) => `- [${item.title}](${siteUrl}${editorialItemPath(item)}): ${item.category}, ${item.author}`
  );

  const body = [
    "# DoingBusiness.ro",
    "",
    "DoingBusiness.ro - Solutii integrate pentru Comunicare, Marketing, Vanzari si Networking. LinkLeaders, Business Digest, Business & Drive, Evenimente si Major Companies in Romania.",
    "",
    "## Public navigation",
    "",
    `- [Home](${siteUrl}/)`,
    `- [Linkleaders Hub](${siteUrl}/editorial): Interviuri, Leader Insights, Business Digest si Stiri`,
    `- [Interviuri](${siteUrl}/interviuri): Interviuri cu lideri executivi LinkLeaders`,
    `- [Leader Insights](${siteUrl}/video-interviuri): Interviuri video cu lideri de business`,
    `- [Business Digest](${siteUrl}/articole): Analize si opinii economice`,
    `- [Stiri](${siteUrl}/stiri): Stiri economice si investitii`,
    `- [Business & Drive](${siteUrl}/business-drive): Piata auto si mobilitate corporate`,
    `- [Evenimente](${siteUrl}/evenimente): CEO Conference, Alte Evenimente, Business Evolution, Webinarii`,
    `- [Major Companies](${siteUrl}/top-companii): Publicatie si sector overview`,
    `- [Director companii](${siteUrl}/companii): Cautare si filtrare dupa nume, CUI, cod CAEN, judet si indicatori financiari`,
    `- [Despre noi](${siteUrl}/despre-noi): LinkLeaders si Business Development`,
    `- [LinkLeaders Servicii](${siteUrl}/linkleaders)`,
    `- [Business Development](${siteUrl}/business-development)`,
    `- [Contact](${siteUrl}/contact): Strada Prof. Ion Bogdan 4-6, Sector 1, Bucuresti, +40-21-317.03.90, office@doingbusiness.ro`,
    `- [English overview](${siteUrl}/en)`,
    "",
    "## Machine-readable interfaces",
    "",
    `- [XML Sitemap](${siteUrl}/sitemap.xml)`,
    `- [Robots policy](${siteUrl}/robots.txt)`,
    `- [OpenAPI 3.1 specification](${siteUrl}/openapi.json)`,
    `- [RFC 9727 API catalog](${siteUrl}/.well-known/api-catalog)`,
    `- [Health endpoint](${siteUrl}/api/health): GET returns JSON service readiness`,
    `- [Companies search API](${siteUrl}/api/companies): GET supports q, county, caen, sort (turnover|employees|name), page, pageSize`,
    `- [Contact submission API](${siteUrl}/api/contact): POST validates firstName, lastName, email, message (or name, email, message)`,
    `- Markdown negotiation: Send Accept: text/markdown on any public HTML route to receive a structured Markdown response`,
    "",
    "## Romanian companies in directory",
    "",
    ...companyLines,
    "",
    "## Editorial highlights",
    "",
    ...editorialLines,
    ""
  ].join("\n");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      Vary: "Accept"
    }
  });
}
