import type { Metadata } from "next";
import { site, absoluteUrl } from "./site";

/**
 * Build a complete, SEO-friendly Metadata object for a page. Produces title,
 * description, canonical URL, and Open Graph + Twitter cards so every page is
 * self-describing to search engines and social/AI crawlers.
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(opts.path);
  // Branded PNG generated at build by app/opengraph-image.tsx. Referenced
  // explicitly so every page (not just the homepage) carries an og:image.
  const image = absoluteUrl("/opengraph-image");
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: opts.title,
      description: opts.description,
      locale: site.locale,
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD structured data (Schema.org) — helps rich results + AI      */
/* understanding. Rendered via <script type="application/ld+json">.    */
/* ------------------------------------------------------------------ */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: site.firm.name,
    alternateName: site.firm.shortName,
    description: `${site.firm.name} — ${site.firm.description}. Provider of the free ClaimValueCheck Texas personal-injury legal tools.`,
    url: site.firm.url,
    telephone: site.firm.phone,
    areaServed: { "@type": "State", name: "Texas" },
    knowsAbout: [
      "Texas personal injury law",
      "Statute of limitations",
      "Car accident claims",
      "Injury settlement valuation",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: `${site.tagline}. ${site.name} is a free tool suite by ${site.firm.name}.`,
    publisher: {
      "@type": "Organization",
      name: site.firm.name,
      url: site.firm.url,
    },
    inLanguage: "en-US",
  };
}

export function webApplicationSchema(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript.",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: {
      "@type": "Organization",
      name: site.firm.name,
      url: site.firm.url,
    },
    inLanguage: "en-US",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
