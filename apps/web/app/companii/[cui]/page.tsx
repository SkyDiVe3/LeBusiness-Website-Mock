import type { Metadata } from "next";
import Link from "next/link";
import { findCompanyByCui, getCountyName, RomanianCuiSchema } from "@doingbusiness/domain";
import { notFound } from "next/navigation";
import { CopyCuiButton } from "../../../components/copy-cui-button";
import { JsonLd } from "../../../components/json-ld";
import { PageHero } from "../../../components/page-hero";

type CompanyPageProperties = { params: Promise<{ cui: string }> };

function formatRon(value: string): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0
  }).format(Number(value));
}

export async function generateMetadata({ params }: CompanyPageProperties): Promise<Metadata> {
  const { cui } = await params;
  const result = RomanianCuiSchema.safeParse(cui);
  const company = result.success ? findCompanyByCui(result.data) : null;
  return {
    title: company ? `${company.displayName} (CUI ${company.cui})` : "Companie negăsită",
    description: company
      ? `Profil financiar și date de identificare pentru ${company.legalName}, CAEN ${company.caenCode} (${company.caenActivity}).`
      : "Compania solicitată nu a fost găsită."
  };
}

export default async function CompanyProfilePage({ params }: CompanyPageProperties) {
  const { cui } = await params;
  const result = RomanianCuiSchema.safeParse(cui);
  const company = result.success ? findCompanyByCui(result.data) : null;
  if (!company) notFound();

  const financial = company.financials[0];
  if (!financial) notFound();

  const countyName = getCountyName(company.countyCode);
  const siteUrl = (process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3010").replace(/\/+$/, "");
  const profileUrl = `${siteUrl}/companii/${company.cui}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Corporation",
      name: company.legalName,
      alternateName: company.displayName,
      taxID: company.cui,
      url: profileUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.registeredAddress,
        addressLocality: company.locality,
        addressRegion: countyName,
        addressCountry: "RO"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Acasă", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Director companii", item: `${siteUrl}/companii` },
        { "@type": "ListItem", position: 3, name: company.displayName, item: profileUrl }
      ]
    }
  ];

  return (
    <main id="main-content">
      <JsonLd data={structuredData} />
      <PageHero
        eyebrow={`CUI ${company.cui}`}
        title={company.displayName}
        description={`${company.caenActivity} · ${countyName}, ${company.locality}`}
        breadcrumbs={[
          { label: "Acasă", href: "/" },
          { label: "Director companii", href: "/companii" },
          { label: countyName, href: `/companii?county=${company.countyCode}` },
          { label: company.displayName }
        ]}
      />

      <section className="section">
        <div className="shell article-layout">
          <article className="prose">
            <h2>Date de identificare</h2>
            <p>
              <strong>Denumire legală:</strong> {company.legalName}
              <br />
              <strong>Cod Unic de Înregistrare:</strong> <span className="mono">{company.cui}</span>
              {company.regCom ? (
                <>
                  <br />
                  <strong>Reg. Comerțului:</strong> <span className="mono">{company.regCom}</span>
                </>
              ) : null}
              <br />
              <strong>Sediu social:</strong> {company.registeredAddress}
              <br />
              <strong>Cod CAEN:</strong> <span className="mono">{company.caenCode}</span> · {company.caenActivity}
              <br />
              <strong>Județ și localitate:</strong> {countyName}, {company.locality}
            </p>

            <h2>Evoluție indicatori financiari</h2>
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>An fiscal</th>
                    <th>Cifră de afaceri</th>
                    <th>Profit net</th>
                    <th>Angajați</th>
                  </tr>
                </thead>
                <tbody className="mono">
                  {company.financials.map((row) => (
                    <tr key={row.fiscalYear}>
                      <td>{row.fiscalYear}</td>
                      <td>{formatRon(row.turnoverRon)}</td>
                      <td>{formatRon(row.netProfitRon)}</td>
                      <td>{row.employeeCount.toLocaleString("ro-RO")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="button-row">
              <CopyCuiButton cui={company.cui} />
              <Link className="button button-outline" href={`/companii?county=${company.countyCode}`}>
                Companii din {countyName}
              </Link>
            </div>
          </article>

          <aside className="aside">
            {company.logoPath ? (
              <div className="company-logo-frame" style={{ width: "100%", height: "64px" }}>
                <img
                  src={company.logoPath}
                  alt={`Sigla ${company.displayName}`}
                  width={180}
                  height={56}
                />
              </div>
            ) : null}
            <strong>Proveniență date</strong>
            <p>{financial.sourceName}</p>
            <p className="mono">Status registru: {company.status}</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
