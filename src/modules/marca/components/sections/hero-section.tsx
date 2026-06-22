import { Container, Section } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

export function HeroSection() {
  return (
    <Section id={routes.marca.sections.intro.hash} className="bg-card">
      <Container className="flex w-full flex-col items-start justify-center justify-items-center gap-6">
        <p className="text-muted-foreground text-xs uppercase tracking-[0.35em]">
          Conoce quienes somos
        </p>
        <h1 className="w-full max-w-md font-medium text-3xl uppercase tracking-widest md:text-6xl">
          Lideres en fabricación <span className="text-primary">digital</span> y{" "}
          <span className="text-primary">3D</span>
        </h1>
        <p className="w-full max-w-xl text-lg text-muted-foreground">
          JP 3D nace con la convicción de fusionar ingeniería, fabricación
          digital y formación STEM para convertir las ideas más ambiciosas en
          soluciones tangibles que impulsen la competitividad de nuestros
          clientes.
        </p>
      </Container>
    </Section>
  );
}
