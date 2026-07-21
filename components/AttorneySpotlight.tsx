import Image from "next/image";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { site } from "@/lib/site";
import { FirmLink } from "@/components/FirmLink";

/**
 * Founder spotlight — a real attorney photo builds trust (E-E-A-T) far more
 * than stock imagery. The portrait sits on the brand-navy card, matching the
 * firm's own site treatment. Image lives at /public/attorney-loc-dang.png.
 */
export function AttorneySpotlight() {
  return (
    <section className="bg-hero relative overflow-hidden rounded-2xl text-white shadow-xl shadow-slate-900/10">
      <div className="texture-dots absolute inset-0" aria-hidden />
      <div className="relative grid items-end gap-6 sm:grid-cols-[1.3fr_1fr]">
        <div className="p-6 sm:p-8">
          <span className="chip bg-white/10 text-white ring-1 ring-white/20">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
            Meet the founder
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
            The attorney behind these free tools
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85">
            These calculators are built and backed by{" "}
            <FirmLink className="font-semibold text-white underline" />, a Texas
            personal-injury firm serving the Austin community. We pursue the
            compensation you deserve and have real experience winning cases
            against insurance companies.
          </p>

          <div className="mt-5">
            <p className="text-lg font-bold">Loc Dang</p>
            <p className="text-sm text-white/70">
              Founder ·{" "}
              <FirmLink className="underline decoration-white/40 hover:decoration-white">
                Dang Law Group
              </FirmLink>
            </p>
          </div>

          <a
            href={site.firm.contactUrl}
            className="btn-urgent mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold"
          >
            Get a free case review
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="relative flex h-full items-end justify-center sm:justify-end">
          <Image
            src="/attorney-loc-dang.png"
            alt="Loc Dang, founder of Dang Law Group"
            width={520}
            height={640}
            className="h-auto w-56 max-w-full object-contain object-bottom drop-shadow-2xl sm:w-full"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
