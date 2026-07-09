import type { Metadata } from "next";
import { artist } from "@/data/artist";

const developmentSiteUrl = "http://localhost:3800";

function isPrivateHostname(hostname: string) {
  const normalizedHostname = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  const privateIpv4Prefix = /^(?:0\.|127\.|10\.|192\.168\.|169\.254\.)/;
  const private172Match = normalizedHostname.match(/^172\.(\d{1,3})\./);

  return (
    normalizedHostname === "localhost" ||
    normalizedHostname === "::" ||
    normalizedHostname === "::1" ||
    normalizedHostname.endsWith(".localhost") ||
    normalizedHostname.endsWith(".local") ||
    normalizedHostname.endsWith(".internal") ||
    (!normalizedHostname.includes(".") && !normalizedHostname.includes(":")) ||
    privateIpv4Prefix.test(normalizedHostname) ||
    (private172Match !== null && Number(private172Match[1]) >= 16 && Number(private172Match[1]) <= 31) ||
    /^(?:fc|fd|fe[89ab])/.test(normalizedHostname)
  );
}

export function resolveSiteUrl(value: string | undefined, environment = process.env.NODE_ENV) {
  if (!value) {
    if (environment === "production") {
      throw new Error(
        "A production site URL is required. Set NEXT_PUBLIC_SITE_URL or VERCEL_PROJECT_PRODUCTION_URL.",
      );
    }

    return developmentSiteUrl;
  }

  const withProtocol = value.startsWith("http") ? value : `https://${value}`;
  let url: URL;

  try {
    url = new URL(withProtocol);
  } catch {
    if (environment === "production") {
      throw new Error(`Invalid production site URL: ${value}`);
    }

    return developmentSiteUrl;
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    if (environment === "production") throw new Error(`Invalid production site URL protocol: ${value}`);
    return developmentSiteUrl;
  }

  if (environment === "production" && url.protocol !== "https:") {
    throw new Error(`Production site URL must use HTTPS: ${value}`);
  }

  if (environment === "production" && isPrivateHostname(url.hostname)) {
    throw new Error(`Production site URL cannot use a local or private host: ${value}`);
  }

  return url.origin;
}

export const siteConfig = {
  name: "Keniart",
  url: resolveSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL,
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

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  openGraphTitle?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt = title,
  openGraphTitle = `${title} | ${siteConfig.name}`,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image ? absoluteUrl(image) : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: openGraphTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      ...(imageUrl ? { images: [{ url: imageUrl, alt: imageAlt }] } : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: openGraphTitle,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
