import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you | Buildscope",
  ...(process.env.URL || process.env.NEXT_PUBLIC_SITE_URL
    ? { alternates: { canonical: "/thank-you" } }
    : {}),
  robots: {
    index: false,
    follow: true,
  },
};

const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "/#contact";

export default function EnquiryReceivedPage() {
  return (
    <main className="site-confirmation" id="main-content">
      <p className="eyebrow">Thank you</p>
      <h1>Your project enquiry has been sent.</h1>
      <p>
        Thank you. We have your enquiry. We reply within one working day to fix
        a time for your free 20-minute call.
      </p>
      <div className="confirmation-actions">
        <a
          className="button button-primary"
          href={bookingUrl}
          target={bookingUrl.startsWith("http") ? "_blank" : undefined}
          rel={bookingUrl.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          Book your call
        </a>
        <a
          className="button button-secondary"
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
