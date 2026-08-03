import type { Metadata } from "next";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { SettlementCalculator } from "./SettlementCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrustBar } from "@/components/TrustBar";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, webApplicationSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

const PATH = "/settlement-calculator/";
const TITLE = "Texas Injury Settlement Calculator";
const DESCRIPTION =
  "Free settlement calculator that estimates what a Texas personal-injury claim could be worth using the multiplier method, including Texas comparative-fault (51% bar) rules.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const FAQS = [
  {
    question: "How is a personal injury settlement calculated?",
    answer:
      "A common rule of thumb is the multiplier method: add up your economic damages (medical bills, lost wages, and other out-of-pocket costs), then multiply them by a number — often 1.5 to 5 depending on severity — to estimate pain and suffering. The total is a starting point for negotiation, not a guaranteed value.",
  },
  {
    question: "Does my own fault reduce my settlement in Texas?",
    answer:
      "Yes. Texas uses modified comparative fault (proportionate responsibility). Your recovery is reduced by your percentage of fault, and if you are found more than 50% at fault you generally recover nothing (Tex. Civ. Prac. & Rem. Code § 33.001).",
  },
  {
    question: "Why is the result shown as a range?",
    answer:
      "Because no calculator can value a real claim. Actual settlements depend on liability, available insurance limits, the strength of the evidence, the venue, and negotiation. The range is an educational estimate only.",
  },
  {
    question: "Does the estimate include attorney fees or medical liens?",
    answer:
      "No. This estimate does not subtract attorney fees, medical liens, or unpaid bills, and it does not cap the number at the at-fault party's insurance policy limits — all of which can significantly change what you actually take home.",
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
            { name: "Settlement Calculator", path: PATH },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Settlement Calculator", path: PATH },
        ]}
      />

      <header className="mt-4">
        <span className="chip bg-indigo-50 text-[var(--brand)]">
          <Calculator className="h-3.5 w-3.5" aria-hidden />
          Free value estimator
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Texas Injury Settlement Calculator
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600">
          Get a rough idea of what a Texas personal-injury claim could be worth.
          This tool uses the multiplier method and applies Texas comparative-fault
          rules — but a real valuation always requires a lawyer.
        </p>
        <div className="mt-4">
          <TrustBar />
        </div>
      </header>

      <div className="mt-8">
        <SettlementCalculator />
      </div>

      <section className="prose mt-14 max-w-none">
        <h2 className="text-2xl font-bold text-slate-900">
          How the multiplier method works
        </h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Personal-injury damages fall into two buckets:
        </p>
        <ul className="mt-3 space-y-2 text-slate-700">
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-3)]" />
            <span>
              <strong>Economic damages</strong> — your measurable losses: medical
              bills, lost wages, and other out-of-pocket costs.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-3)]" />
            <span>
              <strong>Non-economic damages</strong> — pain, suffering, and loss
              of enjoyment of life, which are harder to measure.
            </span>
          </li>
        </ul>
        <p className="mt-3 leading-relaxed text-slate-700">
          The multiplier method estimates non-economic damages by multiplying
          your economic damages by a factor (commonly 1.5&times; for minor
          injuries up to 5&times; for severe, permanent injuries), then adds the
          two together.
        </p>
        <p className="mt-3 leading-relaxed text-slate-700">
          In Texas, your result is then adjusted for fault. Under{" "}
          <a
            href="https://statutes.capitol.texas.gov/Docs/CP/htm/CP.33.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--brand)] underline"
          >
            proportionate responsibility (Tex. Civ. Prac. &amp; Rem. Code Ch. 33)
          </a>
          , your recovery is reduced by your share of the blame — and if you are
          more than 50% at fault, you recover nothing. This calculator applies
          that 51% bar automatically.
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
          Not sure how long you have to file? Check the{" "}
          <Link
            href="/statute-of-limitations-calculator/"
            className="text-[var(--brand)] underline"
          >
            Texas Statute of Limitations Calculator
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
