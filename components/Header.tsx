import Link from "next/link";
import Image from "next/image";
import { site, tools } from "@/lib/site";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <Image
            src="/dlg-logo.png"
            alt="Dang Law Group logo"
            width={44}
            height={38}
            className="h-9 w-auto"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold text-[var(--brand)]">
              {site.name}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              by {site.firm.name}
            </span>
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden gap-5 text-sm font-medium text-slate-700 sm:flex">
          {tools.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}/`}
              className="hover:text-[var(--brand)]"
            >
              {t.shortName}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
