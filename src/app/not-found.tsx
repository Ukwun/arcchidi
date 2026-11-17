import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-confirmation" id="main-content">
      <p className="eyebrow">Page not found</p>
      <h1>That page is no longer on the drawing board.</h1>
      <p>
        The link may be out of date, or the project may not be published yet.
        Return home to continue exploring the practice and its work.
      </p>
      <div className="confirmation-actions">
        <Link className="button button-primary" href="/">Return to the homepage</Link>
        <Link className="button button-secondary" href="/#contact">Start an enquiry</Link>
      </div>
    </main>
  );
}
