import { ArrowRight, Scale } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Neutral call-to-action. ClaimValueCheck is an advertising service (not a law
 * firm); a request may be routed to a participating attorney. No firm branding
 * appears here — compliance disclosures live in the footer, with a short
 * conspicuous note repeated at the CTA itself.
 */
export function CtaCard({
  heading = "Want a real answer for your situation?",
  body = "A calculator can only go so far. Get a free, no-obligation case review from a participating attorney to confirm your actual deadline and options.",
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
          Paid attorney advertising. {site.name} is not a law firm and does not
          provide legal advice. A request may be routed to a participating
          attorney based on your location. Submitting a request does not create
          an attorney–client relationship, and you are under no obligation to
          hire any attorney.
        </p>
      </div>
    </section>
  );
}
