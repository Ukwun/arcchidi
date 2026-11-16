"use client";

import { useRef, useState } from "react";
import Link from "next/link";

const navigation = [
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "How it works", href: "/#process" },
  { label: "About", href: "/#about" },
];

export function MobileMenu() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
    if (menuRef.current) {
      menuRef.current.open = false;
    }
  }

  return (
    <details
      className="mobile-menu"
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
      ref={menuRef}
    >
      <summary
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        <span>Menu</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
          <path
            d="M3 5.5h14M3 10h14M3 14.5h14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </summary>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navigation.map((item) => (
          <Link href={item.href} key={item.label} onClick={closeMenu}>
            {item.label}
          </Link>
        ))}
        <a
          className="mobile-whatsapp"
          href="https://wa.me/2347052702835"
          onClick={closeMenu}
        >
          WhatsApp
        </a>
      </nav>
    </details>
  );
}
