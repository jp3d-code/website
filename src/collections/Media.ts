import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: {
      en: "Media",
      es: "Medio",
    },
    plural: {
      en: "Media",
      es: "Medios",
    },
  },
  admin: {
    group: {
      en: "Settings",
      es: "Configuración",
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: {
        en: "Alternative Text",
        es: "Texto alternativo",
      },
      admin: {
        placeholder: {
          en: "Enter image description",
          es: "Ingresa la descripción de la imagen",
        },
      },
    },
  ],
  upload: true,
};
