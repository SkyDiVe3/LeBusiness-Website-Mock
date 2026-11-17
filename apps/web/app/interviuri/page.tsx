import type { Metadata } from "next";
import { EditorialList } from "../../components/editorial-list";

export const metadata: Metadata = {
  title: "Interviuri · LinkLeaders",
  description: "Interviuri cu lideri executivi din companiile majore din Romania."
};

export default function InterviewsPage() {
  return (
    <EditorialList
      kind="interview"
      sectionTag="interviuri"
      eyebrow="Linkleaders · Interviuri"
      title="Interviuri LinkLeaders"
      description="Conversatii aplicate cu CEO si lideri executivi din companiile majore din Romania."
    />
  );
}
