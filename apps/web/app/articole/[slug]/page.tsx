import type { Metadata } from "next";
import { findEditorialItem } from "@doingbusiness/domain";
import { EditorialDetail } from "../../../components/editorial-detail";

type Properties = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Properties): Promise<Metadata> {
  const { slug } = await params;
  const item = findEditorialItem("article", slug);
  return {
    title: item ? item.title : "Articol negăsit",
    description: item?.excerpt ?? "Analiză editorială pe DoingBusiness.ro."
  };
}

export default async function ArticleDetailPage({ params }: Properties) {
  const { slug } = await params;
  return <EditorialDetail kind="article" slug={slug} />;
}
