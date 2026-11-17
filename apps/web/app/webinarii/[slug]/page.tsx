import type { Metadata } from "next";
import { findEditorialItem } from "@doingbusiness/domain";
import { EditorialDetail } from "../../../components/editorial-detail";

type Properties = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Properties): Promise<Metadata> {
  const { slug } = await params;
  const item = findEditorialItem("event", slug);
  return {
    title: item ? item.title : "Webinar DoingBusiness",
    description: item?.excerpt ?? "Webinar B2B pe DoingBusiness.ro."
  };
}

export default async function WebinarDetailPage({ params }: Properties) {
  const { slug } = await params;
  return <EditorialDetail kind="event" slug={slug} />;
}
