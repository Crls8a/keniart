import Link from "next/link";
import { FloatingWhatsAppCta } from "@/components/layout/FloatingWhatsAppCta";
import { FooterSocialLinks } from "@/components/layout/FooterSocialLinks";
import { PageContainer } from "@/components/layout/PageContainer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { footerContent, footerNavigation } from "@/content/navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>{children}</main>
      <FloatingWhatsAppCta />
      <footer className="border-t border-line py-10 text-sm text-muted">
        <PageContainer className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p>{footerContent.tagline}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex gap-5">
              {footerNavigation.map(({ label, href }) => (
                <Link key={href} href={href} className="hover:text-foreground focus-visible:text-foreground focus-visible:outline-offset-4">
                  {label}
                </Link>
              ))}
            </div>
            <FooterSocialLinks />
          </div>
        </PageContainer>
      </footer>
    </div>
  );
}
