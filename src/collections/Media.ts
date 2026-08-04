import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: {
      en: "File",
      es: "Archivo",
    },
    plural: {
      en: "Files",
      es: "Archivos",
    },
  },
  admin: {
    description: {
      en: "Images and documents used across the site",
      es: "Imágenes y documentos utilizados en el sitio",
    },
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
  upload: {
    resizeOptions: {
      width: 1920,
      withoutEnlargement: true,
    },
  },
};
