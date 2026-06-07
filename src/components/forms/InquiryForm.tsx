import { artworks } from "@/data/artworks";

export function InquiryForm({ selectedArtworkSlug }: { selectedArtworkSlug?: string }) {
  return (
    <form className="grid gap-5 border border-line bg-paper p-6 sm:p-8">
      <div className="grid gap-2">
        <label className="text-xs uppercase tracking-[0.24em] text-muted" htmlFor="name">
          Nombre
        </label>
        <input id="name" name="name" className="border border-line bg-background px-4 py-3 outline-none focus:border-foreground" placeholder="Tu nombre" />
      </div>
      <div className="grid gap-2">
        <label className="text-xs uppercase tracking-[0.24em] text-muted" htmlFor="email">
          Email
        </label>
        <input id="email" name="email" type="email" className="border border-line bg-background px-4 py-3 outline-none focus:border-foreground" placeholder="tu@email.com" />
      </div>
      <div className="grid gap-2">
        <label className="text-xs uppercase tracking-[0.24em] text-muted" htmlFor="artwork">
          Obra de interes
        </label>
        <select id="artwork" name="artwork" defaultValue={selectedArtworkSlug ?? ""} className="border border-line bg-background px-4 py-3 outline-none focus:border-foreground">
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
        <textarea id="message" name="message" rows={5} className="border border-line bg-background px-4 py-3 outline-none focus:border-foreground" placeholder="Contanos que obra queres consultar o que necesita tu galeria." />
      </div>
      <button type="button" className="rounded-full bg-foreground px-7 py-3 text-sm uppercase tracking-[0.22em] text-background">
        Enviar consulta
      </button>
      <p className="text-xs leading-6 text-muted">Formulario placeholder del MVP. La ruta API ya existe para conectar email en fase siguiente.</p>
    </form>
  );
}
