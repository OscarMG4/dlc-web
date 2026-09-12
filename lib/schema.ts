import {
  company,
  faqs,
  localSeo,
  mapLinkUrl,
  project,
  projectLocation,
} from "@/lib/content";
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
    alternateName: ["DLC", "Grupo DLC Chiclayo"],
    url: siteConfig.url,
    description: siteConfig.description,
    email: company.email,
    telephone: company.phoneE164,
    logo: absoluteUrl("/brand/dlc-logo-black.png"),
    image: [
      absoluteUrl("/projects/algarrobo/vista-aerea.webp"),
      absoluteUrl("/brand/dlc-logo-black.png"),
    ],
    areaServed: [
      {
        "@type": "City",
        name: company.city,
      },
      {
        "@type": "AdministrativeArea",
        name: company.region,
      },
      {
        "@type": "Place",
        name: "Capote",
      },
    ],
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
    sameAs: [
      company.social.facebook,
      company.social.instagram,
      company.social.tiktok,
    ],
    knowsAbout: [
      "Terrenos para casas de campo",
      "Lotes en Capote Chiclayo",
      "Condominios campestres",
      "Finca Algarrobo",
    ],
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
    description: siteConfig.description,
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function webPageSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/#webpage"),
    url: siteConfig.url,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: siteConfig.lang,
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": absoluteUrl(`/#${project.slug}`) },
    primaryImageOfPage: absoluteUrl(project.cover),
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
    brand: {
      "@type": "Brand",
      name: company.name,
    },
    category: "Terrenos para casas de campo",
    address: {
      "@type": "PostalAddress",
      addressLocality: projectLocation.place,
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

export function faqSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": absoluteUrl("/#faq"),
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
