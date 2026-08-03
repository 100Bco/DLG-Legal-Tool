import { ArrowRight, Scale } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Call-to-action. This is attorney advertising for the sponsoring firm, but the
 * firm is not named here (branding stays off the home/tool pages) — the
 * responsible-attorney disclosure lives in the footer, with a short conspicuous
 * advertising note repeated at the CTA itself.
 */
export function CtaCard({
  heading = "Want a real answer for your situation?",
  body = "A calculator can only go so far. Get a free, no-obligation case review from an experienced Texas injury attorney to confirm your actual deadline and options.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="bg-hero relative overflow-hidden rounded-2xl p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8">
      <div className="texture-dots absolute inset-0" aria-hidden />
      <div className="relative">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
          <Scale className="h-6 w-6" aria-hidden />
        </span>
        <h2 className="mt-4 text-xl font-bold sm:text-2xl">{heading}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/85">
          {body}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={site.reviewUrl}
            className="btn-urgent inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold"
          >
            Get a free case review
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-white/70">
          Attorney advertising. This is not legal advice. Contacting the firm
          does not create an attorney–client relationship, and you are under no
          obligation to hire any attorney. Prior results do not guarantee a
          similar outcome.
        </p>
      </div>
    </section>
  );
}
