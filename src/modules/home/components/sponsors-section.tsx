import Link from "next/link";
import { Container, Section } from "@/shared/components/ui/section";

const sponsors = [
  {
    name: "UNAP",
    url: "https://portal.unap.edu.pe/",
    img: "https://jp3doficial.com/editar/imagenes/inicio/logo-UNAP.png",
    alt: "logo-UNAP",
  },
  {
    name: "UNAJ",
    url: "https://portal.unaj.edu.pe/",
    img: "https://jp3doficial.com/editar/imagenes/inicio/logo_UNAJ.png",
    alt: "logo-UNAJ",
  },
  {
    name: "SENATI",
    url: "https://www.senati.edu.pe/",
    img: "https://jp3doficial.com/editar/imagenes/inicio/logo senati.png",
    alt: "logo_senati",
  },
  {
    name: "UNI",
    url: "https://portal.uni.edu.pe/",
    img: "https://jp3doficial.com/editar/imagenes/inicio/logo_UNI1.png",
    alt: "logo_UNI",
  },
  {
    name: "EESPP Juliaca",
    url: "https://eesppjuliaca.edu.pe/",
    img: "https://jp3doficial.com/editar/imagenes/inicio/logo-juliaca1.png",
    alt: "logo-juliaca1",
  },
];

export function SponsorsSection() {
  return (
    <Section className="bg-card">
      <Container>
        <h2 className="w-full text-xl uppercase tracking-widest">Aliados</h2>
        <div className="flex flex-wrap items-center gap-6">
          {sponsors.map((sponsor) => {
            return (
              <Link
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                className="relative flex min-w-50 max-w-20 items-center justify-center"
              >
                <img
                  src={sponsor.img}
                  alt={sponsor.alt}
                  className="absolute inset-0 w-full blur-lg brightness-400"
                />
                <img
                  src={sponsor.img}
                  alt={sponsor.alt}
                  className="z-20 w-full"
                />
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
