import {
  companySeeds,
  editorialSeeds,
  findCompanyByCui,
  findEditorialItem,
  getCountyName,
  getEditorialBySection,
  getEditorialItems,
  RomanianCuiSchema,
  type EditorialItem
} from "@doingbusiness/domain";
import { NextRequest, NextResponse } from "next/server";

const kindMap: Record<string, EditorialItem["kind"]> = {
  stiri: "news",
  interviuri: "interview",
  "video-interviuri": "interview",
  articole: "article",
  articles: "article",
  "business-drive": "article",
  evenimente: "event",
  webinarii: "event"
};

function renderEditorialMarkdown(item: EditorialItem): string {
  const lines = [
    `# ${item.title}`,
    "",
    `- Category: ${item.category}`,
    `- Author: ${item.author}`,
    `- Published: ${item.publishedAt}`,
    `- Reading time: ${item.readingMinutes} minutes`,
    "",
    item.excerpt,
    ""
  ];
  if (item.highlights) {
    lines.push("## Highlights", "");
    for (const point of item.highlights) {
      lines.push(`- ${point}`);
    }
  }
  return lines.join("\n");
}

function renderListMarkdown(kind: EditorialItem["kind"], heading: string): string {
  const items = getEditorialItems(kind);
  const pathPrefix = kind === "news" ? "/stiri" : kind === "interview" ? "/interviuri" : kind === "event" ? "/evenimente" : "/articole";
  return [
    `# ${heading}`,
    "",
    ...items.map((item) => `- [${item.title}](${pathPrefix}/${item.slug}) (${item.author}, ${item.publishedAt.slice(0, 10)})`),
    ""
  ].join("\n");
}

export function GET(request: NextRequest): NextResponse {
  const rawPath = request.nextUrl.searchParams.get("path") ?? "/";
  const normalized = rawPath === "/" ? "/" : rawPath.replace(/\/+$/, "");
  const segments = normalized.split("/").filter(Boolean);

  let markdown = "";

  if (normalized === "/") {
    markdown = [
      "# DoingBusiness.ro",
      "",
      "Solutii integrate pentru Comunicare, Marketing, Vanzari si Networking.",
      "",
      "## Top companies",
      ...companySeeds.slice(0, 6).map((c) => `- [${c.displayName}](/companii/${c.cui}) (CUI ${c.cui}, CAEN ${c.caenCode}, ${getCountyName(c.countyCode)})`),
      "",
      "## Latest Stiri & Business Digest",
      ...editorialSeeds.slice(0, 8).map((item) => `- ${item.title} (${item.category}, ${item.author})`),
      ""
    ].join("\n");
  } else if (normalized === "/editorial") {
    markdown = [
      "# Linkleaders",
      "",
      "## Interviuri",
      ...getEditorialBySection("interviuri").map((i) => `- [${i.title}](/interviuri/${i.slug})`),
      "",
      "## Business Digest",
      ...getEditorialBySection("business-digest").map((i) => `- [${i.title}](/articole/${i.slug})`),
      "",
      "## Stiri",
      ...getEditorialBySection("stiri").map((i) => `- [${i.title}](/stiri/${i.slug})`),
      ""
    ].join("\n");
  } else if (normalized === "/companii" || normalized === "/top-companii") {
    markdown = [
      "# Major Companies in Romania",
      "",
      ...companySeeds.map((c) => {
        const fin = c.financials[0];
        return `- [${c.displayName}](/companii/${c.cui}): CUI ${c.cui}, CAEN ${c.caenCode}, ${getCountyName(c.countyCode)}, turnover ${fin?.turnoverRon ?? "N/A"} RON`;
      }),
      ""
    ].join("\n");
  } else if (segments[0] === "companii" && segments[1]) {
    const parsedCui = RomanianCuiSchema.safeParse(segments[1]);
    const company = parsedCui.success ? findCompanyByCui(parsedCui.data) : null;
    if (!company) {
      return new NextResponse("# Company not found\n", { status: 404, headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept" } });
    }
    markdown = [
      `# ${company.displayName} (${company.legalName})`,
      "",
      `- CUI: ${company.cui}`,
      company.regCom ? `- Reg. Com.: ${company.regCom}` : null,
      `- CAEN: ${company.caenCode} (${company.caenActivity})`,
      `- County: ${getCountyName(company.countyCode)}`,
      `- Locality: ${company.locality}`,
      `- Address: ${company.registeredAddress}`,
      "",
      "## Financials",
      ...company.financials.map((f) => `- ${f.fiscalYear}: Turnover ${f.turnoverRon} RON, Net profit ${f.netProfitRon} RON, Employees ${f.employeeCount}`),
      ""
    ].filter((line): line is string => line !== null).join("\n");
  } else if (segments[0] && kindMap[segments[0]]) {
    const kind = kindMap[segments[0]];
    if (kind && segments[1]) {
      const item = findEditorialItem(kind, segments[1]);
      if (!item) {
        return new NextResponse("# Article not found\n", { status: 404, headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept" } });
      }
      markdown = renderEditorialMarkdown(item);
    } else if (kind) {
      markdown = renderListMarkdown(kind, segments[0].toUpperCase());
    }
  } else if (normalized === "/despre-noi") {
    markdown = "# Despre noi\n\nFollowing our 26 years of experience in providing programs and developments solutions, DoingBusiness.ro offers LinkLeaders and Business Development.\n";
  } else if (normalized === "/linkleaders") {
    markdown = "# LinkLeaders\n\nExclusive community platform dedicated to the largest companies in Romania: CEO Conference, Major Companies in Romania, and Leaders Insights.\n";
  } else if (normalized === "/business-development" || normalized === "/dezvoltarea-afacerii") {
    markdown = "# Business Development\n\nKompass EasyBusiness, Sales Accelerator, Booster, Lead Generation, Call-Center services, and Business Evolution Roadshow & Webinars.\n";
  } else if (normalized === "/contact") {
    markdown = "# Contact DoingBusiness.ro\n\n- Adresa: Strada Prof. Ion Bogdan, Nr. 4-6, Sector 1, Bucuresti, Romania\n- Telefon: +40-21-317.03.90\n- Fax: +40-21-317.03.93\n- E-mail: office@doingbusiness.ro\n";
  } else if (normalized === "/en") {
    markdown = "# DoingBusiness.ro English Overview\n\nLinkLeaders, Business Development, and Major Companies in Romania. Use /companii or /llms.txt for structured directory data.\n";
  } else {
    markdown = `# Path: ${normalized}\n\nConsult /editorial, /companii, or /llms.txt for available sections.\n`;
  }

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, max-age=60"
    }
  });
}
