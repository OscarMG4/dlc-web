import Image, { type ImageProps } from "next/image";

// Con `output: 'export'` no hay optimizador de Next; thumbs sí bajan calidad.
const QUALITY = {
  hero: 100,
  featured: 100,
  gallery: 100,
  thumb: 85,
} as const;

type ProjectImageProps = Omit<ImageProps, "quality"> & {
  tier?: keyof typeof QUALITY;
  quality?: number;
  unoptimized?: boolean;
};

export function ProjectImage({
  tier = "featured",
  quality,
  alt,
  unoptimized,
  ...props
}: ProjectImageProps) {
  const serveOriginal = unoptimized ?? tier !== "thumb";

  return (
    <Image
      alt={alt}
      unoptimized={serveOriginal}
      quality={quality ?? QUALITY[tier]}
      {...props}
    />
  );
}

export { QUALITY as imageQuality };
