import Link from "next/link";
import { site, tools } from "@/lib/site";
import { FirmLink } from "@/components/FirmLink";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-slate-600">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-bold text-[var(--brand)]">{site.name}</p>
            <p className="mt-2 text-slate-500">{site.tagline}.</p>
            <p className="mt-3 text-slate-500">
              A free product of{" "}
              <FirmLink className="font-medium text-[var(--brand)] underline" />.
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-800">Tools</p>
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
            <p className="font-semibold text-slate-800">About</p>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="/about/" className="hover:text-[var(--brand)]">
                  About these tools
                </Link>
              </li>
              <li>
                <Link href="/disclaimer/" className="hover:text-[var(--brand)]">
                  Legal disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy/" className="hover:text-[var(--brand)]">
                  Privacy
                </Link>
              </li>
              <li>
                <a href={site.firm.contactUrl} className="hover:text-[var(--brand)]">
                  Contact {site.firm.shortName}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-slate-200 pt-6 text-xs leading-relaxed text-slate-500">
          {site.name} provides general legal information and rough estimates for
          educational purposes only. It is not legal advice, does not create an
          attorney–client relationship, and should not replace consultation with
          a licensed Texas attorney. &copy; {new Date().getFullYear()}{" "}
          <FirmLink className="hover:text-[var(--brand)] hover:underline" />. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
