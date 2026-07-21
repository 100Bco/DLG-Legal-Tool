/**
 * Central site configuration. Single source of truth for URLs, brand names,
 * and the parent-firm (DLG) relationship used across metadata + JSON-LD.
 */

export const site = {
  name: "ClaimValueCheck",
  tagline: "Free Texas personal-injury legal tools",
  // Canonical production origin. Update if the domain changes.
  url: "https://claimvaluecheck.com",
  locale: "en_US",
  // Parent law firm — this site is a DLG brand asset.
  firm: {
    name: "Dang Law Group",
    shortName: "DLG",
    description: "Accidents & Injuries",
    url: "https://danglawgroup.com",
    // Where the CTA should send qualified leads.
    contactUrl: "https://danglawgroup.com/contact",
    phone: "+1-512-888-8888",
    areaServed: "Texas",
  },
} as const;

/** Absolute URL helper for canonical tags, sitemaps, and JSON-LD. */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${clean === "/" ? "/" : clean}`;
}

/** The tools surfaced on this site, in navigation order. */
export const tools = [
  {
    slug: "statute-of-limitations-calculator",
    name: "Statute of Limitations Calculator",
    shortName: "SOL Calculator",
    summary:
      "Estimate your Texas filing deadline based on your accident date and case type.",
  },
  {
    slug: "settlement-calculator",
    name: "Settlement Calculator",
    shortName: "Settlement Calculator",
    summary:
      "Get a rough estimate of what a Texas injury claim could be worth using the multiplier method.",
  },
] as const;
