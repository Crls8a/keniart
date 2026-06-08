import { footerContent, footerSocialLinks } from "@/content/navigation";

function InstagramIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <rect width="16" height="16" x="4" y="4" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M7.2 19.2 4 20l.9-3.1A8.2 8.2 0 1 1 7.2 19.2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M9.2 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.4.5c.6 1 1.4 1.8 2.5 2.4l.5-.4c.2-.2.5-.2.7-.1l1.6.7c.3.1.4.3.4.6v.5c0 .3-.1.5-.4.7-.5.3-1.2.5-1.9.4-3.3-.4-6-3-6.4-6.3-.1-.7.1-1.4.4-1.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

const icons = {
  instagram: <InstagramIcon />,
  whatsapp: <WhatsAppIcon />,
};

export function FooterSocialLinks() {
  return (
    <nav aria-label={footerContent.socialLabel} className="flex flex-wrap gap-3">
      {footerSocialLinks.map(({ href, icon, label }) => (
        <a
          key={href}
          href={href}
          rel="noreferrer"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground transition hover:border-foreground hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-offset-4"
        >
          {icons[icon]}
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
