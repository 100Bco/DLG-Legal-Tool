/**
 * Central site configuration.
 *
 * POSITIONING: ClaimValueCheck is a free self-help tool and the ATTORNEY
 * ADVERTISING of a sponsoring law firm. No firm is named as branding on the
 * home/tool pages. The responsible attorney is disclosed in the footer
 * "Attorney Advertising" block (configure `firm` below) where advertising
 * rules require the responsible attorney to be identified.
 *
 * This is NOT a neutral lead-generation / attorney-matching service.
 */

export const site = {
  name: "ClaimValueCheck",
  tagline: "Free Texas personal-injury claim tools",
  // Canonical production origin. Update if the domain changes.
  url: "https://claimvaluecheck.com",
  locale: "en_US",

  // Where a "free case review" request is routed.
  // TODO: set the real intake/contact URL before launch (currently a
  // placeholder so no external firm is linked).
  reviewUrl: "#",

  // The law firm responsible for this attorney advertising. Disclosed in the
  // footer only — never as branding on the home/tool pages. Left blank on
  // purpose so no firm is named until configured.
  // TODO (REQUIRED BEFORE LAUNCH): attorney-advertising rules generally require
  // naming the responsible attorney. Fill these in before going live, or the
  // footer omits the identification line.
  firm: {
    attorney: "",
    name: "",
    location: "",
    url: "",
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
