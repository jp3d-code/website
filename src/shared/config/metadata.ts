import type { Metadata } from "next";

const metadata: Metadata = {
  title: {
    default: "JP3D | Ingeniería & Fabricación",
    template: "%s | JP3D",
  },
  description:
    "Especialistas en diseño 3D, impresión 3D, memorias de cálculo y fabricación digital para el sector industrial y minero en Perú.",
  keywords: [
    "ingeniería 3D",
    "fabricación digital",
    "impresión 3D",
    "modelado 3D",
    "memorias de cálculo",
    "simulación ANSYS",
    "SolidWorks",
    "corte láser",
    "CNC",
    "prototipado",
    "minería",
    "Arequipa",
    "Perú",
  ],
  twitter: {
    card: "summary_large_image",
    title: "JP3D | Ingeniería & Fabricación Digital",
    description:
      "Especialistas en diseño 3D, impresión 3D, memorias de cálculo y fabricación digital para el sector industrial y minero en Perú.",
    images: ["/opengraph.webp"],
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "JP3D",
    title: "JP3D | Ingeniería & Fabricación Digital",
    description:
      "Especialistas en diseño 3D, impresión 3D, memorias de cálculo y fabricación digital para el sector industrial y minero en Perú.",
    images: [
      {
        url: "/opengraph.webp",
        width: 1200,
        height: 672,
        alt: "JP3D - Ingeniería & Fabricación Digital",
        type: "image/webp",
      },
    ],
  },
};

export default metadata;
