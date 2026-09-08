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
      className="relative overflow-hidden border-y border-black/5 bg-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-8 lg:flex-row lg:items-center lg:gap-12 lg:px-10 lg:py-9">
        <div className="shrink-0">
          <p className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-dark">
            Trayectoria
          </p>
          <p className="mt-2 max-w-[11rem] font-display text-sm font-medium leading-snug text-ink/75">
            Proyectos realizados por {company.name}
          </p>
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-16" />

          <ul className="animate-marquee-pause flex w-max items-center gap-12 sm:gap-16">
            {track.map((item, index) => (
              <li
                key={`${item.name}-${index}`}
                className="flex shrink-0 items-center opacity-75 transition-opacity duration-300 hover:opacity-100"
                aria-hidden={item.duplicate}
              >
                <Image
                  src={item.logo}
                  alt={item.duplicate ? "" : `${item.name}, ${item.type}`}
                  width={item.width}
                  height={item.height}
                  className="h-auto max-h-8 w-auto max-w-[7rem] object-contain sm:max-h-10 sm:max-w-[9rem]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
