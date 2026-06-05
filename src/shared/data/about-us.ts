import type { AboutPage } from "../types/data";
import { images } from "./images";

export const aboutData: AboutPage = {
  items: [
    {
      title: "Nuestro Equipo",
      image: images.sobre_nosotros_equipo.name,
      excerpt:
        "JP 3D está formado por ingenieros, diseñadores y educadores que unen experiencia y pasión por la fabricación digital. Trabajamos de manera colaborativa, usando impresión 3D y simulación para validar ideas en tiempo récord.",
      content: [
        "El resultado: proyectos que cumplen normas internacionales y crean valor tangible para nuestros clientes.",
      ],
    },
    {
      title: "Nuestra Historia",
      image: images.sobre_nosotros_historia.name,
      excerpt:
        "Comenzamos en 2018 como un laboratorio de prototipado rápido con enfoque educativo y hoy aspiramos a liderar la adopción de tecnologías 3D en Latinoamérica.",
      content: [
        "2018 — Comenzamos como un laboratorio de prototipado rápido con enfoque educativo.",
        "2020 — Expandimos servicios de ingeniería y fabricación digital para minería y energía.",
        "Hoy — Aspiramos a liderar la adopción de tecnologías 3D en Latinoamérica, impulsando innovación sostenible.",
      ],
    },
    {
      title: "Innovación en Fabricación con Impresión 3D",
      video: "https://www.tiktok.com/@jp_3d_makers/video/7444650552417439032",
      excerpt:
        "La impresión 3D permite crear objetos personalizados utilizando materiales como plásticos, metal y resinas. Es útil en medicina, arquitectura e industria aeroespacial, reduciendo costos y tiempos de producción.",
      content: [
        "Fomenta la sostenibilidad al generar menos desperdicio y ofrece oportunidades educativas, creativas y de prototipado rápido, revolucionando la fabricación global.",
      ],
    },
    {
      title: "Decoraciones Navideñas con Corte Láser",
      video: "https://www.tiktok.com/@jp_3d_makers/video/7447658942441770245",
      excerpt:
        "Usa el corte láser para crear decoraciones navideñas personalizadas como adornos, tarjetas tridimensionales, centros de mesa, guirnaldas y más.",
      content: [
        "Estas ideas permiten darle a tu hogar un toque único y creativo durante la Navidad.",
      ],
    },
    {
      title: "Impresiones 3D Destacadas de Diciembre",
      video: "https://www.tiktok.com/@jp_3d_makers/video/7445877055603887365",
      excerpt:
        "Las mejores impresiones 3D de JP3D en diciembre incluyeron creaciones para la competencia de anime Omisoka, con figuras de personajes de anime de alto nivel de detalle.",
      content: [
        "Además de estas piezas, también se realizaron adornos navideños, prototipos industriales y modelos educativos, reflejando la versatilidad y creatividad de JP3D.",
      ],
    },
  ],
  description:
    "En Sobre Nosotros compartimos la esencia de JP3D: un equipo que combina ingeniería, diseño y fabricación digital para dar vida a ideas que impulsan a la industria peruana. Creemos que la mejor manera de innovar es crear-haciendo, validando conceptos con prototipos funcionales y datos medibles. Nuestra cultura se sustenta en la colaboración multidisciplinaria, aprendizaje continuo y responsabilidad social. Cada proyecto que emprendemos busca generar valor económico y, al mismo tiempo, inspirar a la comunidad a adoptar tecnologías 3D como motor de desarrollo sostenible.",
  testimonial: {
    name: "Janio Oliver Quispe Ticona",
    role: "CEO JP3D",
    phone: "+51 951 890 330",
    email: "oficina@jp3doficial.com",
    quote:
      "La fuerza de JP 3D reside en su gente: profesionales apasionados que transforman desafíos técnicos en soluciones reales y elevan el estándar de innovación en Latinoamérica.",
  },
};
