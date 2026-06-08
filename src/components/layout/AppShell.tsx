import Link from "next/link";
import { FloatingWhatsAppCta } from "@/components/layout/FloatingWhatsAppCta";

const navItems = [
  ["Obras", "/obras"],
  ["Series", "/series"],
  ["Galerias", "/galerias"],
  ["Artista", "/artista"],
  ["Contacto", "/contacto"],
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-line/70 bg-background/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="font-serif text-xl tracking-[0.28em] uppercase focus-visible:outline-offset-4">
            Keniart
          </Link>
          <div className="hidden items-center gap-7 text-xs uppercase tracking-[0.24em] text-muted md:flex">
            {navItems.map(([label, href]) => (
              <Link key={href} href={href} className="transition hover:text-foreground focus-visible:text-foreground focus-visible:outline-offset-4">
                {label}
              </Link>
            ))}
          </div>
          <Link
            href="/dossier"
            className="rounded-full border border-foreground px-4 py-2 text-xs uppercase tracking-[0.22em] transition hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-offset-4"
          >
            Dossier
          </Link>
        </nav>
      </header>
      <main>{children}</main>
      <FloatingWhatsAppCta />
      <footer className="border-t border-line px-5 py-10 text-sm text-muted sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>Keniart - Portafolio de arte contemporaneo</p>
          <div className="flex gap-5">
            <Link href="/contacto" className="hover:text-foreground focus-visible:text-foreground focus-visible:outline-offset-4">
              Consultas
            </Link>
            <Link href="/galerias" className="hover:text-foreground focus-visible:text-foreground focus-visible:outline-offset-4">
              Para galerias
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
