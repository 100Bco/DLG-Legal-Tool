import { test } from "node:test";
import assert from "node:assert/strict";
import {
  calculateSol,
  formatDeadline,
  addYearsForTest,
  type CaseTypeId,
} from "./sol.ts";

/** ISO string for `days` from today (UTC), negative = past. */
function isoFromToday(days: number): string {
  const now = new Date();
  const base = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return new Date(base + days * 86_400_000).toISOString().slice(0, 10);
}

/** ISO string N years ago from today (UTC), optionally offset by days. */
function isoYearsAgo(years: number, offsetDays = 0): string {
  const now = new Date();
  const d = new Date(
    Date.UTC(now.getUTCFullYear() - years, now.getUTCMonth(), now.getUTCDate()),
  );
  return new Date(d.getTime() + offsetDays * 86_400_000)
    .toISOString()
    .slice(0, 10);
}

const TWO_YEAR_TYPES: CaseTypeId[] = [
  "motor-vehicle",
  "slip-and-fall",
  "medical-malpractice",
  "product-liability",
  "wrongful-death",
  "assault",
  "property-damage",
  "other",
];

test("all standard case types use a 2-year period from a fixed date", () => {
  for (const caseType of TWO_YEAR_TYPES) {
    const r = calculateSol({
      incidentDate: "2025-01-15",
      caseType,
      involvesGovernment: false,
    });
    assert.equal(r.outcome, "deadline", `${caseType} should produce a deadline`);
    assert.ok(r.deadline);
    assert.equal(
      formatDeadline(r.deadline!),
      "January 15, 2027",
      `${caseType} deadline should be 2 years out`,
    );
  }
});

test("government claim never returns a number, regardless of case type", () => {
  for (const caseType of TWO_YEAR_TYPES) {
    const r = calculateSol({
      incidentDate: "2025-01-15",
      caseType,
      involvesGovernment: true,
    });
    assert.equal(r.outcome, "government");
    assert.equal(r.deadline, undefined);
    assert.equal(r.urgency, "critical");
    assert.ok(r.notes.some((n) => /Tort Claims Act/.test(n)));
  }
});

test("minor tolling: injured at age 10 → deadline is 20th birthday", () => {
  const r = calculateSol({
    incidentDate: "2025-06-01",
    caseType: "motor-vehicle",
    involvesGovernment: false,
    dateOfBirth: "2015-06-01",
  });
  assert.equal(r.outcome, "deadline");
  assert.equal(r.minorTollingApplied, true);
  assert.equal(formatDeadline(r.deadline!), "June 1, 2035");
});

test("minor tolling: injured at 17 → 18th birthday + 2 years", () => {
  const r = calculateSol({
    incidentDate: "2024-01-01",
    caseType: "slip-and-fall",
    involvesGovernment: false,
    dateOfBirth: "2007-06-15", // 16 at incident
  });
  assert.equal(r.minorTollingApplied, true);
  // 18th birthday 2025-06-15 + 2y = 2027-06-15
  assert.equal(formatDeadline(r.deadline!), "June 15, 2027");
});

test("adult claimant with DOB → no tolling, plain 2-year deadline", () => {
  const r = calculateSol({
    incidentDate: "2025-01-15",
    caseType: "motor-vehicle",
    involvesGovernment: false,
    dateOfBirth: "1980-01-01",
  });
  assert.equal(r.minorTollingApplied, false);
  assert.equal(formatDeadline(r.deadline!), "January 15, 2027");
});

test("minor tolling can rescue an otherwise-expired case", () => {
  // Injured at age 5, 12 years ago. Plain 2y deadline long past, but tolled to
  // 20th birthday which is still in the future → not expired.
  const r = calculateSol({
    incidentDate: "2013-01-01",
    caseType: "motor-vehicle",
    involvesGovernment: false,
    dateOfBirth: "2008-01-01",
  });
  assert.equal(r.outcome, "deadline");
  assert.equal(r.minorTollingApplied, true);
  assert.equal(formatDeadline(r.deadline!), "January 1, 2028");
});

test("medical malpractice + minor → attorney outcome, no date", () => {
  const r = calculateSol({
    incidentDate: "2024-03-01",
    caseType: "medical-malpractice",
    involvesGovernment: false,
    dateOfBirth: "2018-03-01", // age 6
  });
  assert.equal(r.outcome, "attorney");
  assert.equal(r.deadline, undefined);
  assert.equal(r.minorTollingApplied, false);
});

test("wrongful death ignores deceased DOB for tolling but adds a note", () => {
  const r = calculateSol({
    incidentDate: "2025-01-15",
    caseType: "wrongful-death",
    involvesGovernment: false,
    dateOfBirth: "2015-01-15", // deceased was a child
  });
  assert.equal(r.outcome, "deadline");
  assert.equal(r.minorTollingApplied, false);
  assert.equal(formatDeadline(r.deadline!), "January 15, 2027");
  assert.ok(r.notes.some((n) => /beneficiary/.test(n)));
});

test("DOB after the incident date is ignored (no false tolling)", () => {
  const r = calculateSol({
    incidentDate: "2020-01-01",
    caseType: "motor-vehicle",
    involvesGovernment: false,
    dateOfBirth: "2022-01-01", // born after incident — nonsensical
  });
  assert.equal(r.minorTollingApplied, false);
  assert.equal(formatDeadline(r.deadline!), "January 1, 2022");
});

test("clearly past deadline → expired", () => {
  const r = calculateSol({
    incidentDate: "2015-01-01",
    caseType: "slip-and-fall",
    involvesGovernment: false,
  });
  assert.equal(r.outcome, "expired");
  assert.ok(r.daysRemaining! < 0);
});

test("future accident date → invalid", () => {
  const r = calculateSol({
    incidentDate: isoFromToday(30),
    caseType: "other",
    involvesGovernment: false,
  });
  assert.equal(r.outcome, "invalid");
});

test("malformed / impossible dates → invalid", () => {
  for (const bad of ["", "not-a-date", "2023-13-01", "2023-02-31", "2023/01/01"]) {
    const r = calculateSol({
      incidentDate: bad,
      caseType: "other",
      involvesGovernment: false,
    });
    assert.equal(r.outcome, "invalid", `"${bad}" should be invalid`);
  }
});

test("leap-day incident clamps to Feb 28 in a non-leap deadline year", () => {
  const r = calculateSol({
    incidentDate: "2024-02-29",
    caseType: "other",
    involvesGovernment: false,
  });
  assert.equal(formatDeadline(r.deadline!), "February 28, 2026");
});

test("urgency: deadline ~30 days out → critical", () => {
  // Incident 2 years ago minus 30 days → deadline ~30 days ahead.
  const r = calculateSol({
    incidentDate: isoYearsAgo(2, 30),
    caseType: "motor-vehicle",
    involvesGovernment: false,
  });
  assert.equal(r.outcome, "deadline");
  assert.equal(r.urgency, "critical");
  assert.ok(r.daysRemaining! >= 0 && r.daysRemaining! <= 90);
});

test("urgency: recent incident → ok (more than a year left)", () => {
  const r = calculateSol({
    incidentDate: isoFromToday(-10),
    caseType: "motor-vehicle",
    involvesGovernment: false,
  });
  assert.equal(r.urgency, "ok");
  assert.ok(r.daysRemaining! > 365);
});

test("every non-invalid result cites a statute and carries notes", () => {
  const r = calculateSol({
    incidentDate: "2025-01-15",
    caseType: "motor-vehicle",
    involvesGovernment: false,
  });
  assert.match(r.caseType.statute, /§/);
  assert.match(r.caseType.statuteUrl, /^https:\/\/statutes\.capitol\.texas\.gov/);
  assert.ok(r.notes.length > 0);
});

test("addYears clamps Feb 29 across several spans", () => {
  assert.equal(addYearsForTest("2024-02-29", 1), "2025-02-28");
  assert.equal(addYearsForTest("2024-02-29", 2), "2026-02-28");
  assert.equal(addYearsForTest("2024-02-29", 4), "2028-02-29"); // leap → stays
  assert.equal(addYearsForTest("2023-03-15", 2), "2025-03-15");
});
