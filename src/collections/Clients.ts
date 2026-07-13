import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";
import { slugify } from "@/shared/lib/utils";

export const Clients: CollectionConfig = {
  slug: "clients",
  labels: {
    singular: {
      en: "Client",
      es: "Cliente",
    },
    plural: {
      en: "Clients",
      es: "Clientes",
    },
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "website"],
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
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
      label: {
        en: "Logo",
        es: "Logo",
      },
    },
    {
      name: "website",
      type: "text",
      required: false,
      label: {
        en: "Website",
        es: "Sitio Web",
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
      async () => {
        revalidatePath("/proyectos");
      },
    ],
  },
};
