import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Sin dominio real configurado se trata como entorno no productivo:
  // bloquear evita que un preview compita con el sitio en el índice.
  const isIndexable = !siteConfig.url.includes("localhost");

  if (!isIndexable) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
