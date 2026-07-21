/**
 * The legal disclaimer that must appear with every calculator result.
 * "Explain the law, never advise" — the disclaimer carries the accuracy burden.
 */
export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      role="note"
      className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
    >
      <p className="font-semibold">Not legal advice</p>
      <p className={compact ? "mt-1" : "mt-1 leading-relaxed"}>
        This tool provides general information and rough estimates for
        educational purposes only. It is not a substitute for advice from a
        licensed Texas attorney, does not account for every exception, and does
        not create an attorney–client relationship. Deadlines and case values
        depend on facts a calculator cannot see. Always confirm your specific
        situation with a qualified lawyer before acting.
      </p>
    </aside>
  );
}
