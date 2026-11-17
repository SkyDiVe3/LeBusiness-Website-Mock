import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../../components/page-hero";

export const metadata: Metadata = {
  title: "LinkLeaders",
  description:
    "The LinkLeaders platform is exclusively dedicated to the largest companies in Romania and their leaders: CEO Conference, Major Companies in Romania, and Leaders Insights."
};

export default function LinkLeadersPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Despre noi · LinkLeaders"
        title="LinkLeaders"
        description="The LinkLeaders platform is exclusively dedicated to the largest companies in Romania and their leaders, creating links and interactions for new business opportunities."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Despre noi", href: "/despre-noi" },
          { label: "LinkLeaders" }
        ]}
      />

      <section className="section">
        <div className="shell service-section-stack">
          <article className="service-card">
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
                  <a
                    className="button button-primary"
                    href="/media/downloads/2024/LinkLeaders-2024-fp.pdf"
                  >
                    Detailed Presentation (PDF)
                  </a>
                  <Link className="button button-outline" href="/editorial">
                    Open Linkleaders Section
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <article className="service-card">
            <span className="eyebrow">01 · Events &amp; Community</span>
            <h2>1. CONFERENCES, EVENTS &amp; MEETINGS</h2>

            <div className="about-split">
              <div className="service-banner">
                <img
                  src="/media/downloads/Premium-Projects-Ceo-Conference.jpg"
                  alt="Premium Projects - CEO Conference"
                  width={800}
                  height={450}
                />
              </div>

              <div className="prose">
                <p>
                  <strong>CEO Conference - Shaping the Future</strong>
                </p>
                <p>
                  We built the conference as an authentic debate and sharing platform for business leaders to discuss advanced business ideas, transformation models, innovation, growth and approaches that shape the world of CEOs in the following years of unprecedented challenges.
                </p>
                <p>
                  CEO Conference is an exclusive - by invitation only - event. This open and less formal environment allows top managers and entrepreneurs to share insights, vision, experiences and business practices, to get and reinforce recognition and reputation.
                </p>
                <div className="button-row">
                  <a
                    className="button button-primary"
                    href="/media/downloads/2024/CEO-CONFERENCE-Shaping-the-Future-2024-fp.pdf"
                  >
                    CEO Conference Presentation (PDF)
                  </a>
                  <Link className="button button-outline" href="/evenimente/ceo-conference">
                    CEO Conference Section
                  </Link>
                </div>
              </div>
            </div>

            <div className="editorial-grid-2col">
              <div className="prose">
                <h3>CEO LinkLeaders, thematic group meetings</h3>
                <p>
                  Small group meetings (5-8 participants) sharing a passion or a hobby, or having the interest to discuss a specific topic in a private and confidential environment. These evening meetings are hosted in premium unique locations in a less formal format.
                </p>
              </div>
              <div className="prose">
                <h3>CEO LinkLeaders Talks &amp; Custom Events</h3>
                <p>
                  Participants get the opportunity to meet a selected group of peers in a private and confidential environment, exchange business ideas, share vision and experience and explore new business opportunities. From concept to relevant participants, we also organize conferences, meetings, webinars and workshops on request.
                </p>
              </div>
            </div>
          </article>

          <article className="service-card">
            <span className="eyebrow">02 · Business Publication</span>
            <h2>2. &ldquo;MAJOR COMPANIES in ROMANIA&rdquo; - premium English language business publication</h2>

            <div className="about-split">
              <div className="service-banner">
                <img
                  src="/media/downloads/About-Us-Major-Companies.png"
                  alt="Premium Projects - Major Companies"
                  width={800}
                  height={450}
                />
              </div>

              <div className="prose">
                <p>
                  How to do and with whom to do business in Romania - &ldquo;Major Companies in Romania&rdquo;, provides business partners and investors with thorough information about Romania&apos;s most important 3000 companies, ranked by 32 industries and more than 300 activity domains.
                </p>
                <p>
                  It includes industry overviews, interviews and opinions of the key business leaders, offering valuable support for informed decision-making and new partnership opportunities.
                </p>
                <p>
                  Companies can permanently publish content (articles, advertorials, press releases, events, news etc.) in our DoingBusiness.ro portal. All interviews, advertising materials and company content are aggregated in an online comprehensive company summary profile.
                </p>
                <div className="button-row">
                  <Link className="button button-primary" href="/top-companii">
                    Explore Major Companies
                  </Link>
                  <a
                    className="button button-outline"
                    href="/media/downloads/2024/Major-Companies-in-Romania-2024-fp.pdf"
                  >
                    Publication Presentation (PDF)
                  </a>
                </div>
              </div>
            </div>
          </article>

          <article className="service-card">
            <span className="eyebrow">03 · Digital &amp; Thought Leadership</span>
            <h2>3. ONLINE PLATFORM · Leaders Insights</h2>

            <div className="about-split">
              <div className="service-banner">
                <img
                  src="/media/downloads/Premium-Projects-Leaders-Interview.jpg"
                  alt="Premium Projects - Leaders Interview"
                  width={800}
                  height={450}
                />
              </div>

              <div className="prose">
                <p>
                  Create the opportunity for business leaders to share vision, solutions, insights, ideas, and thought leadership through the complete range of interviews:
                </p>
                <ul className="bullet-list">
                  <li>podcast;</li>
                  <li>video registered at your premises;</li>
                  <li>video, registered by webcam;</li>
                  <li>printed in our Premium business publications;</li>
                  <li>online (photos and text) published in our DoingBusiness.ro portal.</li>
                </ul>
                <p>
                  All content, from press releases, whitepapers, articles, expertise and case studies, events to interviews, is aggregated in the company summary page, complemented daily by the Business Digest section.
                </p>
                <div className="button-row">
                  <Link className="button button-primary" href="/interviuri">
                    See Interviews
                  </Link>
                  <Link className="button button-outline" href="/video-interviuri">
                    Leader Insights Video
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <article className="service-card">
            <span className="eyebrow">Community Membership</span>
            <h2>WHY JOIN?</h2>

            <div className="about-split">
              <div className="service-banner">
                <img
                  src="/media/downloads/About-Us-Why-Join.png"
                  alt="Premium Projects - Why Join?"
                  width={800}
                  height={450}
                />
              </div>

              <div className="prose">
                <p>LinkLeaders was designed for you to:</p>
                <ul className="bullet-list">
                  <li>
                    Build meaningful partnerships, meet investors, inspiring business thinkers, and influential consultants who can impact your company&apos;s performance;
                  </li>
                  <li>Meet those who drive the real transformation in the local business;</li>
                  <li>
                    Promote your achievements, bold decisions, and pivotal role in overcoming turbulent business situations to win trust and recognition and spark new opportunities for your future;
                  </li>
                  <li>Enhance your brand recognition and gain trust in the most exclusive business community.</li>
                </ul>
                <p>
                  Build a customized package following your objectives and company-specific activity: Interviews (Video, Print, Online &amp; Social Media), Content promotion &amp; Advertising, Events partnerships (CEO Conference, LinkLeaders Talks &amp; CEO Lounges), one-to-one private meetings, or CSR programs.
                </p>
                <p>
                  Contact us at <a href="mailto:office@doingbusiness.ro">office@doingbusiness.ro</a> or{" "}
                  <a href="tel:+40213170390">+40 21 317 0390</a>. Check also our{" "}
                  <Link href="/dezvoltarea-afacerii" style={{ textDecoration: "underline", fontWeight: 600 }}>
                    BUSINESS DEVELOPMENT services here
                  </Link>
                  .
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
