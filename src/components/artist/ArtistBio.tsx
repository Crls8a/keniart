import { artist } from "@/data/artist";

export function ArtistBio() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-muted">Artista</p>
        <h1 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{artist.name}</h1>
      </div>
      <div className="space-y-7 text-lg leading-8 text-muted">
        <p className="text-2xl leading-10 text-foreground">{artist.statement}</p>
        <p>{artist.shortBio}</p>
        <p>{artist.extendedBio}</p>
      </div>
    </section>
  );
}
