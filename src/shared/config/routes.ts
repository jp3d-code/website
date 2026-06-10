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

const serviciosDetalleRoute = createDynamicRoute(
  {
    name: "Detalle de Servicio",
    path: "/servicios/[slug]",
    fullPath: `${APP_URL}/servicios/[slug]`,
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
    detail: serviciosDetalleRoute,
    ...serviciosSections,
  },
  sobreNosotros: {
    ...sobreNosotrosRoute,
    ...sobreNosotrosSections,
  },
};
