import { Container, Section } from "@/shared/components/ui/section";

export function Hero() {
  return (
    <Section className="bg-card">
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <div className="flex w-full flex-col items-start gap-6">
          <p className="text-muted-foreground text-xs uppercase tracking-[0.35em]">
            Conoce nuestros servicios en
          </p>
          <h1 className="w-full max-w-lg font-medium text-3xl uppercase tracking-widest md:text-6xl">
            ingeniería, diseño y{" "}
            <span className="text-primary">fabricación digital</span>
          </h1>
          <p className="w-full max-w-xl text-lg text-muted-foreground">
            Soluciones integrales en modelado 3D, impresión 3D, memorias de
            cálculo y capacitación STEM para llevar tus ideas desde el concepto
            hasta la pieza final.
          </p>
        </div>
        <div className="relative w-full">
          {/*<div className="aspect-[4/3] w-full rounded-lg border border-border/60 bg-muted" />*/}
        </div>
      </Container>
    </Section>
  );
}
