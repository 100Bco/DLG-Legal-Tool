"use client";

import { useState } from "react";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Scale,
  Sparkles,
  Info,
} from "lucide-react";
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

// Guided fault selection — most people can't put a number on their own fault,
// so we describe common accident scenarios (who hit whom / who did what) that
// each map to a *typical* fault percentage. These are general tendencies, not
// legal determinations: fault is ultimately decided by the insurer or a jury.
const FAULT_OPTIONS: { pct: number; label: string; desc: string }[] = [
  {
    pct: 0,
    label: "I was rear-ended",
    desc: "Someone hit me from behind. The rear driver is usually at fault.",
  },
  {
    pct: 0,
    label: "The other driver ran a red light or stop sign",
    desc: "They failed to stop or yield when they should have.",
  },
  {
    pct: 10,
    label: "The other driver turned or merged into me",
    desc: "e.g. a left turn across my path, or merging into my lane.",
  },
  {
    pct: 30,
    label: "I was turning, merging, or changing lanes",
    desc: "I was making the maneuver when the crash happened.",
  },
  {
    pct: 50,
    label: "We were both moving / it's unclear",
    desc: "Both of us may have contributed, or no one is clearly at fault.",
  },
  {
    pct: 75,
    label: "I hit or rear-ended the other vehicle",
    desc: "I ran into them. This usually points to my fault.",
  },
  {
    pct: 15,
    label: "I slipped, tripped, or fell on someone's property",
    desc: "The property owner failed to fix or warn about a hazard.",
  },
  {
    pct: 0,
    label: "A dog bit or attacked me",
    desc: "The dog's owner is usually responsible.",
  },
  {
    pct: 0,
    label: "I was hurt by a defective or dangerous product",
    desc: "The maker or seller is usually responsible.",
  },
  {
    pct: 50,
    label: "Someone else injured me and we may share blame",
    desc: "e.g. a fight, sports, or an accident where both acted.",
  },
  {
    pct: 0,
    label: "Something else / I'm not sure",
    desc: "We'll assume no fault on your part for now — a lawyer can assess it.",
  },
];

export function SettlementCalculator() {
  const [medicalBills, setMedicalBills] = useState("");
  const [lostWages, setLostWages] = useState("");
  const [otherEconomic, setOtherEconomic] = useState("");
  const [severity, setSeverity] = useState<SeverityId>("moderate");
  const [faultIdx, setFaultIdx] = useState(0);
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
        faultPercent: FAULT_OPTIONS[faultIdx].pct,
      }),
    );
  }

  const money =
    "peer mt-1.5 w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-7 pr-3 text-slate-900 shadow-sm transition focus:border-[var(--brand)] focus:outline-none focus:ring-4 focus:ring-[var(--brand)]/10";

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5"
      >
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--brand-2)] to-[var(--brand)] text-white">
            <Calculator className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900">Value estimator</p>
            <p className="text-xs text-slate-600">Multiplier method · Texas fault rules</p>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              ["Medical bills", medicalBills, setMedicalBills, "15,000"],
              ["Lost wages", lostWages, setLostWages, "6,000"],
              ["Other costs", otherEconomic, setOtherEconomic, "2,000"],
            ].map(([label, value, setter, ph]) => (
              <label
                key={label as string}
                className="block text-sm font-semibold text-slate-800"
              >
                {label as string}
                <span className="relative block">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 pt-1.5 text-slate-400">
                    <DollarSign className="h-4 w-4" aria-hidden />
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder={ph as string}
                    value={value as string}
                    onChange={(e) => (setter as (v: string) => void)(e.target.value)}
                    className={money}
                  />
                </span>
              </label>
            ))}
          </div>

          <fieldset className="mt-5">
            <legend className="text-sm font-semibold text-slate-800">
              How severe is the injury?
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {SEVERITY_OPTIONS.map((s) => (
                <label
                  key={s.id}
                  className={`cursor-pointer rounded-lg border p-3 text-sm transition ${
                    severity === s.id
                      ? "border-[var(--brand)] bg-[var(--brand)]/5 ring-2 ring-[var(--brand)]/15"
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
                  <span className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{s.label}</span>
                    <span className="chip bg-slate-100 text-slate-600">
                      {s.min}–{s.max}×
                    </span>
                  </span>
                  <span className="mt-1 block text-xs text-slate-600">
                    {s.description}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-sm font-semibold text-slate-800">
              What happened?
            </legend>
            <p className="mt-0.5 text-xs text-slate-600">
              Pick the closest description — you don&apos;t need to know an exact
              fault percentage.
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {FAULT_OPTIONS.map((f, i) => (
                <label
                  key={i}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition ${
                    faultIdx === i
                      ? "border-[var(--brand)] bg-[var(--brand)]/5 ring-2 ring-[var(--brand)]/15"
                      : "border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="fault"
                    value={i}
                    checked={faultIdx === i}
                    onChange={() => setFaultIdx(i)}
                    className="mt-1 accent-[var(--brand)]"
                  />
                  <span>
                    <span className="font-semibold text-slate-900">{f.label}</span>
                    <span className="mt-0.5 block text-xs text-slate-600">
                      {f.desc}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-2 flex gap-2 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" aria-hidden />
              <span>
                Not sure? Choose your best guess. Fault is ultimately decided by
                the insurance company or a jury — and an initial blame
                assignment is often negotiable. A lawyer can push back on a
                fault split you think is unfair. In Texas, being more than 50%
                at fault generally bars recovery entirely.
              </span>
            </p>
          </fieldset>

          <button
            type="submit"
            className="btn-brand mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-bold sm:w-auto"
          >
            <TrendingUp className="h-4 w-4" aria-hidden />
            Estimate my settlement range
          </button>
        </div>
      </form>

      {/* ---- Result -------------------------------------------------- */}
      {result && result.outcome === "estimate" && (
        <div className="rise-in mt-6 space-y-5">
          <section
            className="overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white"
            aria-live="polite"
          >
            <div className="p-6">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                <Sparkles className="h-4 w-4 text-emerald-600" aria-hidden />
                {result.headline}
              </p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                {formatUSD(result.low)}{" "}
                <span className="text-slate-400">–</span> {formatUSD(result.high)}
              </p>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
                  <dt className="text-xs text-slate-600">Economic damages</dt>
                  <dd className="mt-0.5 font-bold text-slate-900">
                    {formatUSD(result.economicDamages)}
                  </dd>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
                  <dt className="text-xs text-slate-600">
                    Pain &amp; suffering ({result.severity.min}–{result.severity.max}×)
                  </dt>
                  <dd className="mt-0.5 font-bold text-slate-900">
                    {formatUSD(result.nonEconomicLow)} – {formatUSD(result.nonEconomicHigh)}
                  </dd>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
                  <dt className="text-xs text-slate-600">Fault reduction</dt>
                  <dd className="mt-0.5 font-bold text-slate-900">
                    {result.faultPercent}%
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <NotesBlock title="How this was estimated" notes={result.notes} />
          <Disclaimer />
          <CtaCard heading="Find out what your claim is really worth" />
        </div>
      )}

      {result && result.outcome === "barred" && (
        <div className="rise-in mt-6 space-y-5">
          <section
            className="overflow-hidden rounded-2xl border border-rose-200 bg-rose-50"
            aria-live="polite"
          >
            <div className="flex items-start gap-3 p-6">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--urgent)] text-white">
                <Scale className="h-5 w-5" aria-hidden />
              </span>
              <p className="text-base font-bold text-slate-900">{result.headline}</p>
            </div>
          </section>
          <NotesBlock title="Why" notes={result.notes} />
          <Disclaimer />
          <CtaCard heading="Think the fault split is wrong? Get a second opinion" />
        </div>
      )}

      {result && result.outcome === "invalid" && (
        <p className="rise-in mt-4 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
          <AlertTriangle className="h-4 w-4" aria-hidden />
          {result.headline}
        </p>
      )}
    </div>
  );
}

function NotesBlock({ title, notes }: { title: string; notes: string[] }) {
  if (notes.length === 0) return null;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="text-sm font-bold text-slate-800">{title}</h2>
      <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-600">
        {notes.map((note, i) => (
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
  );
}
