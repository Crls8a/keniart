import { siteConfig, whatsappUrl } from "@/lib/seo";

const whatsappMessage = "Hola, quiero recibir información sobre una obra de Keniart.";

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M5.2 19.1 6 16.2a7.3 7.3 0 1 1 2.7 2.3l-3.5.6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M9.6 8.7c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.1.6l-.4.5c-.1.2-.2.3-.1.5.4.8 1.2 1.6 2 2 .2.1.3 0 .5-.1l.5-.4c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.4c0 .4-.1.7-.4.9-.4.3-1 .6-1.8.5-2.8-.3-6.2-3.5-6.5-6.4-.1-.7.2-1.4.7-1.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FloatingWhatsAppCta() {
  return (
    <a
      aria-label={`Consultar por WhatsApp al ${siteConfig.contact.whatsappDisplay}`}
      className="fixed right-5 bottom-5 z-40 inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-foreground px-4 py-3 text-sm font-medium text-background shadow-lg shadow-foreground/10 transition hover:-translate-y-0.5 hover:bg-foreground/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:right-8 sm:bottom-8"
      href={whatsappUrl(whatsappMessage)}
      rel="noreferrer"
      target="_blank"
    >
      <WhatsAppIcon />
      <span className="hidden sm:inline">WhatsApp {siteConfig.contact.whatsappDisplay}</span>
    </a>
  );
}
