import {
  createDynamicRoute,
  createSection,
  createStaticRoute,
  defineSections,
} from "@/shared/lib/routes";
import { APP_URL } from "./env";

const homeRoute = createStaticRoute({
  name: "Inicio",
  path: "/",
  fullPath: APP_URL,
  description:
    "Especialistas en diseño 3D, impresión 3D, memorias de cálculo y fabricación digital para el sector industrial y minero en Perú.",
});

const contactoRoute = createStaticRoute({
  name: "Contacto",
  path: "/contacto",
  fullPath: `${APP_URL}/contacto`,
  description:
    "Contáctanos para llevar tu proyecto al siguiente nivel. Ingeniería, diseño 3D y fabricación digital en Arequipa, Perú.",
});

const marcaRoute = createStaticRoute({
  name: "Marca",
  path: "/marca",
  fullPath: `${APP_URL}/marca`,
  description:
    "Conoce JP 3D: ingeniería, fabricación digital y formación STEM. Líderes en innovación 3D para la industria peruana.",
});

const marcaSections = defineSections({
  intro: createSection(marcaRoute, "intro", "Introducción"),
  mision: createSection(marcaRoute, "mision", "Misión"),
  vision: createSection(marcaRoute, "vision", "Visión"),
  valores: createSection(marcaRoute, "valores", "Valores"),
} as const);

const proyectosRoute = createStaticRoute({
  name: "Proyectos",
  path: "/proyectos",
  fullPath: `${APP_URL}/proyectos`,
  description:
    "Portafolio de proyectos de ingeniería, diseño 3D y fabricación digital para los sectores minero, energía y salud.",
});

const proyectosDetalleRoute = createDynamicRoute(
  {
    name: "Detalle de Proyecto",
    path: "/proyectos/[slug]",
    fullPath: `${APP_URL}/proyectos/[slug]`,
    description: "Detalle del proyecto de ingeniería y fabricación digital.",
  },
  ["slug"] as const,
);

const serviciosRoute = createStaticRoute({
  name: "Servicios",
  path: "/servicios",
  fullPath: `${APP_URL}/servicios`,
  description:
    "Soluciones integrales en ingeniería, fabricación digital, impresión 3D, corte láser y capacitación STEM.",
});

const serviciosDetalleRoute = createDynamicRoute(
  {
    name: "Detalle de Servicio",
    path: "/servicios/[slug]",
    fullPath: `${APP_URL}/servicios/[slug]`,
    description: "Detalle del servicio de ingeniería y fabricación digital.",
  },
  ["slug"] as const,
);

const serviciosSections = defineSections({
  ingenieria: {
    name: "Ingeniería",
    hash: "ingenieria",
    path: serviciosDetalleRoute.build({ slug: "ingenieria" }),
    fullPath: serviciosDetalleRoute.buildFull({ slug: "ingenieria" }),
  },
  educacion: {
    name: "Educación",
    hash: "educacion",
    path: serviciosDetalleRoute.build({ slug: "educacion" }),
    fullPath: serviciosDetalleRoute.buildFull({ slug: "educacion" }),
  },
  fabricacionDigital: {
    name: "Fabricación Digital",
    hash: "fabricacion-digital",
    path: serviciosDetalleRoute.build({ slug: "fabricacion-digital" }),
    fullPath: serviciosDetalleRoute.buildFull({ slug: "fabricacion-digital" }),
  },
} as const);

const sobreNosotrosRoute = createStaticRoute({
  name: "Sobre Nosotros",
  path: "/sobre-nosotros",
  fullPath: `${APP_URL}/sobre-nosotros`,
  description:
    "Conoce al equipo de JP 3D: ingenieros, diseñadores y profesionales comprometidos con la innovación y la fabricación digital.",
});

const sobreNosotrosSections = defineSections({
  equipo: createSection(sobreNosotrosRoute, "equipo", "Nuestro Equipo"),
  historia: createSection(sobreNosotrosRoute, "historia", "Nuestra Historia"),
  testimonios: createSection(sobreNosotrosRoute, "testimonios", "Testimonios"),
  videos: createSection(sobreNosotrosRoute, "videos", "Videos"),
} as const);

const cotizadorRoute = createStaticRoute({
  name: "Cotizador",
  path: "/cotizador",
  fullPath: `${APP_URL}/cotizador`,
  description:
    "Cotiza tu proyecto de impresión 3D, ingeniería o fabricación digital. Respuesta rápida y precios competitivos.",
});

export const routes = {
  ...homeRoute,
  contacto: {
    ...contactoRoute,
  },
  cotizador: {
    ...cotizadorRoute,
  },
  marca: {
    ...marcaRoute,
    ...marcaSections,
  },
  proyectos: {
    ...proyectosRoute,
    detail: proyectosDetalleRoute,
  },
  servicios: {
    ...serviciosRoute,
    detail: serviciosDetalleRoute,
    ...serviciosSections,
  },
  sobreNosotros: {
    ...sobreNosotrosRoute,
    ...sobreNosotrosSections,
  },
};
