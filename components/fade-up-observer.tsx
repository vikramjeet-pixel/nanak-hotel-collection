"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Observes all elements with class `fade-up` within a container
 * and adds `visible` when they scroll into view (once each).
 */
export function FadeUpObserver({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const observe = useCallback(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll(".fade-up");

    if (prefersReducedMotion) {
      targets.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cleanup = observe();
    return cleanup;
  }, [observe]);

  return <div ref={containerRef}>{children}</div>;
}
