import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { artist } from "@/data/artist";

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
        <p className="mt-6 text-lg leading-8 text-muted">Para disponibilidad, reservas, dossier o propuestas curatoriales, escribi al estudio.</p>
        <div className="mt-8 grid gap-3 text-sm">
          <a href={`mailto:${artist.email}`} className="underline">{artist.email}</a>
          <a href={whatsappUrl} className="underline" target="_blank" rel="noreferrer">WhatsApp directo</a>
          <Link href="/dossier" className="underline">Ver dossier web</Link>
        </div>
      </div>
      <InquiryForm selectedArtworkSlug={obra} />
    </section>
  );
}
