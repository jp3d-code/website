import { Crosshair, Eye } from "lucide-react";
import { Container, Section } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

export function VisionMissionSection() {
  return (
    <Section>
      <Container className="grid grid-cols-1 md:grid-cols-2">
        <div
          id={routes.marca.sections.mision.hash}
          className="relative flex flex-col border-border/40 border-r border-b p-10 md:border-b-0"
        >
          <span className="mb-8 text-right font-mono text-muted-foreground text-xs tracking-widest">
            01 / OBJ
          </span>
          <div className="mb-6 flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center border-2 border-primary">
              <Crosshair className="size-6 text-primary" />
            </div>
            <h2 className="font-bold text-2xl uppercase tracking-widest md:text-3xl">
              Misión
            </h2>
          </div>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Transformar ideas en soluciones tangibles mediante la combinación de
            ingeniería de precisión, fabricación digital y programas formativos
            que empoderan a la próxima generación de innovadores.
          </p>
          <blockquote className="border-primary/60 border-l-2 pl-4 text-sm italic leading-relaxed">
            Integraremos diseño, simulación y producción bajo demanda en un
            flujo 100% digital, reduciendo tiempos de desarrollo y elevando el
            estándar de calidad para nuestros clientes.
          </blockquote>
          <Crosshair className="absolute right-6 bottom-6 size-24 -rotate-12 text-primary/5" />
        </div>

        <div
          id={routes.marca.sections.vision.hash}
          className="relative flex flex-col border-border/40 border-b p-10 md:border-b-0 md:border-l-0"
        >
          <span className="mb-8 text-right font-mono text-muted-foreground text-xs tracking-widest">
            02 / DEST
          </span>
          <div className="mb-6 flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center border-2 border-primary">
              <Eye className="size-6 text-primary" />
            </div>
            <h2 className="font-bold text-2xl uppercase tracking-widest md:text-3xl">
              Visión
            </h2>
          </div>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Ser referentes latinoamericanos en innovación 3D, liderando la
            transición hacia fábricas inteligentes y ecosistemas educativos
            orientados a la manufactura avanzada.
          </p>
          <blockquote className="border-primary/60 border-l-2 pl-4 text-sm italic leading-relaxed">
            Aspiramos a expandir nuestra presencia en minería, energía y salud,
            acelerando la adopción de tecnologías aditivas y fortaleciendo la
            competitividad regional.
          </blockquote>
          <Eye className="absolute right-6 bottom-6 size-24 -rotate-12 text-primary/5" />
        </div>
      </Container>
    </Section>
  );
}
