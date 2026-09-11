import { About } from "@/components/sections/about";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { InvestmentValue } from "@/components/sections/investment-value";
import { Location } from "@/components/sections/location";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { ProjectAmenities } from "@/components/sections/project-amenities";
import { ProjectPlan } from "@/components/sections/project-plan";
import { Testimonials } from "@/components/sections/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectPlan />
      <InvestmentValue />
      <ProjectAmenities />
      <MarqueeBand />
      <Testimonials />
      <About />
      <Location />
      <ClosingCta />
      <Contact />
    </>
  );
}
