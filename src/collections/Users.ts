import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: {
      en: "User",
      es: "Usuario",
    },
    plural: {
      en: "Users",
      es: "Usuarios",
    },
  },
  admin: {
    useAsTitle: "email",
    group: {
      en: "Settings",
      es: "Configuración",
    },
  },
  auth: true,
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      label: {
        en: "Email",
        es: "Correo electrónico",
      },
    },
  ],
};