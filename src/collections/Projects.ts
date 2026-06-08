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
    useAsTitle: "name",
    defaultColumns: ["name", "sector", "serviceArea", "status", "year"],
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
      admin: {
        placeholder: {
          en: "Enter project name",
          es: "Ingresa el nombre del proyecto",
        },
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
      name: "sector",
      type: "text",
      required: true,
      label: {
        en: "Sector",
        es: "Sector",
      },
      admin: {
        placeholder: {
          en: "Enter sector",
          es: "Ingresa el sector",
        },
      },
    },
    {
      name: "serviceArea",
      label: {
        en: "Service Area",
        es: "Área de servicio",
      },
      type: "text",
      required: true,
      admin: {
        placeholder: {
          en: "Enter service area",
          es: "Ingresa el área de servicio",
        },
      },
    },
    {
      name: "status",
      type: "text",
      required: true,
      label: {
        en: "Status",
        es: "Estado",
      },
      admin: {
        placeholder: {
          en: "Enter status",
          es: "Ingresa el estado",
        },
      },
    },
    {
      name: "country",
      type: "text",
      required: true,
      label: {
        en: "Country",
        es: "País",
      },
      admin: {
        placeholder: {
          en: "Enter country",
          es: "Ingresa el país",
        },
      },
    },
    {
      name: "client",
      type: "text",
      required: true,
      label: {
        en: "Client",
        es: "Cliente",
      },
      admin: {
        placeholder: {
          en: "Enter client name",
          es: "Ingresa el nombre del cliente",
        },
      },
    },
    {
      name: "location",
      type: "text",
      required: true,
      label: {
        en: "Location",
        es: "Ubicación",
      },
      admin: {
        placeholder: {
          en: "Enter location",
          es: "Ingresa la ubicación",
        },
      },
    },
    {
      name: "year",
      type: "text",
      required: true,
      label: {
        en: "Year",
        es: "Año",
      },
      admin: {
        placeholder: {
          en: "Enter year",
          es: "Ingresa el año",
        },
      },
    },
    {
      name: "modality",
      type: "text",
      required: true,
      label: {
        en: "Modality",
        es: "Modalidad",
      },
      admin: {
        placeholder: {
          en: "Enter modality",
          es: "Ingresa la modalidad",
        },
      },
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      label: {
        en: "Summary",
        es: "Resumen",
      },
      admin: {
        placeholder: {
          en: "Enter project summary",
          es: "Ingresa el resumen del proyecto",
        },
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
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      label: {
        en: "Tags",
        es: "Etiquetas",
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.name && !data?.slug) {
          return {
            ...data,
            slug: slugify(data.name),
          };
        }

        return data;
      },
    ],
  },
};
