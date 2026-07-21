import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateSettlement, formatUSD } from "./settlement.ts";

test("base estimate: $20k economic, moderate (2–3×), 0% fault → $60k–$80k", () => {
  const r = calculateSettlement({
    medicalBills: 15000,
    lostWages: 5000,
    otherEconomic: 0,
    severity: "moderate",
    faultPercent: 0,
  });
  assert.equal(r.outcome, "estimate");
  assert.equal(r.economicDamages, 20000);
  assert.equal(Math.round(r.low), 60000);
  assert.equal(Math.round(r.high), 80000);
});

test("minor severity uses a 1.5–2× multiplier", () => {
  const r = calculateSettlement({
    medicalBills: 10000,
    lostWages: 0,
    otherEconomic: 0,
    severity: "minor",
    faultPercent: 0,
  });
  // nonEcon 15k–20k → total 25k–30k
  assert.equal(Math.round(r.low), 25000);
  assert.equal(Math.round(r.high), 30000);
});

test("severe severity uses a 4–5× multiplier", () => {
  const r = calculateSettlement({
    medicalBills: 100000,
    lostWages: 0,
    otherEconomic: 0,
    severity: "severe",
    faultPercent: 0,
  });
  // nonEcon 400k–500k → total 500k–600k
  assert.equal(Math.round(r.low), 500000);
  assert.equal(Math.round(r.high), 600000);
});

test("comparative fault reduces the estimate proportionally (20%)", () => {
  const r = calculateSettlement({
    medicalBills: 15000,
    lostWages: 5000,
    otherEconomic: 0,
    severity: "moderate",
    faultPercent: 20,
  });
  assert.equal(Math.round(r.low), 48000); // 60k × 0.8
  assert.equal(Math.round(r.high), 64000); // 80k × 0.8
});

test("exactly 50% fault is NOT barred (Texas bars only >50%)", () => {
  const r = calculateSettlement({
    medicalBills: 20000,
    lostWages: 0,
    otherEconomic: 0,
    severity: "moderate",
    faultPercent: 50,
  });
  assert.equal(r.outcome, "estimate");
  // economic 20k, nonEcon 40k–60k, total 60k–80k, × 0.5
  assert.equal(Math.round(r.low), 30000);
  assert.equal(Math.round(r.high), 40000);
});

test("more than 50% fault → barred, zero recovery", () => {
  for (const fault of [51, 60, 100]) {
    const r = calculateSettlement({
      medicalBills: 20000,
      lostWages: 0,
      otherEconomic: 0,
      severity: "serious",
      faultPercent: fault,
    });
    assert.equal(r.outcome, "barred", `fault ${fault} should bar`);
    assert.equal(r.low, 0);
    assert.equal(r.high, 0);
    assert.ok(r.notes.some((n) => /§ 33\.001/.test(n)));
  }
});

test("no economic damages → invalid", () => {
  const r = calculateSettlement({
    medicalBills: 0,
    lostWages: 0,
    otherEconomic: 0,
    severity: "minor",
    faultPercent: 0,
  });
  assert.equal(r.outcome, "invalid");
});

test("negative and NaN inputs are clamped to zero", () => {
  const r = calculateSettlement({
    medicalBills: -5000,
    lostWages: Number.NaN,
    otherEconomic: 8000,
    severity: "moderate",
    faultPercent: -10,
  });
  assert.equal(r.economicDamages, 8000); // only the valid positive value counts
  assert.equal(r.faultPercent, 0); // negative fault clamped
});

test("fault above 100 is clamped (and therefore barred)", () => {
  const r = calculateSettlement({
    medicalBills: 10000,
    lostWages: 0,
    otherEconomic: 0,
    severity: "minor",
    faultPercent: 150,
  });
  assert.equal(r.faultPercent, 100);
  assert.equal(r.outcome, "barred");
});

test("low bound never exceeds high bound", () => {
  const r = calculateSettlement({
    medicalBills: 33333,
    lostWages: 12121,
    otherEconomic: 777,
    severity: "serious",
    faultPercent: 15,
  });
  assert.ok(r.low <= r.high);
});

test("formatUSD renders whole-dollar currency", () => {
  assert.equal(formatUSD(60000), "$60,000");
  assert.equal(formatUSD(1234.56), "$1,235");
  assert.equal(formatUSD(0), "$0");
});
