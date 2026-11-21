import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";

const navigation = [
  { label: "Packages", href: "/#packages" },
  { label: "Design-build", href: "/#design-build" },
  { label: "For diaspora clients", href: "/#monitoring" },
  { label: "Smart-ready homes", href: "/#smart-ready-homes" },
];

export function SiteHeader() {
  return (
    <>
      <header className="site-header" id="top">
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="Arc. Chidi Ndubuisi, home">
          <span className="brand-name">BUILDSCOPE</span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <MobileMenu />

            <Link
            aria-label="Book a 20-minute call"
              className="button button-primary header-cta"
              href="/#contact"
            >
              <span aria-hidden="true" className="long-label">
              Book a 20-min call
              </span>
              <span aria-hidden="true" className="short-label">
                Enquire
              </span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
