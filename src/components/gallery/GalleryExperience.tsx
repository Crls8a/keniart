import Link from "next/link";
import { ArtworkMediaFrame } from "@/components/artwork/ArtworkMediaFrame";
import { artworkImageSizes, ResponsiveArtworkImage } from "@/components/artwork/ResponsiveArtworkImage";
import { GalleryArtworkGrid } from "@/components/gallery/GalleryArtworkGrid";
import { getCatalogOnlyArtworkHref } from "@/data/artworks";
import type { Artwork } from "@/types/artwork";

type GalleryExperienceProps = {
  artworks: Artwork[];
  content: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      ctaPrefix: string;
    };
    list: {
      eyebrow: string;
      title: string;
      description: string;
      cardCta: string;
      sections: {
        available: {
          eyebrow: string;
          title: string;
          description: string;
        };
        sold: {
          eyebrow: string;
          title: string;
          description: string;
          empty: string;
        };
      };
    };
  };
};

export function GalleryExperience({ artworks, content }: GalleryExperienceProps) {
  const visibleArtworks = artworks.toSorted((a, b) => (a.experience?.dossierOrder ?? 99) - (b.experience?.dossierOrder ?? 99));
  const heroArtwork = visibleArtworks[0];
  const heroImage = heroArtwork?.images.gallery?.[0];
  const heroHref = heroArtwork ? getCatalogOnlyArtworkHref(heroArtwork) : undefined;
  const availableArtworks = visibleArtworks.filter((artwork) => artwork.status === "available");
  const soldArtworks = visibleArtworks.filter((artwork) => artwork.status === "sold");

  return (
    <section className="space-y-12" aria-labelledby="gallery-experience-title">
      {heroArtwork && heroHref ? (
        <article className="grid overflow-hidden rounded-[2rem] bg-[#16120e] text-[#f7efe3] shadow-[0_28px_90px_rgba(22,18,14,0.18)] lg:grid-cols-[minmax(0,1fr)_24rem]">
          <Link href={heroHref} className="group block focus-visible:outline-offset-4">
            <ArtworkMediaFrame image={heroImage} size="hero" className="min-h-[58vh] bg-black/30 lg:min-h-[72vh]">
              {heroImage ? <ResponsiveArtworkImage image={heroImage} alt={heroArtwork.title} priority sizes={artworkImageSizes.galleryHero} className="object-contain transition duration-1000 motion-safe:group-hover:scale-[1.015] motion-safe:group-focus-visible:scale-[1.015]" /> : null}
            </ArtworkMediaFrame>
          </Link>
          <div className="flex flex-col justify-end p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#b8aa98]">{content.hero.eyebrow}</p>
            <h2 id="gallery-experience-title" className="mt-5 font-serif text-5xl tracking-[-0.05em] sm:text-6xl">
              {content.hero.title}
            </h2>
            <p className="mt-6 leading-7 text-[#cfc2b1]">{content.hero.description}</p>
            <Link
              className="mt-8 inline-flex w-fit rounded-full border border-[#f7efe3]/35 px-5 py-3 text-sm uppercase tracking-[0.22em] text-[#f7efe3] transition hover:border-[#f7efe3] focus-visible:outline-offset-4"
              href={heroHref}
            >
              {content.hero.ctaPrefix} {heroArtwork.title.replace("Retrato de ", "")}
            </Link>
          </div>
        </article>
      ) : null}

      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">{content.list.eyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">{content.list.title}</h2>
        <p className="mt-5 text-muted">{content.list.description}</p>
      </div>

      <section className="space-y-8" aria-labelledby="available-artworks-title">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">{content.list.sections.available.eyebrow}</p>
          <h3 id="available-artworks-title" className="mt-4 font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
            {content.list.sections.available.title}
          </h3>
          <p className="mt-4 text-muted">{content.list.sections.available.description}</p>
        </div>
        <GalleryArtworkGrid artworks={availableArtworks} cardCta={content.list.cardCta} />
      </section>

      <section className="space-y-8 border-t border-line pt-12" aria-labelledby="sold-artworks-title">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">{content.list.sections.sold.eyebrow}</p>
          <h3 id="sold-artworks-title" className="mt-4 font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
            {content.list.sections.sold.title}
          </h3>
          <p className="mt-4 text-muted">{content.list.sections.sold.description}</p>
        </div>
        {soldArtworks.length ? (
          <GalleryArtworkGrid artworks={soldArtworks} cardCta={content.list.cardCta} />
        ) : (
          <p className="rounded-[1.75rem] border border-line bg-paper px-6 py-10 text-sm leading-6 text-muted">
            {content.list.sections.sold.empty}
          </p>
        )}
      </section>
    </section>
  );
}
