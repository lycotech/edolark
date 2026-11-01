import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { company } from "@/lib/data";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.website),
  title: {
    default: `${company.name} | Quality Homes. Lasting Value.`,
    template: `%s | ${company.name}`,
  },
  description:
    "Edolark Ltd is a Lagos real estate company building and selling quality residential homes in Yaba, Gbagada and across Lagos, Nigeria.",
  keywords: [
    "Edolark",
    "Edolark Ltd",
    "Lagos real estate",
    "homes in Lagos",
    "Yaba apartments",
    "Gbagada property",
    "Nigeria real estate",
    "buy house Lagos",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: company.name,
    title: `${company.name} | Quality Homes. Lasting Value.`,
    description:
      "Quality residential developments in Lagos. Discover modern apartments, family homes and investment properties with Edolark Ltd.",
    images: [{ url: "/edolark-logo-transparent.png", width: 400, height: 460, alt: company.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | Quality Homes. Lasting Value.`,
    description: "Quality residential developments in Lagos, Nigeria.",
    images: ["/edolark-logo-transparent.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: company.name,
    description: "Lagos real estate company building and selling quality homes.",
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
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
