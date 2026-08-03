import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms governing your use of ClaimValueCheck, a free self-help tool for Texas personal-injury claims.",
  path: "/terms/",
});

export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Terms of Service", path: "/terms/" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
        Terms of Service
      </h1>
      <div className="prose mt-6 max-w-none space-y-4 text-slate-700">
        <p className="leading-relaxed">
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of{" "}
          {site.name} (the &ldquo;Site&rdquo;). By using the Site you agree to
          these Terms. If you do not agree, do not use the Site.
        </p>

        <h2 className="text-xl font-bold text-slate-900">1. Not legal advice</h2>
        <p className="leading-relaxed">
          The Site provides free self-help tools and general legal information.
          It does not provide legal advice or legal services.{" "}
          <strong>Nothing on the Site is legal advice</strong>, and using the
          Site does not create an attorney–client relationship.
        </p>

        <h2 className="text-xl font-bold text-slate-900">2. Self-help tools are estimates</h2>
        <p className="leading-relaxed">
          The calculators and content are for general informational purposes and
          produce approximate estimates only. Deadlines, case values, and
          outcomes depend on facts a calculator cannot assess and can differ
          substantially from any result shown. Do not rely on the Site to
          protect your legal rights.
        </p>

        <h2 className="text-xl font-bold text-slate-900">3. No warranty</h2>
        <p className="leading-relaxed">
          The Site is provided &ldquo;as is&rdquo; without warranties of any
          kind. To the fullest extent permitted by law, {site.name} disclaims all
          warranties and is not liable for any damages arising from your use of
          the Site.
        </p>

        <h2 className="text-xl font-bold text-slate-900">4. Changes</h2>
        <p className="leading-relaxed">
          We may update these Terms at any time. Continued use of the Site after
          changes take effect constitutes acceptance of the revised Terms.
        </p>

        <p className="leading-relaxed">
          See also our{" "}
          <Link href="/privacy/" className="text-[var(--brand)] underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/disclaimer/" className="text-[var(--brand)] underline">
            full disclaimer
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
