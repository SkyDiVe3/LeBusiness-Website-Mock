import type { Metadata } from "next";
import { EditorialList } from "../../components/editorial-list";

export const metadata: Metadata = {
  title: "Leader Insights · Interviuri video",
  description: "Leader Insights: interviuri video cu executivi si antreprenori la conferintele LinkLeaders si CEO Conference."
};

export default function VideoInterviewsPage() {
  return (
    <EditorialList
      kind="interview"
      sectionTag="leader-insights"
      eyebrow="Linkleaders · Leader Insights"
      title="Leader Insights"
      description="Interviuri video cu lideri executivi despre adaptare strategica, echipe si crestere sustenabila."
    />
  );
}
