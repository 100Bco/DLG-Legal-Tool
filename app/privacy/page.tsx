import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How ClaimValueCheck collects, uses, and protects your information, and your privacy rights.",
  path: "/privacy/",
});

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <Breadcrumbs
        items={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy/" }]}
      />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
        Privacy Policy
      </h1>
      <div className="prose mt-6 max-w-none space-y-4 text-slate-700">
        <p className="leading-relaxed">
          This Privacy Policy explains how {site.name} (&ldquo;we&rdquo;)
          collects, uses, and protects information. {site.name} offers free
          self-help tools and general legal information.
        </p>

        <h2 className="text-xl font-bold text-slate-900">Calculations stay in your browser</h2>
        <p className="leading-relaxed">
          The numbers and dates you enter into our calculators are processed
          locally on your device to produce a result. We do not send those case
          details to a server and we do not store them.
        </p>

        <h2 className="text-xl font-bold text-slate-900">We don&apos;t collect your case details</h2>
        <p className="leading-relaxed">
          The tools do not ask you to create an account or submit personal
          information, and we do not sell any personal information.
        </p>

        <h2 className="text-xl font-bold text-slate-900">Analytics</h2>
        <p className="leading-relaxed">
          We may use privacy-respecting analytics (such as Google Analytics) to
          understand overall traffic. This data is aggregated and is not used to
          identify you personally.
        </p>

        <h2 className="text-xl font-bold text-slate-900">Cookies</h2>
        <p className="leading-relaxed">
          We use only the cookies necessary to run the Site and, where enabled,
          analytics. You can control cookies through your browser settings.
        </p>

        <p className="leading-relaxed">
          See also our{" "}
          <Link href="/terms/" className="text-[var(--brand)] underline">
            Terms of Use
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
