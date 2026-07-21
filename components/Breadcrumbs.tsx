import Link from "next/link";

/** Visible breadcrumb trail (pairs with BreadcrumbList JSON-LD for SEO). */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="text-slate-700">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-[var(--brand)]">
                    {item.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
