import type { Metadata } from "next";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Participating attorneys",
  description:
    "The attorneys and law firms that sponsor and may receive requests from ClaimValueCheck. ClaimValueCheck is not a law firm and does not endorse any attorney.",
  path: "/sponsors/",
});

// TODO: maintain the full, current list of participating attorneys/firms with
// their licensing state and bar numbers. Reviewed by compliance counsel.
const SPONSORS = [
  {
    attorney: site.sponsor.attorney,
    firm: site.sponsor.firm,
    location: site.sponsor.location,
    bar: site.sponsor.bar,
    url: site.sponsor.url,
    responsible: true,
  },
];

export default function Sponsors() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <Breadcrumbs
        items={[{ name: "Home", path: "/" }, { name: "Participating attorneys", path: "/sponsors/" }]}
      />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
        Participating attorneys
      </h1>
      <div className="prose mt-6 max-w-none space-y-4 text-slate-700">
        <p className="leading-relaxed">
          {site.name} is an advertising and self-help tool service — it is{" "}
          <strong>not a law firm</strong> and does not evaluate, endorse, or
          recommend any attorney. Requests submitted through this Site may be
          routed to one of the participating attorneys or law firms below based
          on your location. You are under no obligation to hire any of them.
        </p>

        <ul className="not-prose space-y-3">
          {SPONSORS.map((s) => (
            <li
              key={`${s.attorney}-${s.firm}`}
              className="rounded-xl border border-slate-300 bg-white p-4"
            >
              <p className="font-bold text-slate-900">{s.attorney}</p>
              <p className="text-sm text-slate-700">
                {s.firm} · {s.location}
                {s.bar ? ` · State Bar No. ${s.bar}` : ""}
              </p>
              <a
                href={s.url}
                target="_blank"
                rel="noopener"
                className="mt-1 inline-block text-sm text-[var(--brand)] underline"
              >
                Visit website
              </a>
              {s.responsible && (
                <p className="mt-1 text-xs text-slate-500">
                  Attorney responsible for this advertising.
                </p>
              )}
            </li>
          ))}
        </ul>

        <p className="text-sm leading-relaxed text-slate-600">
          This list may change over time. For questions about the attorneys who
          participate, or to request that your information not be shared, see our{" "}
          <a href="/do-not-sell/" className="text-[var(--brand)] underline">
            Do Not Sell or Share My Info
          </a>{" "}
          page.
        </p>
      </div>
    </div>
  );
}
