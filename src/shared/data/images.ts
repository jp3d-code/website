import type { Image } from "@/shared/types/data";

export const images = {
  fabricacion_digital: {
    name: "editar/imagenes/inicio/fabricacion_digital.png",
    alt: "Fabricación digital",
    description: "Imagen de fabricación digital",
  },
  innovacion: {
    name: "editar/imagenes/inicio/INNOVACION.png",
    alt: "Innovación",
    description: "Imagen de innovación",
  },
  creatividad: {
    name: "editar/imagenes/inicio/CREATIVIDAD.png",
    alt: "Creatividad",
    description: "Imagen de creatividad",
  },
  ingenieria: {
    name: "editar/imagenes/inicio/ingenieria.png",
    alt: "Ingeniería",
    description: "Imagen de ingeniería",
  },
  tecnologia: {
    name: "editar/imagenes/inicio/tecnologia.png",
    alt: "Tecnología",
    description: "Imagen de tecnología",
  },
  transparent_image: {
    name: "editar/imagenes/inicio/transparent-image.png",
    alt: "Imagen transparente",
    description: "Imagen transparente para banner",
  },
  transparent_image_small: {
    name: "editar/imagenes/inicio/transparent-image-small.png",
    alt: "Imagen transparente pequeña",
    description: "Imagen transparente pequeña",
  },
  logo_unap: {
    name: "editar/imagenes/inicio/logo-UNAP.png",
    alt: "Logo UNAP",
    description: "Logo de la Universidad Nacional del Altiplano",
  },
  logo_unaj: {
    name: "editar/imagenes/inicio/logo_UNAJ.png",
    alt: "Logo UNAJ",
    description: "Logo de la Universidad Nacional de Juliaca",
  },
  logo_senati: {
    name: "editar/imagenes/inicio/logo senati.png",
    alt: "Logo SENATI",
    description: "Logo de SENATI",
  },
  logo_uni: {
    name: "editar/imagenes/inicio/logo_UNI1.png",
    alt: "Logo UNI",
    description: "Logo de la Universidad Nacional de Ingeniería",
  },
  logo_juliaca: {
    name: "editar/imagenes/inicio/logo-juliaca1.png",
    alt: "Logo EESPP Juliaca",
    description: "Logo de la EESPP Juliaca",
  },
  servicios_ingenieria: {
    name: "editar/imagenes/servicios/ingenieria.png",
    alt: "Ingeniería",
    description: "Servicio de ingeniería",
  },
  servicios_educacion: {
    name: "editar/imagenes/servicios/educacion.png",
    alt: "Educación",
    description: "Servicio de educación",
  },
  servicios_fabricacion_digital: {
    name: "editar/imagenes/servicios/fabricacion_digital.png",
    alt: "Fabricación digital",
    description: "Servicio de fabricación digital",
  },
  proyectos_memoria_tanque: {
    name: "editar/imagenes/proyectos/memoria_de_calculo_base_de_tanque_para_mina.png",
    alt: "Memoria de cálculo base de tanque para mina",
    description: "Memoria de cálculo base de tanque para mina",
  },
  proyectos_memoria_escalera: {
    name: "editar/imagenes/proyectos/planos_de_fabricacion_de_escalera_de_acceso_a_poza_de_estacion_de_combustible_para_mina.png",
    alt: "Planos de fabricación de escalera",
    description: "Planos de fabricación de escalera de acceso a poza",
  },
  proyectos_memoria_transformador: {
    name: "editar/imagenes/proyectos/memoria_de_calculo_soporte_de_transformador_movil.png",
    alt: "Memoria de cálculo soporte de transformador móvil",
    description: "Memoria de cálculo soporte de transformador móvil",
  },
  proyectos_memoria_andamio: {
    name: "editar/imagenes/proyectos/memoria_de_calculo_andamio_colgante_para_puerto.png",
    alt: "Memoria de cálculo andamio colgante para puerto",
    description: "Memoria de cálculo andamio colgante para puerto",
  },
  marca_logo: {
    name: "editar/imagenes/marca/JP_LOGO_1.png",
    alt: "Logo JP 3D",
    description: "Logotipo principal de JP 3D",
  },
  marca_mision: {
    name: "editar/imagenes/marca/mision_jp3d.png",
    alt: "Misión JP3D",
    description: "Imagen de misión",
  },
  marca_vision: {
    name: "editar/imagenes/marca/vision_jp3d.png",
    alt: "Visión JP 3D",
    description: "Imagen de visión",
  },
  sobre_nosotros_equipo: {
    name: "editar/imagenes/sobre-nosotros/equipo_jp3d.png",
    alt: "Equipo JP 3D",
    description: "Imagen del equipo",
  },
  sobre_nosotros_historia: {
    name: "editar/imagenes/sobre-nosotros/historia_jp3d.png",
    alt: "Historia JP 3D",
    description: "Imagen de historia",
  },
} satisfies Record<string, Image>;

export const imageByName = Object.fromEntries(
  Object.entries(images).map(([_key, value]) => [value.name, value]),
) satisfies Record<string, Image>;

export const imageSrc = (image: Image) =>
  `https://jp3doficial.com/${image.name}`;
