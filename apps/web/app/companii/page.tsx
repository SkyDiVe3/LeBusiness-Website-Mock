import type { Metadata } from "next";
import { getDistinctCaenOptions, searchCompanies } from "@doingbusiness/domain";
import { CompanyDirectory } from "../../components/company-directory";
import { PageHero } from "../../components/page-hero";

export const metadata: Metadata = {
  title: "Director companii",
  description: "Caută companii românești după CUI, CAEN, județ, cifră de afaceri și angajați."
};

export default function CompaniesPage() {
  const initialResult = searchCompanies({});
  const caenOptions = getDistinctCaenOptions();

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Major Companies"
        title="Directorul companiilor românești"
        description="Date structurate după CUI, cod CAEN și județ pentru cercetare de piață și evaluarea partenerilor."
        breadcrumbs={[{ label: "Acasă", href: "/" }, { label: "Director companii" }]}
      />
      <section className="section">
        <div className="shell">
          <div className="notice">
            Set demonstrativ validat cu Zod. Indicatorii financiari trebuie verificați la sursa oficială înainte de utilizare comercială.
          </div>
          <CompanyDirectory initialResult={initialResult} caenOptions={caenOptions} />
        </div>
      </section>
    </main>
  );
}
