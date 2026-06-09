import type { Metadata } from "next";
import Link from "next/link";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import { HeroArtwork } from "@/components/artwork/HeroArtwork";
import { StructuredData } from "@/components/artwork/StructuredData";
import { DossierDownload } from "@/components/dossier/DossierDownload";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";
import { pageContent } from "@/content/pages";
import { catalogArtworks, featuredArtwork } from "@/data/artworks";
import { series } from "@/data/series";
import { collectionSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageContent.home.metadata.title,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: pageContent.home.metadata.openGraphTitle,
    description: siteConfig.openGraphDescription,
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <StructuredData data={collectionSchema("Keniart - selección destacada", catalogArtworks)} />
      <HeroArtwork artwork={featuredArtwork} content={pageContent.home.hero} />
      <PageSection className="py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">{pageContent.home.recentWorks.eyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em]">{pageContent.home.recentWorks.title}</h2>
          </div>
          <Link href="/obras" className="text-sm uppercase tracking-[0.22em] underline focus-visible:outline-offset-4">
            {pageContent.home.recentWorks.cta}
          </Link>
        </div>
        <ArtworkGrid artworks={catalogArtworks.slice(0, 3)} />
      </PageSection>
      <section className="border-y border-line bg-paper/60 py-20">
        <PageContainer className="grid gap-8 lg:grid-cols-2">
          {series.map((item) => (
            <Link key={item.slug} href={`/series/${item.slug}`} className="group border border-line bg-background p-8 transition motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1 focus-visible:outline-offset-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">{item.years}</p>
              <h3 className="mt-5 font-serif text-4xl tracking-[-0.04em]">{item.title}</h3>
              <p className="mt-4 leading-7 text-muted">{item.description}</p>
            </Link>
          ))}
        </PageContainer>
      </section>
      <PageSection className="py-20">
        <DossierDownload content={pageContent.dossier.download} />
      </PageSection>
    </>
  );
}
