import type { Metadata } from "next";
import { findEditorialItem, type EditorialSectionTag } from "@doingbusiness/domain";
import { EditorialDetail } from "../../../components/editorial-detail";
import { EditorialList } from "../../../components/editorial-list";

type Properties = { params: Promise<{ slug: string }> };

const eventCategoryMeta: Record<
  string,
  { tag: EditorialSectionTag; eyebrow: string; title: string; description: string }
> = {
  "ceo-conference": {
    tag: "ceo-conference",
    eyebrow: "Evenimente · CEO Conference",
    title: "CEO Conference",
    description:
      "Authentic debate and sharing platform for business leaders: The Big Rethink, Shaping the Future, and Leading the Change."
  },
  "alte-evenimente": {
    tag: "alte-evenimente",
    eyebrow: "Evenimente · Conferinte & Forumuri",
    title: "Alte Evenimente",
    description:
      "Be Inspired. Make it Happen! (Cluj, Brasov, Iasi, Oradea) si Wealth & Investment Forum."
  },
  "business-evolution": {
    tag: "business-evolution",
    eyebrow: "Evenimente · Business Evolution",
    title: "Business Evolution",
    description:
      "Roadshow B2B dedicat companiilor: Crestere, Transformare, Adaptare in centrele economice din Romania."
  }
};

export async function generateMetadata({ params }: Properties): Promise<Metadata> {
  const { slug } = await params;
  const category = eventCategoryMeta[slug];
  if (category) {
    return { title: category.title, description: category.description };
  }
  const item = findEditorialItem("event", slug);
  return {
    title: item ? item.title : "Eveniment DoingBusiness",
    description: item?.excerpt ?? "Eveniment DoingBusiness.ro."
  };
}

export default async function EventSlugPage({ params }: Properties) {
  const { slug } = await params;
  const category = eventCategoryMeta[slug];
  if (category) {
    return (
      <EditorialList
        kind="event"
        sectionTag={category.tag}
        eyebrow={category.eyebrow}
        title={category.title}
        description={category.description}
      />
    );
  }
  return <EditorialDetail kind="event" slug={slug} />;
}
