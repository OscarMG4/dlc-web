const DEFAULT_URL = "http://localhost:3000";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) return DEFAULT_URL;

  const withProtocol = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;

  return withProtocol.replace(/\/$/, "");
}

export const siteConfig = {
  name: "Grupo DLC",
  title:
    "Grupo DLC | Terrenos desde 500 m² para casas de campo en Capote, Chiclayo",
  description:
    "Compra terrenos desde 500 m² para casas de campo en Finca Algarrobo, Capote – Chiclayo. Punto de agua, áreas comunes, minuta y escritura. Venta directa con Grupo DLC.",
  url: resolveSiteUrl(),
  locale: "es_PE",
  lang: "es-PE",
  keywords: [
    "Grupo DLC",
    "Finca Algarrobo",
    "terrenos en Capote",
    "lotes en Capote Chiclayo",
    "casa de campo Chiclayo",
    "terrenos desde 500 m2 Chiclayo",
    "lotes 500 m2 Chiclayo",
    "inmobiliaria Chiclayo",
    "lotes en Chiclayo",
    "terrenos en Lambayeque",
    "condominio campestre Chiclayo",
    "venta de lotes Capote",
  ],
  twitterHandle: "",
} as const;

export type SiteConfig = typeof siteConfig;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
