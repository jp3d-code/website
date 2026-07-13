import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";
import { slugify } from "@/shared/lib/utils";

export const Tags: CollectionConfig = {
  slug: "tags",
  labels: {
    singular: {
      en: "Tag",
      es: "Etiqueta",
    },
    plural: {
      en: "Tags",
      es: "Etiquetas",
    },
  },
  admin: {
    useAsTitle: "name",
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
      admin: {
        placeholder: {
          en: "Enter tag name",
          es: "Ingresa el nombre de la etiqueta",
        },
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
    afterChange: [
      ({ data }) => {
        if (data?.name && typeof data.name === "string") {
          return {
            ...data,
            name: data.name.slice(0, 1).toUpperCase() + data.name.slice(1),
          };
        }
      },
      async () => {
        revalidatePath("/");
      },
    ],
  },
};
