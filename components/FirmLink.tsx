import { site } from "@/lib/site";

/**
 * Renders a hyperlink to the parent firm's website. Use this everywhere the
 * Dang Law Group name appears so every mention links to danglawgroup.com.
 * Defaults to the full firm name; pass `short` for the "DLG" abbreviation, or
 * custom children.
 */
export function FirmLink({
  className = "",
  short = false,
  children,
}: {
  className?: string;
  short?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={site.firm.url}
      target="_blank"
      rel="noopener"
      className={className}
    >
      {children ?? (short ? site.firm.shortName : site.firm.name)}
    </a>
  );
}
