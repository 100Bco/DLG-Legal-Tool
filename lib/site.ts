/**
 * Central site configuration.
 *
 * POSITIONING: ClaimValueCheck is a free self-help tool and the ATTORNEY
 * ADVERTISING of the sponsoring law firm (Dang Law Group). The firm is not
 * shown as branding on the home/tool pages — it is disclosed in the footer
 * "Attorney Advertising" block and legal pages, where advertising rules
 * require the responsible attorney to be identified.
 *
 * This is NOT a neutral lead-generation / attorney-matching service.
 */

export const site = {
  name: "ClaimValueCheck",
  tagline: "Free Texas personal-injury claim tools",
  // Canonical production origin. Update if the domain changes.
  url: "https://claimvaluecheck.com",
  locale: "en_US",

  // Where a "free case review" request is routed (the sponsoring firm's intake).
  reviewUrl: "https://danglawgroup.com/contact",

  // The law firm responsible for this attorney advertising. Disclosed in the
  // footer + legal pages only — never as branding on the home/tool pages.
  firm: {
    attorney: "Loc Dang",
    name: "Dang Law Group",
    location: "Austin, TX",
    url: "https://danglawgroup.com/",
    // TODO: fill the responsible attorney's State Bar number + principal office
    // address if required by the applicable attorney-advertising rules.
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
