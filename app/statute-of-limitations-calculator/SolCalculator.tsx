"use client";

import { useState } from "react";
import {
  CASE_TYPES,
  calculateSol,
  formatDeadline,
  type CaseTypeId,
  type SolResult,
} from "@/lib/sol";
import { Disclaimer } from "@/components/Disclaimer";
import { CtaCard } from "@/components/CtaCard";

const CASE_OPTIONS = Object.values(CASE_TYPES);

const URGENCY_STYLES: Record<SolResult["urgency"], string> = {
  expired: "border-slate-300 bg-slate-50",
  critical: "border-red-300 bg-red-50",
  soon: "border-amber-300 bg-amber-50",
  ok: "border-emerald-300 bg-emerald-50",
  unknown: "border-slate-300 bg-slate-50",
};

export function SolCalculator() {
  const [incidentDate, setIncidentDate] = useState("");
  const [caseType, setCaseType] = useState<CaseTypeId>("motor-vehicle");
  const [involvesGovernment, setInvolvesGovernment] = useState<"no" | "yes" | "unsure">("no");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [result, setResult] = useState<SolResult | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(
      calculateSol({
        incidentDate,
        caseType,
        involvesGovernment: involvesGovernment !== "no",
        dateOfBirth: dateOfBirth || undefined,
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
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-800">
            Date of the accident or injury
            <input
              type="date"
              required
              value={incidentDate}
              max={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setIncidentDate(e.target.value)}
              className={inputClass}
            />
          </label>

          <label className="block text-sm font-medium text-slate-800">
            What kind of case is it?
            <select
              value={caseType}
              onChange={(e) => setCaseType(e.target.value as CaseTypeId)}
              className={inputClass}
            >
              {CASE_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <fieldset className="mt-5">
          <legend className="text-sm font-medium text-slate-800">
            Is a government entity involved? (city, county, state, public
            hospital, transit, or a government employee)
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {([
              ["no", "No"],
              ["yes", "Yes"],
              ["unsure", "Not sure"],
            ] as const).map(([val, label]) => (
              <label
                key={val}
                className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  involvesGovernment === val
                    ? "border-[var(--brand)] bg-[var(--brand)]/5 text-[var(--brand)]"
                    : "border-slate-300 text-slate-700 hover:border-slate-400"
                }`}
              >
                <input
                  type="radio"
                  name="government"
                  value={val}
                  checked={involvesGovernment === val}
                  onChange={() => setInvolvesGovernment(val)}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="mt-5 block text-sm font-medium text-slate-800">
          Injured person&apos;s date of birth{" "}
          <span className="font-normal text-slate-500">
            (optional — helps detect deadlines for minors)
          </span>
          <input
            type="date"
            value={dateOfBirth}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className={`${inputClass} sm:max-w-xs`}
          />
        </label>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
        >
          Check my filing deadline
        </button>
      </form>

      {result && result.outcome !== "invalid" && (
        <div className="mt-6 space-y-5">
          <section
            className={`rounded-xl border p-5 sm:p-6 ${URGENCY_STYLES[result.urgency]}`}
            aria-live="polite"
          >
            <p className="text-base font-bold text-slate-900">{result.headline}</p>

            {result.outcome === "deadline" && result.deadline && (
              <div className="mt-3">
                <p className="text-3xl font-extrabold tracking-tight text-[var(--brand)]">
                  {formatDeadline(result.deadline)}
                </p>
                {typeof result.daysRemaining === "number" && (
                  <p className="mt-1 text-sm text-slate-700">
                    Approximately{" "}
                    <strong>{result.daysRemaining.toLocaleString()} days</strong>{" "}
                    from today.
                  </p>
                )}
              </div>
            )}

            {result.outcome === "expired" && result.deadline && (
              <p className="mt-2 text-sm text-slate-700">
                Estimated deadline:{" "}
                <strong>{formatDeadline(result.deadline)}</strong>.
              </p>
            )}

            <div className="mt-4 rounded-lg bg-white/60 p-3 text-xs text-slate-600">
              <p className="font-semibold text-slate-700">Source</p>
              <a
                href={result.caseType.statuteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[var(--brand)]"
              >
                {result.caseType.statute}
              </a>
            </div>
          </section>

          {result.notes.length > 0 && (
            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-800">
                What this means
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
          <CtaCard
            heading={
              result.outcome === "government"
                ? "Government deadlines are short — talk to a lawyer now"
                : result.urgency === "critical" || result.outcome === "expired"
                  ? "Time may be running out — get a free review today"
                  : "Confirm your real deadline with Dang Law Group"
            }
          />
        </div>
      )}

      {result && result.outcome === "invalid" && (
        <p className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {result.headline}
        </p>
      )}
    </div>
  );
}
