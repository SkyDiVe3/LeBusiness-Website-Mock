import type { Metadata } from "next";
import Link from "next/link";
import { getEditorialBySection } from "@doingbusiness/domain";
import { EditorialCard } from "../../components/editorial-card";
import { EditorialSidebar } from "../../components/editorial-sidebar";
import { PageHero } from "../../components/page-hero";

export const metadata: Metadata = {
  title: "Evenimente · CEO Conference & Business Evolution",
  description: "Conferinte executive: CEO Conference, Business Evolution, Alte Evenimente si Webinarii DoingBusiness.ro."
};

export default function EventsPage() {
  const ceo = getEditorialBySection("ceo-conference");
  const other = getEditorialBySection("alte-evenimente");
  const businessEvolution = getEditorialBySection("business-evolution");
  const webinars = getEditorialBySection("webinarii");

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Evenimente · DoingBusiness.ro"
        title="Evenimente"
        description="Conferinte executive si programe de networking: CEO Conference, Alte Evenimente, Business Evolution si Webinarii."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Evenimente" }]}
      />

      <section className="section">
        <div className="shell section-split">
          <div className="service-section-stack">
            <div>
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Evenimente Fanion</span>
                  <h2>CEO Conference</h2>
                </div>
                <Link className="button button-outline" href="/evenimente/ceo-conference">
                  Vezi categoria CEO Conference
                </Link>
              </div>
              <div className="editorial-grid-2col">
                {ceo.map((item) => (
                  <EditorialCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div>
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Evenimente Regionale &amp; Forumuri</span>
                  <h2>Alte Evenimente</h2>
                </div>
                <Link className="button button-outline" href="/evenimente/alte-evenimente">
                  Vezi Alte Evenimente
                </Link>
              </div>
              <div className="editorial-grid-2col">
                {other.map((item) => (
                  <EditorialCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div>
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Roadshow B2B</span>
                  <h2>Business Evolution</h2>
                </div>
                <Link className="button button-outline" href="/evenimente/business-evolution">
                  Vezi Business Evolution
                </Link>
              </div>
              <div className="editorial-grid-2col">
                {businessEvolution.map((item) => (
                  <EditorialCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div>
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Sesiuni Online</span>
                  <h2>Webinarii</h2>
                </div>
                <Link className="button button-outline" href="/webinarii">
                  Vezi toate webinariile
                </Link>
              </div>
              <div className="editorial-grid-2col">
                {webinars.slice(0, 2).map((item) => (
                  <EditorialCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          <EditorialSidebar />
        </div>
      </section>
    </main>
  );
}
