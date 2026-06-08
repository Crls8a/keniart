import Link from "next/link";
import { siteHeaderOffsetClassName } from "@/components/layout/siteHeaderContract";

type NavigationItem = {
  label: string;
  href: string;
};

type MobileNavigationProps = {
  items: readonly NavigationItem[];
  dossierHref: string;
  dossierLabel: string;
  menuLabel: string;
  closeMenuLabel: string;
  navigationLabel: string;
};

export function MobileNavigation({
  items,
  dossierHref,
  dossierLabel,
  menuLabel,
  closeMenuLabel,
  navigationLabel,
}: MobileNavigationProps) {
  return (
    <details className="group md:hidden">
      <summary
        aria-label={`${menuLabel}. ${closeMenuLabel}`}
        className="relative z-50 inline-flex w-24 cursor-pointer list-none justify-center rounded-full border border-line px-4 py-2 text-xs uppercase tracking-[0.22em] text-foreground transition hover:border-foreground focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden"
      >
        <span className="group-open:hidden">{menuLabel}</span>
        <span className="hidden group-open:inline">{closeMenuLabel}</span>
      </summary>
      <div className={`fixed inset-x-0 z-40 bg-foreground/20 px-5 pb-5 pt-0 backdrop-blur-sm ${siteHeaderOffsetClassName}`}>
        <nav aria-label={navigationLabel} className="rounded-b-[2rem] border border-line bg-paper p-6 shadow-2xl shadow-foreground/10">
          <div className="flex flex-col gap-2 text-sm uppercase tracking-[0.24em] text-muted">
            {items.map(({ label, href }) => (
              <Link key={href} href={href} className="rounded-2xl px-4 py-3 transition hover:bg-background hover:text-foreground focus-visible:text-foreground focus-visible:outline-offset-4">
                {label}
              </Link>
            ))}
            <Link
              href={dossierHref}
              className="mt-3 rounded-full border border-foreground px-4 py-3 text-center text-foreground transition hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-offset-4"
            >
              {dossierLabel}
            </Link>
          </div>
        </nav>
      </div>
    </details>
  );
}
