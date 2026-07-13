import type { CollectionConfig } from "payload";
import { slugify } from "@/shared/lib/utils";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: {
      en: "Category",
      es: "Categoría",
    },
    plural: {
      en: "Categories",
      es: "Categorías",
    },
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name"],
    hidden: true,
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
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: {
        en: "Slug",
        es: "Slug",
      },
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.name && !data?.slug) {
          return {
            ...data,
            slug: slugify(data.name),
          };
        }
        return data;
      },
    ],
  },
};
