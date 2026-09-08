import { ProjectImage } from "@/components/ui/project-image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/lib/content";

export function About() {
  return (
    <section id="nosotros" className="section-py relative overflow-hidden mesh-surface">
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-elevated ring-1 ring-black/5 sm:aspect-[3/4]">
                <ProjectImage
                  src="/projects/algarrobo/alameda.webp"
                  alt="Alameda arborizada dentro del condominio Finca Algarrobo"
                  fill
                  tier="featured"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>

              <div className="absolute -right-3 -bottom-3 hidden w-[38%] overflow-hidden rounded-xl shadow-elevated ring-4 ring-[#f7f5f0] sm:block sm:-right-4 sm:-bottom-4">
                <div className="relative aspect-[4/3]">
                  <ProjectImage
                    src="/projects/algarrobo/pileta.webp"
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
              index="03"
              eyebrow={about.eyebrow}
              title={about.title}
              description="Construimos hogares, rentabilidad y patrimonio en el norte del Perú."
            />

            <div className="mt-8 space-y-1 sm:mt-10">
              {about.stories.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.1}>
                  <article className="group grid grid-cols-[2rem_1fr] gap-x-4 rounded-xl px-2 py-5 transition-colors duration-300 hover:bg-white/70">
                    <span className="font-display text-sm font-bold tabular-nums text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
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
