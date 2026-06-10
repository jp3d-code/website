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
});

const contactoRoute = createStaticRoute({
  name: "Contacto",
  path: "/contacto",
  fullPath: `${APP_URL}/contacto`,
});

const marcaRoute = createStaticRoute({
  name: "Marca",
  path: "/marca",
  fullPath: `${APP_URL}/marca`,
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
});

const proyectosDetalleRoute = createDynamicRoute(
  {
    name: "Detalle de Proyecto",
    path: "/proyectos/[slug]",
    fullPath: `${APP_URL}/proyectos/[slug]`,
  },
  ["slug"] as const,
);

const serviciosRoute = createStaticRoute({
  name: "Servicios",
  path: "/servicios",
  fullPath: `${APP_URL}/servicios`,
});

const serviciosSections = defineSections({
  ingenieria: createSection(serviciosRoute, "ingenieria", "Ingeniería"),
  educacion: createSection(serviciosRoute, "educacion", "Educación"),
  fabricacionDigital: createSection(
    serviciosRoute,
    "fabricacion-digital",
    "Fabricación Digital",
  ),
} as const);

const sobreNosotrosRoute = createStaticRoute({
  name: "Sobre Nosotros",
  path: "/sobre-nosotros",
  fullPath: `${APP_URL}/sobre-nosotros`,
});

const sobreNosotrosSections = defineSections({
  equipo: createSection(sobreNosotrosRoute, "equipo", "Nuestro Equipo"),
  historia: createSection(sobreNosotrosRoute, "historia", "Nuestra Historia"),
  videos: createSection(sobreNosotrosRoute, "videos", "Videos"),
} as const);

export const routes = {
  ...homeRoute,
  contacto: {
    ...contactoRoute,
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
    ...serviciosSections,
  },
  sobreNosotros: {
    ...sobreNosotrosRoute,
    ...sobreNosotrosSections,
  },
};
