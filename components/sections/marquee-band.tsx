import Image from "next/image";
import { company, completedProjects } from "@/lib/content";

export function MarqueeBand() {
  const track = [
    ...completedProjects.map((item) => ({ ...item, duplicate: false })),
    ...completedProjects.map((item) => ({ ...item, duplicate: true })),
  ];

  return (
    <section
      aria-label={`Proyectos realizados por ${company.name}`}
      className="relative overflow-hidden border-y border-ink/[0.06] mesh-surface"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
        aria-hidden
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 py-9 sm:px-8 lg:flex-row lg:items-center lg:gap-14 lg:px-10 lg:py-10">
        <div className="shrink-0">
          <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-dark">
            Trayectoria
          </p>
          <p className="mt-2.5 max-w-[12rem] font-display text-[0.95rem] font-semibold leading-snug tracking-tight text-ink">
            Proyectos realizados por {company.name}
          </p>
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f4f2ed] to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#efece6] to-transparent sm:w-20" />

          <ul className="animate-marquee-pause flex w-max items-center gap-14 sm:gap-20">
            {track.map((item, index) => (
              <li
                key={`${item.name}-${index}`}
                className="flex shrink-0 items-center opacity-70 transition-opacity duration-300 hover:opacity-100"
                aria-hidden={item.duplicate}
              >
                <Image
                  src={item.logo}
                  alt={item.duplicate ? "" : `${item.name}, ${item.type}`}
                  width={item.width}
                  height={item.height}
                  className="h-auto max-h-9 w-auto max-w-[7.5rem] object-contain sm:max-h-11 sm:max-w-[9.5rem]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
