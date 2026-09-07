import { About } from "@/components/sections/about";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Contact } from "@/components/sections/contact";
import { FeaturedProject } from "@/components/sections/featured-project";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { InvestmentValue } from "@/components/sections/investment-value";
import { Location } from "@/components/sections/location";
import { MarqueeBand } from "@/components/sections/marquee-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <About />
      <InvestmentValue />
      <FeaturedProject />
      <Gallery />
      <Location />
      <ClosingCta />
      <Contact />
    </>
  );
}
