import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How ClaimValueCheck collects, uses, and shares information — including sharing requests with participating attorneys — and your privacy rights.",
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
          collects, uses, and shares information. {site.name} is a self-help tool
          and advertising service, not a law firm.
        </p>

        <h2 className="text-xl font-bold text-slate-900">Calculations stay in your browser</h2>
        <p className="leading-relaxed">
          The numbers and dates you enter into our calculators are processed
          locally on your device to produce a result. We do not send those case
          details to a server and we do not store them.
        </p>

        <h2 className="text-xl font-bold text-slate-900">Information you submit</h2>
        <p className="leading-relaxed">
          If you choose to request a case review, you may provide contact details
          such as your name, phone number, email, and location.{" "}
          <strong>
            We may share that information with a participating attorney or law
            firm
          </strong>{" "}
          based on your location so they can contact you about your potential
          claim. See the{" "}
          <Link href="/sponsors/" className="text-[var(--brand)] underline">
            participating attorneys
          </Link>
          .
        </p>

        <h2 className="text-xl font-bold text-slate-900">Analytics</h2>
        <p className="leading-relaxed">
          We may use privacy-respecting analytics (such as Google Analytics) to
          understand overall traffic. This data is aggregated and is not used to
          identify you personally.
        </p>

        <h2 className="text-xl font-bold text-slate-900">Your choices &amp; rights</h2>
        <p className="leading-relaxed">
          Depending on where you live, you may have the right to access, correct,
          or delete your personal information, and to opt out of its sale or
          sharing. To opt out, use our{" "}
          <Link href="/do-not-sell/" className="text-[var(--brand)] underline">
            Do Not Sell or Share My Info
          </Link>{" "}
          page. We honor recognized opt-out signals such as Global Privacy
          Control (GPC) where required by law.
        </p>

        <h2 className="text-xl font-bold text-slate-900">Cookies</h2>
        <p className="leading-relaxed">
          We use only the cookies necessary to run the Site and, where enabled,
          analytics. You can control cookies through your browser settings.
        </p>

        <p className="leading-relaxed">
          Questions about privacy? See our{" "}
          <Link href="/terms/" className="text-[var(--brand)] underline">
            Terms of Service
          </Link>{" "}
          or contact us through the Site.
        </p>
      </div>
    </div>
  );
}
