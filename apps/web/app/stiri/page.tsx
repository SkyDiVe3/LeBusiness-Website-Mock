import type { Metadata } from "next";
import { EditorialList } from "../../components/editorial-list";

export const metadata: Metadata = {
  title: "Stiri · Business Digest",
  description: "Stiri economice, fuziuni, tranzactii si investitii din mediul de business romanesc."
};

export default function NewsPage() {
  return (
    <EditorialList
      kind="news"
      sectionTag="stiri"
      eyebrow="Linkleaders · Stiri"
      title="Stiri"
      description="Noutati din economie, tranzactii, investitii strategice si actualitatea companiilor majore."
    />
  );
}
