/**
 * Central site configuration.
 *
 * IMPORTANT — positioning: ClaimValueCheck is an advertising / self-help tool
 * service. It is NOT a law firm and does not provide legal services, legal
 * advice, or attorney referrals. A sponsoring attorney is disclosed for
 * attorney-advertising compliance, but that disclosure lives in the footer /
 * legal pages only — never as site branding on the home or tool pages.
 */

export const site = {
  name: "ClaimValueCheck",
  tagline: "Free Texas personal-injury claim tools",
  // Canonical production origin. Update if the domain changes.
  url: "https://claimvaluecheck.com",
  locale: "en_US",

  // Legal entity that operates this advertising service (NOT a law firm).
  // TODO: replace with the real registered operating entity name.
  operator: "ClaimValueCheck",

  // Where a "free case review" request is routed. TODO: confirm destination
  // (a participating attorney's intake, or an on-site lead form when built).
  reviewUrl: "https://danglawgroup.com/contact",

  // Sponsoring attorney disclosed for attorney-advertising compliance.
  // Shown ONLY in the footer sponsor line + legal pages — not as branding.
  sponsor: {
    attorney: "Loc Dang",
    firm: "Dang Law Group",
    location: "Austin, TX",
    url: "https://danglawgroup.com/",
    // TODO: fill the State Bar number for the named attorney.
    bar: "",
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
