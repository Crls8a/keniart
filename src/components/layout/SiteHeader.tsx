import Link from "next/link";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { headerContent, mainNavigation } from "@/content/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-background/90 backdrop-blur">
      <PageContainer className="flex items-center justify-between gap-4 py-4">
        <Link href="/" className="font-serif text-xl tracking-[0.28em] uppercase focus-visible:outline-offset-4">
          Keniart
        </Link>
        <nav aria-label={headerContent.desktopNavigationLabel} className="hidden items-center gap-7 text-xs uppercase tracking-[0.24em] text-muted md:flex">
          {mainNavigation.map(({ label, href }) => (
            <Link key={href} href={href} className="transition hover:text-foreground focus-visible:text-foreground focus-visible:outline-offset-4">
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/dossier"
          className="hidden rounded-full border border-foreground px-4 py-2 text-xs uppercase tracking-[0.22em] transition hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-offset-4 md:inline-flex"
        >
          {headerContent.dossierCta}
        </Link>
        <MobileNavigation
          items={mainNavigation}
          dossierHref="/dossier"
          dossierLabel={headerContent.dossierCta}
          menuLabel={headerContent.menuLabel}
          closeMenuLabel={headerContent.closeMenuLabel}
          navigationLabel={headerContent.mobileNavigationLabel}
        />
      </PageContainer>
    </header>
  );
}
