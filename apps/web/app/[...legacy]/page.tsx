import Link from "next/link";
import { PageHero } from "../../components/page-hero";

type LegacyPageProperties = { params: Promise<{ legacy: string[] }> };

function legacySection(segment: string): { title: string; href: string } {
  if (["stire", "stiri", "post", "news"].includes(segment)) {
    return { title: "Stiri & Business Digest", href: "/stiri" };
  }
  if (["article", "articol", "articles", "articole"].includes(segment)) {
    return { title: "Business Digest", href: "/articole" };
  }
  if (["interviu", "interview", "interviuri", "interviews", "linkleaders", "editorial", "publishing"].includes(segment)) {
    return { title: "LinkLeaders", href: "/editorial" };
  }
  if (["event", "eveniment", "events", "evenimente", "webinar", "webinarii", "webinars"].includes(segment)) {
    return { title: "Evenimente", href: "/evenimente" };
  }
  if (["company", "companie", "major-companies", "top-companii"].includes(segment)) {
    return { title: "Major Companies", href: "/companii" };
  }
  return { title: "DoingBusiness.ro", href: "/" };
}

export default async function LegacyRoutePage({ params }: LegacyPageProperties) {
  const { legacy } = await params;
  const firstSegment = legacy[0] ?? "portal";
  const path = `/${legacy.map((segment) => encodeURIComponent(segment)).join("/")}`;
  const section = legacySection(firstSegment);

  return (
    <main id="main-content">
      <PageHero
        eyebrow="DoingBusiness.ro"
        title={section.title}
        description="Continua navigarea catre sectiunile active DoingBusiness.ro: Linkleaders, Business & Drive, Evenimente si Major Companies."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: section.title }]}
      />
      <section className="section">
        <div className="shell article-layout">
          <article className="prose">
            <p>
              Adresa solicitata (<code>{path}</code>) face trimitere la sectiunea <strong>{section.title}</strong>.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href={section.href}>
                Deschide {section.title}
              </Link>
              <Link className="button button-outline" href="/editorial">
                Exploreaza Linkleaders
              </Link>
            </div>
          </article>
          <aside className="aside">
            <strong>Sectiuni principale</strong>
            <p>
              <Link href="/interviuri">Interviuri LinkLeaders</Link> ·{" "}
              <Link href="/articole">Business Digest</Link> ·{" "}
              <Link href="/companii">Director Companii</Link>
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
