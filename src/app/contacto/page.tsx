import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { artist } from "@/data/artist";

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
  title: "Contacto",
  description: "Consultas de obra, galerias, dossier y contacto directo con el estudio.",
};

type Props = {
  searchParams: Promise<{ obra?: string }>;
};

export default async function ContactoPage({ searchParams }: Props) {
  const { obra } = await searchParams;
  const whatsappUrl = `https://wa.me/${artist.whatsapp}?text=${encodeURIComponent("Hola, quiero consultar una obra de Keniart.")}`;

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-muted">Contacto</p>
        <h1 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">Consultas y galerias</h1>
        <p className="mt-6 text-lg leading-8 text-muted">Para disponibilidad, reservas, dossier o propuestas curatoriales, escribí al estudio por WhatsApp.</p>
        <div className="mt-8 grid gap-3 text-sm">
          <a href={whatsappUrl} className="inline-flex items-center gap-3 underline focus-visible:outline-offset-4" target="_blank" rel="noreferrer">
            <WhatsAppMark />
            WhatsApp directo: {artist.whatsappDisplay}
          </a>
          <a href={artist.instagram} className="inline-flex items-center gap-3 underline focus-visible:outline-offset-4" target="_blank" rel="noreferrer">
            <InstagramMark />
            Referencia en Instagram
          </a>
          <Link href="/dossier" className="underline focus-visible:outline-offset-4">Ver dossier web</Link>
        </div>
      </div>
      <InquiryForm selectedArtworkSlug={obra} whatsapp={artist.whatsapp} />
    </section>
  );
}
