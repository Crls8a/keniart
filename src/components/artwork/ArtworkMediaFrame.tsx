import type { ReactNode } from "react";
import type { ArtworkImageAsset } from "@/types/artwork";

type ArtworkMediaFrameSize = "card" | "hero" | "detail" | "thumbnail";

type ArtworkMediaFrameProps = {
  children: ReactNode;
  className?: string;
  image?: Pick<ArtworkImageAsset, "orientation">;
  size?: ArtworkMediaFrameSize;
};

const sizeClassNames: Record<ArtworkMediaFrameSize, string> = {
  card: "aspect-[4/5]",
  hero: "min-h-[70vh]",
  detail: "aspect-[4/5] min-w-full sm:aspect-[5/6] lg:aspect-[4/5]",
  thumbnail: "h-20 w-20 shrink-0",
};

const orientationPaddingClassNames: Record<ArtworkImageAsset["orientation"], string> = {
  landscape: "[&>picture>img]:p-3 sm:[&>picture>img]:p-6",
  portrait: "[&>picture>img]:p-2 sm:[&>picture>img]:p-4",
  square: "[&>picture>img]:p-2 sm:[&>picture>img]:p-5",
};

export function ArtworkMediaFrame({ children, className = "", image, size = "card" }: ArtworkMediaFrameProps) {
  const orientationClassName = image ? orientationPaddingClassNames[image.orientation] : "";

  return (
    <div
      className={`relative overflow-hidden bg-[#17120e] ${sizeClassNames[size]} ${orientationClassName} ${className}`}
    >
      {children}
    </div>
  );
}
