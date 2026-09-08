import { Container } from "@/components/ui/container";
import { ProjectImage } from "@/components/ui/project-image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [featured, ...rest] = testimonials.items;

  return (
    <section
      id="reseñas"
      aria-label="Reseñas de clientes de Grupo DLC"
      className="section-py relative overflow-hidden text-white panel-warm"
    >
      <div
        className="pointer-events-none absolute -left-24 top-1/3 size-[28rem] rounded-full bg-brand/10 blur-[120px]"
        aria-hidden
      />

      <Container className="relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeading
            index="04"
            eyebrow={testimonials.eyebrow}
            title={testimonials.title}
            description={testimonials.description}
            tone="dark"
            className="lg:max-w-xl"
          />
          <Reveal delay={0.12} className="hidden lg:block lg:pb-2">
            <p className="max-w-[14rem] text-right font-display text-[11px] font-medium uppercase leading-relaxed tracking-[0.18em] text-white/35">
              Experiencias reales
              <br />
              con Grupo DLC
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          {featured ? (
            <Reveal className="lg:col-span-7">
              <article className="group relative overflow-hidden rounded-[1.5rem] ring-1 ring-white/10">
                <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] xl:min-h-[36rem]">
                  <ProjectImage
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    tier="featured"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_100%,rgba(253,185,12,0.18),transparent_55%)]" />

                  <div className="absolute inset-x-0 bottom-0 flex flex-col p-6 sm:p-8 lg:p-10">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="font-display text-[11px] font-semibold tabular-nums tracking-[0.16em] text-brand">
                        01
                      </span>
                      <span className="h-px w-8 bg-brand/60" aria-hidden />
                      <span className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                        {featured.role}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {featured.name}
                    </h3>

                    <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-white/70 sm:text-base">
                      “{featured.quote}”
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ) : null}

          <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-6">
            {rest.map((item, index) => (
              <Reveal key={item.image} delay={0.1 + index * 0.08} className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full overflow-hidden rounded-[1.35rem] ring-1 ring-white/10",
                    "bg-white/[0.03] transition-all duration-500 hover:bg-white/[0.05] hover:ring-white/18"
                  )}
                >
                  <div className="relative w-[42%] shrink-0 overflow-hidden sm:w-[38%]">
                    <ProjectImage
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      tier="gallery"
                      sizes="(max-width: 1024px) 40vw, 20vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0908]/40" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
                    <div>
                      <div className="mb-3 flex items-center gap-2.5">
                        <span className="font-display text-[11px] font-semibold tabular-nums tracking-[0.14em] text-brand/90">
                          {String(index + 2).padStart(2, "0")}
                        </span>
                        <span className="h-px w-5 bg-brand/50" aria-hidden />
                        <span className="font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                          {item.role}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
                        {item.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/55">
                        “{item.quote}”
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
