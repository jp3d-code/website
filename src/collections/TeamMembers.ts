import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  dbName: "team_members",
  labels: {
    singular: {
      en: "Team Member",
      es: "Miembro del Equipo",
    },
    plural: {
      en: "Team Members",
      es: "Miembros del Equipo",
    },
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
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
      name: "role",
      type: "text",
      required: true,
      label: {
        en: "Role",
        es: "Cargo",
      },
    },
    {
      name: "education",
      type: "textarea",
      label: {
        en: "Education",
        es: "Formación",
      },
      admin: {
        description: {
          en: "Academic background and qualifications",
          es: "Formación académica y cualificaciones",
        },
      },
    },
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
      label: {
        en: "Photo",
        es: "Foto",
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
    afterChange: [
      async () => {
        revalidatePath("/sobre-nosotros");
      },
    ],
  },
};
