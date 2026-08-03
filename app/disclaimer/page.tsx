import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Legal disclaimer",
  description:
    "ClaimValueCheck is a free self-help tool and attorney-advertising service. It is not a law firm, does not give legal advice, and creates no attorney–client relationship.",
  path: "/disclaimer/",
});

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <Breadcrumbs
        items={[{ name: "Home", path: "/" }, { name: "Disclaimer", path: "/disclaimer/" }]}
      />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
        Legal disclaimer &amp; advertising disclosures
      </h1>
      <div className="prose mt-6 max-w-none space-y-4 text-slate-700">
        <p className="leading-relaxed">
          <strong>Paid attorney advertising.</strong> {site.name} is an
          advertising and self-help tool service. It is{" "}
          <strong>not a law firm</strong> and does not provide legal advice,
          legal services, or attorney referrals.
        </p>
        <p className="leading-relaxed">
          <strong>Not legal advice.</strong> The tools, calculators, and content
          on this Site are for general informational and educational purposes
          only. They are not a substitute for advice from a licensed attorney
          about your specific situation.
        </p>
        <p className="leading-relaxed">
          <strong>No attorney–client relationship.</strong> Using this Site, or
          submitting a request through it, does not create an attorney–client
          relationship. That relationship is formed only through a signed,
          written engagement agreement with an attorney you choose.
        </p>
        <p className="leading-relaxed">
          <strong>How requests are handled.</strong> If you submit a request,
          your information may be routed to a participating attorney or law firm
          based on your location so they can contact you. {site.name} does not
          evaluate, endorse, recommend, or guarantee any attorney, and no
          attorney is selected based on the merits of your matter. You are under
          no obligation to hire anyone. See the{" "}
          <Link href="/sponsors/" className="text-[var(--brand)] underline">
            participating attorneys
          </Link>
          .
        </p>
        <p className="leading-relaxed">
          <strong>Estimates only.</strong> Deadlines, settlement figures, and
          other outputs are approximate and based on general assumptions that may
          not apply to your case. Real deadlines and case values can differ
          substantially. The law contains many exceptions a calculator cannot
          evaluate.
        </p>
        <p className="leading-relaxed">
          <strong>Results &amp; slogans.</strong> Prior results do not guarantee
          a similar outcome, and recoveries vary. Any dollar figures are
          illustrative, not a promise of recovery. Any images or scenarios may be
          dramatizations, and terms like &ldquo;best&rdquo; are marketing
          slogans, not claims of superior quality.
        </p>
        <p className="leading-relaxed">
          <strong>Fees.</strong> &ldquo;No fee unless you win,&rdquo; if offered
          by a participating attorney, refers to attorney&apos;s fees only; you
          may still be responsible for case costs and expenses.
        </p>
        <p className="leading-relaxed">
          <strong>Time-sensitive rights.</strong> Legal deadlines can be short,
          especially for claims involving government entities. Do not rely on
          this Site to protect your rights — consult a licensed attorney
          promptly.
        </p>
        <p className="leading-relaxed">
          <strong>No warranty.</strong> The Site is provided &ldquo;as is.&rdquo;
          {" "}
          {site.name} and its operator disclaim all warranties and liability for
          actions taken or not taken based on the Site, to the fullest extent
          permitted by law. These tools address Texas law only.
        </p>
      </div>
    </div>
  );
}
