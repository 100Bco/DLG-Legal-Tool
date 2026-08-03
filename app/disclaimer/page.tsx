import type { Metadata } from "next";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description:
    "ClaimValueCheck provides free self-help tools and general legal information only. It is not legal advice and creates no attorney–client relationship.",
  path: "/disclaimer/",
});

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <Breadcrumbs
        items={[{ name: "Home", path: "/" }, { name: "Disclaimer", path: "/disclaimer/" }]}
      />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
        Disclaimer
      </h1>
      <div className="prose mt-6 max-w-none space-y-4 text-slate-700">
        <p className="leading-relaxed">
          <strong>Not legal advice.</strong> {site.name} provides free self-help
          tools and general legal information for educational purposes only. It
          does not provide legal advice or legal services and is not a substitute
          for advice from a licensed attorney about your specific situation.
        </p>
        <p className="leading-relaxed">
          <strong>No attorney–client relationship.</strong> Using this Site does
          not create an attorney–client relationship.
        </p>
        <p className="leading-relaxed">
          <strong>Estimates only.</strong> Deadlines, settlement figures, and
          other outputs are approximate and based on general assumptions that may
          not apply to your case. Real deadlines and case values can differ
          substantially. The law contains many exceptions a calculator cannot
          evaluate.
        </p>
        <p className="leading-relaxed">
          <strong>Time-sensitive rights.</strong> Legal deadlines can be short,
          especially for claims involving government entities. Do not rely on
          this Site to protect your rights — consult a licensed attorney
          promptly.
        </p>
        <p className="leading-relaxed">
          <strong>No warranty.</strong> The Site is provided &ldquo;as is,&rdquo;
          without warranties of any kind. To the fullest extent permitted by law,
          we disclaim all liability for actions taken or not taken based on the
          Site. These tools address Texas law only.
        </p>
      </div>
    </div>
  );
}
