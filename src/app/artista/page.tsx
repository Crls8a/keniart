import type { Metadata } from "next";
import { ArtistBio } from "@/components/artist/ArtistBio";
import { artist } from "@/data/artist";

export const metadata: Metadata = {
  title: "Artista",
  description: artist.shortBio,
};

export default function ArtistaPage() {
  return (
    <>
      <ArtistBio />
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="border-t border-line pt-10">
          <h2 className="text-2xl font-medium">CV breve</h2>
          <ul className="mt-6 grid gap-4 text-muted">
            {artist.cv.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
