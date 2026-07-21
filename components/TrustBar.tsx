import { Scale, Lock, BadgeCheck, Zap } from "lucide-react";

const ITEMS = [
  { icon: BadgeCheck, label: "100% free" },
  { icon: Zap, label: "No sign-up" },
  { icon: Lock, label: "Private — stays in your browser" },
  { icon: Scale, label: "Cited to Texas law" },
];

/**
 * Compact row of trust signals. `tone="light"` for dark backgrounds (hero),
 * `tone="dark"` for light backgrounds (in-page).
 */
export function TrustBar({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const base =
    tone === "light"
      ? "text-white/85"
      : "text-slate-600";
  const icon = tone === "light" ? "text-white" : "text-[var(--brand)]";
  return (
    <ul
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium ${base}`}
    >
      {ITEMS.map((it) => (
        <li key={it.label} className="flex items-center gap-1.5">
          <it.icon className={`h-4 w-4 ${icon}`} aria-hidden />
          {it.label}
        </li>
      ))}
    </ul>
  );
}
