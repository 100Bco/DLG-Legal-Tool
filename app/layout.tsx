import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { site } from "@/lib/site";

// Self-hosted at build time (no runtime external font request → faster + private).
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// GA4 measurement id, injected at build via env. Safe to leave unset in dev.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Free, easy-to-use legal calculators for Texas personal-injury victims: check your filing deadline (statute of limitations) and estimate what your claim could be worth. Built by Dang Law Group.",
  applicationName: site.name,
  authors: [{ name: site.firm.name, url: site.firm.url }],
  creator: site.firm.name,
  publisher: site.firm.name,
  keywords: [
    "Texas statute of limitations",
    "personal injury deadline Texas",
    "settlement calculator",
    "car accident claim Texas",
    "how long to file injury claim Texas",
    "Dang Law Group",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Google Search Console site verification.
  verification: {
    google: "fFNx6Owajo3uP7KydJXFNTf2lQDLKyu9wKfHMgygwsQ",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/dlg-logo.png",
  },
  category: "legal",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        {/* Site-wide structured data for search engines + AI crawlers. */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Google Analytics 4 — only loads when a measurement id is configured. */}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
