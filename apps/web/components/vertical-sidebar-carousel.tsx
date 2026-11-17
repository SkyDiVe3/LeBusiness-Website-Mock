"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type CarouselSlideItem = {
  id: string;
  href: string;
  title: string;
  coverImage: string;
  dateLabel: string;
};

const ROW_HEIGHT_PX = 84;
const SWIPE_MS = 333;
const WAIT_MS = 1000;

export function VerticalSidebarCarousel({
  items,
  visibleCount = 4
}: Readonly<{
  items: ReadonlyArray<CarouselSlideItem>;
  visibleCount?: number;
}>) {
  const canRotate = items.length > visibleCount;
  const [step, setStep] = useState<{ index: number; animate: boolean }>({
    index: 0,
    animate: true
  });
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    function handleChange(event: MediaQueryListEvent): void {
      setReducedMotion(event.matches);
    }
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!canRotate || paused || reducedMotion) return;

    if (step.index >= items.length) {
      const snapTimer = window.setTimeout(() => {
        setStep({ index: 0, animate: false });
      }, SWIPE_MS + 20);
      return () => window.clearTimeout(snapTimer);
    }

    const advanceTimer = window.setTimeout(() => {
      setStep((prev) => ({
        index: prev.index + 1,
        animate: true
      }));
    }, WAIT_MS);

    return () => window.clearTimeout(advanceTimer);
  }, [canRotate, paused, reducedMotion, step, items.length]);

  const renderedItems = canRotate
    ? [...items, ...items.slice(0, visibleCount)]
    : items;

  const viewportHeight = Math.min(items.length, visibleCount) * ROW_HEIGHT_PX;
  const activeDot = items.length > 0 ? step.index % items.length : 0;

  return (
    <div
      className="sidebar-carousel-root"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="sidebar-carousel-viewport"
        style={{ height: `${viewportHeight}px` }}
        aria-live="off"
      >
        <div
          className="sidebar-carousel-track"
          style={{
            transform: `translate3d(0, -${step.index * ROW_HEIGHT_PX}px, 0)`,
            transition: step.animate
              ? `transform ${SWIPE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
              : "none"
          }}
        >
          {renderedItems.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="sidebar-mini-item sidebar-carousel-row">
              <div className="sidebar-mini-thumb">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  width={152}
                  height={108}
                  loading="lazy"
                />
              </div>
              <div className="sidebar-carousel-content">
                <p className="sidebar-mini-title">
                  <Link href={item.href}>{item.title}</Link>
                </p>
                <span className="editorial-meta mono">{item.dateLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {canRotate ? (
        <div className="sidebar-carousel-footer mono" aria-hidden="true">
          <span>
            {activeDot + 1}/{items.length}
          </span>
          <div className="sidebar-carousel-dots">
            {items.map((item, idx) => (
              <span
                key={item.id}
                className={
                  idx === activeDot ? "sidebar-carousel-dot is-active" : "sidebar-carousel-dot"
                }
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
