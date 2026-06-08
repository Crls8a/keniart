import type { Metadata } from "next";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import { DossierDownload } from "@/components/dossier/DossierDownload";
import { ArtistBio } from "@/components/artist/ArtistBio";
import { PageSection } from "@/components/layout/PageSection";
import { pageContent } from "@/content/pages";
import { artist } from "@/data/artist";
import { dossierArtworks } from "@/data/artworks";

export const metadata: Metadata = {
  title: pageContent.dossier.metadata.title,
  description: pageContent.dossier.metadata.description,
};

export default function DossierPage() {
  return (
    <>
      <PageSection className="py-16 lg:py-24">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">{pageContent.dossier.hero.eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl tracking-[-0.04em] sm:text-7xl">{pageContent.dossier.hero.title}</h1>
      </PageSection>
      <ArtistBio artist={artist} content={pageContent.artist.bio} />
      <PageSection className="py-16">
        <div className="mb-10">
          <h2 className="font-serif text-4xl tracking-[-0.04em]">{pageContent.dossier.selectedWorks.title}</h2>
          <p className="mt-4 text-muted">{pageContent.dossier.selectedWorks.description}</p>
        </div>
        <ArtworkGrid artworks={dossierArtworks} />
      </PageSection>
      <PageSection className="pb-20">
        <DossierDownload content={pageContent.dossier.download} />
      </PageSection>
    </>
  );
}
