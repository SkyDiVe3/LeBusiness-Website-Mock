import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Outfit } from "next/font/google";
import Link from "next/link";
import { RouteProgress } from "../components/route-progress";
import { SiteHeader } from "../components/site-header";
import "./globals.css";

const serif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif"
});

const sans = Outfit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

const mono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: { default: "DoingBusiness.ro | Solutii integrate B2B si Major Companies", template: "%s | DoingBusiness.ro" },
  description: "Solutii integrate pentru Comunicare, Marketing, Vanzari si Networking. LinkLeaders, Business Digest, Evenimente si Major Companies in Romania.",
  metadataBase: new URL(process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3010")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <meta name="is-agentic-site-type" content="business" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Sari la continut</a>
        <RouteProgress />
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <div className="shell footer-grid">
            <div>
              <div className="footer-brand">
                doing<span>business</span>.ro
              </div>
              <p>Solutii integrate pentru Comunicare, Marketing, Vanzari si Networking. LinkLeaders, Business Development si Major Companies in Romania.</p>
              <p className="footer-meta mono">Versiune de reconstructie locala · 2026</p>
            </div>
            <div>
              <strong className="footer-heading">Sectiuni</strong>
              <div className="footer-list">
                <Link href="/">Home</Link>
                <Link href="/editorial">Linkleaders</Link>
                <Link href="/business-drive">Business &amp; Drive</Link>
                <Link href="/evenimente">Evenimente</Link>
                <Link href="/top-companii">Major Companies</Link>
              </div>
            </div>
            <div>
              <strong className="footer-heading">Linkleaders</strong>
              <div className="footer-list">
                <Link href="/interviuri">Interviuri</Link>
                <Link href="/video-interviuri">Leader Insights</Link>
                <Link href="/articole">Business Digest</Link>
                <Link href="/stiri">Stiri</Link>
              </div>
            </div>
            <div>
              <strong className="footer-heading">Evenimente</strong>
              <div className="footer-list">
                <Link href="/evenimente/ceo-conference">CEO Conference</Link>
                <Link href="/evenimente/alte-evenimente">Alte Evenimente</Link>
                <Link href="/evenimente/business-evolution">Business Evolution</Link>
                <Link href="/webinarii">Webinarii</Link>
              </div>
            </div>
            <div>
              <strong className="footer-heading">Despre noi</strong>
              <div className="footer-list">
                <Link href="/despre-noi">Despre noi</Link>
                <Link href="/linkleaders">LinkLeaders</Link>
                <Link href="/dezvoltarea-afacerii">Business development</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/companii">Director companii</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
