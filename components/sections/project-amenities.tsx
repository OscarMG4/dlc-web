import { AmenitiesGallery } from "@/components/sections/amenities-gallery";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProjectAmenities() {
  return (
    <section
      id="areas-comunes"
      aria-label="Áreas comunes de Finca Algarrobo"
      className="section-py relative overflow-hidden text-white panel-warm"
    >
      <Container className="relative">
        <SectionHeading
          index="04"
          eyebrow="Áreas comunes"
          title="Así se vive Finca Algarrobo"
          description="Parque, deporte y descanso ya ejecutados. Recorre cada espacio como en una galería."
          tone="dark"
        />

        <div className="mt-10 sm:mt-12">
          <AmenitiesGallery />
        </div>
      </Container>
    </section>
  );
}
