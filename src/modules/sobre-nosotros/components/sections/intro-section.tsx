import {
  Container,
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/shared/components/ui/section";

const pageDescription =
  "En Sobre Nosotros compartimos la esencia de JP3D: un equipo que combina ingeniería, diseño y fabricación digital para dar vida a ideas que impulsan a la industria peruana. Creemos que la mejor manera de innovar es crear-haciendo, validando conceptos con prototipos funcionales y datos medibles. Nuestra cultura se sustenta en la colaboración multidisciplinaria, aprendizaje continuo y responsabilidad social. Cada proyecto que emprendemos busca generar valor económico y, al mismo tiempo, inspirar a la comunidad a adoptar tecnologías 3D como motor de desarrollo sostenible.";

const testimonial = {
  name: "Janio Oliver Quispe Ticona",
  role: "CEO JP3D",
  phone: "+51 951 890 330",
  email: "oficina@jp3doficial.com",
  quote:
    "La fuerza de JP 3D reside en su gente: profesionales apasionados que transforman desafíos técnicos en soluciones reales y elevan el estándar de innovación en Latinoamérica.",
};

export function IntroSection() {
  return (
    <Section className="pt-24 lg:pt-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="flex flex-col justify-center space-y-8">
            <SectionHeader className="items-start text-left">
              <SectionTitle
                first="Nuestra"
                second="Esencia"
                className="justify-start"
              />
              <SectionDescription className="max-w-full text-left">
                {pageDescription}
              </SectionDescription>
            </SectionHeader>
          </div>

          <div className="flex h-full flex-col justify-center">
            <div className="relative rounded-3xl bg-primary/5 p-8 sm:p-10">
              <div className="mb-6 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    role="img"
                    aria-label="Star"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mb-8 font-medium text-foreground text-lg leading-relaxed sm:text-xl">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 font-bold text-primary">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
