import Link from "next/link";
import { getCountyName, type Company } from "@doingbusiness/domain";

function formatRon(value: string): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
    notation: "compact"
  }).format(Number(value));
}

function formatMargin(turnoverStr: string, profitStr: string): string {
  const turnover = Number(turnoverStr);
  const profit = Number(profitStr);
  if (!Number.isFinite(turnover) || turnover <= 0) return "0,0%";
  const pct = (profit / turnover) * 100;
  return `${pct.toLocaleString("ro-RO", { maximumFractionDigits: 1 })}%`;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("") || "DB";
}

export function CompanyCard({ company }: Readonly<{ company: Company }>) {
  const financial = company.financials[0];
  if (!financial) return null;

  return (
    <article className="company-card">
      <div className="company-card-head">
        <div className="company-identity">
          {company.logoPath ? (
            <div className="company-logo-frame">
              <img
                src={company.logoPath}
                alt={`Sigla ${company.displayName}`}
                width={56}
                height={40}
                loading="lazy"
              />
            </div>
          ) : (
            <span className="company-monogram" aria-hidden="true">
              {initials(company.displayName)}
            </span>
          )}
          <div>
            <h3>
              <Link href={`/companii/${company.cui}`}>{company.displayName}</Link>
            </h3>
            <p className="company-meta">{company.legalName}</p>
          </div>
        </div>
        <span className="cui-badge">CUI {company.cui}</span>
      </div>

      <p className="company-meta">
        <span className="mono">CAEN {company.caenCode}</span> · {company.caenActivity}
        <br />
        {getCountyName(company.countyCode)} · {company.locality}
      </p>

      <div className="metrics">
        <div className="metric">
          <span>Cifră de afaceri</span>
          <strong>{formatRon(financial.turnoverRon)}</strong>
        </div>
        <div className="metric">
          <span>Profit net</span>
          <strong>{formatRon(financial.netProfitRon)}</strong>
        </div>
        <div className="metric">
          <span>Marjă netă</span>
          <strong>{formatMargin(financial.turnoverRon, financial.netProfitRon)}</strong>
        </div>
        <div className="metric">
          <span>Angajați</span>
          <strong>{financial.employeeCount.toLocaleString("ro-RO")}</strong>
        </div>
      </div>
    </article>
  );
}
