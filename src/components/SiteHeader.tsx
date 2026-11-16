import Link from "next/link";

const navigation = [
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "How it works", href: "/#process" },
  { label: "About", href: "/#about" },
];

export function SiteHeader() {
  return (
    <>
      <div className="announcement-bar">
        <div className="announcement-inner">
          <p>Building in Nigeria from the diaspora?</p>
          <Link href="/#monitoring">
            See how site monitoring works <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <header className="site-header" id="top">
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="Arc. Chidi Ndubisi, home">
            <span className="brand-mark">Arc.</span>
            <span className="brand-name">Chidi Ndubisi</span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <details className="mobile-menu">
              <summary aria-label="Open navigation menu">
                <span>Menu</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  width="18"
                  height="18"
                >
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
                  <Link href={item.href} key={item.label}>
                    {item.label}
                  </Link>
                ))}
                <a className="mobile-whatsapp" href="https://wa.me/2347052702835">
                  WhatsApp
                </a>
              </nav>
            </details>

            <Link className="button button-primary header-cta" href="/#contact">
              <span className="long-label">Start a project enquiry</span>
              <span className="short-label">Enquire</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
