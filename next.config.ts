import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export para cPanel/Apache (sin Node en prod).
  output: "export",
  images: {
    // Sin runtime de Next Image: servir WebP de public/ tal cual.
    unoptimized: true,
  },
};

export default nextConfig;
