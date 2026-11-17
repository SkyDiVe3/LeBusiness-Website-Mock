import type { Metadata } from "next";
import { findEditorialItem } from "@doingbusiness/domain";
import { EditorialDetail } from "../../../components/editorial-detail";

type Properties = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Properties): Promise<Metadata> {
  const { slug } = await params;
  const item = findEditorialItem("interview", slug);
  return {
    title: item ? item.title : "Leader Insights",
    description: item?.excerpt ?? "Interviu video LinkLeaders pe DoingBusiness.ro."
  };
}

export default async function VideoInterviewDetailPage({ params }: Properties) {
  const { slug } = await params;
  return <EditorialDetail kind="interview" slug={slug} />;
}
