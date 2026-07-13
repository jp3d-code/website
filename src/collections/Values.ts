import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

export const Values: CollectionConfig = {
  slug: "values",
  dbName: "company_values",
  labels: {
    singular: {
      en: "Value",
      es: "Valor",
    },
    plural: {
      en: "Values",
      es: "Valores",
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
      name: "description",
      type: "textarea",
      required: true,
      label: {
        en: "Description",
        es: "Descripción",
      },
    },
    {
      name: "icon",
      type: "text",
      label: {
        en: "Icon name",
        es: "Nombre del icono",
      },
      admin: {
        description: {
          en: "Lucide icon name (e.g. 'Shield', 'Lightbulb', 'Leaf', 'Users')",
          es: "Nombre del icono Lucide (ej: 'Shield', 'Lightbulb', 'Leaf', 'Users')",
        },
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
  hooks: {
    afterChange: [
      async () => {
        revalidatePath("/marca");
      },
    ],
  },
};
