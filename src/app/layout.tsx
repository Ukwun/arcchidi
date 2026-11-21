import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { MotionEffects } from "@/components/MotionEffects";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.URL ?? process.env.NEXT_PUBLIC_SITE_URL;
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;
const practiceStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Buildscope International Limited",
  alternateName: "Arc. Chidi Ndubuisi",
  description:
    "Architect-led residential design, design-build, and project supervision in Nigeria.",
  ...(siteUrl ? { url: siteUrl } : {}),
  telephone: "+2347052702835",
  email: "buildscopeltd@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 28, Behind NYSC Orientation Camp, Kubwa",
    addressLocality: "Abuja",
    addressCountry: "NG",
  },
  areaServed: [
    "Abuja",
    "Lafia",
    "Enugu",
    "Anambra",
    "Imo",
    "Delta",
    "Nigeria",
  ],
  serviceType: [
    "Architectural design",
    "Design-build",
    "Residential project supervision",
  ],
};

export const metadata: Metadata = {
  title: "Arc. Chidi Ndubuisi | Architect-Led Design & Build in Nigeria",
  description:
    "Architect-led residential design and build in Nigeria, with project supervision, clear costs, and completed work you can see.",
  ...(metadataBase ? { metadataBase } : {}),
  alternates: metadataBase ? { canonical: "/" } : undefined,
  openGraph: {
    title: "Arc. Chidi Ndubuisi | Architect-Led Design & Build in Nigeria",
    description:
      "Architect-led residential design and build in Nigeria, with project supervision and a clear view of project delivery.",
    siteName: "Arc. Chidi Ndubuisi",
    locale: "en_NG",
    type: "website",
    ...(metadataBase
      ? {
          images: [
            {
              url: "/images/grand-villa-retreat.jpg",
              alt: "Design visualization of Grand Villa Retreat in Uzii",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Arc. Chidi Ndubuisi | Architect-Led Design & Build in Nigeria",
    description:
      "Architect-led residential design and build in Nigeria, with project supervision and a clear view of project delivery.",
    ...(metadataBase ? { images: ["/images/grand-villa-retreat.jpg"] } : {}),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-NG"
      className={`${cormorant.variable} ${manrope.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(practiceStructuredData),
          }}
        />
        <MotionEffects />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <a
          className="mobile-whatsapp-fab"
          href="https://wa.me/2347052702835"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Buildscope on WhatsApp"
        >
          <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.2 18.8 4 22l3.3-1.1A9 9 0 1 0 5.2 18.8Z" />
            <path d="M8.6 8.1c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.6-.6c.2-.2.4-.2.6-.1l1.7.8c.2.1.3.3.3.5v.5c0 .3-.1.5-.4.7-.4.3-1 .5-1.5.5-1.1 0-2.8-.8-4.2-2.1-1.4-1.4-2.2-3.1-2.2-4.2 0-.5.2-1.1.6-1.5Z" />
          </svg>
          <span className="whatsapp-label">WhatsApp</span>
        </a>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
