import type { CollectionConfig } from "payload";

export const Videos: CollectionConfig = {
  slug: "videos",
  labels: {
    singular: {
      en: "Video",
      es: "Video",
    },
    plural: {
      en: "Videos",
      es: "Videos",
    },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "platform", "order"],
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
      name: "url",
      type: "text",
      required: true,
      label: {
        en: "Video URL",
        es: "URL del video",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
      label: {
        en: "Thumbnail",
        es: "Miniatura",
      },
    },
    {
      name: "platform",
      type: "select",
      required: true,
      options: [
        { label: "TikTok", value: "tiktok" },
        { label: "YouTube", value: "youtube" },
        { label: "Instagram", value: "instagram" },
        { label: "Other", value: "other" },
      ],
      defaultValue: "tiktok",
      label: {
        en: "Platform",
        es: "Plataforma",
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
      type: "array",
      required: true,
      label: {
        en: "Content paragraphs",
        es: "Párrafos de contenido",
      },
      fields: [
        {
          name: "text",
          type: "textarea",
          required: true,
          label: {
            en: "Paragraph",
            es: "Párrafo",
          },
        },
      ],
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
