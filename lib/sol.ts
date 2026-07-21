/**
 * Texas Statute of Limitations (SOL) calculation engine.
 *
 * IMPORTANT — design principles (see project brief):
 *  - Fixed formulas, hard-coded. No AI/heuristics decide legal deadlines.
 *  - Explain the law, never give legal advice. Every result cites its statute.
 *  - The tool must recognise when NOT to show a number (e.g. claims against a
 *    government entity, where short notice deadlines govern and a plain
 *    "2 years" answer would be dangerously misleading).
 *
 * Citations are to the Texas Civil Practice & Remedies Code (CPRC) unless noted.
 */

export type CaseTypeId =
  | "motor-vehicle"
  | "slip-and-fall"
  | "medical-malpractice"
  | "product-liability"
  | "wrongful-death"
  | "assault"
  | "property-damage"
  | "other";

export interface CaseType {
  id: CaseTypeId;
  label: string;
  /** Statutory limitations period, in years, from the accrual date. */
  years: number;
  /** Human-readable statute reference shown under the result. */
  statute: string;
  /** Public link to the statute text (Texas Legislature). */
  statuteUrl: string;
  /** Extra note surfaced with the result for this case type. */
  note?: string;
}

/**
 * Base limitations periods. These are the general Texas rules; genuine edge
 * cases (repose statutes, discovery rule, tolling) are handled separately and
 * flagged rather than silently baked into a single number.
 */
export const CASE_TYPES: Record<CaseTypeId, CaseType> = {
  "motor-vehicle": {
    id: "motor-vehicle",
    label: "Car, truck or motorcycle accident",
    years: 2,
    statute: "Tex. Civ. Prac. & Rem. Code § 16.003(a)",
    statuteUrl:
      "https://statutes.capitol.texas.gov/Docs/CP/htm/CP.16.htm#16.003",
    note: "Most Texas motor-vehicle injury claims must be filed within 2 years of the crash.",
  },
  "slip-and-fall": {
    id: "slip-and-fall",
    label: "Slip / trip and fall (premises liability)",
    years: 2,
    statute: "Tex. Civ. Prac. & Rem. Code § 16.003(a)",
    statuteUrl:
      "https://statutes.capitol.texas.gov/Docs/CP/htm/CP.16.htm#16.003",
    note: "Premises-liability injury claims generally follow the 2-year personal-injury deadline.",
  },
  "medical-malpractice": {
    id: "medical-malpractice",
    label: "Medical malpractice",
    years: 2,
    statute: "Tex. Civ. Prac. & Rem. Code § 74.251",
    statuteUrl:
      "https://statutes.capitol.texas.gov/Docs/CP/htm/CP.74.htm#74.251",
    note: "Texas med-mal claims run 2 years from the treatment/occurrence, and are subject to a 10-year statute of repose. Special rules apply to minors under 12. These cases are highly time-sensitive — confirm your date with an attorney.",
  },
  "product-liability": {
    id: "product-liability",
    label: "Defective product (products liability)",
    years: 2,
    statute: "Tex. Civ. Prac. & Rem. Code §§ 16.003, 16.012",
    statuteUrl:
      "https://statutes.capitol.texas.gov/Docs/CP/htm/CP.16.htm#16.012",
    note: "Personal-injury products claims run 2 years, but a 15-year statute of repose (§ 16.012) can bar older claims regardless of when injury occurred.",
  },
  "wrongful-death": {
    id: "wrongful-death",
    label: "Wrongful death",
    years: 2,
    statute: "Tex. Civ. Prac. & Rem. Code § 16.003(b)",
    statuteUrl:
      "https://statutes.capitol.texas.gov/Docs/CP/htm/CP.16.htm#16.003",
    note: "The 2-year clock generally runs from the date of death, which may differ from the date of the injury.",
  },
  assault: {
    id: "assault",
    label: "Assault / intentional injury",
    years: 2,
    statute: "Tex. Civ. Prac. & Rem. Code § 16.003(a)",
    statuteUrl:
      "https://statutes.capitol.texas.gov/Docs/CP/htm/CP.16.htm#16.003",
    note: "Civil assault claims generally follow the 2-year personal-injury deadline. A related criminal case does not extend your civil deadline.",
  },
  "property-damage": {
    id: "property-damage",
    label: "Property damage only",
    years: 2,
    statute: "Tex. Civ. Prac. & Rem. Code § 16.003(a)",
    statuteUrl:
      "https://statutes.capitol.texas.gov/Docs/CP/htm/CP.16.htm#16.003",
    note: "Property-damage claims (e.g. vehicle repair) generally follow a 2-year deadline.",
  },
  other: {
    id: "other",
    label: "Other personal injury",
    years: 2,
    statute: "Tex. Civ. Prac. & Rem. Code § 16.003(a)",
    statuteUrl:
      "https://statutes.capitol.texas.gov/Docs/CP/htm/CP.16.htm#16.003",
    note: "The general Texas personal-injury deadline is 2 years. Your specific claim may differ — confirm with an attorney.",
  },
};

export interface SolInput {
  /** Date of the accident/injury (ISO yyyy-mm-dd). For wrongful death, date of death. */
  incidentDate: string;
  caseType: CaseTypeId;
  /**
   * Does the claim involve a government entity (city, county, state, public
   * hospital, transit authority, government employee)? If so we deliberately
   * refuse to output a simple deadline.
   */
  involvesGovernment: boolean;
  /** Optional: injured person's date of birth, to detect minor tolling. */
  dateOfBirth?: string;
}

export type SolOutcome =
  | "deadline"
  | "expired"
  | "government"
  // Situation is too fact-specific for a reliable date (e.g. medical
  // malpractice involving a minor) — we decline to output a number.
  | "attorney"
  | "invalid";

export interface SolResult {
  outcome: SolOutcome;
  /** The computed filing deadline (only for outcome "deadline" | "expired"). */
  deadline?: Date;
  /** Whole days between today and the deadline (negative if past). */
  daysRemaining?: number;
  /** true when tolling for a minor was applied. */
  minorTollingApplied: boolean;
  caseType: CaseType;
  /** Headline message. */
  headline: string;
  /** Ordered list of explanatory notes / warnings. */
  notes: string[];
  /** Urgency band used for colour + emphasis. */
  urgency: "expired" | "critical" | "soon" | "ok" | "unknown";
}

const MS_PER_DAY = 86_400_000;

/** Parse an ISO date string as a UTC calendar date (no timezone drift). */
function parseISO(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const [, y, mo, d] = m;
  const date = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d)));
  // Reject impossible dates (e.g. 2023-02-31 rolling over).
  if (
    date.getUTCFullYear() !== Number(y) ||
    date.getUTCMonth() !== Number(mo) - 1 ||
    date.getUTCDate() !== Number(d)
  ) {
    return null;
  }
  return date;
}

/** Add whole years to a UTC date, clamping Feb 29 -> Feb 28 in non-leap years. */
function addYears(date: Date, years: number): Date {
  const y = date.getUTCFullYear() + years;
  const mo = date.getUTCMonth();
  const d = date.getUTCDate();
  const result = new Date(Date.UTC(y, mo, d));
  if (result.getUTCMonth() !== mo) {
    // Overflowed (Feb 29 -> Mar 1). Pull back to last day of intended month.
    result.setUTCDate(0);
  }
  return result;
}

/** Today as a UTC calendar date (midnight), so day math is stable. */
function todayUTC(): Date {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
}

function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY);
}

/**
 * Core calculation. Pure function — same inputs always produce the same result.
 */
export function calculateSol(input: SolInput): SolResult {
  const caseType = CASE_TYPES[input.caseType] ?? CASE_TYPES.other;
  const incident = parseISO(input.incidentDate);

  if (!incident) {
    return {
      outcome: "invalid",
      minorTollingApplied: false,
      caseType,
      headline: "Please enter a valid accident date.",
      notes: [],
      urgency: "unknown",
    };
  }

  const today = todayUTC();
  if (incident.getTime() > today.getTime()) {
    return {
      outcome: "invalid",
      minorTollingApplied: false,
      caseType,
      headline: "The accident date can't be in the future.",
      notes: [],
      urgency: "unknown",
    };
  }

  // --- Government claims: refuse to output a plain deadline. ---------------
  // Notice deadlines under the Texas Tort Claims Act (and city charters) are
  // far shorter than the 2-year suit limit and vary by entity. Showing "2
  // years" here would be actively misleading, so we stop and warn instead.
  if (input.involvesGovernment) {
    return {
      outcome: "government",
      minorTollingApplied: false,
      caseType,
      headline:
        "This looks like a claim against a government entity — deadlines are much shorter and we won't estimate a date.",
      notes: [
        "Claims against a city, county, the State of Texas, a public hospital, a transit authority, or a government employee are governed by the Texas Tort Claims Act (Tex. Civ. Prac. & Rem. Code Ch. 101).",
        "Formal written notice is often required within 6 months — and many Texas cities require notice in as little as 45–90 days under their own charters.",
        "Missing the notice deadline can permanently bar an otherwise valid claim, even though the lawsuit deadline may be longer.",
        "Do not rely on a calculator here. Contact an attorney immediately to protect your notice rights.",
      ],
      urgency: "critical",
    };
  }

  // --- Base deadline: accrual date + statutory period. --------------------
  let deadline = addYears(incident, caseType.years);
  const notes: string[] = [];
  let minorTollingApplied = false;

  // --- Was the injured person a minor at the time of the incident? --------
  // Only trust a DOB that is on/before the incident date (a DOB *after* the
  // incident is nonsensical and is ignored rather than tolling wrongly).
  const dob = input.dateOfBirth ? parseISO(input.dateOfBirth) : null;
  const dobUsable = dob !== null && dob.getTime() <= incident.getTime();
  const eighteenth = dobUsable ? addYears(dob!, 18) : null;
  const wasMinorAtIncident =
    eighteenth !== null && incident.getTime() < eighteenth.getTime();

  // --- Medical malpractice + minor: too fact-specific for a number. -------
  // Texas med-mal limitations for minors are NOT the simple "18th birthday +
  // 2 years" rule (see § 74.251 and Tex. courts on minors under 12). Rather
  // than risk a falsely reassuring date, we decline and route to an attorney.
  if (wasMinorAtIncident && input.caseType === "medical-malpractice") {
    return {
      outcome: "attorney",
      minorTollingApplied: false,
      caseType,
      headline:
        "A medical-malpractice claim involving a child follows special rules — we won't estimate a date.",
      notes: [
        "Texas medical-malpractice deadlines for minors are governed by Tex. Civ. Prac. & Rem. Code § 74.251 and related case law, and do not follow the ordinary minor-tolling rule.",
        "For a young child, the deadline may be tied to a specific birthday rather than a fixed number of years — and getting it wrong can permanently bar the claim.",
        "Please speak with a Texas attorney promptly to confirm the exact deadline for this child.",
      ],
      urgency: "critical",
    };
  }

  // --- Minor tolling: legal disability tolls the clock (§ 16.001). --------
  // A minor's clock generally does not start until their 18th birthday, so the
  // deadline becomes 18th birthday + statutory period. This applies to the
  // minor's OWN injury claim — not to wrongful death, where the deceased's age
  // is irrelevant and any tolling would attach to a surviving minor
  // beneficiary instead.
  if (wasMinorAtIncident && input.caseType === "wrongful-death") {
    notes.push(
      "You entered a date of birth showing the deceased was a minor. Wrongful-death deadlines are not tolled based on the deceased's age. However, if a surviving beneficiary is a minor, their share may be tolled — confirm this with an attorney.",
    );
  } else if (wasMinorAtIncident && eighteenth) {
    const tolledDeadline = addYears(eighteenth, caseType.years);
    // Use whichever protects the claimant longer.
    if (tolledDeadline.getTime() > deadline.getTime()) {
      deadline = tolledDeadline;
      minorTollingApplied = true;
      notes.push(
        "Because the injured person was a minor at the time, the deadline is generally tolled: the clock starts at their 18th birthday (Tex. Civ. Prac. & Rem. Code § 16.001). The date shown reflects that tolling.",
      );
    }
  }

  const daysRemaining = daysBetween(today, deadline);

  // Always surface the case-type note and the standard disclaimers.
  if (caseType.note) notes.unshift(caseType.note);
  notes.push(
    "Deadlines can be shortened or extended by facts this tool cannot see (the discovery rule, tolling for unsound mind, prior notice requirements, repose statutes, and more).",
  );

  if (daysRemaining < 0) {
    return {
      outcome: "expired",
      deadline,
      daysRemaining,
      minorTollingApplied,
      caseType,
      headline:
        "Based on these dates, the general deadline appears to have passed.",
      notes: [
        "An expired deadline does not always mean you have no options — exceptions sometimes apply. Speak with an attorney before assuming your claim is barred.",
        ...notes,
      ],
      urgency: "expired",
    };
  }

  let urgency: SolResult["urgency"] = "ok";
  if (daysRemaining <= 90) urgency = "critical";
  else if (daysRemaining <= 365) urgency = "soon";

  const headline =
    urgency === "critical"
      ? "Your estimated deadline is very close — act now."
      : urgency === "soon"
        ? "Your estimated filing deadline is approaching."
        : "Here is your estimated filing deadline.";

  return {
    outcome: "deadline",
    deadline,
    daysRemaining,
    minorTollingApplied,
    caseType,
    headline,
    notes,
    urgency,
  };
}

/**
 * Test-only helper: add whole years to an ISO date and return an ISO date.
 * Exposes the internal leap-day clamping for unit tests without leaking Date
 * objects into the public API.
 */
export function addYearsForTest(iso: string, years: number): string {
  const d = parseISO(iso);
  if (!d) throw new Error(`invalid iso: ${iso}`);
  return addYears(d, years).toISOString().slice(0, 10);
}

/** Format a UTC date as e.g. "March 4, 2027". */
export function formatDeadline(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
