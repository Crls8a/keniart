import type { Metadata } from "next";
import { ArtistBio } from "@/components/artist/ArtistBio";
import { PageSection } from "@/components/layout/PageSection";
import { pageContent } from "@/content/pages";
import { artist } from "@/data/artist";

export const metadata: Metadata = {
  title: pageContent.artist.metadata.title,
  description: artist.shortBio,
};

export default function ArtistaPage() {
  return (
    <>
      <ArtistBio artist={artist} content={pageContent.artist.bio} />
      <PageSection className="pb-20">
        <div className="border-t border-line pt-10">
          <h2 className="text-2xl font-medium">{pageContent.artist.cvTitle}</h2>
          <ul className="mt-6 grid gap-4 text-muted">
            {artist.cv.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </PageSection>
    </>
  );
}
