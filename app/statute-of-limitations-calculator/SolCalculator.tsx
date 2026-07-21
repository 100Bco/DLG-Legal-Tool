"use client";

import { useState } from "react";
import {
  CalendarClock,
  Clock,
  ScrollText,
  AlertTriangle,
  Building2,
  Baby,
  Gavel,
  ExternalLink,
} from "lucide-react";
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

const URGENCY: Record<
  SolResult["urgency"],
  { ring: string; bg: string; text: string; label: string }
> = {
  expired: { ring: "border-slate-300", bg: "bg-slate-50", text: "text-slate-700", label: "Deadline passed" },
  critical: { ring: "border-rose-300", bg: "bg-rose-50", text: "text-[var(--urgent)]", label: "Act now" },
  soon: { ring: "border-amber-300", bg: "bg-amber-50", text: "text-amber-700", label: "Approaching" },
  ok: { ring: "border-emerald-300", bg: "bg-emerald-50", text: "text-emerald-700", label: "On track" },
  unknown: { ring: "border-slate-300", bg: "bg-slate-50", text: "text-slate-700", label: "" },
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
    "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm transition focus:border-[var(--brand)] focus:outline-none focus:ring-4 focus:ring-[var(--brand)]/10";

  const isWarning =
    result &&
    (result.outcome === "government" ||
      result.outcome === "attorney" ||
      result.outcome === "expired");

  return (
    <div>
      {/* ---- Tool card ------------------------------------------------ */}
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5"
      >
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--brand-2)] to-[var(--brand)] text-white">
            <CalendarClock className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900">Deadline checker</p>
            <p className="text-xs text-slate-500">Takes about 20 seconds</p>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-800">
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

            <label className="block text-sm font-semibold text-slate-800">
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
            <legend className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
              <Building2 className="h-4 w-4 text-slate-400" aria-hidden />
              Is a government entity involved?
            </legend>
            <p className="mt-0.5 text-xs text-slate-500">
              City, county, state, public hospital, transit, or a government employee.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {([
                ["no", "No"],
                ["yes", "Yes"],
                ["unsure", "Not sure"],
              ] as const).map(([val, label]) => (
                <label
                  key={val}
                  className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                    involvesGovernment === val
                      ? "border-[var(--brand)] bg-[var(--brand)]/5 text-[var(--brand)] ring-2 ring-[var(--brand)]/15"
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

          <label className="mt-5 flex items-start gap-1.5 text-sm font-semibold text-slate-800">
            <span className="flex-1">
              <span className="flex items-center gap-1.5">
                <Baby className="h-4 w-4 text-slate-400" aria-hidden />
                Injured person&apos;s date of birth
                <span className="font-normal text-slate-400">(optional)</span>
              </span>
              <input
                type="date"
                value={dateOfBirth}
                max={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className={`${inputClass} sm:max-w-xs`}
              />
            </span>
          </label>

          <button
            type="submit"
            className="btn-brand mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-bold sm:w-auto"
          >
            <Clock className="h-4 w-4" aria-hidden />
            Check my filing deadline
          </button>
        </div>
      </form>

      {/* ---- Result -------------------------------------------------- */}
      {result && result.outcome !== "invalid" && (
        <div className="rise-in mt-6 space-y-5">
          {result.outcome === "deadline" && result.deadline ? (
            <section
              className={`overflow-hidden rounded-2xl border ${URGENCY[result.urgency].ring} ${URGENCY[result.urgency].bg}`}
              aria-live="polite"
            >
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-600">
                    Estimated filing deadline
                  </p>
                  <span
                    className={`chip bg-white ${URGENCY[result.urgency].text} ring-1 ring-current/20`}
                  >
                    {result.urgency === "critical" && (
                      <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-current" />
                    )}
                    {URGENCY[result.urgency].label}
                  </span>
                </div>
                <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  {formatDeadline(result.deadline)}
                </p>
                {typeof result.daysRemaining === "number" && (
                  <div
                    className={`mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold ${URGENCY[result.urgency].text} shadow-sm`}
                  >
                    <Clock className="h-4 w-4" aria-hidden />
                    ~{result.daysRemaining.toLocaleString()} days left to file
                  </div>
                )}
                {result.minorTollingApplied && (
                  <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Baby className="h-3.5 w-3.5" aria-hidden />
                    Adjusted for minor tolling
                  </p>
                )}
              </div>
              <a
                href={result.caseType.statuteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-t border-black/5 bg-white/50 px-6 py-3 text-xs font-medium text-slate-600 hover:text-[var(--brand)]"
              >
                <ScrollText className="h-4 w-4" aria-hidden />
                Source: <span className="underline">{result.caseType.statute}</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </section>
          ) : (
            <section
              className="overflow-hidden rounded-2xl border border-rose-200 bg-rose-50"
              aria-live="polite"
            >
              <div className="flex items-start gap-3 p-6">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--urgent)] text-white">
                  {result.outcome === "attorney" ? (
                    <Gavel className="h-5 w-5" aria-hidden />
                  ) : (
                    <AlertTriangle className="h-5 w-5" aria-hidden />
                  )}
                </span>
                <div>
                  <p className="text-base font-bold text-slate-900">
                    {result.headline}
                  </p>
                  {result.outcome === "expired" && result.deadline && (
                    <p className="mt-1 text-sm text-slate-700">
                      Estimated deadline was{" "}
                      <strong>{formatDeadline(result.deadline)}</strong>.
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {result.notes.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-sm font-bold text-slate-800">What this means</h2>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-600">
                {result.notes.map((note, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-3)]"
                    />
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
                : result.outcome === "attorney"
                  ? "This one needs a lawyer — get a free review"
                  : result.urgency === "critical" || result.outcome === "expired"
                    ? "Time may be running out — get a free review today"
                    : "Confirm your real deadline with a free case review"
            }
          />
        </div>
      )}

      {result && result.outcome === "invalid" && (
        <p className="rise-in mt-4 flex items-center gap-2 rounded-lg border border-rose-300 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">
          <AlertTriangle className="h-4 w-4" aria-hidden />
          {result.headline}
        </p>
      )}
    </div>
  );
}
