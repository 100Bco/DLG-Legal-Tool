import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Do Not Sell or Share My Info",
  description:
    "Exercise your right to opt out of the sale or sharing of your personal information under the CCPA/CPRA.",
  path: "/do-not-sell/",
});

// TODO: replace with the real privacy inbox for opt-out requests.
const PRIVACY_EMAIL = "privacy@claimvaluecheck.com";

export default function DoNotSell() {
  const subject = encodeURIComponent("Do Not Sell or Share My Personal Information");
  const bodyText = encodeURIComponent(
    "I am exercising my right to opt out of the sale or sharing of my personal information.\n\nName:\nEmail used on the site:\nState of residence:\n",
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <Breadcrumbs
        items={[{ name: "Home", path: "/" }, { name: "Do Not Sell or Share My Info", path: "/do-not-sell/" }]}
      />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
        Do Not Sell or Share My Personal Information
      </h1>
      <div className="prose mt-6 max-w-none space-y-4 text-slate-700">
        <p className="leading-relaxed">
          {site.name} does not sell your personal information. If you are a
          California resident (or a resident of a state with similar rights), you
          may still request that we not sell or share your personal information,
          as those terms are defined under the California Consumer Privacy Act
          (CCPA/CPRA) and similar laws.
        </p>

        <div className="rounded-xl border border-slate-300 bg-white p-5 not-prose">
          <p className="font-semibold text-slate-900">Submit your opt-out request</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Click below to send an opt-out request. Include the name, email, and
            state you used on the Site so we can process your request.
          </p>
          <a
            href={`mailto:${PRIVACY_EMAIL}?subject=${subject}&body=${bodyText}`}
            className="btn-brand mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold"
          >
            <Mail className="h-4 w-4" aria-hidden />
            Opt out by email
          </a>
          <p className="mt-3 text-xs text-slate-500">
            Or email{" "}
            <a href={`mailto:${PRIVACY_EMAIL}`} className="underline">
              {PRIVACY_EMAIL}
            </a>{" "}
            directly.
          </p>
        </div>

        <p className="leading-relaxed">
          We also honor opt-out preference signals such as the{" "}
          <strong>Global Privacy Control (GPC)</strong> where required by law.
          Opting out will not prevent you from using the Site&apos;s free tools.
        </p>
        <p className="leading-relaxed">
          For more on how we handle your information and your other rights, see
          our Privacy Policy.
        </p>
      </div>
    </div>
  );
}
