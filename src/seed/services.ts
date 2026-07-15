import configPromise from "@payload-config";
import {
  convertMarkdownToLexical,
  editorConfigFactory,
  type SanitizedServerEditorConfig,
} from "@payloadcms/richtext-lexical";
import type { Service } from "@/payload-types";
import { slugify } from "@/shared/lib/utils";
import { getPayloadClient } from "./payload";
import { uploadMediaFromExternalUrl } from "./utils";

const servicesData = [
  {
    title: "INGENIERÍA",
    image: "https://www.hlcsac.com/images/sector-mineria.jpg",
    excerpt: `Nuestro servicio de **Ingeniería** abarca todo el ciclo de desarrollo técnico: desde la conceptualización inicial y el modelado 3D hasta la verificación numérica avanzada y la documentación lista para fabricación. Trabajamos con **SolidWorks** y **ANSYS** como plataformas principales para validar esfuerzos mecánicos, deformaciones estructurales, fatiga de materiales  y durabilidad operativa bajo condiciones reales de servicio.

    Acompañamos a cada cliente durante todas las etapas del proyecto, integrando ingeniería mecánica, estructural y de procesos dentro de un flujo de trabajo colaborativo que reduce errores, minimiza retrabajos. Cada entregable está pensado para ser directamente utilizable por el equipo de fabricación, operaciones o certificación del cliente.`,
    content: `En **JP 3D** entendemos que un proyecto exitoso comienza con una ingeniería sólida. Nuestro servicio integra todas las etapas del desarrollo técnico, desde la conceptualización inicial hasta la generación de documentación lista para fabricación y certificación.

### ¿Qué hacemos?

Trabajamos con herramientas de última generación como **SolidWorks** y **ANSYS**, permitiéndonos desarrollar modelos tridimensionales precisos y validar su desempeño mediante simulaciones avanzadas. Analizamos variables críticas como:

* Esfuerzos mecánicos
* Deformaciones estructurales
* Fatiga de materiales
* Vibraciones
* Transferencia térmica
* Durabilidad operativa

### Un enfoque integral

Integramos ingeniería mecánica, estructural y de procesos dentro de un flujo de trabajo colaborativo que reduce errores, minimiza retrabajos y acelera la transición entre la idea y la producción.

Nuestros entregables incluyen:

* Planos de fabricación detallados
* Modelos CAD 3D
* Memorias de cálculo
* Listas de materiales (BOM)
* Informes técnicos
* Documentación para certificación

### Experiencia aplicada a la industria

Nuestro equipo multidisciplinario está conformado por profesionales con experiencia en sectores como minería, energía, manufactura e infraestructura. Esta combinación de conocimientos nos permite desarrollar soluciones adaptadas a las condiciones reales de operación y mantenimiento de cada cliente.

### Valor para tu proyecto

Al trabajar con **JP 3D**, obtienes soluciones optimizadas en rendimiento, costo y seguridad. Cada diseño es evaluado bajo criterios de factibilidad técnica y económica, garantizando proyectos confiables, escalables y preparados para cumplir con los estándares regulatorios más exigentes del mercado.`,
  },
  {
    title: "FABRICACIÓN DIGITAL",
    image: "https://www.hlcsac.com/images/sector-industria.jpg",
    excerpt: `Nuestro servicio de **Fabricación Digital** convierte modelos CAD en piezas físicas funcionales en cuestión de horas. Combinamos **impresión 3D FDM y SLA, corte y grabado láser, y CNC router** para producir prototipos, piezas únicas y series cortas con rapidez, precisión y flexibilidad, acelerando el desarrollo de productos y reduciendo significativamente los tiempos de entrega.

Cada proyecto se desarrolla dentro de un entorno completamente digital. Antes de fabricar, optimizamos variables clave como la orientación de las piezas, las estrategias de rebanadoy las trayectorias de mecanizado, maximizando la eficiencia y reduciendo costos sin comprometer la calidad final.`,
    content: `Nuestro servicio de **Fabricación Digital** transforma diseños virtuales en piezas físicas funcionales mediante tecnologías avanzadas de producción. Combinamos rapidez, precisión y flexibilidad para acelerar el desarrollo de productos y reducir significativamente los tiempos de entrega.

### Tecnologías disponibles

Contamos con una infraestructura de fabricación capaz de abordar proyectos de diferentes niveles de complejidad:

* Impresión 3D FDM
* Impresión 3D SLA
* Corte y grabado láser
* CNC Router
* Prototipado rápido
* Producción de series cortas

### Flujo de trabajo digital

Cada proyecto se desarrolla dentro de un entorno completamente digital. Antes de fabricar, optimizamos aspectos clave como:

* Orientación de las piezas
* Estrategias de rebanado
* Trayectorias de mecanizado
* Consumo de material
* Tiempo de producción

Este enfoque permite maximizar la eficiencia y reducir costos sin comprometer la calidad final.

### Acabados y control de calidad

Una vez fabricadas las piezas, aplicamos procesos complementarios para mejorar su apariencia y funcionalidad:

* Lijado y pulido
* Mecanizado de precisión
* Pintura técnica
* Ensamble de componentes
* Verificación dimensional

Gracias a estos procedimientos, logramos tolerancias de hasta **±0.1 mm** y acabados aptos para aplicaciones industriales exigentes.

### Producción flexible y escalable

Fabricamos desde una sola unidad hasta lotes de producción limitados, permitiendo a nuestros clientes validar diseños, reducir inventarios y responder rápidamente a las necesidades del mercado.

Cada entrega incluye controles de calidad, trazabilidad de materiales y documentación técnica que garantizan consistencia, repetibilidad y confianza en cada pieza producida. Con **JP 3D**, la fabricación digital se convierte en una herramienta estratégica para innovar más rápido y con menor riesgo.`,
  },
];

export async function seedServices() {
  const payload = await getPayloadClient();
  const config = await configPromise;
  const editorConfig: SanitizedServerEditorConfig =
    await editorConfigFactory.default({ config });

  for (const [index, service] of servicesData.entries()) {
    const imageId = await uploadMediaFromExternalUrl(
      payload,
      service.image,
      service.title,
    );

    if (!imageId) {
      payload.logger.error(
        `Failed to upload image for service: ${service.title}`,
      );
      continue;
    }

    const lexicalExcerpt = convertMarkdownToLexical({
      markdown: service.excerpt,
      editorConfig,
    }) as Service["excerpt"];

    const lexicalContent = convertMarkdownToLexical({
      markdown: service.content,
      editorConfig,
    }) as Service["content"];

    const data = {
      title: service.title,
      slug: slugify(service.title),
      image: imageId,
      excerpt: lexicalExcerpt,
      content: lexicalContent,
      order: (index + 1) * 10,
    };

    const existing = await payload.find({
      collection: "services",
      where: {
        title: {
          equals: service.title,
        },
      },
      limit: 1,
    });

    if (existing.totalDocs > 0) {
      await payload.update({
        collection: "services",
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      });
      continue;
    }

    await payload.create({
      collection: "services",
      data,
      overrideAccess: true,
    });
  }

  payload.logger.info("Seed completed: services.");
}
