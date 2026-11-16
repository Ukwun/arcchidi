"use client";

import { useEffect } from "react";

export function MotionEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      return;
    }

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (elements.length === 0) {
      return;
    }

    const pending = new Set<Element>(elements);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            reveal(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      },
    );

    function reveal(element: Element) {
      element.setAttribute("data-revealed", "true");
      pending.delete(element);
      observer.unobserve(element);
    }

    const revealPassedContent = () => {
      pending.forEach((element) => {
        if (element.getBoundingClientRect().bottom < 0) {
          reveal(element);
        }
      });
    };

    elements.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", revealPassedContent, { passive: true });
    document.documentElement.dataset.motionReady = "true";
    revealPassedContent();

    return () => {
      window.removeEventListener("scroll", revealPassedContent);
      observer.disconnect();
      delete document.documentElement.dataset.motionReady;
    };
  }, []);

  return null;
}
