import Link from "next/link";
import type { Metadata } from "next";
import { site, tools } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { CtaCard } from "@/components/CtaCard";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — ${site.tagline}`,
  description:
    "Free legal tools for Texas injury victims. Check your filing deadline with the statute of limitations calculator and estimate your claim's value with the settlement calculator.",
  path: "/",
});

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
      <section className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-accent)]">
          Free tools by {site.firm.name}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Answer the two biggest questions after a Texas injury
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
          <em>How long do I have to file?</em> and{" "}
          <em>What could my claim be worth?</em> Get clear, cited answers in
          seconds — free, no sign-up, no pressure.
        </p>
      </section>

      <section className="mt-12 grid gap-5 sm:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={`/${t.slug}/`}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[var(--brand)]/40 hover:shadow-md"
          >
            <h2 className="text-xl font-bold text-[var(--brand)]">{t.name}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              {t.summary}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] group-hover:gap-2">
              Open the tool
              <span aria-hidden>&rarr;</span>
            </span>
          </Link>
        ))}
      </section>

      <section className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Built to help first — not to sell
        </h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <div>
            <h3 className="font-semibold text-slate-900">Every answer is cited</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Results link to the exact Texas statute, so you can verify the law
              yourself.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Knows its limits</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              When a situation is too risky for a simple number — like a claim
              against the government — the tool says so.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Genuinely free</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              No account, no paywall. These calculators are a public resource
              from {site.firm.name}.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-12">
        <CtaCard />
      </div>
    </div>
  );
}
