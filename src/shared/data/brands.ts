import type { BrandPage } from "../types/data";
import { images } from "./images";

export const brandData: BrandPage = {
  sections: [
    {
      title: "INTRO",
      image: images.marca_logo.name,
      excerpt:
        "JP 3D nace con la convicción de fusionar ingeniería, fabricación digital y formación STEM para convertir las ideas más ambiciosas en soluciones tangibles que impulsen la competitividad de nuestros clientes.",
      content: [],
    },
    {
      title: "MISION",
      image: images.marca_mision.name,
      excerpt:
        "Nuestra misión es transformar ideas en soluciones tangibles mediante la combinación de ingeniería de precisión, fabricación digital y programas formativos que empoderan a la próxima generación de innovadores.",
      content: [
        "Integraremos diseño, simulación y producción bajo demanda en un flujo 100 % digital, reduciendo tiempos de desarrollo y elevando el estándar de calidad para nuestros clientes.",
        "Cada proyecto entregado busca generar impacto real: optimizar procesos, reducir costos y aportar valor sostenible a la industria peruana y latino-americana.",
      ],
    },
    {
      title: "VISION",
      image: images.marca_vision.name,
      excerpt:
        "Ser referentes latinoamericanos en innovación 3D, liderando la transición hacia fábricas inteligentes y ecosistemas educativos orientados a la manufactura avanzada.",
      content: [
        "Aspiramos a expandir nuestra presencia en minería, energía y salud, ofreciendo servicios que aceleren la adopción de tecnologías aditivas y mejoren la competitividad de la región.",
        "Para 2030 proyectamos operar hubs de fabricación distribuidos y un centro de I+D capaz de desarrollar materiales y procesos propios con enfoque en sostenibilidad.",
      ],
    },
    {
      title: "VALORES",
      excerpt:
        "Innovación · Precisión · Colaboración · Sostenibilidad. Fomentamos la creatividad técnica respaldada por datos y estándares internacionales.",
      content: [
        "Creemos en alianzas a largo plazo con clientes y en la responsabilidad ambiental: seleccionamos materiales reciclables y optimizamos procesos para reducir desperdicios y huella de carbono.",
      ],
    },
  ],
  description:
    "La Marca JP 3D representa la convergencia entre creatividad, ingeniería y fabricación digital. Nuestro logotipo fusiona la bombilla — símbolo de ideas disruptivas— con un trazo de lápiz que refleja la materialización de esas ideas en soluciones concretas. Cada línea de nuestro diseño corporativo utiliza el contraste dorado-negro para transmitir innovación, precisión y elegancia industrial. Esta identidad visual sustenta nuestra promesa: convertir retos técnicos en proyectos de alto impacto para los sectores minería, energía y educación STEM.",
  testimonial: {
    name: "Janio Oliver Quispe Ticona",
    role: "CEO JP3D",
    phone: "+51 951 890 330",
    email: "oficina@jp3doficial.com",
    quote:
      "Nuestra marca no es solo un logotipo; es el compromiso diario de transformar la chispa de la imaginación en productos que eleven el estándar tecnológico del Perú y Latinoamérica.",
  },
};
