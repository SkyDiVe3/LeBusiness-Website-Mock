import Link from "next/link";
import { companySeeds, getEditorialBySection } from "@doingbusiness/domain";
import { CompanyCard } from "../components/company-card";
import { EditorialCard } from "../components/editorial-card";
import { EditorialSidebar } from "../components/editorial-sidebar";
import { JsonLd } from "../components/json-ld";

const industryFilters = [
  { label: "Energie & Petrol", href: "/companii?caen=0610" },
  { label: "Energie Electrica", href: "/companii?caen=3511" },
  { label: "IT & Securitate", href: "/companii?caen=6201" },
  { label: "Automotive", href: "/companii?caen=2910" },
  { label: "Transport & Cargo", href: "/companii?caen=5229" },
  { label: "Comert & Retail", href: "/companii?caen=4752" },
  { label: "Toate companiile", href: "/companii" }
] as const;

export default function HomePage() {
  const siteUrl = (process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3010").replace(/\/+$/, "");

  const newsItems = getEditorialBySection("stiri");
  const digestItems = getEditorialBySection("business-digest");
  const driveItems = getEditorialBySection("business-drive");
  const interviewItems = getEditorialBySection("interviuri");

  const leadNews = newsItems[0];
  const secondaryNews = newsItems.slice(1, 3);
  const leadDigest = digestItems[0];
  const secondaryDigest = digestItems.slice(1, 3);
  const featuredCompanies = companySeeds.filter((c) => c.logoPath).slice(0, 4);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "DoingBusiness.ro",
      url: siteUrl,
      logo: `${siteUrl}/media/doingbusiness.png`
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "DoingBusiness.ro",
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/companii?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ];

  return (
    <main id="main-content">
      <JsonLd data={structuredData} />

      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy-panel">
            <span className="eyebrow">DOINGBUSINESS.RO · B2B ROMANIA</span>
            <h1>
              Decizii{" "}
              <span className="inline-pill-img" aria-hidden="true">
                <img
                  src="/media/covers/6a6b46005091b_ceo_conference_2026.jpg"
                  alt=""
                  width={120}
                  height={64}
                />
              </span>{" "}
              clare pentru liderii{" "}
              <span className="inline-pill-img" aria-hidden="true">
                <img
                  src="/media/covers/6949bd498aa9e_poza_cristian_sporis.jpg"
                  alt=""
                  width={120}
                  height={64}
                />
              </span>{" "}
              pietei romanesti.
            </h1>

            <div className="hero-mobile-strip" aria-hidden="true">
              <img
                src="/media/covers/6a6b46005091b_ceo_conference_2026.jpg"
                alt=""
                width={112}
                height={68}
              />
              <img
                src="/media/covers/6949bd498aa9e_poza_cristian_sporis.jpg"
                alt=""
                width={112}
                height={68}
              />
            </div>

            <p className="hero-lead">
              Solutii integrate pentru Comunicare, Marketing, Vanzari si Networking. Interviuri executive LinkLeaders, Business Digest, Evenimente si Major Companies in Romania.
            </p>

            <div className="button-row">
              <Link className="button button-primary" href="/companii">
                Exploreaza Major Companies
              </Link>
              <Link className="button button-outline" href="/editorial">
                Descopera Linkleaders
              </Link>
            </div>
          </div>

          <aside className="hero-showcase" aria-label="Eveniment fanion DoingBusiness">
            <article className="hero-event-card">
              <div className="hero-event-media">
                <img
                  src="/media/covers/6a6b46005091b_ceo_conference_2026.jpg"
                  alt="CEO Conference - THE BIG RETHINK - LEADERSHIP IN AN OUT OF BALANCE WORLD"
                  width={640}
                  height={360}
                />
              </div>
              <div className="hero-event-body">
                <span className="eyebrow">Eveniment Fanion · CEO Conference</span>
                <h2>
                  <Link href="/evenimente/ceo-conference">
                    THE BIG RETHINK - LEADERSHIP IN AN OUT OF BALANCE WORLD
                  </Link>
                </h2>
                <p>Comunitatea LinkLeaders si Be Inspired. Make it Happen!, Cluj, 9 Decembrie.</p>
                <div className="hero-event-footer">
                  <span className="cui-badge">Editia 2026 · C-Level</span>
                  <Link className="button button-outline button-sm" href="/evenimente/ceo-conference">
                    Detalii eveniment
                  </Link>
                </div>
              </div>
            </article>
          </aside>
        </div>

        <div className="shell">
          <article
            className="hero-magazine-spotlight"
            aria-label="Major Companies in Romania - Publicatie Anuala Bilingva si Prezentare PDF"
          >
            <div className="hero-spotlight-cover">
              <img
                src="/media/downloads/2025/MCR-2025-Digital.jpg"
                alt="Major Companies in Romania - Editia 2025"
                width={156}
                height={214}
              />
            </div>

            <div className="hero-spotlight-body">
              <span className="eyebrow">Publicatie Anuala Bilingva · Editia 2025</span>
              <h2>Major Companies in Romania - Top 3.000 Companii &amp; Lideri Executivi</h2>
              <p className="hero-spotlight-desc">
                Repere financiare verificate pe 32 de industrii si peste 300 de domenii CAEN.
              </p>

              <div className="hero-spotlight-stats" aria-label="Indicatori editie Major Companies">
                <span className="spotlight-stat-badge mono">3.000 Companii</span>
                <span className="spotlight-stat-badge mono">32 Industrii</span>
                <span className="spotlight-stat-badge mono">300+ Domenii CAEN</span>
                <span className="spotlight-stat-badge mono">RO / EN · PDF</span>
              </div>

              <div className="hero-spotlight-actions">
                <a
                  className="button button-primary"
                  href="/media/downloads/2024/Major-Companies-in-Romania-2024-fp.pdf"
                >
                  Descarca Prezentarea PDF
                </a>
                <Link className="button button-outline" href="/top-companii">
                  Vezi Editia Digitala
                </Link>
                <Link className="button button-outline" href="/companii">
                  Cauta in Directorul CUI
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell section-split">
          <div>
            <div className="section-heading">
              <div>
                <span className="eyebrow">Linkleaders · Actualitate</span>
                <h2>Stiri</h2>
              </div>
              <Link className="button button-outline" href="/stiri">
                Vezi toate stirile
              </Link>
            </div>

            <div className="editorial-asymmetric">
              {leadNews ? <EditorialCard item={leadNews} variant="lead" /> : null}
              <div className="editorial-stack">
                {secondaryNews.map((item) => (
                  <EditorialCard key={item.id} item={item} variant="compact" />
                ))}
              </div>
            </div>
          </div>

          <EditorialSidebar
            blocks={[
              {
                title: "Interviuri",
                sectionTag: "interviuri",
                moreHref: "/interviuri",
                limit: 6,
                carousel: true,
                visibleCount: 5
              }
            ]}
          />
        </div>
      </section>

      <section className="section section-band">
        <div className="shell section-split">
          <div>
            <div className="section-heading">
              <div>
                <span className="eyebrow">Linkleaders · Analiza &amp; Opinii</span>
                <h2>Business Digest</h2>
              </div>
              <Link className="button button-outline" href="/articole">
                Vezi toate articolele
              </Link>
            </div>

            <div className="editorial-asymmetric">
              {leadDigest ? <EditorialCard item={leadDigest} variant="lead" /> : null}
              <div className="editorial-stack">
                {secondaryDigest.map((item) => (
                  <EditorialCard key={item.id} item={item} variant="compact" />
                ))}
              </div>
            </div>
          </div>

          <EditorialSidebar
            blocks={[
              {
                title: "Articole recente",
                sectionTag: "business-digest",
                moreHref: "/articole",
                limit: 8,
                carousel: true,
                visibleCount: 3,
                rotateOffset: 3
              },
              { title: "Webinarii", sectionTag: "webinarii", moreHref: "/webinarii", limit: 2 }
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Piata Auto &amp; Mobilitate Corporate</span>
              <h2>Business &amp; Drive</h2>
            </div>
            <Link className="button button-outline" href="/business-drive">
              Vezi toate din Business &amp; Drive
            </Link>
          </div>

          <div className="editorial-grid-2col">
            {driveItems.slice(0, 4).map((item) => (
              <EditorialCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-band">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">LinkLeaders Interviews</span>
              <h2>Interviews</h2>
            </div>
            <Link className="button button-outline" href="/interviuri">
              Vezi toate interviurile
            </Link>
          </div>

          <div className="editorial-grid-2col">
            {interviewItems.slice(0, 4).map((item) => (
              <EditorialCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Major Companies in Romania</span>
              <h2>Major Companies</h2>
            </div>
            <Link className="button button-outline" href="/companii">
              Exploreaza tot directorul
            </Link>
          </div>

          <div className="industry-pill-grid" aria-label="Industrii Major Companies">
            {industryFilters.map((filter) => (
              <Link key={filter.label} href={filter.href} className="industry-pill">
                {filter.label}
              </Link>
            ))}
          </div>

          <div className="company-grid">
            {featuredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
