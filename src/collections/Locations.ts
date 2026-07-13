import type { CollectionConfig } from "payload";

export const Locations: CollectionConfig = {
  slug: "locations",
  labels: {
    singular: {
      en: "Location",
      es: "Ubicación",
    },
    plural: {
      en: "Locations",
      es: "Ubicaciones",
    },
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "address"],
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
      name: "name",
      type: "text",
      required: true,
      label: {
        en: "Name",
        es: "Nombre",
      },
      admin: {
        placeholder: {
          en: "e.g. Main Office",
          es: "ej. Oficina Principal",
        },
      },
    },
    {
      name: "address",
      type: "text",
      required: true,
      label: {
        en: "Address",
        es: "Dirección",
      },
    },
    {
      name: "lat",
      type: "number",
      required: true,
      label: {
        en: "Latitude",
        es: "Latitud",
      },
    },
    {
      name: "lng",
      type: "number",
      required: true,
      label: {
        en: "Longitude",
        es: "Longitud",
      },
    },
  ],
};
