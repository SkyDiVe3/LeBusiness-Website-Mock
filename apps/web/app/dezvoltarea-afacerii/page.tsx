import type { Metadata } from "next";
import { BusinessDevelopmentView } from "../../components/business-development-view";

export const metadata: Metadata = {
  title: "Dezvoltarea afacerii | Business Development",
  description:
    "Portofoliu complet de solutii, aplicatii si servicii B2B pentru vanzari, marketing si achizitii: Kompass, Lead Generation, Call-Center si Business Evolution."
};

export default function BusinessDevelopmentRoPage() {
  return <BusinessDevelopmentView />;
}
