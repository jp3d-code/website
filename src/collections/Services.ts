import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: {
      en: "Service",
      es: "Servicio",
    },
    plural: {
      en: "Services",
      es: "Servicios",
    },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "order"],
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
      name: "title",
      type: "text",
      required: true,
      label: {
        en: "Title",
        es: "Título",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: {
        en: "Image",
        es: "Imagen",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      label: {
        en: "Excerpt",
        es: "Extracto",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      label: {
        en: "Content",
        es: "Contenido",
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
