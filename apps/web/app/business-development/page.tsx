import type { Metadata } from "next";
import { BusinessDevelopmentView } from "../../components/business-development-view";

export const metadata: Metadata = {
  title: "Business Development",
  description:
    "Advanced portfolio of solutions, tools, and resources for rapid business growth: Kompass EasyBusiness, Sales Accelerator, Booster, Lead Generation, and Business Evolution."
};

export default function BusinessDevelopmentPage() {
  return <BusinessDevelopmentView />;
}
