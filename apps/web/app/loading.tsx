export default function Loading() {
  return (
    <main id="main-content" aria-busy="true" aria-label="Se incarca pagina">
      <section className="page-hero">
        <div className="shell skeleton-page" style={{ paddingBlock: "0.75rem" }}>
          <div className="skeleton-line is-eyebrow" />
          <div className="skeleton-line is-title" />
          <div className="skeleton-line is-subtitle" />
        </div>
      </section>

      <section className="section">
        <div className="shell skeleton-grid">
          <div className="skeleton-sidebar">
            <div className="skeleton-block" />
            <div className="skeleton-card" />
          </div>
          <div className="skeleton-sidebar">
            <div className="skeleton-card" />
            <div className="skeleton-card" />
          </div>
        </div>
      </section>
    </main>
  );
}
