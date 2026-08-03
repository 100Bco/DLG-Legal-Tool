import Link from "next/link";
import { site, tools } from "@/lib/site";

/**
 * Footer for a single-firm attorney-advertising microsite.
 *
 * NOTE FOR REVIEW: these disclosures follow common attorney-advertising rules,
 * but the exact wording and which items apply MUST be confirmed by the firm's
 * advertising-compliance counsel before launch. Firm details / bar number are
 * placeholders in lib/site.ts.
 *
 * Conspicuous, on-page (not behind a link): "Attorney Advertising", not legal
 * advice, no attorney–client relationship, results disclaimers, "no fee"
 * meaning, no obligation, and the responsible attorney/firm identification.
 * Behind links: Privacy Policy, Terms of Service, Do Not Sell or Share My Info.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-slate-700">
        {/* --- Navigation --- */}
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-bold text-[var(--brand)]">{site.name}</p>
            <p className="mt-2 text-slate-600">{site.tagline}.</p>
            <p className="mt-3 text-slate-600">
              Free self-help tools for injury claims.
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Tools</p>
            <ul className="mt-2 space-y-1">
              {tools.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}/`} className="hover:text-[var(--brand)]">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Legal</p>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="/privacy/" className="hover:text-[var(--brand)]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms/" className="hover:text-[var(--brand)]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/do-not-sell/" className="font-medium hover:text-[var(--brand)]">
                  Do Not Sell or Share My Info
                </Link>
              </li>
              <li>
                <Link href="/disclaimer/" className="hover:text-[var(--brand)]">
                  Disclaimer &amp; advertising
                </Link>
              </li>
              <li>
                <Link href="/about/" className="hover:text-[var(--brand)]">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Conspicuous advertising disclosures (visible on-page) --- */}
        <div className="mt-8 rounded-xl border border-slate-300 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-900">
            Attorney Advertising
          </p>
          <div className="mt-2 space-y-2 text-xs leading-relaxed text-slate-600">
            <p>
              {site.name} provides free self-help tools and general legal
              information — it is <strong>not legal advice</strong>. Using this
              site or contacting the firm does <strong>not</strong> create an
              attorney–client relationship; that relationship is formed only
              through a signed written agreement.
            </p>
            <p>
              Every case is different. Prior results do not guarantee a similar
              outcome, and case values and recoveries vary widely. Any dollar
              amounts shown are illustrative estimates only, not a promise of
              recovery. Any images or scenarios may be dramatizations, and terms
              such as &ldquo;best&rdquo; are marketing slogans, not a claim of
              superior quality. You are under <strong>no obligation</strong> to
              hire any attorney.
            </p>
            <p>
              &ldquo;No fee unless you win&rdquo; refers to{" "}
              <strong>attorney&apos;s fees only</strong>; you may still be
              responsible for case costs and expenses.
            </p>
            {/* Responsible-attorney identification — required for attorney advertising. */}
            <p className="pt-1 text-slate-700">
              This is attorney advertising. {site.firm.attorney},{" "}
              {site.firm.name}, {site.firm.location}
              {site.firm.bar ? ` (State Bar No. ${site.firm.bar})` : ""} is
              responsible for its content.
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          &copy; {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
