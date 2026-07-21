/**
 * Personal-injury settlement estimator (multiplier method) for Texas claims.
 *
 * Design principles (see project brief):
 *  - Fixed formula, hard-coded. No AI decides the number.
 *  - Output a *range*, framed as a rough educational estimate, never a promise.
 *  - Apply Texas proportionate-responsibility (comparative fault) rules,
 *    including the 51% bar, because they materially change recovery.
 *
 * The "multiplier method" is a common industry rule of thumb: non-economic
 * damages (pain & suffering) are estimated as a multiple of economic damages.
 * It is NOT how a jury is required to calculate anything.
 */

export type SeverityId = "minor" | "moderate" | "serious" | "severe";

export interface Severity {
  id: SeverityId;
  label: string;
  description: string;
  /** Multiplier range applied to economic damages for pain & suffering. */
  min: number;
  max: number;
}

export const SEVERITIES: Record<SeverityId, Severity> = {
  minor: {
    id: "minor",
    label: "Minor",
    description:
      "Soft-tissue injuries, full recovery expected within a few months.",
    min: 1.5,
    max: 2,
  },
  moderate: {
    id: "moderate",
    label: "Moderate",
    description:
      "Broken bones or injuries needing months of treatment, largely recovered.",
    min: 2,
    max: 3,
  },
  serious: {
    id: "serious",
    label: "Serious",
    description:
      "Surgery, long recovery, or lasting effects on daily life.",
    min: 3,
    max: 4,
  },
  severe: {
    id: "severe",
    label: "Severe / permanent",
    description:
      "Permanent disability, disfigurement, or life-altering injury.",
    min: 4,
    max: 5,
  },
};

export interface SettlementInput {
  /** Past + expected medical bills (USD). */
  medicalBills: number;
  /** Lost wages / lost earning capacity (USD). */
  lostWages: number;
  /** Other out-of-pocket economic loss: property damage, care, etc. (USD). */
  otherEconomic: number;
  severity: SeverityId;
  /**
   * Claimant's own share of fault, 0–100 (%). Under Texas proportionate
   * responsibility, more than 50% bars recovery entirely.
   */
  faultPercent: number;
}

export type SettlementOutcome = "estimate" | "barred" | "invalid";

export interface SettlementResult {
  outcome: SettlementOutcome;
  economicDamages: number;
  /** Non-economic (pain & suffering) range before fault reduction. */
  nonEconomicLow: number;
  nonEconomicHigh: number;
  /** Final estimated range after applying comparative fault. */
  low: number;
  high: number;
  severity: Severity;
  faultPercent: number;
  headline: string;
  notes: string[];
}

const clampFault = (v: number) => Math.min(100, Math.max(0, v));

/** Core calculation. Pure function. */
export function calculateSettlement(input: SettlementInput): SettlementResult {
  const severity = SEVERITIES[input.severity] ?? SEVERITIES.moderate;
  const medical = Math.max(0, input.medicalBills || 0);
  const wages = Math.max(0, input.lostWages || 0);
  const other = Math.max(0, input.otherEconomic || 0);
  const economicDamages = medical + wages + other;
  const fault = clampFault(input.faultPercent || 0);

  const baseNotes = [
    "This is a rough educational estimate using the multiplier method, not a valuation of your claim. Real settlements depend on liability, insurance limits, evidence, venue, and negotiation.",
    "Non-economic damages here are estimated as a multiple of your economic damages. A jury is not required to use any multiplier.",
  ];

  if (economicDamages <= 0) {
    return {
      outcome: "invalid",
      economicDamages: 0,
      nonEconomicLow: 0,
      nonEconomicHigh: 0,
      low: 0,
      high: 0,
      severity,
      faultPercent: fault,
      headline: "Enter your medical bills, lost wages, or other costs to see an estimate.",
      notes: [],
    };
  }

  const nonEconomicLow = economicDamages * severity.min;
  const nonEconomicHigh = economicDamages * severity.max;

  // --- Texas 51% bar (Tex. Civ. Prac. & Rem. Code § 33.001). --------------
  if (fault > 50) {
    return {
      outcome: "barred",
      economicDamages,
      nonEconomicLow,
      nonEconomicHigh,
      low: 0,
      high: 0,
      severity,
      faultPercent: fault,
      headline:
        "At more than 50% fault, Texas law generally bars recovery entirely.",
      notes: [
        "Texas follows modified comparative fault (proportionate responsibility). A claimant found more than 50% at fault recovers nothing (Tex. Civ. Prac. & Rem. Code § 33.001).",
        "Fault is ultimately decided by the insurer, judge, or jury — an initial blame assignment is often negotiable. Talk to an attorney before accepting that you are majority at fault.",
        ...baseNotes,
      ],
    };
  }

  const retained = 1 - fault / 100;
  const low = (economicDamages + nonEconomicLow) * retained;
  const high = (economicDamages + nonEconomicHigh) * retained;

  const notes: string[] = [];
  if (fault > 0) {
    notes.push(
      `Because you may be ${fault}% at fault, the estimate is reduced by that share under Texas proportionate-responsibility rules (Tex. Civ. Prac. & Rem. Code § 33.001).`,
    );
  }
  notes.push(
    "The estimate does not subtract attorney fees, liens, or unpaid medical bills, and does not account for insurance policy limits — which frequently cap what is actually recoverable.",
  );
  notes.push(...baseNotes);

  return {
    outcome: "estimate",
    economicDamages,
    nonEconomicLow,
    nonEconomicHigh,
    low,
    high,
    severity,
    faultPercent: fault,
    headline: "Your rough estimated settlement range",
    notes,
  };
}

export function formatUSD(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}
