import type { GlobalConfig } from "payload";

export const Contact: GlobalConfig = {
  slug: "contact",
  label: {
    en: "Contact Information",
    es: "Información de contacto",
  },
  admin: {
    group: {
      en: "Settings",
      es: "Configuración",
    },
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "smallTitle",
      type: "text",
      required: true,
      label: {
        en: "Small Title",
        es: "Título pequeño",
      },
    },
    {
      name: "bigTitle",
      type: "text",
      required: true,
      label: {
        en: "Big Title",
        es: "Título grande",
      },
    },
    {
      name: "locations",
      type: "relationship",
      relationTo: "locations",
      label: {
        en: "Locations",
        es: "Ubicaciones",
      },
    },
    {
      name: "phone",
      type: "text",
      required: true,
      label: {
        en: "Phone",
        es: "Teléfono",
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      label: {
        en: "Email",
        es: "Correo electrónico",
      },
    },
    {
      name: "socials",
      type: "relationship",
      relationTo: "social-media",
      hasMany: true,
      label: {
        en: "Social Media Links",
        es: "Enlaces de redes sociales",
      },
    },
    {
      name: "copyright",
      type: "text",
      required: true,
      label: {
        en: "Copyright",
        es: "Copyright",
      },
    },
  ],
};
