import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Cursor, FloatingActions, Preloader, ScrollProgress } from "@/components/chrome";
import { company } from "@/lib/data";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

/* Runs before first paint: enables the scroll animations and skips the intro on repeat visits. */
const bootScript = `document.documentElement.classList.add("js");try{if(sessionStorage.getItem("edo-intro"))document.documentElement.classList.add("seen")}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(company.website),
  title: {
    default: `${company.shortName} | Quality Workmanship. Lasting Value.`,
    template: `%s | ${company.shortName}`,
  },
  description:
    "Edolark Limited is a Lagos design, construction and general contract company delivering residential, commercial and civil projects across Nigeria.",
  keywords: [
    "Edolark",
    "Edolark Limited",
    "Edolark Ltd",
    "Lagos construction company",
    "Nigeria building contractor",
    "design and construction Lagos",
    "project management Nigeria",
    "residential construction Lagos",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: company.shortName,
    title: `${company.shortName} | Quality Workmanship. Lasting Value.`,
    description:
      "Design, construction and general contract services for residential, commercial and civil projects across Nigeria.",
    images: [{ url: "/edolark-logo-transparent.png", width: 400, height: 460, alt: company.shortName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.shortName} | Quality Workmanship. Lasting Value.`,
    description: "Design, construction and general contract services across Nigeria.",
    images: ["/edolark-logo-transparent.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: company.name,
    description: "Lagos design, construction and general contract company delivering quality projects across Nigeria.",
    url: company.website,
    logo: `${company.website}/edolark-logo-transparent.png`,
    telephone: company.rawPhone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address[0],
      addressLocality: company.address[2],
      addressRegion: company.address[3],
      addressCountry: company.address[4],
    },
    sameAs: [company.instagram],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className={`${dmSans.variable} ${serif.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Preloader />
        <ScrollProgress />
        <Cursor />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <FloatingActions />
      </body>
    </html>
  );
}
