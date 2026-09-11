const DEFAULT_URL = "http://localhost:3000";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) return DEFAULT_URL;

  const withProtocol = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;

  return withProtocol.replace(/\/$/, "");
}

export const siteConfig = {
  name: "Grupo DLC",
  title: "Grupo DLC | Terrenos desde 500 m² para casas de campo en Chiclayo",
  description:
    "Terrenos desde 500 m² para casas de campo en Capote, Chiclayo. Más de 250 familias ya construyen su patrimonio con Grupo DLC en Finca Algarrobo.",
  url: resolveSiteUrl(),
  locale: "es_PE",
  lang: "es-PE",
  keywords: [
    "lotes en Chiclayo",
    "casa de campo Chiclayo",
    "terrenos desde 500 m2",
    "lotes 500 m2",
    "inmobiliaria Chiclayo",
    "Finca Algarrobo",
    "Grupo DLC",
    "terrenos en Lambayeque",
  ],
  twitterHandle: "",
} as const;

export type SiteConfig = typeof siteConfig;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
