import Image from "next/image";
import Link from "next/link";
import type { ArtworkSeries } from "@/types/artwork";

type SeriesGridProps = {
  items: ArtworkSeries[];
};

function SeriesCard({ item }: { item: ArtworkSeries }) {
  return (
    <Link key={item.slug} href={`/series/${item.slug}`} className="group block focus-visible:outline-offset-4">
      <div className="relative aspect-[5/4] overflow-hidden bg-[#17120e]">
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-contain p-4 transition duration-700 motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]"
        />
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted">{item.years}</p>
      <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em]">{item.title}</h2>
      <p className="mt-4 leading-7 text-muted">{item.description}</p>
    </Link>
  );
}

export function SeriesGrid({ items }: SeriesGridProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {items.map((item) => (
        <SeriesCard key={item.slug} item={item} />
      ))}
    </div>
  );
}
