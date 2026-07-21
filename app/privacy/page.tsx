import type { Metadata } from "next";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FirmLink } from "@/components/FirmLink";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description:
    "How ClaimValueCheck handles your information. The calculators run in your browser and do not store the details you enter.",
  path: "/privacy/",
});

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <Breadcrumbs
        items={[{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy/" }]}
      />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
        Privacy
      </h1>
      <div className="prose mt-6 max-w-none space-y-4 text-slate-700">
        <p className="leading-relaxed">
          <strong>Your calculations stay in your browser.</strong> The numbers
          and dates you type into our calculators are processed locally on your
          device to produce a result. We do not send those case details to a
          server and we do not store them.
        </p>
        <p className="leading-relaxed">
          <strong>Analytics.</strong> Like most websites, we may use privacy-
          respecting analytics (such as Google Analytics) to understand overall
          traffic — for example, how many people visit a page. This data is
          aggregated and is not used to identify you personally.
        </p>
        <p className="leading-relaxed">
          <strong>If you contact us.</strong> If you choose to reach out to{" "}
          <FirmLink className="text-[var(--brand)] underline" /> for a case
          review, the information you provide will be handled by the firm in
          accordance with its own privacy practices.
        </p>
        <p className="leading-relaxed">
          <strong>Cookies.</strong> We use only the cookies necessary to run the
          site and, where enabled, analytics. You can control cookies through
          your browser settings.
        </p>
        <p className="leading-relaxed">
          Questions about privacy? Contact{" "}
          <FirmLink className="text-[var(--brand)] underline" />.
        </p>
      </div>
    </div>
  );
}
