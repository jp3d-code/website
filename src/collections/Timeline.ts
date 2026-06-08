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
    defaultColumns: ["year", "title", "order"],
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
      name: "year",
      type: "text",
      required: true,
      label: {
        en: "Year",
        es: "Año",
      },
      admin: {
        placeholder: "2018",
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
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      label: {
        en: "Order",
        es: "Orden",
      },
      admin: {
        position: "sidebar",
      },
    },
  ],
};
