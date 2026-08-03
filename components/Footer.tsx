import Link from "next/link";
import { site, tools } from "@/lib/site";

/**
 * Footer for a free informational self-help tool (not advertising, no lead
 * capture). Carries a plain "not legal advice" disclaimer and links to the
 * information pages.
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
              Free self-help tools — general information only.
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
            <p className="font-semibold text-slate-900">Info</p>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="/about/" className="hover:text-[var(--brand)]">
                  About these tools
                </Link>
              </li>
              <li>
                <Link href="/disclaimer/" className="hover:text-[var(--brand)]">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy/" className="hover:text-[var(--brand)]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms/" className="hover:text-[var(--brand)]">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Plain informational disclaimer (visible on-page) --- */}
        <div className="mt-8 rounded-xl border border-slate-300 bg-white p-5">
          <p className="text-xs leading-relaxed text-slate-600">
            <strong className="text-slate-900">Not legal advice.</strong>{" "}
            {site.name} provides free self-help tools and general legal
            information for Texas personal-injury claims. It does not provide
            legal advice or legal services. Results are approximate estimates and
            may differ from your actual situation. Using this site does not create
            an attorney–client relationship. For advice about your specific
            situation, consult a licensed Texas attorney. This site contains
            attorney advertising.
          </p>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          &copy; {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
