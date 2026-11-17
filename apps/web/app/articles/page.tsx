import type { Metadata } from "next";
import { EditorialList } from "../../components/editorial-list";

export const metadata: Metadata = {
  title: "Business Digest · Articles",
  description:
    "LinkLeaders Business Digest articles: executive insights, economic convergence studies, tax updates, and industry analysis."
};

export default function ArticlesEnRoutePage() {
  return (
    <EditorialList
      kind="article"
      sectionTag="business-digest"
      eyebrow="LINKLEADERS · Business Digest"
      title="Business Digest"
      description="Analize, opinii de specialitate, studii de piata si tendinte relevante pentru decidenti si liderii companiilor majore."
    />
  );
}
