import type { Metadata } from "next";
import { EditorialList } from "../../components/editorial-list";

export const metadata: Metadata = {
  title: "Business Digest · Articole",
  description: "Analize financiare, studii economice si opinii executive din Business Digest."
};

export default function ArticlesPage() {
  return (
    <EditorialList
      kind="article"
      sectionTag="business-digest"
      eyebrow="Linkleaders · Business Digest"
      title="Business Digest"
      description="Analize, opinii de specialitate, studii de piata si tendinte relevante pentru decidenti."
    />
  );
}
