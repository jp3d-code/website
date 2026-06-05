import type { BrandToken, HomeData } from "../types/data";
import { images } from "./images";

const brandTokens: BrandToken[] = [
  { type: "text", value: "Especialistas en diseño 3D y " },
  {
    type: "highlight",
    value: "fabricación digital",
    image: images.fabricacion_digital.name,
  },
  { type: "text", value: ",\n  fusionando " },
  {
    type: "highlight",
    value: "innovación",
    image: images.innovacion.name,
  },
  { type: "text", value: ", " },
  {
    type: "highlight",
    value: "creatividad",
    image: images.creatividad.name,
  },
  { type: "text", value: ",\n" },
  {
    type: "highlight",
    value: "ingeniería",
    image: images.ingenieria.name,
  },
  { type: "text", value: " y " },
  {
    type: "highlight",
    value: "tecnología",
    image: images.tecnologia.name,
  },
];

export const homeData: HomeData = {
  banner: {
    title: "JP 3D",
    subtitle: "Tecnología",
    description:
      "Ingeniería, Modelado 3D, Fabricación 3D, Máquinas, Insumos y Repuestos.",
    location: "Pasaje Cayro J12, Paucarpata 04002 Arequipa.",
    phone: "+51 951 890 330",
    imageBig: images.transparent_image.name,
    imageSmall: images.transparent_image_small.name,
    socials: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/jp-3d/?viewAsMember=true",
      },
      {
        label: "Instagram",
        url: "https://www.instagram.com/jp_3d_makers?igsh=Zmo4cW55NmloZm43",
      },
      {
        label: "TikTok",
        url: "https://www.tiktok.com/@jp_3d_makers",
      },
      {
        label: "Facebook",
        url: "https://web.facebook.com/kamaywasi3d?locale=es_LA",
      },
    ],
  },
  brandTokens,
  services: [
    {
      title: "INGENIERÍA",
      hash: "#ingenieria",
      number: "001",
      description:
        "Somos el estudio especializado en producción de podcast que buscas para tu marca. Nuevas narrativas para elevar la voz de tu marca.",
    },
    {
      title: "EDUCACIÓN",
      hash: "#educacion",
      number: "002",
      description:
        "Enseñanza práctica de diseño 3D, robótica y programación para fomentar la creatividad.",
    },
    {
      title: "FABRICACIÓN DIGITAL",
      hash: "#fabricacion-digital",
      number: "003",
      description:
        "Prototipado y producción bajo demanda con impresión 3D, corte láser y fresado CNC.",
    },
  ],
  movingWords: ["EDUCACIÓN", "INGENIERÍA", "FABRICACIÓN", "DIGITAL"],
  sponsors: [
    {
      name: "UNAP",
      url: "https://portal.unap.edu.pe/",
      img: images.logo_unap.name,
      alt: "logo-UNAP",
    },
    {
      name: "UNAJ",
      url: "https://portal.unaj.edu.pe/",
      img: images.logo_unaj.name,
      alt: "logo-UNAJ",
    },
    {
      name: "SENATI",
      url: "https://www.senati.edu.pe/",
      img: images.logo_senati.name,
      alt: "logo_senati",
    },
    {
      name: "UNI",
      url: "https://portal.uni.edu.pe/",
      img: images.logo_uni.name,
      alt: "logo_UNI",
    },
    {
      name: "EESPP Juliaca",
      url: "https://eesppjuliaca.edu.pe/",
      img: images.logo_juliaca.name,
      alt: "logo-juliaca1",
    },
  ],
  exploreLinks: [
    { title: "NOSOTROS", url: "sobre-nosotros.html" },
    { title: "PROYECTOS", url: "proyectos.html" },
    { title: "CONTACTO", url: "contacto.html" },
  ],
};
