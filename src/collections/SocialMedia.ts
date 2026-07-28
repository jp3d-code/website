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
    hidden: true,
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
          value: "IconBrandLinkedin",
        },
        {
          label: "Instagram",
          value: "IconBrandInstagram",
        },
        {
          label: "TikTok",
          value: "IconBrandTiktok",
        },
        {
          label: "Facebook",
          value: "IconBrandFacebook",
        },
        {
          label: "Twitter",
          value: "IconBrandTwitter",
        },
      ],
      admin: {
        description: {
          en: "Tabler icon name (e.g. 'IconBrandLinkedin', 'IconBrandInstagram', 'IconBrandTiktok', 'IconBrandFacebook', 'IconBrandTwitter')",
          es: "Nombre del icono Tabler (ej: 'IconBrandLinkedin', 'IconBrandInstagram', 'IconBrandTiktok', 'IconBrandFacebook', 'IconBrandTwitter')",
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
