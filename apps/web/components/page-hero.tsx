import Link from "next/link";

type BreadcrumbItem = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs
}: Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs?: ReadonlyArray<BreadcrumbItem>;
}>) {
  return (
    <section className="page-hero">
      <div className="shell">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="breadcrumbs">
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`}>
                {index > 0 ? " / " : ""}
                {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span>{crumb.label}</span>}
              </span>
            ))}
          </nav>
        ) : null}
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
