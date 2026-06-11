import type { CollectionConfig } from "payload";

export const Timeline: CollectionConfig = {
  slug: "timeline",
  labels: {
    singular: {
      en: "Timeline Event",
      es: "Evento de línea de tiempo",
    },
    plural: {
      en: "Timeline Events",
      es: "Eventos de línea de tiempo",
    },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["date", "title"],
    group: {
      en: "Content",
      es: "Contenido",
    },
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "date",
      type: "date",
      required: true,
      label: {
        en: "Date",
        es: "Fecha",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
      label: {
        en: "Title",
        es: "Título",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: {
        en: "Description",
        es: "Descripción",
      },
    },
  ],
};
