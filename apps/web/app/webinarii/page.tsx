import type { Metadata } from "next";
import { EditorialList } from "../../components/editorial-list";

export const metadata: Metadata = {
  title: "Webinarii · DoingBusiness.ro",
  description: "Webinarii Business Evolution si CEO Conference dedicate finantarii, digitalizarii si strategiei executive."
};

export default function WebinarsPage() {
  return (
    <EditorialList
      kind="event"
      sectionTag="webinarii"
      eyebrow="Evenimente · Webinarii"
      title="Webinarii"
      description="Sesiuni online interactive dedicate decidentilor, antreprenorilor si echipelor de management."
    />
  );
}
