import configPromise from "@payload-config";
import {
  convertMarkdownToLexical,
  editorConfigFactory,
  type SanitizedServerEditorConfig,
} from "@payloadcms/richtext-lexical";
import type { Testimonial } from "@/payload-types";
import { getPayloadClient } from "./payload";

const testimonialsData = [
  {
    name: "Janio Oliver Quispe Ticona",
    role: "CEO JP3D",
    phone: "+51 951 890 330",
    email: "oficina@jp3doficial.com",
    quote:
      "La fuerza de JP 3D reside en su gente: profesionales apasionados que transforman desafíos técnicos en soluciones reales y elevan el estándar de innovación en Latinoamérica.",
    order: 10,
  },
  {
    name: "Carlos Mendoza Ríos",
    role: "Director de Ingeniería, Minera Andina",
    phone: "+51 984 112 233",
    email: "cmendoza@mineraandina.com",
    quote:
      "Trabajar con JP 3D nos permitió reducir tiempos de prototipado en un **60%**. Su capacidad de simulación con ANSYS nos ahorró costos significativos en la fase de validación estructural.",
    order: 20,
  },
  {
    name: "María Alejandra Torres",
    role: "Coordinadora STEM, Universidad Nacional",
    phone: "+51 912 334 455",
    email: "mtorres@uni.edu.pe",
    quote:
      "Los talleres de JP 3D transformaron la manera en que nuestros estudiantes aprenden ingeniería. La combinación de *teoría y práctica* con fabricación digital es inigualable.",
    order: 30,
  },
];

export async function seedTestimonials() {
  const payload = await getPayloadClient();
  const config = await configPromise;
  const editorConfig: SanitizedServerEditorConfig =
    await editorConfigFactory.default({ config });

  for (const testimonial of testimonialsData) {
    const lexicalQuote = convertMarkdownToLexical({
      markdown: testimonial.quote,
      editorConfig,
    }) as Testimonial["quote"];

    const data = {
      name: testimonial.name,
      role: testimonial.role,
      phone: testimonial.phone,
      email: testimonial.email,
      quote: lexicalQuote,
      order: testimonial.order,
    };

    const existing = await payload.find({
      collection: "testimonials",
      where: {
        name: {
          equals: testimonial.name,
        },
      },
      limit: 1,
    });

    if (existing.totalDocs > 0) {
      await payload.update({
        collection: "testimonials",
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      });
      continue;
    }

    await payload.create({
      collection: "testimonials",
      data,
      overrideAccess: true,
    });
  }

  payload.logger.info("Seed completed: testimonials.");
}
