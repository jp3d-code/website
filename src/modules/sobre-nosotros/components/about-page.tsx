import configPromise from "@payload-config";
import Link from "next/link";
import { getPayload } from "payload";

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

const staticItems = [
  {
    title: "Nuestro Equipo",
    image:
      "https://jp3doficial.com/editar/imagenes/sobre-nosotros/equipo_jp3d.png",
    video: undefined,
    excerpt:
      "JP 3D está formado por ingenieros, diseñadores y educadores que unen experiencia y pasión por la fabricación digital. Trabajamos de manera colaborativa, usando impresión 3D y simulación para validar ideas en tiempo récord.",
    content: [
      "El resultado: proyectos que cumplen normas internacionales y crean valor tangible para nuestros clientes.",
    ],
  },
  {
    title: "Nuestra Historia",
    image:
      "https://jp3doficial.com/editar/imagenes/sobre-nosotros/historia_jp3d.png",
    video: undefined,
    excerpt:
      "Comenzamos en 2018 como un laboratorio de prototipado rápido con enfoque educativo y hoy aspiramos a liderar la adopción de tecnologías 3D en Latinoamérica.",
    content: [
      "2018 — Comenzamos como un laboratorio de prototipado rápido con enfoque educativo.",
      "2020 — Expandimos servicios de ingeniería y fabricación digital para minería y energía.",
      "Hoy — Aspiramos a liderar la adopción de tecnologías 3D en Latinoamérica, impulsando innovación sostenible.",
    ],
  },
];

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise });
  const { docs: videos } = await payload.find({
    collection: "videos",
    sort: "order",
  });

  const videoItems = videos.map((video) => ({
    title: video.title,
    video: video.url,
    image: undefined,
    excerpt: video.excerpt,
    content: video.content.map((p) => p.text),
  }));

  const items = [...staticItems, ...videoItems];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-10">
          {items.map((item) => {
            return (
              <section key={item.title} className="space-y-4">
                <h2 className="font-semibold text-xl">{item.title}</h2>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-56 w-full rounded-3xl object-cover"
                  />
                )}
                {item.video ? (
                  <Link
                    href={item.video}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/30 px-4 py-2 text-xs uppercase tracking-[0.2em]"
                  >
                    Ver video
                  </Link>
                ) : null}
                <div className="space-y-3 text-muted-foreground text-sm">
                  <p>{item.excerpt}</p>
                  {item.content.map((text, index) => (
                    <p key={`${item.title}-${index}`}>{text}</p>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
        <aside className="space-y-6 rounded-3xl border border-border/60 bg-muted/30 p-6">
          <h3 className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
            Sobre nosotros
          </h3>
          <div className="space-y-3 text-muted-foreground text-sm">
            <p>{pageDescription}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background p-5">
            <blockquote className="text-foreground text-sm">
              {testimonial.quote}
            </blockquote>
            <div className="mt-4 text-muted-foreground text-xs uppercase tracking-[0.3em]">
              {testimonial.name}
            </div>
            <p className="text-muted-foreground text-xs">{testimonial.role}</p>
            <p className="mt-2 text-muted-foreground text-xs">
              {testimonial.phone}
            </p>
            <p className="text-muted-foreground text-xs">{testimonial.email}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
