import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../../components/page-hero";

export const metadata: Metadata = {
  title: "Despre noi",
  description:
    "DoingBusiness.ro - 26 years of experience in providing programs and developments solutions: LinkLeaders and Business Development."
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Despre noi · DoingBusiness.ro"
        title="Despre noi"
        description="Following our 26 years of experience in providing programs and developments solutions, we offer our clients two main areas of expertise: LinkLeaders and BUSINESS DEVELOPMENT."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Despre noi" }]}
      />

      <section className="section">
        <div className="shell service-section-stack">
          <div className="service-card prose" style={{ maxWidth: "100%" }}>
            <p>
              Following our 26 years of experience in providing programs and developments solutions, we offer our clients two main areas of expertise:
            </p>
            <p>
              <Link href="/linkleaders" style={{ fontWeight: 700, textDecoration: "underline" }}>
                LinkLeaders
              </Link>{" "}
              - a unique and exclusive platform dedicated to the community of the most important business players of the Romanian economy, and
            </p>
            <p>
              <Link href="/dezvoltarea-afacerii" style={{ fontWeight: 700, textDecoration: "underline" }}>
                BUSINESS DEVELOPMENT
              </Link>{" "}
              - an advanced portfolio of solutions, tools, and resources for rapid business growth, helping Sales, Marketing and Purchasing departments increase their activity and efficiency.
            </p>
          </div>

          <article className="service-card">
            <div>
              <span className="eyebrow">Business Line 1</span>
              <h2>LinkLeaders</h2>
            </div>

            <div className="about-split">
              <div className="about-media">
                <img
                  src="/media/downloads/About-Us-LinkLeaders.png"
                  alt="About Us - LinkLeaders"
                  width={640}
                  height={420}
                />
              </div>

              <div className="prose">
                <p>
                  The <strong>LinkLeaders</strong> platform is exclusively dedicated to the largest companies in Romania and their leaders, creating links and interactions for new business opportunities, nurturing strong business relationships, facilitating the sharing of thought leadership, and initiating impactful projects for the Romanian business environment and society.
                </p>
                <p>
                  It is a <strong>VALUABLE CONNECTIONS</strong> facilitator for the <strong>EXCLUSIVE COMMUNITY</strong> of business leaders that develop stronger business relationships with their peers and generate <strong>NEW BUSINESS</strong> opportunities to accelerate the development of their companies.
                </p>
                <p>
                  LinkLeaders help business leaders build on their existing business strengths, enhance their brand awareness, and reinforce their recognition and reputation using the program&apos;s extended infrastructure of resources and activities.
                </p>
                <div className="button-row">
                  <Link className="button button-primary" href="/linkleaders">
                    More about LinkLeaders
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <article className="service-card">
            <div>
              <span className="eyebrow">Business Line 2</span>
              <h2>BUSINESS DEVELOPMENT</h2>
            </div>

            <div className="about-split">
              <div className="about-media">
                <img
                  src="/media/downloads/About-Us-Business-Development.jpg"
                  alt="About Us - Business Development"
                  width={640}
                  height={420}
                />
              </div>

              <div className="prose">
                <p>
                  An advanced portfolio of solutions, tools, and resources for rapid business growth, helping Sales, Marketing and Purchasing departments increase their activity and efficiency.
                </p>
                <p>
                  <strong>How can we help you?</strong>
                </p>
                <ul className="bullet-list">
                  <li>
                    Sell more by attracting new customers, retaining existing ones, expanding sales areas, and increasing team efficiency;
                  </li>
                  <li>
                    Increase your company&apos;s and brand&apos;s visibility, promote your products and services offer online, positioning yourself ahead of the competition, and communicate to a targeted B2B community;
                  </li>
                  <li>
                    Streamline procurement by finding the best suppliers.
                  </li>
                </ul>
                <div className="button-row">
                  <Link className="button button-primary" href="/dezvoltarea-afacerii">
                    More about BUSINESS DEVELOPMENT
                  </Link>
                  <Link className="button button-outline" href="/contact">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
