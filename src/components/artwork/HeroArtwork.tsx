import Link from "next/link";
import type { Artwork } from "@/types/artwork";
import { formatArtworkYear, formatDimensions } from "@/lib/format";
import { routes } from "@/lib/routes";
import { AvailabilityBadge } from "@/components/artwork/AvailabilityBadge";
import { ResponsiveArtworkImage } from "@/components/artwork/ResponsiveArtworkImage";

type HeroArtworkContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  featuredLabel: string;
};

export function HeroArtwork({ artwork, content }: { artwork: Artwork; content: HeroArtworkContent }) {
  const image = artwork.images.gallery?.[0];
  const seriesHref = artwork.seriesSlug ? routes.series.detail(artwork.seriesSlug) : routes.series.index;
  const artworkHref = routes.obras.detail(artwork.slug);

  return (
    <section className="grid min-h-[calc(100vh-73px)] grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex items-center px-5 py-16 sm:px-10 lg:px-16">
        <div className="max-w-xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-muted">{content.eyebrow}</p>
          <h1 className="font-serif text-5xl leading-tight tracking-[-0.04em] sm:text-7xl">
            {content.title}
          </h1>
          <p className="mt-8 text-lg leading-8 text-muted">{content.description}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={routes.obras.index}
              className="rounded-full bg-foreground px-7 py-3 text-center text-sm uppercase tracking-[0.22em] text-background transition hover:opacity-85 focus-visible:outline-offset-4"
            >
              {content.primaryCta}
            </Link>
            <Link
              href={seriesHref}
              className="rounded-full border border-foreground px-7 py-3 text-center text-sm uppercase tracking-[0.22em] transition hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-offset-4"
            >
              {content.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
      <Link href={artworkHref} className="group relative min-h-[70vh] overflow-hidden bg-[#17120e] focus-visible:outline-offset-4">
        {image ? <ResponsiveArtworkImage image={image} alt={artwork.title} priority className={`slow-zoom object-contain p-4 ${image.orientation === "landscape" ? "sm:p-8" : "sm:p-6"}`} /> : null}
        <div className="absolute inset-x-5 bottom-5 bg-paper/90 p-5 backdrop-blur sm:inset-x-8 sm:bottom-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <AvailabilityBadge status={artwork.status} />
            <span className="text-xs uppercase tracking-[0.24em] text-muted">{content.featuredLabel}</span>
          </div>
          <h2 className="text-2xl font-medium">{artwork.title}</h2>
          <p className="mt-2 text-sm text-muted">
            {formatArtworkYear(artwork)} - {artwork.technique} - {formatDimensions(artwork.dimensions)}
          </p>
        </div>
      </Link>
    </section>
  );
}
