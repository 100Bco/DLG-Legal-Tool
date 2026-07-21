import { site } from "@/lib/site";

/**
 * DLG call-to-action. Per the brief, the CTA should appear naturally *after* a
 * result — utility first, lead as a consequence. Kept low-pressure and helpful.
 */
export function CtaCard({
  heading = "Want a real answer for your situation?",
  body = "A calculator can only go so far. A free, no-obligation case review with Dang Law Group can confirm your actual deadline and options.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="rounded-xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-5 sm:p-6">
      <h2 className="text-lg font-bold text-[var(--brand)]">{heading}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={site.firm.contactUrl}
          className="inline-flex items-center justify-center rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Get a free case review
        </a>
        <a
          href={`tel:${site.firm.phone}`}
          className="inline-flex items-center justify-center rounded-lg border border-[var(--brand)]/30 px-5 py-2.5 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)]/5"
        >
          Call {site.firm.shortName}
        </a>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Contacting {site.firm.name} does not create an attorney–client
        relationship until a written agreement is signed.
      </p>
    </section>
  );
}
