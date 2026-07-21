import type { Metadata } from "next";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Legal disclaimer",
  description:
    "ClaimValueCheck provides general legal information and estimates only. It is not legal advice and does not create an attorney–client relationship.",
  path: "/disclaimer/",
});

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <Breadcrumbs
        items={[{ name: "Home", path: "/" }, { name: "Disclaimer", path: "/disclaimer/" }]}
      />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
        Legal disclaimer
      </h1>
      <div className="prose mt-6 max-w-none space-y-4 text-slate-700">
        <p className="leading-relaxed">
          <strong>Not legal advice.</strong> The tools, calculators, and content
          on {site.name} are provided for general informational and educational
          purposes only. They do not constitute legal advice and must not be
          relied upon as a substitute for advice from a licensed attorney about
          your specific situation.
        </p>
        <p className="leading-relaxed">
          <strong>No attorney–client relationship.</strong> Using this website,
          or contacting {site.firm.name} through it, does not create an
          attorney–client relationship. That relationship is formed only through
          a signed, written engagement agreement.
        </p>
        <p className="leading-relaxed">
          <strong>Estimates only.</strong> Deadlines, settlement figures, and
          other outputs are approximate and based on general rules and
          assumptions that may not apply to your case. The law contains many
          exceptions — including tolling, discovery rules, notice requirements,
          and statutes of repose — that a calculator cannot evaluate. Real
          deadlines and case values can differ substantially.
        </p>
        <p className="leading-relaxed">
          <strong>Time-sensitive rights.</strong> Legal deadlines can be short
          and unforgiving, especially for claims involving government entities.
          Do not delay in seeking advice from a qualified Texas attorney. Do not
          rely on this site to preserve your rights.
        </p>
        <p className="leading-relaxed">
          <strong>No warranty.</strong> While we strive for accuracy, we make no
          warranty that the information here is complete, current, or correct.
          Laws change, and errors can occur. {site.firm.name} disclaims all
          liability for actions taken or not taken based on this website to the
          fullest extent permitted by law.
        </p>
        <p className="leading-relaxed">
          <strong>Jurisdiction.</strong> These tools address Texas law only and
          are not applicable to claims governed by the law of other states.
        </p>
      </div>
    </div>
  );
}
