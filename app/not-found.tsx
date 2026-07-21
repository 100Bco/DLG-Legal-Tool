import Link from "next/link";
import { tools } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-accent)]">
        404
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mt-3 text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist. Try one of our tools
        instead:
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={`/${t.slug}/`}
            className="rounded-lg border border-[var(--brand)]/30 px-4 py-2 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--brand)]/5"
          >
            {t.shortName}
          </Link>
        ))}
        <Link
          href="/"
          className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
