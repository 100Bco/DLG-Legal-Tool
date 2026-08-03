import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { SolCalculator } from "./SolCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrustBar } from "@/components/TrustBar";
import { AttorneyReferral } from "@/components/AttorneyReferral";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, webApplicationSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

const PATH = "/statute-of-limitations-calculator/";
const TITLE = "Texas Statute of Limitations Calculator";
const DESCRIPTION =
  "Free calculator that estimates the deadline to file a Texas personal-injury lawsuit based on your accident date and case type — with the exact statute cited for every result.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const FAQS = [
  {
    question: "What is the statute of limitations for a personal injury claim in Texas?",
    answer:
      "In Texas, most personal-injury lawsuits must be filed within 2 years of the date of the injury under Texas Civil Practice & Remedies Code § 16.003(a). Some claims — such as those against a government entity — have much shorter notice deadlines.",
  },
  {
    question: "What happens if I miss the filing deadline?",
    answer:
      "If you file after the statute of limitations expires, the court will usually dismiss your case and you lose the right to recover, no matter how strong it was. A few narrow exceptions (such as the discovery rule or tolling for minors) can change the deadline, so speak with an attorney before assuming a claim is barred.",
  },
  {
    question: "Does the deadline change for a child?",
    answer:
      "Often, yes. For a minor, the clock is generally tolled and does not start until the child turns 18 (Tex. Civ. Prac. & Rem. Code § 16.001), so the deadline is typically the 20th birthday. Medical-malpractice cases have special rules for young children.",
  },
  {
    question: "Are claims against a city or the state different?",
    answer:
      "Yes, and they are far more time-sensitive. The Texas Tort Claims Act and many city charters require formal written notice in as little as 45 to 90 days — long before the 2-year lawsuit deadline. Because of this, this calculator will not estimate a date for government claims and instead recommends contacting an attorney immediately.",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <JsonLd
        data={[
          webApplicationSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Statute of Limitations Calculator", path: PATH },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "SOL Calculator", path: PATH },
        ]}
      />

      <header className="mt-4">
        <span className="chip bg-rose-50 text-[var(--urgent)]">
          <CalendarClock className="h-3.5 w-3.5" aria-hidden />
          Free deadline checker
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Texas Statute of Limitations Calculator
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600">
          Find out how long you may have to file a personal-injury claim in
          Texas. Enter your accident date and case type to see an estimated
          deadline — with the governing statute cited for every answer.
        </p>
        <div className="mt-4">
          <TrustBar />
        </div>
      </header>

      <div className="mt-8">
        <SolCalculator />
      </div>

      {/* Server-rendered supporting content — indexable by search + AI. */}
      <section className="prose mt-14 max-w-none">
        <h2 className="text-2xl font-bold text-slate-900">
          How the Texas filing deadline works
        </h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          A <strong>statute of limitations</strong> is the legal deadline for
          filing a lawsuit. In Texas, the general deadline for personal-injury
          cases — car crashes, truck accidents, slip-and-falls, and most other
          negligence claims — is <strong>two years</strong> from the date of the
          injury, set by{" "}
          <a
            href="https://statutes.capitol.texas.gov/Docs/CP/htm/CP.16.htm#16.003"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--brand)] underline"
          >
            Tex. Civ. Prac. &amp; Rem. Code § 16.003
          </a>
          . Miss that deadline and your claim is usually gone for good.
        </p>
        <p className="mt-3 leading-relaxed text-slate-700">
          But the two-year rule has important exceptions. The deadline can be{" "}
          <em>tolled</em> (paused) for injured children and for people who are
          legally incapacitated. Medical-malpractice and product-liability
          claims carry their own statutes of repose. And claims against a
          government entity are governed by short notice deadlines that can
          expire in a matter of weeks. This calculator applies the common rules
          and flags the situations where you should not rely on a simple number.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-slate-900">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-5">
          {FAQS.map((f) => (
            <div key={f.question}>
              <h3 className="font-semibold text-slate-900">{f.question}</h3>
              <p className="mt-1 leading-relaxed text-slate-700">{f.answer}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-slate-700">
          Next, estimate what a claim could be worth with the{" "}
          <Link href="/settlement-calculator/" className="text-[var(--brand)] underline">
            Texas Settlement Calculator
          </Link>
          .
        </p>

        <AttorneyReferral />
      </section>
    </div>
  );
}
