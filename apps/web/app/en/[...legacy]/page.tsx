import Link from "next/link";

type EnglishLegacyProperties = { params: Promise<{ legacy: string[] }> };

export default async function EnglishLegacyPage({ params }: EnglishLegacyProperties) {
  const { legacy } = await params;
  const path = `/en/${legacy.map((segment) => encodeURIComponent(segment)).join("/")}`;
  return <main id="main-content"><section className="page-hero"><div className="shell"><span className="eyebrow">Legacy route</span><h1>DoingBusiness archive</h1><p>This route is retained during the verified content migration.</p></div></section><section className="section"><div className="shell prose"><p>The requested route <code>{path}</code> has a safe, indexable migration placeholder while the imported editorial record is validated.</p><Link className="button button-primary" href="/en">Return to English overview</Link></div></section></main>;
}
