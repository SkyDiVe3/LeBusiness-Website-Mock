"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type SubNavItem = {
  href: string;
  label: string;
};

type PrimaryNavItem = {
  id: string;
  href: string;
  label: string;
  children?: ReadonlyArray<SubNavItem>;
};

const navigationItems: ReadonlyArray<PrimaryNavItem> = [
  { id: "home", href: "/", label: "Home" },
  {
    id: "linkleaders",
    href: "/editorial",
    label: "Linkleaders",
    children: [
      { href: "/interviuri", label: "Interviuri" },
      { href: "/video-interviuri", label: "Leader Insights" },
      { href: "/articole", label: "Business Digest" },
      { href: "/stiri", label: "Stiri" }
    ]
  },
  { id: "business-drive", href: "/business-drive", label: "Business & Drive" },
  {
    id: "evenimente",
    href: "/evenimente",
    label: "Evenimente",
    children: [
      { href: "/evenimente/ceo-conference", label: "CEO Conference" },
      { href: "/evenimente/alte-evenimente", label: "Alte Evenimente" },
      { href: "/evenimente/business-evolution", label: "Business Evolution" },
      { href: "/webinarii", label: "Webinarii" }
    ]
  },
  {
    id: "major-companies",
    href: "/top-companii",
    label: "Major Companies",
    children: [
      { href: "/top-companii", label: "Major Companies in Romania" },
      { href: "/companii", label: "Director companii" }
    ]
  },
  {
    id: "despre-noi",
    href: "/despre-noi",
    label: "Despre noi",
    children: [
      { href: "/linkleaders", label: "LinkLeaders" },
      { href: "/dezvoltarea-afacerii", label: "Business development" }
    ]
  }
];

function ChevronIcon({ open }: Readonly<{ open: boolean }>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 200ms cubic-bezier(0.22, 1, 0.36, 1)"
      }}
    >
      <path
        d="M3 5.25L7 9.25L11 5.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    linkleaders: true,
    "despre-noi": true
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function isGroupActive(item: PrimaryNavItem): boolean {
    if (isActive(item.href)) return true;
    return item.children ? item.children.some((child) => isActive(child.href)) : false;
  }

  function toggleGroup(id: string): void {
    setExpandedGroups((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  }

  const inEnglish = pathname === "/en" || pathname.startsWith("/en/");

  return (
    <>
      <div className="utility-bar">
        <div className="shell utility-row">
          <div className="utility-links">
            <a href="tel:+40213170390">+40-21-317.03.90</a>
            <a href="mailto:office@doingbusiness.ro">office@doingbusiness.ro</a>
            <Link href="/companii">Director Companii B2B</Link>
          </div>
          <div className="utility-locale" aria-label="Selectie limba">
            <Link href="/" className={inEnglish ? "" : "is-current"}>
              RO
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/en" className={inEnglish ? "is-current" : ""}>
              EN
            </Link>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="shell header-row">
          <Link className="brand" href="/" onClick={() => setMenuOpen(false)}>
            <img
              src="/media/doingbusiness.png"
              alt="DoingBusiness.ro"
              width={142}
              height={30}
              className="brand-logo"
            />
          </Link>

          <nav aria-label="Navigatie principala" className="main-nav">
            {navigationItems.map((item) => (
              <div key={item.id} className="nav-item-group">
                <Link
                  href={item.href}
                  aria-current={isGroupActive(item) ? "page" : undefined}
                  className={isGroupActive(item) ? "nav-link is-active" : "nav-link"}
                >
                  <span>{item.label}</span>
                  {item.children ? <ChevronIcon open={false} /> : null}
                </Link>
                {item.children ? (
                  <div className="nav-dropdown" role="menu" aria-label={`Submeniu ${item.label}`}>
                    <div className="nav-dropdown-panel">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          className={
                            isActive(child.href) ? "nav-dropdown-link is-active" : "nav-dropdown-link"
                          }
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="header-actions">
            <Link
              href="/contact"
              aria-current={isActive("/contact") ? "page" : undefined}
              className="nav-cta"
            >
              Contact
            </Link>

            <button
              type="button"
              className="mobile-menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="site-sidenav-modal"
              aria-label={menuOpen ? "Inchide meniul modal" : "Deschide meniul modal"}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="menu-icon" aria-hidden="true">
                <span className={menuOpen ? "menu-bar top open" : "menu-bar top"} />
                <span className={menuOpen ? "menu-bar mid open" : "menu-bar mid"} />
                <span className={menuOpen ? "menu-bar bot open" : "menu-bar bot"} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div
          className="sidenav-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setMenuOpen(false);
            }
          }}
        >
          <nav
            id="site-sidenav-modal"
            aria-label="Meniu complet DoingBusiness.ro"
            className="sidenav-modal"
          >
            <div className="sidenav-top">
              <span className="mono" style={{ fontSize: "0.78rem", color: "#CBD5E1" }}>
                DOINGBUSINESS.RO
              </span>
              <button
                type="button"
                className="sidenav-close"
                aria-label="Inchide meniul"
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
            </div>

            <ul className="sidenav-list">
              {navigationItems.map((item) => {
                const isExpanded = Boolean(expandedGroups[item.id]);
                return (
                  <li key={item.id}>
                    <div className="sidenav-row">
                      <Link
                        href={item.href}
                        className={isGroupActive(item) ? "sidenav-link is-active" : "sidenav-link"}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {item.children ? (
                        <button
                          type="button"
                          className={
                            isExpanded ? "sidenav-expand-btn is-open" : "sidenav-expand-btn"
                          }
                          aria-expanded={isExpanded}
                          aria-label={`Extinde submeniul ${item.label}`}
                          onClick={() => toggleGroup(item.id)}
                        >
                          <ChevronIcon open={isExpanded} />
                        </button>
                      ) : null}
                    </div>
                    {item.children && isExpanded ? (
                      <ul className="sidenav-sublist">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={
                                isActive(child.href) ? "sidenav-sublink is-active" : "sidenav-sublink"
                              }
                              onClick={() => setMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}

              <li>
                <div className="sidenav-row">
                  <Link
                    href="/contact"
                    className={isActive("/contact") ? "sidenav-link is-active" : "sidenav-link"}
                    onClick={() => setMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </li>
            </ul>

            <div className="sidenav-footer">
              <a href="tel:+40213170390">Telefon: +40-21-317.03.90</a>
              <a href="mailto:office@doingbusiness.ro">E-mail: office@doingbusiness.ro</a>
              <span>Strada Prof. Ion Bogdan, Nr. 4-6, Sector 1, Bucuresti</span>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
