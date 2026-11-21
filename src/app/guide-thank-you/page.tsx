import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guide request received | Arc. Chidi Ndubuisi",
  robots: { index: false, follow: true },
};

export default function GuideThankYouPage() {
  return (
    <main className="site-confirmation" id="main-content">
      <p className="eyebrow">Guide request received</p>
      <h1>Your building-cost guide is on its way.</h1>
      <p>
        The practice will send the guide to the contact details you provided.
        If you are already building from abroad, you can also start a direct
        conversation about a baseline assessment.
      </p>
      <div className="confirmation-actions">
        <a
          className="button button-primary"
          href="https://wa.me/2347052702835"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat on WhatsApp
        </a>
        <Link className="button button-secondary" href="/">
          Return to the homepage
        </Link>
      </div>
    </main>
  );
}
