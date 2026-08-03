/**
 * Central site configuration.
 *
 * POSITIONING: ClaimValueCheck is a free self-help / informational tool for
 * Texas personal-injury claims. It is not advertising, does not capture leads,
 * and is not affiliated with any named law firm on the pages.
 */

export const site = {
  name: "ClaimValueCheck",
  tagline: "Free Texas personal-injury claim tools",
  // Canonical production origin. Update if the domain changes.
  url: "https://claimvaluecheck.com",
  locale: "en_US",

  // Optional law firm referenced in the soft "next step" block after the FAQ.
  // Naming a specific firm makes that block attorney advertising, so it carries
  // its own disclosure. Leave name blank to hide the referral everywhere.
  firm: {
    name: "Dang Law Group",
    url: "https://danglawgroup.com/",
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
