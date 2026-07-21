import { AlertTriangle } from "lucide-react";

/**
 * The legal disclaimer that must appear with every calculator result.
 * "Explain the law, never advise" — the disclaimer carries the accuracy burden.
 */
export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      role="note"
      className="flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
    >
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden />
      <div>
        <p className="font-bold">Not legal advice</p>
        <p className={compact ? "mt-1" : "mt-1 leading-relaxed"}>
          This tool provides general information and rough estimates for
          educational purposes only. It is not a substitute for advice from a
          licensed Texas attorney, does not account for every exception, and does
          not create an attorney–client relationship. Deadlines and case values
          depend on facts a calculator cannot see. Always confirm your specific
          situation with a qualified lawyer before acting.
        </p>
      </div>
    </aside>
  );
}
