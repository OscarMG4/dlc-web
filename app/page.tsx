import { About } from "@/components/sections/about";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { InvestmentValue } from "@/components/sections/investment-value";
import { Location } from "@/components/sections/location";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { ProjectAmenities } from "@/components/sections/project-amenities";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectAmenities />
      <MarqueeBand />
      <About />
      <InvestmentValue />
      <Location />
      <ClosingCta />
      <Contact />
    </>
  );
}
