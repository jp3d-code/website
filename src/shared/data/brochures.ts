import type { Brochure } from "@/shared/types/data";

export const brochures: Brochure[] = [
  {
    id: "ingenieria",
    title: "Brochure Ingeniería",
    description:
      "Servicios de ingeniería, diseño 3D, simulación y memorias de cálculo para minería, energía e industria.",
    viewUrl: "https://canva.link/tvituu4bkblxtt3",
    embedUrl:
      "https://www.canva.com/design/DAHBC1Bbq_g/IO2sAz0qYYIgsgfrb36jEA/view?embed",
    serviceSlug: "ingenieria",
  },
  {
    id: "manufactura",
    title: "Brochure Manufactura",
    description:
      "Fabricación digital, impresión 3D, corte láser y prototipado rápido para llevar tus piezas a producción.",
    viewUrl: "https://canva.link/3sswgluw7lbwzr5",
    embedUrl:
      "https://www.canva.com/design/DAG_Mj-554g/3I1Xh7XiRt19_6IpIqqf_A/view?embed",
    serviceSlug: "fabricacion-digital",
  },
];

export function getBrochureByServiceSlug(slug: string): Brochure | undefined {
  return brochures.find((brochure) => brochure.serviceSlug === slug);
}
