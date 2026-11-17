import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../../components/contact-form";
import { PageHero } from "../../components/page-hero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Informatii contact DoingBusiness.ro: Strada Prof. Ion Bogdan, Nr. 4-6, Sector 1, Bucuresti, Telefon +40-21-317.03.90, Fax +40-21-317.03.93, office@doingbusiness.ro."
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Contact · DoingBusiness.ro"
        title="Informatii contact"
        description="Contacteaza echipa DoingBusiness.ro pentru LinkLeaders, Business Development, conferinte CEO Conference, Major Companies in Romania si parteneriate B2B."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="section">
        <div className="shell contact-grid">
          <div className="sidebar-stack">
            <article className="service-card">
              <span className="eyebrow">Date oficiale</span>
              <h2>Informatii contact</h2>

              <ul className="contact-info-list">
                <li className="contact-info-item">
                  <span>Adresa</span>
                  <strong>Strada Prof. Ion Bogdan, Nr. 4-6, Sector 1, Bucuresti, Romania</strong>
                </li>
                <li className="contact-info-item">
                  <span>Telefon</span>
                  <a href="tel:+40213170390" className="mono">
                    +40-21-317.03.90
                  </a>
                </li>
                <li className="contact-info-item">
                  <span>Fax</span>
                  <strong className="mono">+40-21-317.03.93</strong>
                </li>
                <li className="contact-info-item">
                  <span>E-mail</span>
                  <a href="mailto:office@doingbusiness.ro">office@doingbusiness.ro</a>
                </li>
                <li className="contact-info-item">
                  <span>Website</span>
                  <Link href="/">DoingBusiness.ro</Link>
                </li>
              </ul>
            </article>

            <article className="service-card">
              <span className="eyebrow">Harta &amp; Acces</span>
              <h2>Localizare contact</h2>
              <div className="contact-map-card">
                <div className="contact-map-meta">
                  <div>
                    <strong>DOINGBUSINESS.RO SRL</strong>
                    <p style={{ margin: "0.25rem 0 0", color: "var(--muted)", fontSize: "0.9rem" }}>
                      Strada Prof. Ion Bogdan, Nr. 4-6, Sector 1, Bucuresti, Romania
                    </p>
                  </div>
                  <a
                    className="button button-outline button-sm"
                    href="https://maps.google.com/?q=Strada+Prof.+Ion+Bogdan+4-6,+Sector+1,+Bucuresti,+Romania"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Deschide harta
                  </a>
                </div>
              </div>
            </article>
          </div>

          <article className="service-card">
            <span className="eyebrow">Mesaj direct</span>
            <h2>Formular contact</h2>
            <p style={{ margin: 0, color: "var(--muted)" }}>
              Campurile marcate cu * sunt obligatorii.
            </p>
            <ContactForm />
          </article>
        </div>
      </section>
    </main>
  );
}
