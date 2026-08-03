import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Soft "next step" block placed after the FAQ on the tool pages. Because it
 * names a specific law firm, this block is attorney advertising and carries its
 * own conspicuous disclosure. Renders only when a firm is configured in
 * lib/site.ts (blank name hides it everywhere).
 */
export function AttorneyReferral() {
  if (!site.firm.name) return null;
  return (
    <aside className="mt-10 rounded-xl border border-slate-300 bg-slate-50 p-5 sm:p-6">
      <h2 className="text-lg font-bold text-slate-900">
        Still have questions about your claim?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">
        These tools give general estimates only. If you&apos;d like a real person
        to review your specific situation,{" "}
        <a
          href={site.firm.url}
          target="_blank"
          rel="noopener"
          className="font-semibold text-[var(--brand)] underline"
        >
          {site.firm.name}
        </a>{" "}
        — a Texas personal-injury law firm — offers free consultations.
      </p>
      <a
        href={site.firm.url}
        target="_blank"
        rel="noopener"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand)] hover:gap-2"
      >
        Visit {site.firm.name}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
      <p className="mt-3 text-xs leading-relaxed text-slate-500">
        Attorney advertising. Contacting the firm is your choice and does not
        create an attorney–client relationship.
      </p>
    </aside>
  );
}
