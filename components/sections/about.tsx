import { ProjectImage } from "@/components/ui/project-image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/lib/content";

export function About() {
  return (
    <section id="nosotros" className="section-py mesh-surface">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-lg sm:aspect-[3/4]">
                <ProjectImage
                  src="/projects/algarrobo/alameda.png"
                  alt="Alameda arborizada dentro del condominio Finca Algarrobo"
                  fill
                  tier="featured"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>

              <div className="absolute -right-4 -bottom-4 hidden w-[38%] overflow-hidden rounded-lg border-[6px] border-surface sm:block">
                <div className="relative aspect-[4/3]">
                  <ProjectImage
                    src="/projects/algarrobo/pileta.png"
                    alt="Pileta ornamental del parque central"
                    fill
                    tier="gallery"
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              index="01"
              eyebrow={about.eyebrow}
              title={about.title}
            />

            <div className="mt-12 border-t border-ink/10">
              {about.stories.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.07}>
                  <article className="group grid grid-cols-[2.25rem_1fr] gap-x-4 border-b border-ink/10 py-6 transition-colors duration-300 hover:bg-white/60">
                    <span className="font-display text-sm font-bold tabular-nums text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
