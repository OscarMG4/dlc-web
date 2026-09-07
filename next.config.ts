import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Tamaños que pide el layout; Next no escala por encima del archivo original.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [128, 256, 384, 512, 640, 768, 1024],
  },
};

export default nextConfig;
