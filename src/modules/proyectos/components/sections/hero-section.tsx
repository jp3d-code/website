import { Container, Section } from "@/shared/components/ui/section";

export function HeroSection() {
  return (
    <Section className="bg-card">
      <Container className="flex w-full flex-col items-start justify-center justify-items-center gap-6">
        <p className="text-muted-foreground text-xs uppercase tracking-[0.35em]">
          Conoce nuestros proyectos en
        </p>
        <h1 className="w-full max-w-lg font-medium text-3xl uppercase tracking-widest md:text-6xl">
          ingeniería, diseño y fabricación{" "}
          <span className="text-primary">digital</span>
        </h1>
        <p className="w-full max-w-xl text-lg text-muted-foreground">
          Cada proyecto que desarrollamos demuestra que la imaginación,
          respaldada por ingeniería de precisión y fabricación digital, se
          convierte en valor tangible para nuestros clientes.
        </p>
      </Container>
    </Section>
  );
}
