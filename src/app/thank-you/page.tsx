import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enquiry received | Arc. Chidi Ndubuisi",
  ...(process.env.URL || process.env.NEXT_PUBLIC_SITE_URL
    ? { alternates: { canonical: "/thank-you" } }
    : {}),
  robots: {
    index: false,
    follow: true,
  },
};

export default function EnquiryReceivedPage() {
  return (
    <main className="site-confirmation" id="main-content">
      <p className="eyebrow">Thank you</p>
      <h1>Your project enquiry has been sent.</h1>
      <p>
        The practice will review the details and reply within one working day.
        Enquiries for projects above ₦150M are prioritised for same-day founder
        review. If you would rather start a conversation now, message the team
        on WhatsApp.
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
