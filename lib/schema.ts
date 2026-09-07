import { company, localSeo, mapLinkUrl, project } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

function geoPoint(point: { latitude: number; longitude: number } | null) {
  if (!point) return {};

  return {
    geo: {
      "@type": "GeoCoordinates",
      latitude: point.latitude,
      longitude: point.longitude,
    },
  };
}

export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": absoluteUrl("/#organization"),
    name: company.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: company.email,
    telephone: company.phoneE164,
    logo: absoluteUrl("/brand/dlc-logo-black.png"),
    image: absoluteUrl("/projects/algarrobo/vista-aerea.webp"),
    areaServed: `${company.city}, ${company.region}, ${company.country}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: company.city,
      addressRegion: company.region,
      addressCountry: "PE",
    },
    ...geoPoint(localSeo.officeGeo),
    hasMap: mapLinkUrl,
    ...(localSeo.priceRange ? { priceRange: localSeo.priceRange } : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...localSeo.openingHours.days],
        opens: localSeo.openingHours.opens,
        closes: localSeo.openingHours.closes,
      },
    ],
    sameAs: [company.social.facebook, company.social.instagram],
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.lang,
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function projectSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Residence",
    "@id": absoluteUrl(`/#${project.slug}`),
    name: project.name,
    description: project.summary,
    url: absoluteUrl("/#proyecto"),
    image: absoluteUrl(project.cover),
    address: {
      "@type": "PostalAddress",
      addressLocality: company.city,
      addressRegion: company.region,
      addressCountry: "PE",
    },
    ...geoPoint(localSeo.projectGeo),
    amenityFeature: project.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity.title,
      value: true,
    })),
  };
}
