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
      className="relative overflow-hidden border-y border-black/5 bg-[#faf8f3]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 sm:px-8 lg:flex-row lg:items-center lg:gap-10 lg:px-10">
        <div className="shrink-0 border-l-2 border-brand/70 pl-3.5">
          <p className="font-display text-[11px] font-semibold uppercase leading-[1.45] tracking-[0.16em] text-ink/80">
            Proyectos realizados
            <br />
            por {company.name}
          </p>
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#faf8f3] to-transparent sm:w-14" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#faf8f3] to-transparent sm:w-14" />

          <ul className="animate-marquee-pause flex w-max items-center gap-10 sm:gap-14">
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
                  className="h-auto max-h-8 w-auto max-w-[7rem] object-contain sm:max-h-11 sm:max-w-[9.5rem]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
