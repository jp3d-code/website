import type { ServicesPage } from "../types/data";
import { images } from "./images";

export const servicesData: ServicesPage = {
  items: [
    {
      title: "INGENIERÍA",
      image: images.servicios_ingenieria.name,
      excerpt:
        "Nuestro servicio de Ingeniería abarca todo el ciclo de desarrollo: conceptualización, modelado 3D y verificación numérica. Trabajamos con SolidWorks y ANSYS para validar esfuerzos, vibraciones y durabilidad.",
      content: [
        "Integraremos diseño mecánico, estructural y de procesos en un único flujo",
        "colaborativo. Esto reduce retrabajos y acelera la transición de la idea al",
        "plano de fabricación. Entregamos memorias de cálculo completas, planos",
        "detallados y listas de materiales optimizadas para producción local.",
        "Nuestro equipo multidisciplinario —ingenieros mecánicos, civiles y",
        "mecatrónicos— combina experiencia en minería, energía y manufactura. Con",
        "JP 3D obtienes proyectos seguros, eficientes en costo y listos para",
        "certificarse ante cualquier entidad regulatoria.",
      ],
    },
    {
      title: "EDUCACIÓN",
      image: images.servicios_educacion.name,
      excerpt:
        "En Educación potenciamos el aprendizaje STEM mediante talleres prácticos de diseño y fabricación digital. Nuestros programas incluyen modelado 3D, impresión aditiva, corte láser y electrónica básica.",
      content: [
        "Cada curso combina teoría concisa con proyectos reales: los estudiantes",
        "diseñan prototipos, fabrican sus piezas en impresoras FDM / SLA y los",
        "validan con pruebas funcionales. Esto desarrolla pensamiento crítico,",
        "trabajo en equipo y habilidades de resolución de problemas alineadas con",
        "la Industria 4.0.",
      ],
    },
    {
      title: "FABRICACIÓN DIGITAL",
      image: images.servicios_fabricacion_digital.name,
      excerpt:
        "Nuestro servicio de Fabricación Digital convierte modelos CAD en piezas físicas en cuestión de horas. Combinamos impresión 3D FDM / SLA, corte láser y CNC router para producir prototipos funcionales.",
      content: [
        "El flujo de trabajo se gestiona íntegramente en entorno digital:",
        "optimizamos la orientación, rebanado y trayectorias de herramienta para",
        "minimizar soportes y tiempos de ciclo; luego aplicamos post-procesos",
        "de mecanizado, lijado y pintura que alcanzan tolerancias de ±0.1 mm y",
        "acabados de grado industrial.",
        "Ofrecemos producción bajo demanda desde lote 1 hasta series cortas,",
        "reduciendo inventario y plazo de reposición para nuestros clientes de",
        "minería, energía y salud. Cada entrega incluye control dimensional y",
        "trazabilidad de material para garantizar calidad y repetibilidad.",
      ],
    },
  ],
  description:
    "En Servicios encontrarás un portafolio integrado que cubre Ingeniería, Fabricación Digital y programas de Educación STEM. Acompañamos a nuestros clientes desde la concepción de la idea hasta la entrega de piezas finales, combinando modelado 3D, simulación avanzada y producción bajo demanda. Operamos con herramientas de última generación y metodologías ágiles para garantizar tiempos de ciclo cortos, alta precisión y trazabilidad completa. Así, transformamos retos técnicos en soluciones tangibles que cumplen estándares internacionales y generan valor inmediato.",
  testimonial: {
    name: "Janio Oliver Quispe Ticona",
    role: "CEO JP3D",
    phone: "+51 951 890 330",
    email: "oficina@jp3doficial.com",
    quote:
      "En JP3D convertimos la creatividad y la ingeniería en resultados concretos; cada proyecto que entregamos demuestra cómo la fabricación digital acelera la innovación y eleva la competitividad de nuestros clientes.",
  },
};
