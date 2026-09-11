import { StarIcon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { ProjectImage } from "@/components/ui/project-image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

function Stars({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      aria-label={`${rating} de 5 estrellas`}
    >
      {Array.from({ length: rating }, (_, index) => (
        <StarIcon key={index} className="size-4 text-brand sm:size-5" />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [featured, ...rest] = testimonials.items;

  return (
    <section
      id="reseñas"
      aria-label="Reseñas de clientes de Grupo DLC"
      className="section-py relative overflow-hidden text-white panel-warm"
    >
      <div
        className="pointer-events-none absolute -right-24 top-10 size-[26rem] rounded-full bg-brand/[0.08] blur-[110px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 size-[20rem] rounded-full bg-brand/[0.05] blur-[100px]"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12">
          <SectionHeading
            index="05"
            eyebrow={testimonials.eyebrow}
            title={testimonials.title}
            description={testimonials.description}
            tone="dark"
          />

          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-4 rounded-[1.5rem] border border-brand/25 bg-gradient-to-br from-brand/15 via-brand/[0.04] to-transparent px-5 py-5 sm:gap-6 sm:px-7 sm:py-6">
              <div>
                <p className="font-display text-5xl font-semibold tracking-tight text-brand sm:text-6xl">
                  5.0
                </p>
                <Stars rating={5} className="mt-2" />
              </div>
              <div className="min-w-0 flex-1 border-l border-white/10 pl-4 sm:pl-6">
                <p className="font-display text-base font-semibold text-white sm:text-lg">
                  Valoración de clientes
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/45 sm:text-[0.95rem]">
                  Experiencias reales en visita, recorrido y cierre con Grupo
                  DLC.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {featured ? (
          <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-12 lg:gap-7">
            <Reveal className="lg:col-span-7">
              <article className="group relative overflow-hidden rounded-[1.75rem] ring-1 ring-white/10">
                <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[40rem] xl:min-h-[44rem]">
                  <ProjectImage
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    tier="featured"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_20%_100%,rgba(253,185,12,0.18),transparent_55%)]" />

                  <div className="absolute inset-x-0 bottom-0 flex flex-col p-6 sm:p-9 lg:p-11">
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-brand px-3.5 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                        Destacada
                      </span>
                      <Stars rating={featured.rating} />
                    </div>

                    <p className="max-w-xl font-display text-2xl font-medium leading-snug tracking-tight text-white sm:text-[1.75rem] lg:text-[1.9rem]">
                      “{featured.quote}”
                    </p>

                    <div className="mt-7 flex items-center gap-3.5 border-t border-white/15 pt-6">
                      <span className="flex size-11 items-center justify-center rounded-full bg-brand/20 font-display text-base font-bold text-brand">
                        {featured.name.charAt(0)}
                      </span>
                      <div>
                        <p className="font-display text-lg font-semibold text-white">
                          {featured.name}
                        </p>
                        <p className="text-sm text-white/45">{featured.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>

            <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-7">
              {rest.map((item, index) => (
                <Reveal
                  key={item.image}
                  delay={0.1 + index * 0.08}
                  className="h-full"
                >
                  <article className="group flex h-full min-h-[16rem] overflow-hidden rounded-[1.5rem] bg-white text-ink shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:-translate-y-1 sm:min-h-[18rem]">
                    <div className="relative w-[40%] shrink-0 overflow-hidden sm:w-[42%]">
                      <ProjectImage
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        tier="gallery"
                        sizes="(max-width: 1024px) 40vw, 18vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-7">
                      <div>
                        <Stars rating={item.rating} />
                        <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-500 sm:text-base">
                          “{item.quote}”
                        </p>
                      </div>
                      <div className="border-t border-ink/8 pt-4">
                        <p className="font-display text-base font-semibold text-ink">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-sm text-ink-500">{item.role}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
