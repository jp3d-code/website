import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

export const Timeline: CollectionConfig = {
  slug: "timeline",
  labels: {
    singular: {
      en: "Milestone",
      es: "Hito",
    },
    plural: {
      en: "History",
      es: "Historia",
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
  hooks: {
    afterChange: [
      async () => {
        revalidatePath("/sobre-nosotros");
      },
    ],
  },
};
