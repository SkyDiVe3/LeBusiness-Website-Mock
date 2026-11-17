import {
  getEditorialBySection,
  getEditorialItems,
  type EditorialItem,
  type EditorialSectionTag
} from "@doingbusiness/domain";
import { EditorialCard } from "./editorial-card";
import { EditorialSidebar } from "./editorial-sidebar";
import { PageHero } from "./page-hero";

const defaultCopy = {
  news: {
    eyebrow: "Linkleaders · Stiri",
    title: "Stiri economice si investitii",
    description: "Noutati din economie, tranzactii, investitii strategice si miscari din mediul de business din Romania."
  },
  interview: {
    eyebrow: "Linkleaders · Interviuri",
    title: "Interviuri cu lideri executivi",
    description: "Dialoguri aplicate cu CEO si top manageri ai companiilor majore din Romania."
  },
  article: {
    eyebrow: "Linkleaders · Business Digest",
    title: "Business Digest",
    description: "Analize, opinii de specialitate, studii de piata si tendinte relevante pentru decidenti."
  },
  event: {
    eyebrow: "Evenimente",
    title: "Conferinte si programe executive",
    description: "CEO Conference, Business Evolution si sesiuni LinkLeaders pentru comunitatea de business."
  }
} satisfies Record<EditorialItem["kind"], { eyebrow: string; title: string; description: string }>;

export function EditorialList({
  kind,
  sectionTag,
  eyebrow,
  title,
  description,
  withSidebar = true
}: Readonly<{
  kind: EditorialItem["kind"];
  sectionTag?: EditorialSectionTag;
  eyebrow?: string;
  title?: string;
  description?: string;
  withSidebar?: boolean;
}>) {
  const baseCopy = defaultCopy[kind];
  const heroCopy = {
    eyebrow: eyebrow ?? baseCopy.eyebrow,
    title: title ?? baseCopy.title,
    description: description ?? baseCopy.description
  };

  const items = sectionTag ? getEditorialBySection(sectionTag) : getEditorialItems(kind);
  const lead = items[0];
  const rest = items.slice(1);

  return (
    <main id="main-content">
      <PageHero
        {...heroCopy}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: heroCopy.title }]}
      />
      <section className="section">
        <div className={withSidebar ? "shell section-split" : "shell"}>
          <div>
            {withSidebar ? (
              <div className="editorial-grid-2col">
                {items.map((item) => (
                  <EditorialCard key={item.id} item={item} />
                ))}
              </div>
            ) : lead && rest.length > 0 ? (
              <>
                <div className="editorial-asymmetric">
                  <EditorialCard item={lead} variant="lead" />
                  <div className="editorial-stack">
                    {rest.slice(0, 2).map((item) => (
                      <EditorialCard key={item.id} item={item} variant="compact" />
                    ))}
                  </div>
                </div>
                {rest.slice(2).length > 0 ? (
                  <div className="editorial-grid-2col" style={{ marginTop: "2rem" }}>
                    {rest.slice(2).map((item) => (
                      <EditorialCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <div className="editorial-grid-2col">
                {items.map((item) => (
                  <EditorialCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {items.length === 0 ? (
              <p className="notice">Nu exista materiale disponibile in aceasta categorie momentan.</p>
            ) : null}
          </div>

          {withSidebar ? <EditorialSidebar /> : null}
        </div>
      </section>
    </main>
  );
}
