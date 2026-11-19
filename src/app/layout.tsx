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
  alternateName: "Arc. Chidiebere Barnabas Ndubuisi",
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
  title: "Arc. Chidiebere Barnabas Ndubuisi | Architect-Led Design & Build in Nigeria",
  description:
    "Architect-led residential design and build in Nigeria, with project supervision, clear costs, and completed work you can see.",
  ...(metadataBase ? { metadataBase } : {}),
  alternates: metadataBase ? { canonical: "/" } : undefined,
  openGraph: {
    title: "Arc. Chidiebere Barnabas Ndubuisi | Architect-Led Design & Build in Nigeria",
    description:
      "Architect-led residential design and build in Nigeria, with project supervision and a clear view of project delivery.",
    siteName: "Arc. Chidiebere Barnabas Ndubuisi",
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
    title: "Arc. Chidiebere Barnabas Ndubuisi | Architect-Led Design & Build in Nigeria",
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
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
