import type { Metadata } from "next";
import Link from "next/link";
import { site, tools } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "About these tools",
  description:
    "ClaimValueCheck is a free suite of Texas personal-injury legal tools built by Dang Law Group to help injury victims understand their rights.",
  path: "/about/",
});

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about/" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
        About {site.name}
      </h1>
      <div className="prose mt-6 max-w-none space-y-4 text-slate-700">
        <p className="leading-relaxed">
          {site.name} is a free set of legal tools for people dealing with the
          aftermath of an accident or injury in Texas. Our goal is simple: help
          you understand your situation quickly, in plain language, before you
          talk to anyone or sign anything.
        </p>
        <p className="leading-relaxed">
          The tools are built and maintained by{" "}
          <a href={site.firm.url} className="text-[var(--brand)] underline">
            {site.firm.name}
          </a>
          , a Texas personal-injury law firm. We believe useful information
          should be free. If our calculators help you, and you decide you want a
          real person to look at your case, we&apos;re here — but there is never
          any obligation.
        </p>
        <h2 className="text-xl font-bold text-slate-900">Our tools</h2>
        <ul className="list-disc space-y-2 pl-5">
          {tools.map((t) => (
            <li key={t.slug}>
              <Link href={`/${t.slug}/`} className="text-[var(--brand)] underline">
                {t.name}
              </Link>{" "}
              — {t.summary}
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-bold text-slate-900">How we build them</h2>
        <p className="leading-relaxed">
          Every calculation is based on fixed formulas drawn from the Texas
          Civil Practice &amp; Remedies Code — not guesswork and not AI. Each
          result cites the statute it relies on so you can check the law
          yourself. Where the law is too fact-specific for a reliable number,
          the tool tells you rather than guessing.
        </p>
        <p className="leading-relaxed">
          These tools provide legal information, not legal advice. Please read
          our{" "}
          <Link href="/disclaimer/" className="text-[var(--brand)] underline">
            full disclaimer
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
