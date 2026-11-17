import type { Metadata } from "next";
import Link from "next/link";
import { companySeeds } from "@doingbusiness/domain";
import { CompanyCard } from "../../components/company-card";
import { PageHero } from "../../components/page-hero";

export const metadata: Metadata = {
  title: "Major Companies in Romania",
  description:
    "Major Companies in Romania: top Romanian companies by industry, CAEN code, county, turnover, net profit, and employee count."
};

const sectors = [
  { name: "Banci si servicii financiare", href: "/companii" },
  { name: "Energie, combustibili si apa", href: "/companii?caen=0610" },
  { name: "Productie energie electrica", href: "/companii?caen=3511" },
  { name: "Automotive", href: "/companii?caen=2910" },
  { name: "IT&C si software", href: "/companii?caen=6201" },
  { name: "Comert & Retail", href: "/companii?caen=4752" },
  { name: "Transport si cargo", href: "/companii?caen=5229" },
  { name: "Logistica & depozitare", href: "/companii?caen=5210" }
] as const;

export default function MajorCompaniesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Major Companies in Romania"
        title="Major Companies"
        description="Publicatia si directorul companiilor majore din Romania: indicatori financiari structurati pe industrii, coduri CAEN si judete."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Major Companies" }]}
      />

      <section className="section">
        <div className="shell service-section-stack">
          <article className="service-card">
            <div className="about-split">
              <div className="about-media">
                <img
                  src="/media/downloads/2025/MCR-2025-Digital.jpg"
                  alt="Major Companies in Romania 2025"
                  width={480}
                  height={640}
                />
              </div>

              <div className="prose">
                <span className="eyebrow">Publicatie Anuala &amp; Director B2B</span>
                <h2>Major Companies in Romania</h2>
                <p>
                  How to do and with whom to do business in Romania - Major Companies in Romania provides business partners and investors with structured information about Romania&apos;s most important companies, organized by industries, CAEN codes, county, turnover, net profit, and employees.
                </p>
                <div className="button-row">
                  <Link className="button button-primary" href="/companii">
                    Deschide directorul complet
                  </Link>
                  <a
                    className="button button-outline"
                    href="/media/downloads/2024/Major-Companies-in-Romania-2024-fp.pdf"
                  >
                    Prezentare PDF
                  </a>
                </div>
              </div>
            </div>
          </article>

          <div>
            <div className="section-heading">
              <div>
                <span className="eyebrow">Filtrare pe sectoare</span>
                <h2>Industrii si companii reprezentative</h2>
              </div>
              <Link className="button button-outline" href="/companii">
                Cauta dupa CUI, CAEN sau judet
              </Link>
            </div>

            <div className="industry-pill-grid">
              {sectors.map((sector) => (
                <Link key={sector.name} href={sector.href} className="industry-pill">
                  {sector.name}
                </Link>
              ))}
            </div>

            <div className="company-grid">
              {companySeeds.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
