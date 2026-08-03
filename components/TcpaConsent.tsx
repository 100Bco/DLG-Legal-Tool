import { site } from "@/lib/site";

/**
 * TCPA consent language for a lead form.
 *
 * PLACEMENT REQUIREMENT: this must appear as visible text DIRECTLY at the form,
 * next to the submit button — not hidden behind a link or in the footer. Render
 * it immediately above/below the submit button of any form that collects a
 * phone number. There is currently no on-site lead form (the CTA routes to a
 * participating attorney), so this component is ready for when one is added.
 *
 * NOTE FOR REVIEW: confirm the exact wording with your compliance attorney.
 */
export function TcpaConsent() {
  return (
    <p className="text-xs leading-relaxed text-slate-600">
      By clicking &ldquo;Submit,&rdquo; you agree that {site.name} and a
      participating attorney or law firm may contact you at the phone number and
      email you provide — including by autodialed and pre-recorded calls or texts
      — about your potential claim, even if your number is on a Do-Not-Call list.
      Consent is not a condition of any purchase or service, and message and data
      rates may apply. You may opt out at any time. See our{" "}
      <a href="/privacy/" className="underline">
        Privacy Policy
      </a>{" "}
      and{" "}
      <a href="/terms/" className="underline">
        Terms of Service
      </a>
      .
    </p>
  );
}
