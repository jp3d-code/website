import { createStaticRoute } from "@/shared/lib/routes";
import { APP_URL } from "./env";

const homeRoute = createStaticRoute({
  name: "Inicio",
  path: "/",
  fullPath: APP_URL,
});

const organizacionRoute = createStaticRoute({
  name: "Organización",
  path: "/organizacion",
  fullPath: `${APP_URL}/organizacion`,
});

const serviciosRoute = createStaticRoute({
  name: "Servicios",
  path: "/servicios",
  fullPath: `${APP_URL}/servicios`,
});

const proyectosRoute = createStaticRoute({
  name: "Proyectos",
  path: "/proyectos",
  fullPath: `${APP_URL}/proyectos`,
});

const atencionRoute = createStaticRoute({
  name: "Atención",
  path: "/atencion",
  fullPath: `${APP_URL}/atencion`,
});

const contactoRoute = createStaticRoute({
  name: "Contactenos",
  path: "/contacto",
  fullPath: `${APP_URL}/contacto`,
});

export const routes = {
  ...homeRoute,
  organizacion: {
    ...organizacionRoute,
  },
  atencion: {
    ...atencionRoute,
  },
  contacto: {
    ...contactoRoute,
  },
  proyectos: {
    ...proyectosRoute,
  },
  servicios: {
    ...serviciosRoute,
  },
};
