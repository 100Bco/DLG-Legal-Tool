import Link from "next/link";
import { Scale, ShieldCheck } from "lucide-react";
import { site, tools } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      {/* Thin brand accent line. */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--brand)] via-[var(--brand-3)] to-[var(--gold)]" />
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--brand-2)] to-[var(--brand)] text-white">
            <Scale className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-base font-extrabold tracking-tight text-[var(--brand)]">
            {site.name}
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <nav
            aria-label="Primary"
            className="flex gap-1 text-sm font-medium text-slate-700"
          >
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}/`}
                className="rounded-lg px-2.5 py-2 hover:bg-slate-100 hover:text-[var(--brand)] sm:px-3"
              >
                {t.shortName}
              </Link>
            ))}
          </nav>
          <span className="hidden items-center gap-1.5 text-xs font-semibold text-emerald-700 sm:flex">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            Free tool
          </span>
        </div>
      </div>
    </header>
  );
}
