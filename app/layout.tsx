import type { Metadata, Viewport } from "next";
import { Jost, Manrope } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageIntro } from "@/components/ui/page-intro";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ContactFormProvider } from "@/components/widgets/contact-form-provider";
import { WhatsAppProvider } from "@/components/widgets/whatsapp-provider";
import { organizationSchema, projectSchema, websiteSchema, webPageSchema, faqSchema } from "@/lib/schema";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  category: "real estate",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl("/opengraph-image.png"),
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl("/opengraph-image.png")],
    ...(siteConfig.twitterHandle
      ? {
          site: siteConfig.twitterHandle,
          creator: siteConfig.twitterHandle,
        }
      : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteConfig.lang} className={`${jost.variable} ${manrope.variable}`}>
      <body className="min-h-svh antialiased">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <SmoothScroll>
          <WhatsAppProvider>
            <ContactFormProvider>
              <PageIntro />
              <SiteHeader />
              <main className="pb-[5.5rem] sm:pb-28 lg:pb-0">{children}</main>
              <SiteFooter />
            </ContactFormProvider>
          </WhatsAppProvider>
        </SmoothScroll>
        <JsonLd
          schema={[
            organizationSchema(),
            websiteSchema(),
            webPageSchema(),
            projectSchema(),
            faqSchema(),
          ]}
        />
      </body>
    </html>
  );
}
