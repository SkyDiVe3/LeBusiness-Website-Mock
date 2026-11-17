import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "English Overview",
  description: "DoingBusiness.ro English overview: LinkLeaders, Business Development, and Major Companies in Romania."
};

export default function EnglishHomePage() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <span className="eyebrow">DoingBusiness.ro · Business Intelligence</span>
            <h1>Clear corporate data and executive stories from Romania.</h1>
            <p className="hero-lead">
              Following 26 years of experience in B2B communication, events, and market development, DoingBusiness.ro connects LinkLeaders and Business Development solutions with Major Companies in Romania.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/companii">
                Explore Major Companies
              </Link>
              <Link className="button button-outline" href="/linkleaders">
                About LinkLeaders
              </Link>
              <Link className="button button-outline" href="/business-development">
                Business Development
              </Link>
            </div>
          </div>

          <aside className="hero-showcase" aria-label="Featured DoingBusiness publications">
            <article className="hero-pub-card">
              <div className="hero-pub-thumb">
                <img
                  src="/media/downloads/2025/MCR-2025-Digital.jpg"
                  alt="Major Companies in Romania digital edition"
                  width={92}
                  height={124}
                />
              </div>
              <div className="hero-pub-body">
                <span className="eyebrow">Flagship Publication</span>
                <h3>Major Companies in Romania</h3>
                <div className="hero-pub-actions">
                  <Link className="button button-primary button-sm" href="/top-companii">
                    View Directory
                  </Link>
                  <Link className="button button-outline button-sm" href="/contact">
                    Contact Us
                  </Link>
                </div>
              </div>
            </article>
          </aside>
        </div>
      </section>
    </main>
  );
}
