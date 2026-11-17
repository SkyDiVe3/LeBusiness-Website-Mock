import type { Metadata } from "next";
import { EditorialList } from "../../components/editorial-list";

export const metadata: Metadata = {
  title: "Business & Drive",
  description: "Piata auto, mobilitate corporate, lansari de modele si interviuri din industria auto."
};

export default function BusinessDrivePage() {
  return (
    <EditorialList
      kind="article"
      sectionTag="business-drive"
      eyebrow="Business & Drive · Piata Auto"
      title="Business & Drive"
      description="Noutati din piata auto, flote corporate, electrificare si interviuri cu liderii industriei auto."
    />
  );
}
