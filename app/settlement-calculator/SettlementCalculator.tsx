"use client";

import { useState } from "react";
import {
  SEVERITIES,
  calculateSettlement,
  formatUSD,
  type SeverityId,
  type SettlementResult,
} from "@/lib/settlement";
import { Disclaimer } from "@/components/Disclaimer";
import { CtaCard } from "@/components/CtaCard";

const SEVERITY_OPTIONS = Object.values(SEVERITIES);

export function SettlementCalculator() {
  const [medicalBills, setMedicalBills] = useState("");
  const [lostWages, setLostWages] = useState("");
  const [otherEconomic, setOtherEconomic] = useState("");
  const [severity, setSeverity] = useState<SeverityId>("moderate");
  const [faultPercent, setFaultPercent] = useState("0");
  const [result, setResult] = useState<SettlementResult | null>(null);

  function num(v: string): number {
    const n = Number(v.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(
      calculateSettlement({
        medicalBills: num(medicalBills),
        lostWages: num(lostWages),
        otherEconomic: num(otherEconomic),
        severity,
        faultPercent: num(faultPercent),
      }),
    );
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20";

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <label className="block text-sm font-medium text-slate-800">
            Medical bills ($)
            <input
              type="text"
              inputMode="numeric"
              placeholder="15000"
              value={medicalBills}
              onChange={(e) => setMedicalBills(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block text-sm font-medium text-slate-800">
            Lost wages ($)
            <input
              type="text"
              inputMode="numeric"
              placeholder="6000"
              value={lostWages}
              onChange={(e) => setLostWages(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block text-sm font-medium text-slate-800">
            Other costs ($)
            <input
              type="text"
              inputMode="numeric"
              placeholder="2000"
              value={otherEconomic}
              onChange={(e) => setOtherEconomic(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        <fieldset className="mt-5">
          <legend className="text-sm font-medium text-slate-800">
            How severe is the injury?
          </legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {SEVERITY_OPTIONS.map((s) => (
              <label
                key={s.id}
                className={`cursor-pointer rounded-lg border p-3 text-sm transition ${
                  severity === s.id
                    ? "border-[var(--brand)] bg-[var(--brand)]/5"
                    : "border-slate-300 hover:border-slate-400"
                }`}
              >
                <input
                  type="radio"
                  name="severity"
                  value={s.id}
                  checked={severity === s.id}
                  onChange={() => setSeverity(s.id)}
                  className="sr-only"
                />
                <span className="font-semibold text-slate-900">{s.label}</span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  {s.description}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="mt-5 block text-sm font-medium text-slate-800">
          Your share of fault: {num(faultPercent)}%
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={num(faultPercent)}
            onChange={(e) => setFaultPercent(e.target.value)}
            className="mt-2 w-full accent-[var(--brand)]"
          />
          <span className="mt-1 block text-xs text-slate-500">
            In Texas, being more than 50% at fault generally bars recovery
            (proportionate responsibility).
          </span>
        </label>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
        >
          Estimate my settlement range
        </button>
      </form>

      {result && result.outcome === "estimate" && (
        <div className="mt-6 space-y-5">
          <section
            className="rounded-xl border border-emerald-300 bg-emerald-50 p-5 sm:p-6"
            aria-live="polite"
          >
            <p className="text-sm font-semibold text-slate-700">{result.headline}</p>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--brand)] sm:text-4xl">
              {formatUSD(result.low)} &ndash; {formatUSD(result.high)}
            </p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-lg bg-white/70 p-3">
                <dt className="text-slate-500">Economic damages</dt>
                <dd className="font-semibold text-slate-900">
                  {formatUSD(result.economicDamages)}
                </dd>
              </div>
              <div className="rounded-lg bg-white/70 p-3">
                <dt className="text-slate-500">
                  Pain &amp; suffering ({result.severity.min}&times;&ndash;
                  {result.severity.max}&times;)
                </dt>
                <dd className="font-semibold text-slate-900">
                  {formatUSD(result.nonEconomicLow)} &ndash;{" "}
                  {formatUSD(result.nonEconomicHigh)}
                </dd>
              </div>
              <div className="rounded-lg bg-white/70 p-3">
                <dt className="text-slate-500">Fault reduction</dt>
                <dd className="font-semibold text-slate-900">
                  {result.faultPercent}%
                </dd>
              </div>
            </dl>
          </section>

          {result.notes.length > 0 && (
            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-800">
                How this was estimated
              </h2>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-600">
                {result.notes.map((note, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="text-[var(--brand)]">
                      &bull;
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Disclaimer />
          <CtaCard heading="Find out what your claim is really worth" />
        </div>
      )}

      {result && result.outcome === "barred" && (
        <div className="mt-6 space-y-5">
          <section className="rounded-xl border border-red-300 bg-red-50 p-5 sm:p-6" aria-live="polite">
            <p className="text-base font-bold text-slate-900">{result.headline}</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
              {result.notes.map((note, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden className="text-[var(--brand)]">
                    &bull;
                  </span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </section>
          <Disclaimer />
          <CtaCard heading="Think the fault split is wrong? Get a second opinion" />
        </div>
      )}

      {result && result.outcome === "invalid" && (
        <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {result.headline}
        </p>
      )}
    </div>
  );
}
