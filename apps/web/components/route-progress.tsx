"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function isInternalNavigationTarget(anchor: HTMLAnchorElement, currentPathname: string): boolean {
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }
  try {
    const targetUrl = new URL(anchor.href, window.location.href);
    if (targetUrl.origin !== window.location.origin) return false;
    return targetUrl.pathname !== currentPathname;
  } catch {
    return false;
  }
}

export function RouteProgress() {
  const pathname = usePathname();
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    setNavigating(false);
  }, [pathname]);

  useEffect(() => {
    if (!navigating) return;
    const timer = window.setTimeout(() => setNavigating(false), 1800);
    return () => window.clearTimeout(timer);
  }, [navigating]);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent): void {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (isInternalNavigationTarget(anchor, pathname)) {
        setNavigating(true);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [pathname]);

  if (!navigating) return null;

  return (
    <>
      <div className="route-progress-track" role="progressbar" aria-label="Incarcare pagina">
        <div className="route-progress-fill" />
      </div>
      <div className="route-transition-banner" aria-live="polite">
        <span className="route-transition-label">Se incarca sectiunea...</span>
        <div className="skeleton-line is-subtitle" style={{ width: "100%", height: "0.6rem" }} />
        <div className="skeleton-line" style={{ width: "74%", height: "0.6rem" }} />
      </div>
    </>
  );
}
