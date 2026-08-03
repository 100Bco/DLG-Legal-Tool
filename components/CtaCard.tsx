import { Scale } from "lucide-react";

/**
 * Neutral closing note for an informational tool. This is NOT advertising and
 * does not collect leads — it simply reminds the reader that the result is an
 * estimate and points them to a licensed attorney for real advice.
 */
export function CtaCard({
  heading = "This is an estimate — not legal advice",
  body = "Deadlines and case values depend on details a calculator can't see. To understand your specific situation, talk to a licensed Texas attorney.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="bg-hero relative overflow-hidden rounded-2xl p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8">
      <div className="texture-dots absolute inset-0" aria-hidden />
      <div className="relative">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
          <Scale className="h-6 w-6" aria-hidden />
        </span>
        <h2 className="mt-4 text-xl font-bold sm:text-2xl">{heading}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/85">
          {body}
        </p>
      </div>
    </section>
  );
}
