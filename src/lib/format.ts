import type { Artwork } from "@/types/artwork";

export function formatDimensions(dimensions: Artwork["dimensions"]) {
  const depth = dimensions.depthCm ? ` x ${dimensions.depthCm}` : "";
  return `${dimensions.heightCm} x ${dimensions.widthCm}${depth} cm`;
}

export function formatPrice(price: Artwork["price"]) {
  if (!price || price.visibility !== "public") return "Precio a consulta";

  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: price.currency,
    maximumFractionDigits: 0,
  }).format(price.amount);
}
