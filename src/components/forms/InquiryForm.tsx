"use client";

import type { FormEvent } from "react";
import { artworks } from "@/data/artworks";

function WhatsAppMark() {
  return (
    <span aria-hidden="true" className="inline-flex size-5 items-center justify-center rounded-full border border-background/70">
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 19l1.3-3.8A7 7 0 1 1 8.8 17L5 19Z" />
        <path d="M9 9.5c.4 2.2 2.3 4.1 5.5 5.5l1-1.4" />
      </svg>
    </span>
  );
}

export function InquiryForm({ selectedArtworkSlug, whatsapp }: { selectedArtworkSlug?: string; whatsapp: string }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const artworkSlug = String(formData.get("artwork") ?? "");
    const selectedArtwork = artworks.find((artwork) => artwork.slug === artworkSlug);
    const message = String(formData.get("message") ?? "").trim();
    const text = [
      "Hola, quiero consultar por Keniart.",
      name ? `Mi nombre es ${name}.` : "",
      selectedArtwork ? `Me interesa la obra ${selectedArtwork.title}.` : "Consulta general.",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 border border-line bg-paper p-6 sm:p-8" aria-describedby="inquiry-form-status">
      <div className="grid gap-2">
        <label className="text-xs uppercase tracking-[0.24em] text-muted" htmlFor="name">
          Nombre
        </label>
        <input id="name" name="name" autoComplete="name" required className="border border-line bg-background px-4 py-3 outline-none" placeholder="Tu nombre" />
      </div>
      <div className="grid gap-2">
        <label className="text-xs uppercase tracking-[0.24em] text-muted" htmlFor="artwork">
          Obra de interés
        </label>
        <select id="artwork" name="artwork" defaultValue={selectedArtworkSlug ?? ""} className="border border-line bg-background px-4 py-3 outline-none">
          <option value="">Consulta general</option>
          {artworks.map((artwork) => (
            <option key={artwork.id} value={artwork.slug}>
              {artwork.title}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <label className="text-xs uppercase tracking-[0.24em] text-muted" htmlFor="message">
          Mensaje
        </label>
        <textarea id="message" name="message" rows={5} required className="border border-line bg-background px-4 py-3 outline-none" placeholder="Contanos qué obra querés consultar o qué necesita tu galería." />
      </div>
      <button type="submit" aria-describedby="inquiry-form-status" className="inline-flex items-center justify-center gap-3 rounded-full bg-foreground px-7 py-3 text-sm uppercase tracking-[0.22em] text-background transition hover:opacity-85 focus-visible:outline-offset-4">
        <WhatsAppMark />
        Consultar por WhatsApp
      </button>
      <p id="inquiry-form-status" className="text-xs leading-6 text-muted">El formulario abre WhatsApp con tu consulta preparada. Toda la comunicación del MVP se gestiona por ese canal.</p>
    </form>
  );
}
