import configPromise from "@payload-config";
import {
  convertMarkdownToLexical,
  editorConfigFactory,
  type SanitizedServerEditorConfig,
} from "@payloadcms/richtext-lexical";
import type { Project } from "@/payload-types";
import { slugify } from "@/shared/lib/utils";
import { getPayloadClient } from "./payload";
import { uploadMediaFromUrl } from "./utils";

const projectsData = [
  {
    title: "Memoria de cálculo base de tanque para mina",
    image:
      "editar/imagenes/proyectos/memoria_de_calculo_base_de_tanque_para_mina.png",
    excerpt:
      "Diseño y verificación de una base metálica para tanque rectangular de combustible de 3 000 L en condiciones de operación minera, considerando cargas estáticas, sísmicas y de mantenimiento.",
    content: `El objetivo del proyecto fue diseñar y verificar una base metálica capaz de soportar un tanque rectangular de combustible de **3 000 L** en condiciones de operación minera. Para ello se definieron las combinaciones de carga que incluyen peso propio, llenado completo del tanque, empuje sísmico zona 3 según la **NTE E.030**, y acciones de mantenimiento (trabajos de soldadura y acceso de personal).

### Modelo estructural

El modelo se desarrolló en **SolidWorks 2024** y se exportó a **ANSYS Workbench** para el análisis por elementos finitos. Se aplicaron las propiedades del acero *ASTM A36*, un módulo de elasticidad de *200 GPa* y un límite de fluencia de *250 MPa*. Se incorporaron las rigideces de anclajes *M20 – Grado 8.8* y una losa de concreto *f'c = 280 kg/cm²*.

### Resultados

* Tensiones máximas: **148 MPa** (≤ 0.6 Fy)
* Flechas: **1.4 mm** (≤ L/360)
* Factor de seguridad global: **1.75**

### Recomendaciones

Con base en los resultados se validó el espesor de la placa base de **10 mm**, el patrón de diafragmas transversales y la malla de platabandas de reflejo, garantizando un comportamiento elástico ante las combinaciones de servicio y excepcionales. Se recomendó un acabado de **galvanizado en caliente de 100 µm** y protección catódica para prolongar la vida útil a más de **20 años** en ambiente corrosivo **C3**.

### Entregables

El informe de memoria de cálculo incluye planos de fabricación, fichas de soldadura *WPS – PQR* y procedimiento de montaje en mina.`,
  },
  {
    title:
      "Planos de fabricación de escalera de acceso a poza de estación de combustible para mina",
    image:
      "editar/imagenes/proyectos/planos_de_fabricacion_de_escalera_de_acceso_a_poza_de_estacion_de_combustible_para_mina.png",
    excerpt:
      "El proyecto consistió en el diseño y elaboración de planos de fabricación para una escalera metálica modular destinada a proporcionar acceso seguro a la poza de abastecimiento de combustible en una unidad minera, cumpliendo con normativas de seguridad laboral y resistencia estructural.",
    content: `El encargo consistió en elaborar los planos de fabricación de una escalera metálica modular que permite el acceso seguro a la poza de abastecimiento de combustible de una unidad minera. Se definió una inclinación de **35°** para cumplir con la **NTP 399.010** (equivalente a *OSHA 1910 Subpart D*) y facilitar el ascenso con botas y equipo de protección personal.

### Configuración estructural

La estructura principal se diseñó con largueros de canal **C 150 × 50 × 20** (*ASTM A36*) y peldaños tipo *grating antideslizante* de **30 × 5 mm**. Los pasamanos se fabricarán con tubería *schedule 40* de **1 ½ in** y un sistema de barandas intermedias a *mid-span* para prevenir caídas.

### Sistema de unión

Todas las uniones son atornilladas con pernos **A325**, lo que permite desmontaje y traslado rápidos en interior mina.

### Planos y entregables

* Despiece individual
* Soldaduras *WPS — GMAW*
* Listado de materiales
* Ficha de pintura epóxica de alto espesor (*DFT 250 µm*) resistente a derrames de diésel

Además, se adjuntó un procedimiento de inspección visual y dimensional que garantiza la conformidad antes de la galvanización en caliente y el envío al sitio.`,
  },
  {
    title: "Memoria de cálculo soporte de transformador móvil",
    image:
      "editar/imagenes/proyectos/memoria_de_calculo_soporte_de_transformador_movil.png",
    excerpt:
      "Diseño y verificación de un bastidor portante para un transformador móvil de 5 MVA, considerando cargas dinámicas de transporte en rutas no pavimentadas, con énfasis en la integridad estructural y la seguridad durante el izaje y la descarga.",
    content: `Este estudio aborda el diseño y la verificación de un bastidor portante para un transformador móvil de **5 MVA** que será transportado sobre cama baja en rutas no pavimentadas. Se definieron los casos de carga correspondientes a frenado de emergencia, aceleración lateral en curvas de radio reducido y la combinación vertical de peso propio + sobrecarga dinámica de *1.4 g* según la norma **AASHTO LRFD 2017** para puentes móviles.

### Modelo y análisis

El modelo estructural se elaboró con vigas *IPE 300* y travesaños *HSS 200 × 100 × 6 mm*, generándose un mallado sólido de **115 000 elementos** en *ANSYS Mechanical*. Las tensiones de *Von Mises* se mantuvieron por debajo de **160 MPa** (*0.64 Fy*) y la deformada global no superó los **3 mm**, garantizando la alineación de los bujes de montaje del transformador durante el transporte y la descarga.

### Recomendaciones de montaje

Se recomendó el uso de pernos de alta resistencia **ASTM A490** de *1 in* para la unión entre largueros y ménsulas, así como topes de caucho *NR 70 ShA* para amortiguar vibraciones de hasta **15 Hz**.

### Control de calidad

El informe incluye instrucciones de izaje, secuencia de soldadura *SMAW* y criterios de inspección (*VT*, *MT* y pruebas de torsión) que aseguran la integridad del bastidor a lo largo de su vida útil en campo.`,
  },
  {
    title: "Memoria de cálculo andamio colgante para puerto",
    image:
      "editar/imagenes/proyectos/memoria_de_calculo_andamio_colgante_para_puerto.png",
    excerpt:
      "El proyecto comprende la verificación estructural de un andamio colgante de 12 m × 6 m destinado a labores de mantenimiento de defensas y tuberías en un muelle comercial, considerando cargas de trabajo, peso propio, sobrepeso por herramientas y acción simultánea de viento para zona costera expuesta.",
    content: `El proyecto comprende la verificación estructural de un andamio colgante de **12 m × 6 m** destinado a labores de mantenimiento de defensas y tuberías en un muelle comercial. Se consideraron las cargas de trabajo de *2.0 kN/m²* según **EN 12811-1**, el peso propio del sistema, el sobrepeso por herramientas y la acción simultánea de viento de *0.6 kN/m²* para zona costera expuesta (**EN 1991-1-4**, categoría *III*).

### Modelo y resultados

El modelo se construyó en *Revit* y se exportó a **SAP2000 v25**; se utilizaron perfiles tubulares de acero galvanizado *S355 JR* y plataformas de aluminio antideslizante. Los resultados arrojaron:

* Factores de uso **≤ 0.78**
* Desplazamientos horizontales máximos de **9 mm**, cumpliendo el límite de *L/200* exigido por la norma

Se verificaron además los anclajes químicos *M16* en hormigón *C30/37*, obteniendo un coeficiente de seguridad de **2.1** frente a extracción.

### Plan de montaje

El informe incluye un plan de montaje paso a paso, certificados de soldadura *MIG* conforme a **ISO 9606-1**, y recomendaciones de inspección diaria de cuerdas y guardacabos.

### Protección y durabilidad

Se sugiere recubrimiento epóxico marino de **250 µm** y controles de corrosión bianuales para garantizar una vida útil de **diez años** en ambiente salino.`,
  },
];

export async function seedProjects() {
  const payload = await getPayloadClient();
  const config = await configPromise;
  const editorConfig: SanitizedServerEditorConfig =
    await editorConfigFactory.default({ config });

  for (const [index, project] of projectsData.entries()) {
    const imageId = await uploadMediaFromUrl(
      payload,
      project.image,
      project.title,
    );

    if (!imageId) {
      payload.logger.error(
        `Failed to upload image for project: ${project.title}`,
      );
      continue;
    }

    const lexicalContent = convertMarkdownToLexical({
      markdown: project.content,
      editorConfig,
    }) as Project["content"];

    const data = {
      title: project.title,
      slug: slugify(project.title),
      image: imageId,
      excerpt: project.excerpt,
      content: lexicalContent,
      order: (index + 1) * 10,
    };

    const existing = await payload.find({
      collection: "projects",
      where: {
        title: {
          equals: project.title,
        },
      },
      limit: 1,
    });

    if (existing.totalDocs > 0) {
      await payload.update({
        collection: "projects",
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      });
      continue;
    }

    await payload.create({
      collection: "projects",
      data,
      overrideAccess: true,
    });
  }

  payload.logger.info("Seed completed: projects.");
}
