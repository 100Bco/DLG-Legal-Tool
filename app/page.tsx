import Link from "next/link";
import type { Metadata } from "next";
import {
  CalendarClock,
  Calculator,
  ArrowRight,
  ScrollText,
  ShieldAlert,
  Lock,
} from "lucide-react";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { TrustBar } from "@/components/TrustBar";
import { CtaCard } from "@/components/CtaCard";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — ${site.tagline}`,
  description:
    "Free legal tools for Texas injury victims. Check your filing deadline with the statute of limitations calculator and estimate your claim's value with the settlement calculator.",
  path: "/",
});

const TOOL_CARDS = [
  {
    slug: "statute-of-limitations-calculator",
    icon: CalendarClock,
    eyebrow: "Deadline checker",
    title: "How long do I have to file?",
    name: "Statute of Limitations Calculator",
    blurb:
      "Enter your accident date and case type to see your estimated Texas filing deadline — with the statute cited.",
    cta: "Check my deadline",
    accent: "urgent" as const,
  },
  {
    slug: "settlement-calculator",
    icon: Calculator,
    eyebrow: "Value estimator",
    title: "What could my claim be worth?",
    name: "Settlement Calculator",
    blurb:
      "Estimate a settlement range from your medical bills, lost wages, and injury severity using the multiplier method.",
    cta: "Estimate my claim",
    accent: "brand" as const,
  },
];

export default function Home() {
  return (
    <div>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-hero relative overflow-hidden text-white">
        <div className="texture-dots absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 pb-28 pt-14 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
              Two answers every Texas injury victim needs —{" "}
              <span className="bg-gradient-to-r from-white to-[#c7d0ff] bg-clip-text text-transparent">
                in seconds
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
              Free, private calculators that tell you how long you have to file
              and what your claim could be worth — no sign-up, no pressure.
            </p>
            <div className="mt-6 flex justify-center">
              <TrustBar tone="light" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Tool cards — overlap the hero so they read as the main product   */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto -mt-20 max-w-5xl px-4">
        <div className="grid gap-5 sm:grid-cols-2">
          {TOOL_CARDS.map((t) => {
            const urgent = t.accent === "urgent";
            return (
              <Link
                key={t.slug}
                href={`/${t.slug}/`}
                className="card-lift group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-7"
              >
                <span
                  className={`absolute right-6 top-6 chip ${
                    urgent
                      ? "bg-rose-50 text-[var(--urgent)]"
                      : "bg-indigo-50 text-[var(--brand)]"
                  }`}
                >
                  {t.eyebrow}
                </span>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${
                    urgent
                      ? "bg-gradient-to-br from-[var(--urgent-2)] to-[var(--urgent)]"
                      : "bg-gradient-to-br from-[var(--brand-2)] to-[var(--brand)]"
                  }`}
                >
                  <t.icon className="h-6 w-6" aria-hidden />
                </span>
                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  {t.title}
                </h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {t.name}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {t.blurb}
                </p>
                <span
                  className={`mt-5 inline-flex items-center gap-1.5 text-sm font-bold ${
                    urgent ? "text-[var(--urgent)]" : "text-[var(--brand)]"
                  }`}
                >
                  {t.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Trust / differentiators                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Know where you stand before you talk to an insurer
          </h2>
          <p className="mt-3 text-slate-600">
            Insurance companies move fast. These free tools give you the facts —
            straight from Texas law — so you can make decisions with confidence.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: ScrollText,
              title: "Every answer is cited",
              body: "Results link to the exact Texas statute, so you can verify the law yourself.",
            },
            {
              icon: ShieldAlert,
              title: "Knows its limits",
              body: "When a case is too risky for a simple number — like a claim against the government — the tool says so.",
            },
            {
              icon: Lock,
              title: "Private & free",
              body: "No account, no paywall. Your numbers are processed in your browser, not stored.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[var(--brand)]">
                <f.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Closing CTA                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <CtaCard />
      </section>
    </div>
  );
}
