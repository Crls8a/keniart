import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageSection } from "@/components/layout/PageSection";
import { pageContent } from "@/content/pages";
import { routes } from "@/lib/routes";
import { siteConfig, whatsappUrl } from "@/lib/seo";

function WhatsAppMark() {
  return (
    <span aria-hidden="true" className="inline-flex size-6 items-center justify-center rounded-full border border-foreground">
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 19l1.3-3.8A7 7 0 1 1 8.8 17L5 19Z" />
        <path d="M9 9.5c.4 2.2 2.3 4.1 5.5 5.5l1-1.4" />
      </svg>
    </span>
  );
}

function InstagramMark() {
  return (
    <span aria-hidden="true" className="inline-flex size-6 items-center justify-center rounded-full border border-foreground">
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="5" width="14" height="14" rx="4" />
        <circle cx="12" cy="12" r="3" />
        <path d="M16.5 7.5h.01" />
      </svg>
    </span>
  );
}

export const metadata: Metadata = {
  title: pageContent.contact.metadata.title,
  description: pageContent.contact.metadata.description,
};

type Props = {
  searchParams: Promise<{ obra?: string }>;
};

export default async function ContactoPage({ searchParams }: Props) {
  const { obra } = await searchParams;
  const directWhatsAppUrl = whatsappUrl(pageContent.contact.header.whatsappMessage);

  return (
    <PageSection className="grid gap-12 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-muted">{pageContent.contact.header.eyebrow}</p>
        <h1 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{pageContent.contact.header.title}</h1>
        <p className="mt-6 text-lg leading-8 text-muted">{pageContent.contact.header.description}</p>
        <div className="mt-8 grid gap-3 text-sm">
          <a href={directWhatsAppUrl} className="inline-flex items-center gap-3 underline focus-visible:outline-offset-4" target="_blank" rel="noreferrer">
            <WhatsAppMark />
            {pageContent.contact.header.whatsappLabel}: {siteConfig.contact.whatsappDisplay}
          </a>
          <a href={siteConfig.contact.instagram} className="inline-flex items-center gap-3 underline focus-visible:outline-offset-4" target="_blank" rel="noreferrer">
            <InstagramMark />
            {pageContent.contact.header.instagramLabel}
          </a>
          <Link href={routes.dossier} className="underline focus-visible:outline-offset-4">{pageContent.contact.header.dossierLink}</Link>
        </div>
      </div>
      <InquiryForm selectedArtworkSlug={obra} whatsapp={siteConfig.contact.whatsapp} />
    </PageSection>
  );
}
