import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Phone } from "lucide-react";
import { site, tools } from "@/lib/site";
import { FirmLink } from "@/components/FirmLink";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      {/* Thin brand accent line for a premium, deliberate feel. */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--brand)] via-[var(--brand-3)] to-[var(--gold)]" />
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label={`${site.name} home`}>
            <Image
              src="/dlg-logo.png"
              alt="Dang Law Group logo"
              width={44}
              height={38}
              className="h-9 w-auto"
              priority
            />
          </Link>
          <span className="flex flex-col leading-tight">
            <Link
              href="/"
              className="text-base font-extrabold tracking-tight text-[var(--brand)]"
            >
              {site.name}
            </Link>
            <FirmLink className="text-[11px] font-medium uppercase tracking-wide text-slate-500 hover:text-[var(--brand)] hover:underline">
              by {site.firm.name}
            </FirmLink>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav
            aria-label="Primary"
            className="hidden gap-1 text-sm font-medium text-slate-700 md:flex"
          >
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}/`}
                className="rounded-lg px-3 py-2 hover:bg-slate-100 hover:text-[var(--brand)]"
              >
                {t.shortName}
              </Link>
            ))}
          </nav>
          <span className="hidden items-center gap-1.5 text-xs font-semibold text-emerald-700 lg:flex">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            Free tool
          </span>
          <a
            href={site.firm.contactUrl}
            className="btn-brand inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold sm:px-4"
          >
            <Phone className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Free case review</span>
            <span className="sm:hidden">Free review</span>
          </a>
        </div>
      </div>
    </header>
  );
}
