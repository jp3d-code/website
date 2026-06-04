import { Container, Section } from "@/shared/components/ui/section";

export function Us() {
  return (
    <Section className="bg-card">
      <Container className="grid items-center justify-items-center gap-10">
        <h2 className="flex flex-col items-center font-medium text-2xl uppercase tracking-widest md:text-7xl">
          <span>Nosotros somos</span>
          <span>jp3d</span>
        </h2>
        <p>
          JP 3D nace con la convicción de fusionar ingeniería, fabricación
          digital y formación STEM para convertir las ideas más ambiciosas en
          soluciones tangibles que impulsen la competitividad de nuestros
          clientes.
        </p>
      </Container>
    </Section>
  );
}
