import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms governing your use of ClaimValueCheck, a free self-help tool and attorney-advertising service (not a law firm).",
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

        <h2 className="text-xl font-bold text-slate-900">1. Not a law firm</h2>
        <p className="leading-relaxed">
          {site.name} is an advertising and self-help tool service. It is{" "}
          <strong>not a law firm</strong> and does not provide legal advice,
          legal services, or attorney referrals. Nothing on the Site is legal
          advice, and using the Site does not create an attorney–client
          relationship.
        </p>

        <h2 className="text-xl font-bold text-slate-900">2. Self-help tools are estimates</h2>
        <p className="leading-relaxed">
          The calculators and content are for general informational purposes and
          produce approximate estimates only. Deadlines, case values, and
          outcomes depend on facts a calculator cannot assess and can differ
          substantially from any result shown. Do not rely on the Site to
          protect your legal rights.
        </p>

        <h2 className="text-xl font-bold text-slate-900">3. Requests and routing</h2>
        <p className="leading-relaxed">
          If you submit a request, your information may be shared with a
          participating attorney or law firm based on your location so they may
          contact you. {site.name} does not evaluate, endorse, or guarantee any
          attorney, and you are under no obligation to hire anyone.
        </p>

        <h2 className="text-xl font-bold text-slate-900">4. No warranty</h2>
        <p className="leading-relaxed">
          The Site is provided &ldquo;as is&rdquo; without warranties of any
          kind. To the fullest extent permitted by law, {site.name} and its
          operator disclaim all warranties and are not liable for any damages
          arising from your use of the Site.
        </p>

        <h2 className="text-xl font-bold text-slate-900">5. Changes</h2>
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
