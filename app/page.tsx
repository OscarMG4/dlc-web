import { About } from "@/components/sections/about";
import { ClosingCta } from "@/components/sections/closing-cta";
import { CompletedPlan } from "@/components/sections/completed-plan";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { InvestmentValue } from "@/components/sections/investment-value";
import { Location } from "@/components/sections/location";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { ProjectAmenities } from "@/components/sections/project-amenities";
import { ProjectPlan } from "@/components/sections/project-plan";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectPlan />
      <ProjectAmenities />
      <MarqueeBand />
      <CompletedPlan />
      <About />
      <InvestmentValue />
      <Location />
      <ClosingCta />
      <Contact />
    </>
  );
}
