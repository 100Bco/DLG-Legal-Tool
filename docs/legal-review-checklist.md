# Legal Review Checklist — ClaimValueCheck

**Purpose.** The calculators use fixed, hard-coded rules. The automated tests
prove the code implements those rules faithfully, but a **licensed Texas
attorney must confirm the rules themselves** before launch (brief Phase 1
"Verify statutes with attorney" and Phase 2 "Attorney review").

For each item below, confirm the rule is correct for Texas as of the launch
date, and note any change needed. Statutes are cited as encoded in the code.

- **SOL logic:** `lib/sol.ts` (`CASE_TYPES`, `calculateSol`)
- **Settlement logic:** `lib/settlement.ts` (`SEVERITIES`, `calculateSettlement`)

---

## A. Statute of Limitations — limitations periods

- [ ] **General personal injury = 2 years** from the injury date — Tex. Civ.
      Prac. & Rem. Code § 16.003(a). Applied to: motor-vehicle, slip-and-fall,
      assault, property-damage, and "other."
- [ ] **Wrongful death = 2 years from the date of death** — § 16.003(b). The
      tool treats the entered "incident date" as the date of death for this
      case type. Confirm this framing is acceptable in the UI copy.
- [ ] **Medical malpractice = 2 years** — § 74.251(a). Confirm the 2-year
      measuring point (occurrence vs. completion of treatment) is described
      accurately in the result note.
- [ ] **Products liability = 2 years** for personal injury — §§ 16.003, 16.012.
- [ ] **Property-damage-only = 2 years** — § 16.003(a). Confirm 2 years (not a
      different period) is correct for the property claims you intend to cover.

## B. Statute of Limitations — exceptions & tolling

- [ ] **Minor tolling** — § 16.001. The tool starts the clock at the 18th
      birthday, giving a deadline of **18th birthday + the statutory period**
      (e.g., the 20th birthday for a 2-year claim). Confirm this is correct for
      general PI claims involving a minor.
- [ ] **Medical malpractice + minor → no date shown.** The tool deliberately
      declines to compute a date and routes to an attorney, on the basis that
      § 74.251 and related case law (e.g., minors under 12) do not follow the
      ordinary 18th-birthday rule. Confirm this refusal is the right call and
      the explanatory note is accurate.
- [ ] **Wrongful death + minor.** The tool does **not** toll based on the
      deceased's age; it notes a surviving minor beneficiary's share may be
      tolled. Confirm.
- [ ] **Discovery rule is NOT auto-applied.** The tool bases the deadline on
      the incident date and only warns that the discovery rule may change it.
      Confirm this conservative choice (and the warning wording).
- [ ] **Statutes of repose** (10-year med-mal § 74.251(b); 15-year products
      § 16.012) are mentioned in notes but not separately computed. Confirm the
      notes are accurate and that no computed date can exceed a repose bar in a
      misleading way.
- [ ] **Unsound-mind / legal-disability tolling** (§ 16.001(a)(2)) is mentioned
      generally but not computed. Confirm acceptable.
- [ ] **Filing on the deadline date.** The tool treats the deadline date itself
      as still open (0 days remaining = "due today"). Confirm.

## C. Government claims (the "refuse to answer" guardrail)

- [ ] **Government-entity claims show no deadline.** The tool returns a warning
      instead of a date. Confirm the entities listed (city, county, State,
      public hospital, transit authority, government employee) are the right
      set to trigger this.
- [ ] **Notice deadlines described accurately** — Texas Tort Claims Act, Ch.
      101; formal written notice commonly within **6 months**, with many city
      charters requiring **45–90 days**. Confirm these figures and whether any
      specific city deadlines should be named.

## D. Settlement — multiplier model

- [ ] **Multiplier method disclosed as a rule of thumb, not a valuation.**
      Confirm the framing is defensible.
- [ ] **Severity multipliers:** minor 1.5–2×, moderate 2–3×, serious 3–4×,
      severe/permanent 4–5×. Confirm these ranges are acceptable for DLG to
      publish.
- [ ] **Non-economic = economic × multiplier.** Confirm the method and the
      economic-damage components (medical bills, lost wages, other out-of-pocket).

## E. Settlement — Texas fault & caps

- [ ] **Proportionate responsibility / 51% bar** — § 33.001. Recovery is
      reduced by the claimant's fault %, and **more than 50%** fault bars
      recovery entirely (exactly 50% still recovers). Confirm the boundary.
- [ ] **Non-economic damage caps NOT applied.** The tool does **not** apply the
      medical-malpractice non-economic caps (§ 74.301, e.g. $250k/$500k) or any
      other statutory cap. Decide whether the settlement tool should (a) exclude
      med-mal, (b) apply the cap, or (c) add a warning. **Open question.**
- [ ] **Policy limits, fees, and liens excluded.** The estimate does not cap at
      insurance policy limits or subtract attorney fees/medical liens; this is
      disclosed in the notes. Confirm the disclosure is sufficient.

## F. Disclaimers, CTA & brand copy

- [ ] **"Not legal advice" disclaimer** shows with every result and on the
      dedicated page (`components/Disclaimer.tsx`, `app/disclaimer/page.tsx`).
      Confirm the wording meets Texas advertising/ethics rules.
- [ ] **No attorney–client relationship** language (footer, CTA, disclaimer).
      Confirm.
- [ ] **CTA claims** ("free, no-obligation case review") comply with Texas
      Disciplinary Rules on attorney advertising (`components/CtaCard.tsx`).
- [ ] **Firm details** are correct before launch — `lib/site.ts`
      (`site.firm.phone`, `site.firm.contactUrl`, `site.url`). Currently
      placeholders.

## G. Sign-off

- [ ] Reviewing attorney: ______________________  Date: ____________
- [ ] All items above confirmed or corrected; corrections filed as issues/PRs.
- [ ] Ready for launch.

> After any rule change, update `lib/sol.ts` / `lib/settlement.ts`, then run
> `npm test` and update the tests so the encoded rule and its test move together.
