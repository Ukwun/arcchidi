import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-identity">
          <Link
            className="footer-brand"
            href="/"
            aria-label="Arc. Chidi Ndubuisi, home"
          >
            <Image
              className="footer-logo"
              src="/images/buildscope-logo.png"
              alt="Buildscope — Smarter Design, Quality Build"
              width={457}
              height={349}
            />
          </Link>
          <p>Buildscope International Limited · RC 1116880</p>
          <address>
            Operating office: Plot 28, Behind NYSC Orientation Camp
            <br />
            Kubwa, Abuja, Nigeria
          </address>
          <p>Architect of record: Arc. Chidi Ndubuisi</p>
          <p>Smart home systems supplied by AGIS Ltd, a related company.</p>
        </div>

        <div className="footer-contact">
          <p className="footer-label">Discuss a residential project</p>
          <a
            href="https://wa.me/2347052702835"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +234 705 270 2835
          </a>
          <a href="tel:+2347052702835">Call +234 705 270 2835</a>
          <a href="mailto:buildscopeltd@gmail.com">
            buildscopeltd@gmail.com
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Buildscope International Limited</p>
        <a className="back-to-top" href="#top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
