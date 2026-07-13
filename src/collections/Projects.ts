import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";
import { slugify } from "@/shared/lib/utils";

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: {
      en: "Project",
      es: "Proyecto",
    },
    plural: {
      en: "Projects",
      es: "Proyectos",
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
      name: "client",
      type: "relationship",
      relationTo: "clients",
      required: false,
      label: {
        en: "Client",
        es: "Cliente",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: false,
      label: {
        en: "Category",
        es: "Categoría",
      },
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      required: false,
      label: {
        en: "Tags",
        es: "Etiquetas",
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
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data?.slug) {
          return {
            ...data,
            slug: slugify(data.title),
          };
        }

        return data;
      },
    ],
    afterChange: [
      async () => {
        revalidatePath("/");
        revalidatePath("/proyectos");
      },
    ],
  },
};
