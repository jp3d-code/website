import { createStaticRoute } from "@/shared/lib/routes";
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

const proyectosRoute = createStaticRoute({
  name: "Proyectos",
  path: "/proyectos",
  fullPath: `${APP_URL}/proyectos`,
});

const serviciosRoute = createStaticRoute({
  name: "Servicios",
  path: "/servicios",
  fullPath: `${APP_URL}/servicios`,
});

const sobreNosotrosRoute = createStaticRoute({
  name: "Sobre Nosotros",
  path: "/sobre-nosotros",
  fullPath: `${APP_URL}/sobre-nosotros`,
});

export const routes = {
  ...homeRoute,
  contacto: {
    ...contactoRoute,
  },
  marca: {
    ...marcaRoute,
  },
  proyectos: {
    ...proyectosRoute,
  },
  servicios: {
    ...serviciosRoute,
  },
  sobreNosotros: {
    ...sobreNosotrosRoute,
  },
};
