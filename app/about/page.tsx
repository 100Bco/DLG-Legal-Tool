import type { Metadata } from "next";
import Link from "next/link";
import { site, tools } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "About these tools",
  description:
    "ClaimValueCheck is a free suite of self-help calculators for Texas personal-injury claims. It is not a law firm and does not provide legal advice.",
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
          {site.name} is a free set of self-help tools for people dealing with
          the aftermath of an accident or injury in Texas. Our goal is simple:
          help you understand your situation quickly, in plain language, before
          you talk to anyone or sign anything.
        </p>
        <p className="leading-relaxed">
          <strong>{site.name} is not a law firm</strong> and does not provide
          legal advice, legal services, or attorney referrals. It is a free
          self-help tool and attorney-advertising service. If you choose to
          request a case review, your request may be routed to a participating
          attorney based on your location — but you are never under any
          obligation, and using this site does not create an attorney–client
          relationship. See our{" "}
          <Link href="/disclaimer/" className="text-[var(--brand)] underline">
            full disclosures
          </Link>{" "}
          and{" "}
          <Link href="/sponsors/" className="text-[var(--brand)] underline">
            participating attorneys
          </Link>
          .
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
