import { artist } from "@/data/artist";

const fallbackSiteUrl = "http://localhost:3800";

function normalizeSiteUrl(value: string | undefined) {
  if (!value) {
    return fallbackSiteUrl;
  }

  const withProtocol = value.startsWith("http") ? value : `https://${value}`;

  try {
    const url = new URL(withProtocol);
    return url.origin;
  } catch {
    return fallbackSiteUrl;
  }
}

export const siteConfig = {
  name: "Keniart",
  url: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL,
  ),
  locale: "es_MX",
  description:
    "Portafolio de arte contemporáneo con catálogo, series, dossier y consulta directa de obra.",
  openGraphDescription:
    "Obra disponible, series curatoriales y dossier profesional para galerías.",
  contact: {
    whatsapp: artist.whatsapp,
    whatsappDisplay: artist.whatsappDisplay,
    instagram: artist.instagram,
  },
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
