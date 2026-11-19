import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-identity">
          <Link className="footer-brand" href="/" aria-label="Arc. Chidi Ndubuisi, home">
            <span className="brand-mark">Arc.</span>
            <span className="brand-name">Chidi Ndubuisi</span>
          </Link>
          <p>Buildscope International Limited · RC 1116880</p>
          <address>
            Plot 28, Behind NYSC Orientation Camp
            <br />
            Kubwa, Abuja, Nigeria
          </address>
          <p>Architect of record: Arc Chidi Ndubuisi · ARCON F/4711</p>
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
        <p>© Arc. Chidi Ndubuisi</p>
        <a className="back-to-top" href="#top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
