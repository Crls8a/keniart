import type { Artwork } from "@/types/artwork";

const priceFormatters: Record<NonNullable<Artwork["price"]>["currency"], Intl.NumberFormat> = {
  EUR: new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }),
  MXN: new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }),
  USD: new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }),
};

export function formatDimensions(dimensions: Artwork["dimensions"]) {
  const depth = dimensions.depthCm ? ` x ${dimensions.depthCm}` : "";
  return `${dimensions.heightCm} x ${dimensions.widthCm}${depth} cm`;
}

export function formatPrice(price: Artwork["price"]) {
  if (!price || price.visibility !== "public") return "Precio a consulta";

  return priceFormatters[price.currency].format(price.amount);
}
