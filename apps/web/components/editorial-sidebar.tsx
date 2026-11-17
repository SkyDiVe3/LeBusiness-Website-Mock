import Link from "next/link";
import { getEditorialBySection, type EditorialSectionTag } from "@doingbusiness/domain";
import { getEditorialHref } from "./editorial-card";
import {
  VerticalSidebarCarousel,
  type CarouselSlideItem
} from "./vertical-sidebar-carousel";

type SidebarBlockConfig = {
  title: string;
  sectionTag: EditorialSectionTag;
  moreHref: string;
  limit: number;
  carousel?: boolean;
  visibleCount?: number;
  rotateOffset?: number;
};

const defaultBlocks: ReadonlyArray<SidebarBlockConfig> = [
  { title: "Webinarii", sectionTag: "webinarii", moreHref: "/webinarii", limit: 3 },
  { title: "Articole", sectionTag: "business-digest", moreHref: "/articole", limit: 8, carousel: true, visibleCount: 3 },
  { title: "Interviuri", sectionTag: "interviuri", moreHref: "/interviuri", limit: 6, carousel: true, visibleCount: 4 },
  { title: "Stiri", sectionTag: "stiri", moreHref: "/stiri", limit: 4 }
];

function formatDateRo(isoDate: string): string {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(isoDate));
}

export function EditorialSidebar({
  blocks = defaultBlocks
}: Readonly<{
  blocks?: ReadonlyArray<SidebarBlockConfig>;
}>) {
  return (
    <aside className="sidebar-stack" aria-label="Sectiuni editoriale conexe">
      {blocks.map((block) => {
        const rawItems = getEditorialBySection(block.sectionTag);
        const offset =
          block.rotateOffset && rawItems.length > 0
            ? block.rotateOffset % rawItems.length
            : 0;
        const rotatedItems =
          offset > 0 ? [...rawItems.slice(offset), ...rawItems.slice(0, offset)] : rawItems;
        const items = rotatedItems.slice(0, block.limit);
        if (items.length === 0) return null;

        const slides: CarouselSlideItem[] = items.map((item) => ({
          id: item.id,
          href: getEditorialHref(item),
          title: item.title,
          coverImage: item.coverImage,
          dateLabel: formatDateRo(item.publishedAt)
        }));

        return (
          <section key={`${block.sectionTag}-${block.title}`} className="sidebar-widget">
            <h3 className="sidebar-widget-title">
              <span>{block.title}</span>
              <Link href={block.moreHref} className="eyebrow">
                Vezi tot
              </Link>
            </h3>

            {block.carousel ? (
              <VerticalSidebarCarousel
                items={slides}
                visibleCount={block.visibleCount ?? 4}
              />
            ) : (
              <div className="sidebar-mini-list">
                {slides.map((item) => (
                  <div key={item.id} className="sidebar-mini-item">
                    <div className="sidebar-mini-thumb">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        width={152}
                        height={108}
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="sidebar-mini-title">
                        <Link href={item.href}>{item.title}</Link>
                      </p>
                      <span className="editorial-meta mono">{item.dateLabel}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </aside>
  );
}
