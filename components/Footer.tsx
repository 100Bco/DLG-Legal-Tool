import Link from "next/link";
import { site, tools } from "@/lib/site";

/**
 * Compliance footer for a paid attorney-advertising / self-help tool service.
 *
 * NOTE FOR REVIEW: the disclosures below follow common attorney-advertising
 * requirements, but the exact wording, the named-sponsor details, and which
 * items your jurisdiction requires MUST be confirmed by your advertising-
 * compliance attorney before launch. Placeholders are marked in lib/site.ts.
 *
 * Conspicuous, on-page (not hidden behind a link): paid attorney advertising,
 * not-a-law-firm, no attorney–client relationship, matching/routing disclosure,
 * results disclaimers, "no fee" meaning, and no obligation to retain.
 * Behind links: Privacy Policy, Terms of Service, Do Not Sell My Info (CCPA
 * opt-out), and the full participating-attorney listing.
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
              Free self-help tools — not a law firm.
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
                <Link href="/sponsors/" className="hover:text-[var(--brand)]">
                  Participating attorneys
                </Link>
              </li>
              <li>
                <Link href="/disclaimer/" className="hover:text-[var(--brand)]">
                  Full disclaimer
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
            Paid Attorney Advertising
          </p>
          <div className="mt-2 space-y-2 text-xs leading-relaxed text-slate-600">
            <p>
              {site.name} is an advertising and self-help tool service. It is{" "}
              <strong>not a law firm</strong> and does not provide legal advice,
              legal services, or attorney referrals. Using this site or
              submitting a request does not create an attorney–client
              relationship.
            </p>
            <p>
              If you request a case review, your information may be routed to a
              participating attorney or law firm based on your location.{" "}
              {site.name} does not evaluate, endorse, recommend, or guarantee any
              attorney, and no attorney is selected based on the merits of your
              specific matter. <strong>You are under no obligation</strong> to
              hire any attorney or law firm.
            </p>
            <p>
              Every case is different. Prior results do not guarantee a similar
              outcome, and case values and recoveries vary widely. Any dollar
              amounts shown are illustrative estimates only, not a promise of
              recovery. Any images or scenarios may be dramatizations, and terms
              such as &ldquo;best&rdquo; are marketing slogans, not a claim of
              superior quality.
            </p>
            <p>
              &ldquo;No fee unless you win,&rdquo; if offered by a participating
              attorney, refers to <strong>attorney&apos;s fees only</strong>; you
              may still be responsible for case costs and expenses.
            </p>
            {/* CA sponsor line — visible, names one attorney, links to the full list. */}
            <p className="pt-1 text-slate-700">
              <strong>Sponsor:</strong> {site.sponsor.attorney},{" "}
              {site.sponsor.firm}, {site.sponsor.location}
              {site.sponsor.bar ? ` (State Bar No. ${site.sponsor.bar})` : ""} is
              responsible for the content of this advertising.{" "}
              <Link href="/sponsors/" className="underline hover:text-[var(--brand)]">
                See the full list of participating attorneys
              </Link>
              .
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          &copy; {year} {site.operator}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
