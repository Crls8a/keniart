import { artist } from "@/data/artist";

export const mainNavigation = [
  { label: "Obras", href: "/obras" },
  { label: "Series", href: "/series" },
  { label: "Galerías", href: "/galerias" },
  { label: "Artista", href: "/artista" },
  { label: "Contacto", href: "/contacto" },
];

export const footerNavigation = [
  { label: "Consultas", href: "/contacto" },
  { label: "Para galerías", href: "/galerias" },
];

export const footerSocialLinks = [
  { label: "Instagram", href: artist.instagram, icon: "instagram" },
  { label: "WhatsApp", href: `https://wa.me/${artist.whatsapp}`, icon: "whatsapp" },
] as const;

export const footerContent = {
  tagline: "Keniart - Portafolio de arte contemporáneo",
  socialLabel: "Redes y contacto directo",
} as const;

export const headerContent = {
  dossierCta: "Dossier",
  menuLabel: "Menú",
  closeMenuLabel: "Cerrar",
  desktopNavigationLabel: "Navegación principal",
  mobileNavigationLabel: "Navegación móvil",
} as const;
