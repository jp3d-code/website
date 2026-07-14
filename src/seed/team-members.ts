import { getPayloadClient } from "./payload";
import { uploadMediaFromExternalUrl } from "./utils";

const teamMembersData = [
  {
    name: "Manuel Ortega Rubín",
    role: "Fundador",
    education:
      "Ingeniero Metalúrgico, Universidad Nacional Daniel Alcides Carrión",
    image: "https://www.hlcsac.com/images/gerencia/manuel-ortega.jpg",
  },
  {
    name: "Raimundo Flores Cardemas",
    role: "Gerente General",
    education: "",
    image: "https://www.hlcsac.com/images/gerencia/manuel-ortega.jpg",
  },
  {
    name: "Carlos Ortega Rubín",
    role: "Apoderado General",
    education:
      "Bachiller en Ciencias Militares, Escuela Militar de Chorrillos · Maestría en Administración, UIGV · Maestría en Planeamiento Estratégico, Escuela Superior de Guerra del Ejército · PADE, Universidad ESAN · Programa de Dirección General, Universidad de Piura",
    image: "https://www.hlcsac.com/images/gerencia/manuel-ortega.jpg",
  },
  {
    name: "Jorge Gonzalez Cohn",
    role: "Gerente de Desarrollo de Negocios",
    education:
      "Abogado, Universidad de Lima · Diplomado en Finanzas para no Financistas, INCAE Business School · Análisis y Gestión de Conflictos Socioambientales, PUCP · Diplomado en Derecho de la Electricidad y la Energía, UPC",
    image: "https://www.hlcsac.com/images/gerencia/manuel-ortega.jpg",
  },
  {
    name: "Juan Encinas Bautista",
    role: "Gerente de PMO",
    education: "",
    image: "https://www.hlcsac.com/images/gerencia/manuel-ortega.jpg",
  },
  {
    name: "Moisés Huamán Pérez",
    role: "Gerente de SSMA-RSE",
    education:
      "Médico Cirujano, Universidad Peruana Los Andes · Médico Auditor, Universidad Nacional Mayor de San Marcos · Maestría en Servicios de Salud, Universidad de San Martín de Porres",
    image: "https://www.hlcsac.com/images/gerencia/manuel-ortega.jpg",
  },
  {
    name: "Elizabeth Idrogo Cabezas",
    role: "Gerente de Administración y Finanzas",
    education: "",
    image: "https://www.hlcsac.com/images/gerencia/manuel-ortega.jpg",
  },
  {
    name: "Luis Amaya Barbie",
    role: "Gerente de Ingeniería y Metalurgia",
    education:
      "Bachiller en Ingeniería Química, Universidad Nacional de Ingeniería · Egresado Maestría en Ingeniería Metalúrgica, Universidad Nacional Mayor de San Marcos",
    image: "https://www.hlcsac.com/images/gerencia/manuel-ortega.jpg",
  },
  {
    name: "Richard Gutiérrez Araujo",
    role: "Superintendencia de Fabricaciones",
    education: "Ingeniero Industrial, Universidad Alas Peruanas",
    image: "https://www.hlcsac.com/images/gerencia/manuel-ortega.jpg",
  },
  {
    name: "Gustavo de la Roca Vargas",
    role: "Gerente de Proyectos",
    education: "",
    image: "https://www.hlcsac.com/images/gerencia/manuel-ortega.jpg",
  },
];

export async function seedTeamMembers() {
  const payload = await getPayloadClient();

  for (const [index, member] of teamMembersData.entries()) {
    const existing = await payload.find({
      collection: "team-members",
      where: {
        name: {
          equals: member.name,
        },
      },
      limit: 1,
    });

    const imageId = await uploadMediaFromExternalUrl(
      payload,
      member.image,
      member.name,
    );

    const data = {
      name: member.name,
      role: member.role,
      education: member.education || undefined,
      image: imageId || undefined,
      order: (index + 1) * 10,
    };

    if (existing.totalDocs > 0) {
      await payload.update({
        collection: "team-members",
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      });
      continue;
    }

    await payload.create({
      collection: "team-members",
      data,
      overrideAccess: true,
    });
  }

  payload.logger.info("Seed completed: team-members.");
}
