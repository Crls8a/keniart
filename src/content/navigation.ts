import { artist } from "@/data/artist";
import { routes } from "@/lib/routes";

export const mainNavigation = [
  { label: "Obras", href: routes.obras.index },
  { label: "Series", href: routes.series.index },
  { label: "Galerías", href: routes.galleries },
  { label: "Artista", href: routes.artist },
  { label: "Contacto", href: routes.contact.index },
];

export const footerNavigation = [
  { label: "Consultas", href: routes.contact.index },
  { label: "Para galerías", href: routes.galleries },
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
