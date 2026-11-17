import type { Metadata } from "next";
import Link from "next/link";
import { getEditorialBySection } from "@doingbusiness/domain";
import { EditorialCard } from "../../components/editorial-card";
import { EditorialSidebar } from "../../components/editorial-sidebar";
import { PageHero } from "../../components/page-hero";

export const metadata: Metadata = {
  title: "Linkleaders · Editorial",
  description:
    "Sectiunea principala Linkleaders: Interviuri executive, Leader Insights video, Business Digest si Stiri economice din Romania."
};

export default function EditorialHubPage() {
  const interviews = getEditorialBySection("interviuri");
  const leaderInsights = getEditorialBySection("leader-insights");
  const digest = getEditorialBySection("business-digest");
  const news = getEditorialBySection("stiri");

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Linkleaders · Portal Editorial"
        title="Linkleaders"
        description="Interviuri cu liderii companiilor majore din Romania, Leader Insights video, analize Business Digest si stiri economice zilnice."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Linkleaders" }]}
      />

      <section className="section">
        <div className="shell section-split">
          <div className="service-section-stack">
            <div>
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Linkleaders</span>
                  <h2>Interviuri</h2>
                </div>
                <Link className="button button-outline" href="/interviuri">
                  Vezi toate din categorie
                </Link>
              </div>

              <div className="editorial-grid-2col">
                {interviews.slice(0, 4).map((item) => (
                  <EditorialCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div>
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Linkleaders</span>
                  <h2>Leader Insights</h2>
                </div>
                <Link className="button button-outline" href="/video-interviuri">
                  Vezi toate din categorie
                </Link>
              </div>

              <div className="editorial-grid-2col">
                {leaderInsights.slice(0, 4).map((item) => (
                  <EditorialCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div>
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Linkleaders</span>
                  <h2>Business Digest</h2>
                </div>
                <Link className="button button-outline" href="/articole">
                  Vezi toate din categorie
                </Link>
              </div>

              <div className="editorial-grid-2col">
                {digest.slice(0, 4).map((item) => (
                  <EditorialCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div>
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Linkleaders</span>
                  <h2>Stiri</h2>
                </div>
                <Link className="button button-outline" href="/stiri">
                  Vezi toate din categorie
                </Link>
              </div>

              <div className="editorial-grid-2col">
                {news.slice(0, 4).map((item) => (
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
