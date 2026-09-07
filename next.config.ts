import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El sitio se sirve como HTML estático desde Apache (cPanel), sin runtime de Node.
  output: "export",
  images: {
    // Sin servidor no hay optimizador: las imágenes se sirven tal cual están
    // en public/, ya convertidas a WebP en su resolución final.
    unoptimized: true,
  },
};

export default nextConfig;
