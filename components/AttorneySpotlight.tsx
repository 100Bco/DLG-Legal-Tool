import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { FirmLink } from "@/components/FirmLink";

/**
 * Compact "backed by a real attorney" trust bar. A small circular headshot of
 * founder Loc Dang builds E-E-A-T without taking over the page — it reads like
 * a slim footer strip, not a hero section. Image: /public/dang-lawyer.webp.
 */
export function AttorneySpotlight() {
  return (
    <section className="bg-hero flex flex-wrap items-center gap-x-4 gap-y-3 rounded-xl px-4 py-3 text-white shadow-lg shadow-slate-900/10 sm:px-5">
      {/* Circular headshot, cropped to the face. */}
      <Image
        src="/dang-lawyer.webp"
        alt="Loc Dang, founder of Dang Law Group"
        width={977}
        height={1237}
        className="h-12 w-12 shrink-0 rounded-full object-cover object-top ring-2 ring-white/25"
      />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-tight">
          Backed by Loc Dang, Founder
        </p>
        <p className="text-xs leading-tight text-white/70">
          Real tools from{" "}
          <FirmLink className="underline decoration-white/40 hover:decoration-white">
            Dang Law Group
          </FirmLink>
          , a Texas personal-injury firm.
        </p>
      </div>

      <a
        href={site.firm.contactUrl}
        className="btn-urgent inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold sm:w-auto"
      >
        Free case review
        <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </section>
  );
}
