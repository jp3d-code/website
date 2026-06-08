import type { CollectionConfig } from "payload";

export const SocialMedia: CollectionConfig = {
  slug: "social-media",
  labels: {
    singular: {
      en: "Social Media",
      es: "Red social",
    },
    plural: {
      en: "Social Media",
      es: "Redes sociales",
    },
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "url", "order"],
    group: {
      en: "Settings",
      es: "Configuración",
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
      name: "label",
      type: "text",
      required: true,
      label: {
        en: "Label",
        es: "Nombre",
      },
      admin: {
        placeholder: "LinkedIn",
      },
    },
    {
      name: "url",
      type: "text",
      required: true,
      label: {
        en: "URL",
        es: "URL",
      },
    },
    {
      name: "icon",
      type: "select",
      label: {
        en: "Icon name",
        es: "Nombre del icono",
      },
      options: [
        {
          label: "LinkedIn",
          value: "Linkedin",
        },
        {
          label: "Instagram",
          value: "Instagram",
        },
        {
          label: "Tiktok",
          value: "Tiktok",
        },
        {
          label: "Facebook",
          value: "Facebook",
        },
        {
          label: "Twitter",
          value: "Twitter",
        },
      ],
      admin: {
        description: {
          en: "Lucide icon name (e.g. 'Linkedin', 'Instagram', 'Tiktok', 'Facebook')",
          es: "Nombre del icono Lucide (ej: 'Linkedin', 'Instagram', 'Tiktok', 'Facebook')",
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
};
