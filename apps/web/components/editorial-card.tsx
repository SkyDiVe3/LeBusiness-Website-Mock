import Link from "next/link";
import type { EditorialItem } from "@doingbusiness/domain";

const kindPaths = {
  news: "/stiri",
  interview: "/interviuri",
  article: "/articole",
  event: "/evenimente"
} as const;

export function getEditorialHref(item: EditorialItem): string {
  if (item.sectionTag === "leader-insights") {
    return `/video-interviuri/${item.slug}`;
  }
  if (item.sectionTag === "webinarii") {
    return `/webinarii/${item.slug}`;
  }
  return `${kindPaths[item.kind]}/${item.slug}`;
}

export function EditorialCard({
  item,
  variant = "default"
}: Readonly<{
  item: EditorialItem;
  variant?: "lead" | "compact" | "default";
}>) {
  const date = new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(item.publishedAt));

  const href = getEditorialHref(item);

  if (variant === "lead") {
    return (
      <article className="editorial-lead-card">
        <div className="editorial-lead-media">
          <img
            src={item.coverImage}
            alt={item.title}
            width={800}
            height={500}
          />
        </div>
        <div className="editorial-lead-body">
          <span className="eyebrow">{item.category}</span>
          <h3>
            <Link href={href}>{item.title}</Link>
          </h3>
          <p>{item.excerpt}</p>
          <div className="editorial-meta">
            <span>{item.author}</span>
            <span className="mono">{date} · {item.readingMinutes} min</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="editorial-compact-row">
        <div className="editorial-compact-thumb">
          <img
            src={item.coverImage}
            alt={item.title}
            width={216}
            height={152}
            loading="lazy"
          />
        </div>
        <div className="editorial-compact-body">
          <span className="eyebrow">{item.category}</span>
          <h3>
            <Link href={href}>{item.title}</Link>
          </h3>
          <div className="editorial-meta">
            <span>{item.author}</span>
            <span className="mono">{date} · {item.readingMinutes} min</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="editorial-card">
      <div className="editorial-card-media">
        <img
          src={item.coverImage}
          alt={item.title}
          width={640}
          height={360}
          loading="lazy"
        />
      </div>
      <div className="editorial-card-body">
        <span className="eyebrow">{item.category}</span>
        <h3>
          <Link href={href}>{item.title}</Link>
        </h3>
        <p>{item.excerpt}</p>
        <div className="editorial-card-footer">
          <span>{item.author}</span>
          <span className="mono">{date} · {item.readingMinutes} min</span>
        </div>
      </div>
    </article>
  );
}
