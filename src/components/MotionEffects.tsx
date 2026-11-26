"use client";

import { useEffect } from "react";

export function MotionEffects() {
  useEffect(() => {
    const protectedTargets = document.querySelectorAll<HTMLElement>(
      ".heroActions, .guideForm, .enquiryForm, .confirmation-actions",
    );
    const protectedObserver = new IntersectionObserver(
      (entries) => {
        const obstructed = entries.some((entry) => entry.isIntersecting);
        document.documentElement.toggleAttribute("data-whatsapp-obscured", obstructed);
      },
      { threshold: 0.01 },
    );

    protectedTargets.forEach((element) => protectedObserver.observe(element));

    const whatsapp = document.querySelector<HTMLElement>(".mobile-whatsapp-fab");
    const collisionTargets = document.querySelectorAll<HTMLElement>(
      "main p, main h1, main h2, main h3, main h4, main label, main input, main select, main textarea, main button, main a",
    );
    const updateWhatsAppCollision = () => {
      if (!whatsapp) return;
      const buttonRect = whatsapp.getBoundingClientRect();
      const collision = Array.from(collisionTargets).some((element) => {
        if (element.closest(".mobile-whatsapp-fab")) return false;
        const style = window.getComputedStyle(element);
        if (style.display === "none" || style.visibility === "hidden") return false;
        const rect = element.getBoundingClientRect();
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          rect.left < buttonRect.right &&
          rect.right > buttonRect.left &&
          rect.top < buttonRect.bottom &&
          rect.bottom > buttonRect.top
        );
      });
      document.documentElement.toggleAttribute("data-whatsapp-collision", collision);
    };

    updateWhatsAppCollision();
    window.addEventListener("scroll", updateWhatsAppCollision, { passive: true });
    window.addEventListener("resize", updateWhatsAppCollision);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      protectedObserver.disconnect();
      window.removeEventListener("scroll", updateWhatsAppCollision);
      window.removeEventListener("resize", updateWhatsAppCollision);
      return;
    }

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (elements.length === 0) {
      protectedObserver.disconnect();
      window.removeEventListener("scroll", updateWhatsAppCollision);
      window.removeEventListener("resize", updateWhatsAppCollision);
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
      protectedObserver.disconnect();
      window.removeEventListener("scroll", updateWhatsAppCollision);
      window.removeEventListener("resize", updateWhatsAppCollision);
      delete document.documentElement.dataset.whatsappObscured;
      delete document.documentElement.dataset.whatsappCollision;
      delete document.documentElement.dataset.motionReady;
    };
  }, []);

  return null;
}
