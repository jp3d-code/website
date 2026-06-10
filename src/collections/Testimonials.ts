import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: {
      en: "Testimonial",
      es: "Testimonio",
    },
    plural: {
      en: "Testimonials",
      es: "Testimonios",
    },
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
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
      name: "name",
      type: "text",
      required: true,
      label: {
        en: "Name",
        es: "Nombre",
      },
    },
    {
      name: "role",
      type: "text",
      required: true,
      label: {
        en: "Role",
        es: "Cargo",
      },
    },
    {
      name: "phone",
      type: "text",
      label: {
        en: "Phone",
        es: "Teléfono",
      },
    },
    {
      name: "email",
      type: "text",
      label: {
        en: "Email",
        es: "Correo electrónico",
      },
    },
    {
      name: "quote",
      type: "richText",
      required: true,
      label: {
        en: "Quote",
        es: "Cita",
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
