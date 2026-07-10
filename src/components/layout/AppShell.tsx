import Link from "next/link";
import { FloatingWhatsAppCta } from "@/components/layout/FloatingWhatsAppCta";
import { FooterSocialLinks } from "@/components/layout/FooterSocialLinks";
import { PageContainer } from "@/components/layout/PageContainer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { footerContent, footerNavigation } from "@/content/navigation";
import { routes } from "@/lib/routes";

const conversionTrackerScript = `(() => {
  const dossierPath = ${JSON.stringify(routes.dossierPdf)};
  const safeContextPattern = /^[a-z0-9_-]{1,48}$/;

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest("a[href]");
    if (!(link instanceof HTMLAnchorElement)) return;

    const url = new URL(link.href, window.location.href);
    const hostname = url.hostname.toLowerCase();
    let eventName = null;

    if (hostname === "wa.me") eventName = "lead_whatsapp_click";
    else if (hostname === "instagram.com" || hostname.endsWith(".instagram.com")) eventName = "instagram_click";
    else if (url.origin === window.location.origin && url.pathname === dossierPath) eventName = "dossier_download";

    if (!eventName) return;

    const context = link.dataset.analyticsContext;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      page_path: window.location.pathname,
      link_host: hostname,
      link_path: eventName === "lead_whatsapp_click" ? "/contact" : url.pathname,
      context: context && safeContextPattern.test(context) ? context : "site",
    });
  });
})();`;

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        id="keniart-conversion-tracker"
        dangerouslySetInnerHTML={{ __html: conversionTrackerScript }}
      />
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
