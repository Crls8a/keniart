export const siteConfig = {
  name: "Keniart",
  url: "https://keniart.example",
  description:
    "Portafolio de arte contemporaneo con catalogo, series, dossier y consulta directa de obra.",
};

export function pageTitle(title: string) {
  return `${title} | ${siteConfig.name}`;
}
