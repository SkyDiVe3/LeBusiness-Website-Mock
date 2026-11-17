import Link from "next/link";
import { findEditorialItem, getEditorialBySection, type EditorialItem } from "@doingbusiness/domain";
import { notFound } from "next/navigation";
import { getEditorialHref } from "./editorial-card";
import { JsonLd } from "./json-ld";
import { PageHero } from "./page-hero";

const sectionRouteMap = {
  news: { href: "/stiri", label: "Stiri" },
  interview: { href: "/interviuri", label: "Interviuri" },
  article: { href: "/articole", label: "Business Digest" },
  event: { href: "/evenimente", label: "Evenimente" }
} as const;

function resolveSectionInfo(item: EditorialItem): { href: string; label: string } {
  if (item.sectionTag === "leader-insights") {
    return { href: "/video-interviuri", label: "Leader Insights" };
  }
  if (item.sectionTag === "business-drive") {
    return { href: "/business-drive", label: "Business & Drive" };
  }
  if (item.sectionTag === "webinarii") {
    return { href: "/webinarii", label: "Webinarii" };
  }
  if (item.sectionTag === "ceo-conference") {
    return { href: "/evenimente/ceo-conference", label: "CEO Conference" };
  }
  if (item.sectionTag === "business-evolution") {
    return { href: "/evenimente/business-evolution", label: "Business Evolution" };
  }
  if (item.sectionTag === "alte-evenimente") {
    return { href: "/evenimente/alte-evenimente", label: "Alte Evenimente" };
  }
  return sectionRouteMap[item.kind];
}

export function EditorialDetail({
  kind,
  slug
}: Readonly<{
  kind: EditorialItem["kind"];
  slug: string;
}>) {
  const item = findEditorialItem(kind, slug);
  if (!item) notFound();

  const section = resolveSectionInfo(item);
  const siteUrl = (process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3010").replace(/\/+$/, "");
  const canonicalUrl = `${siteUrl}${getEditorialHref(item)}`;

  const date = new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(item.publishedAt));

  const relatedItems = (
    item.sectionTag ? getEditorialBySection(item.sectionTag) : []
  )
    .filter((candidate) => candidate.id !== item.id)
    .slice(0, 4);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": item.kind === "event" ? "Event" : "NewsArticle",
      headline: item.title,
      name: item.title,
      description: item.excerpt,
      image: `${siteUrl}${item.coverImage}`,
      datePublished: item.publishedAt,
      author: { "@type": "Organization", name: item.author },
      url: canonicalUrl
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: section.label, item: `${siteUrl}${section.href}` },
        { "@type": "ListItem", position: 3, name: item.title, item: canonicalUrl }
      ]
    }
  ];

  return (
    <main id="main-content">
      <JsonLd data={structuredData} />
      <PageHero
        eyebrow={item.category}
        title={item.title}
        description={item.excerpt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: section.label, href: section.href },
          { label: item.title }
        ]}
      />
      <section className="section">
        <div className="shell article-layout">
          <article className="prose">
            <div className="detail-cover">
              <img
                src={item.coverImage}
                alt={item.title}
                width={960}
                height={540}
              />
            </div>

            <p className="editorial-meta">
              <strong>{item.author}</strong>
              <span className="mono">{date} · {item.readingMinutes} min lectura</span>
            </p>

            <p>{item.excerpt}</p>

            {item.highlights ? (
              <>
                <h2>Idei principale</h2>
                {item.highlights.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </>
            ) : null}

            <h2>Despre secțiunea {section.label}</h2>
            <p>
              Platforma DoingBusiness.ro conectează decidenții companiilor majore din România prin articole, studii economice, interviuri executive LinkLeaders și proiecte dedicate dezvoltării afacerilor.
            </p>
          </article>

          <aside className="sidebar-stack">
            <div className="aside">
              <strong>Detalii material</strong>
              <p>Autor / Sursă: {item.author}</p>
              <p className="mono">Data: {date}</p>
              <Link className="button button-primary" href="/companii">
                Major Companies Directory
              </Link>
              <Link className="button button-outline" href={section.href}>
                Înapoi la {section.label}
              </Link>
            </div>

            {relatedItems.length > 0 ? (
              <div className="sidebar-widget">
                <h3 className="sidebar-widget-title">
                  <span>Din {section.label}</span>
                </h3>
                <div className="sidebar-mini-list">
                  {relatedItems.map((rel) => (
                    <div key={rel.id} className="sidebar-mini-item">
                      <div className="sidebar-mini-thumb">
                        <img src={rel.coverImage} alt={rel.title} width={152} height={108} loading="lazy" />
                      </div>
                      <p className="sidebar-mini-title">
                        <Link href={getEditorialHref(rel)}>{rel.title}</Link>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </main>
  );
}
