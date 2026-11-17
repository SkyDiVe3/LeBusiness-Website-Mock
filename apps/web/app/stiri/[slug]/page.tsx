import type { Metadata } from "next";
import { findEditorialItem } from "@doingbusiness/domain";
import { EditorialDetail } from "../../../components/editorial-detail";

type Properties = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Properties): Promise<Metadata> {
  const { slug } = await params;
  const item = findEditorialItem("news", slug);
  return {
    title: item ? item.title : "Știre negăsită",
    description: item?.excerpt ?? "Articol din secțiunea Business Digest."
  };
}

export default async function NewsDetailPage({ params }: Properties) {
  const { slug } = await params;
  return <EditorialDetail kind="news" slug={slug} />;
}
