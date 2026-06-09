import Link from "next/link";
import type { Artwork } from "@/types/artwork";
import { formatDimensions, formatPrice } from "@/lib/format";
import { AvailabilityBadge } from "@/components/artwork/AvailabilityBadge";
import { ArtworkImageGallery } from "@/components/artwork/ArtworkImageGallery";
import { PageSection } from "@/components/layout/PageSection";
import { siteHeaderContractClassName, siteHeaderStickyOffsetClassName } from "@/components/layout/siteHeaderContract";

type ArtworkDetailContent = {
  fields: {
    year: string;
    technique: string;
    support: string;
    dimensions: string;
    price: string;
  };
  galleryAside: {
    eyebrow: string;
    fallbackNotes: string;
    cta: string;
  };
  actions: {
    inquire: string;
    backToCatalog: string;
  };
};

export function ArtworkDetail({ artwork, content }: { artwork: Artwork; content: ArtworkDetailContent }) {
  const seriesHref = artwork.seriesSlug ? `/series/${artwork.seriesSlug}` : "/series";

  return (
    <PageSection as="article" className={`grid gap-12 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-20 ${siteHeaderContractClassName}`}>
      <div className={`lg:sticky ${siteHeaderStickyOffsetClassName}`}>
        <ArtworkImageGallery artwork={artwork} />
      </div>
      <div className="self-start">
        <AvailabilityBadge status={artwork.status} />
        <h1 className="mt-6 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{artwork.title}</h1>
        <p className="mt-6 text-lg leading-8 text-muted">{artwork.description}</p>
        <dl className="mt-10 divide-y divide-line border-y border-line text-sm">
          {[
            [content.fields.year, artwork.year],
            [content.fields.technique, artwork.technique],
            [content.fields.support, artwork.support],
            [content.fields.dimensions, formatDimensions(artwork.dimensions)],
            [content.fields.price, formatPrice(artwork.price)],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[9rem_1fr] gap-4 py-4">
              <dt className="uppercase tracking-[0.22em] text-muted">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <aside className="mt-8 rounded-[1.5rem] border border-line bg-paper p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-muted">{content.galleryAside.eyebrow}</p>
          <p className="mt-3 text-sm leading-6 text-muted">
            {artwork.experience?.galleryNotes ?? content.galleryAside.fallbackNotes}
          </p>
          <Link href={seriesHref} className="mt-4 inline-flex text-sm uppercase tracking-[0.22em] underline">
            {content.galleryAside.cta}
          </Link>
        </aside>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href={`/contacto?obra=${artwork.slug}`}
            className="rounded-full bg-foreground px-7 py-3 text-center text-sm uppercase tracking-[0.22em] text-background"
          >
            {content.actions.inquire}
          </Link>
          <Link
            href="/obras"
            className="rounded-full border border-foreground px-7 py-3 text-center text-sm uppercase tracking-[0.22em]"
          >
            {content.actions.backToCatalog}
          </Link>
        </div>
      </div>
    </PageSection>
  );
}
