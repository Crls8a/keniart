import { PageSection } from "@/components/layout/PageSection";

type ArtistBioProps = {
  artist: {
    name: string;
    statement: string;
    shortBio: string;
    extendedBio: string;
  };
  content: {
    eyebrow: string;
  };
};

export function ArtistBio({ artist, content }: ArtistBioProps) {
  return (
    <PageSection className="grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-muted">{content.eyebrow}</p>
        <h1 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{artist.name}</h1>
      </div>
      <div className="space-y-7 text-lg leading-8 text-muted">
        <p className="text-2xl leading-10 text-foreground">{artist.statement}</p>
        <p>{artist.shortBio}</p>
        <p>{artist.extendedBio}</p>
      </div>
    </PageSection>
  );
}
