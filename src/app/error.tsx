"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Arcchidi route error", error);
  }, [error]);

  return (
    <main className="site-confirmation" id="main-content">
      <p className="eyebrow">Something went wrong</p>
      <h1>We could not load this page.</h1>
      <p>Please try again. If the problem continues, contact the practice directly on WhatsApp.</p>
      <div className="confirmation-actions">
        <button className="button button-primary" onClick={() => reset()}>Try again</button>
        <a className="button button-secondary" href="https://wa.me/2347052702835" target="_blank" rel="noopener noreferrer">Contact the practice</a>
      </div>
    </main>
  );
}
