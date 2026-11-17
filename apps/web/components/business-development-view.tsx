import Link from "next/link";
import { PageHero } from "./page-hero";

export function BusinessDevelopmentView() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Despre noi · Solutii B2B"
        title="Business development"
        description="An advanced portfolio of solutions, tools, and resources for rapid business growth, helping Sales, Marketing and Purchasing departments increase their activity and efficiency."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Despre noi", href: "/despre-noi" },
          { label: "Business development" }
        ]}
      />

      <section className="section">
        <div className="shell service-section-stack">
          <article className="service-card">
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
                  <li>Streamline procurement by finding the best suppliers.</li>
                </ul>
                <div className="button-row">
                  <a
                    className="button button-primary"
                    href="/media/downloads/2024/Business-Development-Services-2024.pdf"
                  >
                    Detailed Presentation (PDF)
                  </a>
                  <Link className="button button-outline" href="/contact">
                    Request an Offer
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <article className="service-card">
            <span className="eyebrow">Capabilities</span>
            <h2>WHAT CAN WE DO FOR YOUR COMPANY?</h2>

            <div className="editorial-grid-2col">
              <div className="prose">
                <h3>SALES &amp; CRM</h3>
                <p><strong>Online applications for:</strong></p>
                <ul className="bullet-list">
                  <li>Prospecting and lists of potential customers,</li>
                  <li>Complete Sales cycle management for your Team,</li>
                  <li>Detailed promotion of your offer, positioning yourself ahead of the competition in the largest B2B community and search engines.</li>
                </ul>
                <p><strong>Offline services for:</strong></p>
                <ul className="bullet-list">
                  <li>Lead generation and direct meeting scheduling,</li>
                  <li>Database updating,</li>
                  <li>Market research and studies,</li>
                  <li>Inbound services for customer support,</li>
                  <li>Partnerships for B2B conferences and webinars or special events dedicated to your company.</li>
                </ul>
              </div>

              <div className="prose">
                <h3>MARKETING &amp; PURCHASING</h3>
                <p><strong>Online applications and services for Marketing:</strong></p>
                <ul className="bullet-list">
                  <li>Creation of a dedicated webpage for your company in the Kompass.com B2B portal, with all relevant information for potential partners, optimized for search engines,</li>
                  <li>Continuous promotion of content and digital advertising,</li>
                  <li>Dedicated telemarketing campaigns, segmented marketing lists, and B2B event partnerships.</li>
                </ul>
                <p><strong>Purchasing:</strong></p>
                <p>
                  Access a global database of potential suppliers online and use the automated system for sending and receiving requests for quotes (RFQ).
                </p>
              </div>
            </div>
          </article>

          <article className="service-card">
            <span className="eyebrow">01 · Kompass Online Platform</span>
            <h2>1. KOMPASS ONLINE PLATFORM · EASYBUSINESS + SALES ACCELERATOR</h2>

            <div className="about-split">
              <div className="service-banner">
                <img
                  src="/media/downloads/Business-Development-Ebol-Sales-Acc.jpg"
                  alt="Business Development - EasyBusiness and Sales Accelerator"
                  width={800}
                  height={450}
                />
              </div>

              <div className="prose">
                <p>
                  Kompass is an online platform used for SALES, MARKETING, PURCHASING and PR, offering a complete range of applications, tools, and resources to find, select and contact prospects and manage the sales cycle efficiently.
                </p>
                <ul className="bullet-list">
                  <li>Access to a database of over 60 million companies (&gt; 800K from Romania)</li>
                  <li>Comprehensive company data (contacts, activity, products and services, financial data, managers, registration codes)</li>
                  <li>Logical combinations of over 60 selection criteria, saved searches, statistics, and alerts</li>
                  <li>Custom exports in XLS and PDF formats and Multicontact email messaging</li>
                  <li>Sales Accelerator CRM features: executive contacts from social networks, Outlook sync, and team collaboration dashboards</li>
                </ul>
                <div className="button-row">
                  <a
                    className="button button-primary"
                    href="/media/downloads/2024/EASYBUSINESS-SALES-ACCELERATOR-2024-en.pdf"
                  >
                    EasyBusiness + Sales Accelerator (PDF)
                  </a>
                </div>
              </div>
            </div>

            <div className="about-split">
              <div className="service-banner">
                <img
                  src="/media/downloads/Business-Development-Booster.jpg"
                  alt="Business Development - Booster"
                  width={800}
                  height={450}
                />
              </div>

              <div className="prose">
                <h3>BOOSTER &amp; CONTACT+ for Purchasing</h3>
                <ul className="bullet-list">
                  <li>Marketplace - Promote your offer and company on the most important B2B marketplace</li>
                  <li>Detailed product presentations with links to video presentations, catalogues, or company website</li>
                  <li>Comprehensive dedicated company webpage, unlimited content posts, and intelligent SEO for Google</li>
                  <li>EasyBusiness &amp; Contact+: select trusted suppliers and receive automated RFQs for products and services</li>
                </ul>
                <div className="button-row">
                  <a
                    className="button button-outline"
                    href="/media/downloads/2024/Booster-Digital-Marketing-2024-ro-ext.pdf"
                  >
                    Booster Digital Marketing (PDF)
                  </a>
                </div>
              </div>
            </div>
          </article>

          <article className="service-card">
            <span className="eyebrow">02 &amp; 03 · Outbound &amp; Data</span>
            <h2>2. LEAD GENERATION &amp; 3. CALL-CENTER / DATABASE SERVICES</h2>

            <div className="about-split">
              <div className="service-banner">
                <img
                  src="/media/downloads/Business-Development-Lead-Generation.jpg"
                  alt="Business Development - Lead Generation"
                  width={800}
                  height={450}
                />
              </div>

              <div className="prose">
                <p>
                  Your sales team will be more motivated and efficient in generating new sales following the leads qualified by our experienced B2B team of operators:
                </p>
                <ul className="bullet-list">
                  <li>40-65% of your prospects receive your detailed presentation/offering via email</li>
                  <li>3-5% confirm interest in meeting (online or offline) with a sales representative</li>
                  <li>Expand your potential customer database with GDPR &ldquo;ok-to-contact&rdquo; decision-makers</li>
                  <li>Telemarketing campaigns, market studies and research, customized CRM lists (30+ filters), and inbound customer assistance</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="service-card">
            <span className="eyebrow">04 · Events &amp; Webinars</span>
            <h2>4. BUSINESS EVOLUTION ROADSHOW &amp; WEBINARS</h2>

            <div className="about-split">
              <div className="service-banner">
                <img
                  src="/media/downloads/Business-Development-Business-Evolution.jpg"
                  alt="Business Development - Business Evolution"
                  width={800}
                  height={450}
                />
              </div>

              <div className="prose">
                <p>
                  Join our partners for the Business Evolution event series and webinars, dedicated to business development solutions that companies can apply immediately:
                </p>
                <ul className="bullet-list">
                  <li>Promote your solutions to a targeted segment of potential clients</li>
                  <li>Direct exposure and networking with top management and decision-makers</li>
                  <li>Promotion before, during, and after events plus private one-on-one meetings</li>
                </ul>
                <div className="button-row">
                  <Link className="button button-primary" href="/evenimente/business-evolution">
                    Business Evolution Section
                  </Link>
                  <a
                    className="button button-outline"
                    href="/media/downloads/2024/Business-Evolution-Roadshow-2024-fp.pdf"
                  >
                    Roadshow Presentation (PDF)
                  </a>
                </div>
              </div>
            </div>
          </article>

          <article className="service-card prose" style={{ maxWidth: "100%" }}>
            <span className="eyebrow">Partnership</span>
            <h2>WHY WORK WITH US?</h2>
            <ul className="bullet-list">
              <li>Complete range of B2B communication and business development services, online and offline: portals, applications, publications, conferences and webinars, databases, and specialized B2B telemarketing.</li>
              <li>Extended experience and flexible approach creating personalized solutions tailored to client objectives.</li>
              <li>Resources to filter the entire B2B segment using over 30 selection criteria to reach the right decision makers.</li>
              <li>High professional standards delivering added value and measurable ROI.</li>
            </ul>
            <p>
              Contact us at <a href="mailto:office@doingbusiness.ro">office@doingbusiness.ro</a> or{" "}
              <a href="tel:+40213170390">+40 21 317 0390</a>. Check also our{" "}
              <Link href="/linkleaders" style={{ textDecoration: "underline", fontWeight: 600 }}>
                LinkLeaders services here
              </Link>
              .
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
