---
title: "Backlog del Producto: Módulo Web de Cotización para Impresión 3D"
subtitle: "Documento de Backlog del Producto"
author: "Yenaro Joel Noa Camino"
date: "Junio 2026"
lang: es

toc: true
numbersections: true

fontsize: 12pt
mainfont: "Times New Roman"
monofont: "DejaVu Sans Mono"
geometry: margin=2.5cm
linestretch: 1.5

colorlinks: true
linkcolor: blue

header-includes:
  - \usepackage{setspace}
  - \usepackage{parskip}
  - \setlength{\parindent}{0pt}
  - \usepackage{fontspec}
  - \setmonofont{DejaVu Sans Mono}

---

# Información general

**Proyecto:** Módulo Web de Cotización para Impresión 3D (cotizador 3D)

**Versión:** 1.0.0

**Responsable:** Yenaro Joel Noa Camino

**Stack objetivo:** Next.js 16 + React 19 + Payload 3.84 (solo CMS del sitio) + Three.js + React Three Fiber + Drei + Tailwind v4 + shadcn/ui (base-nova)

**Ruta del módulo:** `/cotizador` (página independiente)

**Ubicación del código:** `src/modules/cotizador/` (consumido por `src/app/(frontend)/cotizador/page.tsx`)

# Objetivo del backlog

Traducir los requisitos del documento `ALCANCE-COTIZADOR.md` (RF-001..006, RNF-001..006, RN-001..007, CU-001..011) en historias de usuario, épicas y tareas técnicas implementables, priorizadas por valor de negocio y dependencias técnicas, para guiar el desarrollo iterativo del módulo de cotización en una primera versión 100 % cliente.

# Épicas

| Código  | Épica                                          | Trazabilidad ALCANCE              |
| ------- | ---------------------------------------------- | --------------------------------- |
| E-001   | Carga y validación de modelos 3D               | RF-001, CU-001/002/011, RN-001    |
| E-002   | Visualización 3D interactiva                   | RF-002, CU-004                    |
| E-003   | Cálculo geométrico automático                  | RF-003                            |
| E-004   | Configuración de impresión                     | RF-004, CU-005/006/007/008, RN-002..006 |
| E-005   | Motor de cotización y desglose                 | RF-005, CU-009                    |
| E-006   | Gestión del modelo activo                      | RF-006, CU-002/003, RN-007        |
| E-007   | Catálogo de materiales y parámetros globales   | Sección "Modelo de datos"         |
| E-008   | UI/UX, layout responsive y accesibilidad       | RNF-004, RNF-006                  |
| E-009   | Performance, seguridad y limpieza de memoria   | RNF-001, RNF-002, RNF-005         |
| E-010   | Solicitar cotización por WhatsApp              | CU-010, RNF-003                   |

# Historias de usuario

## HU-001 · Cargar modelo 3D

**Como:** visitante del sitio

**Quiero:** subir un archivo `.stl` o `.glb` mediante botón o arrastrar y soltar

**Para:** ver mi modelo en 3D y obtener una cotización estimada

**Criterios de aceptación:**

- Acepta `.stl` y `.glb`; rechaza cualquier otra extensión con mensaje claro.
- Soporta selección por clic y drag & drop en una zona visible.
- Valida MIME y tamaño máximo (configurable, default 25 MB).
- Detecta archivos corruptos o vacíos y muestra error sin romper la UI.
- Solo un modelo activo a la vez (RN-001).
- Si la carga falla, no quedan restos del modelo previo.

**Prioridad:** Alta

**Épica:** E-001

**Trazabilidad:** RF-001, CU-001, CU-011

## HU-002 · Reemplazar modelo activo

**Como:** visitante

**Quiero:** cargar un nuevo modelo sustituyendo al actual

**Para:** corregir mi selección sin recargar la página

**Criterios de aceptación:**

- Al cargar un nuevo modelo se elimina el anterior y se libera memoria (RNF-002).
- Se reinician escala, relleno, material y cantidad a valores por defecto (RN-007).
- Se oculta la cotización y la información geométrica anteriores.

**Prioridad:** Alta

**Épica:** E-001, E-006

**Trazabilidad:** RF-006, CU-002, RN-007

## HU-003 · Eliminar modelo activo

**Como:** visitante

**Quiero:** quitar el modelo actual con un botón

**Para:** dejar el visor vacío y empezar de nuevo

**Criterios de aceptación:**

- Botón explícito "Eliminar modelo".
- Tras eliminar, el visor queda en estado vacío (sin geometría, sin sombras residuales).
- Se ocultan panel de información y desglose de cotización.

**Prioridad:** Alta

**Épica:** E-006

**Trazabilidad:** RF-006, CU-003

## HU-004 · Visualizar y explorar el modelo 3D

**Como:** visitante

**Quiero:** rotar, hacer zoom y desplazar la cámara

**Para:** revisar el modelo desde todos los ángulos

**Criterios de aceptación:**

- Cámara orbital fluida con `OrbitControls` de Drei.
- Zoom con rueda y pinch táctil; pan con click derecho o dos dedos.
- Encuadre automático al cargar.
- Ejes X/Y/Z y cuadrícula visibles.
- Iluminación y sombras básicas.
- Color de fondo configurable (default: tema del sitio).

**Prioridad:** Alta

**Épica:** E-002

**Trazabilidad:** RF-002, CU-004

## HU-005 · Ajustar escala uniforme

**Como:** visitante

**Quiero:** modificar la escala global del modelo en porcentaje (0–1000 %)

**Para:** estimar el precio a distintos tamaños sin re-exportar

**Criterios de aceptación:**

- Slider 0–1000 % en pasos de 1 %.
- Refleja el cambio en el visor en tiempo real.
- Recalcula volumen, área, peso y precio.
- Botón "Restablecer" vuelve a la escala original (100 %).

**Prioridad:** Alta

**Épica:** E-004

**Trazabilidad:** RF-004, CU-005

## HU-006 · Ajustar escala por eje

**Como:** visitante

**Quiero:** escalar X, Y, Z de forma independiente

**Para:** deformar proporcionalmente piezas no cúbicas

**Criterios de aceptación:**

- Tres inputs numéricos o sliders por eje.
- Validación de no-negatividad.
- El visor y la cotización se actualizan al instante.

**Prioridad:** Media

**Épica:** E-004

**Trazabilidad:** RF-004, CU-005

## HU-007 · Configurar porcentaje de relleno (infill)

**Como:** visitante

**Quiero:** elegir el porcentaje de relleno entre 0 % y 100 %

**Para:** ajustar resistencia y consumo de material

**Criterios de aceptación:**

- Selector en pasos de 5 %.
- Default 20 %.
- Aplica solo al volumen interno (RN-002), manteniendo el volumen de cáscara.
- El volumen cotizado nunca es inferior al volumen de la cáscara (RN-003).

**Prioridad:** Alta

**Épica:** E-004

**Trazabilidad:** RF-004, CU-006, RN-002, RN-003

## HU-008 · Seleccionar material

**Como:** visitante

**Quiero:** elegir entre PLA, PETG, ABS, TPU u otros configurables

**Para:** estimar el costo según el material deseado

**Criterios de aceptación:**

- Catálogo con: identificador, nombre, densidad (g/cm³), precio por kg, color representativo, factor de ajuste.
- Default: PLA.
- El factor de ajuste modifica el costo del material antes del margen (RN-006).
- Al cambiar material se recalcula el peso y el precio en tiempo real.

**Prioridad:** Alta

**Épica:** E-004, E-007

**Trazabilidad:** RF-004, CU-007, RN-006

## HU-009 · Definir cantidad de copias

**Como:** visitante

**Quiero:** indicar cuántas unidades imprimir (mínimo 1)

**Para:** estimar el costo total del lote

**Criterios de aceptación:**

- Input numérico entero ≥ 1 (RN-004).
- Default 1.
- Multiplica el costo unitario antes del margen final.

**Prioridad:** Alta

**Épica:** E-004

**Trazabilidad:** RF-004, CU-008, RN-004

## HU-010 · Ver información geométrica

**Como:** visitante

**Quiero:** ver dimensiones, volumen, área y escala aplicada del modelo

**Para:** entender el cálculo detrás de la cotización

**Criterios de aceptación:**

- Muestra ancho (X), alto (Y), profundidad (Z) en mm.
- Muestra volumen en cm³ y área superficial en cm².
- Muestra factor de conversión de unidades.
- Muestra escala uniforme y por eje aplicadas.
- Se actualiza en tiempo real al cambiar escala.

**Prioridad:** Alta

**Épica:** E-003

**Trazabilidad:** RF-003

## HU-011 · Ver desglose de cotización

**Como:** visitante

**Quiero:** ver el desglose: volumen total, volumen con relleno, peso estimado, costo de material, costo fijo, margen y precio final

**Para:** entender cómo se compone el precio

**Criterios de aceptación:**

- Visible solo cuando hay modelo cargado.
- Recalcula en < 100 ms tras cualquier cambio (RNF-001).
- Precio final formateado como `S/ 12.50` (Intl.NumberFormat, PEN).
- Redondeo a 2 decimales (RN-005).
- Aplicada la fórmula del anexo del ALCANCE.

**Prioridad:** Alta

**Épica:** E-005

**Trazabilidad:** RF-005, CU-009, RN-005

## HU-012 · Solicitar cotización por WhatsApp

**Como:** visitante

**Quiero:** pulsar "Solicitar cotización" y obtener un mensaje pre-armado para enviar por WhatsApp

**Para:** iniciar la conversación comercial con un resumen ya listo

**Criterios de aceptación:**

- Botón visible solo cuando hay modelo y cotización.
- Abre un dialog con un bloque de texto editable tipo:
  > "Buenas, quisiera saber más sobre mi cotización. Salió S/ XX. Le inserto una captura. Espero su respuesta."
- El número de WhatsApp destino viene de `shared/config/contact.ts` (o variable de entorno).
- El botón "Enviar" abre `https://wa.me/<numero>?text=<msg>` en nueva pestaña.
- El bloque es solo un placeholder: el cliente debe revisar y enviar manualmente.

**Prioridad:** Alta

**Épica:** E-010

**Trazabilidad:** CU-010

## HU-013 · Recibir errores de carga claros

**Como:** visitante

**Quiero:** ver un mensaje claro cuando mi archivo no es válido

**Para:** corregir y reintentar sin frustrarme

**Criterios de aceptación:**

- Mensaje específico para: extensión no soportada, archivo > límite, archivo corrupto, archivo vacío.
- Mensaje visible y accesible (lectores de pantalla).
- La UI no queda en estado inconsistente.

**Prioridad:** Alta

**Épica:** E-001

**Trazabilidad:** RF-001, CU-011

## HU-014 · Usar el módulo en móvil y escritorio

**Como:** visitante desde un teléfono o tablet

**Quiero:** que la interfaz sea responsive y usable con touch

**Para:** cotizar en cualquier dispositivo

**Criterios de aceptación:**

- Layout adaptable a partir de 360 px de ancho (RNF-004).
- Gestos táctiles funcionales en el visor.
- Controles accesibles por teclado (tab, enter, flechas).

**Prioridad:** Media

**Épica:** E-008

**Trazabilidad:** RNF-004, RNF-006

## HU-015 · Detección de entorno no soportado

**Como:** visitante con un navegador sin WebGL 2

**Quiero:** ver un mensaje amigable explicando el problema

**Para:** saber que no es un fallo del sitio

**Criterios de aceptación:**

- Detección de WebGL 2 al montar el visor.
- Si no hay soporte, se muestra mensaje en lugar del Canvas.
- El resto de la UI (uploader, controles) sigue usable para no bloquear al usuario.

**Prioridad:** Media

**Épica:** E-008, E-009

**Trazabilidad:** RNF-004, RNF-002

# Tareas técnicas

| ID     | Tarea                                                                 | Épica     | Tipo      | Prioridad | Estado     |
| ------ | --------------------------------------------------------------------- | --------- | --------- | --------- | ---------- |
| T-001  | Crear estructura de carpetas `src/modules/cotizador/`                 | Todas     | Setup     | Alta      | Pendiente  |
| T-002  | Instalar `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` | E-002     | Setup     | Alta      | Pendiente  |
| T-003  | Descargar decoders Draco a `public/draco/` y configurar `DRACOLoader`  | E-002     | Setup     | Alta      | Pendiente  |
| T-004  | Implementar `lib/loaders.ts` (STLLoader + GLTFLoader con Draco)        | E-001     | Frontend  | Alta      | Pendiente  |
| T-005  | Implementar `lib/geometry.ts` (volumen, área, dimensiones en mm/cm³)   | E-003     | Lógica    | Alta      | Pendiente  |
| T-006  | Implementar `lib/quotation-engine.ts` con fórmula parametrizable       | E-005     | Lógica    | Alta      | Pendiente  |
| T-007  | Crear `config/materials.ts` con PLA, PETG, ABS, TPU                   | E-007     | Datos     | Alta      | Pendiente  |
| T-008  | Crear `config/pricing.ts` con costo_fijo, margen, max MB, currency     | E-007     | Datos     | Alta      | Pendiente  |
| T-009  | Implementar `context/quotation-context.tsx` (Provider + hook)         | E-006     | Frontend  | Alta      | Pendiente  |
| T-010  | Componente `uploader.tsx` (drag & drop + file input)                  | E-001     | Frontend  | Alta      | Pendiente  |
| T-011  | Componente `viewer-3d.tsx` + `scene/model.tsx` (Canvas, modelo, luces)| E-002     | Frontend  | Alta      | Pendiente  |
| T-012  | `scene/camera-controls.tsx` (OrbitControls Drei)                      | E-002     | Frontend  | Alta      | Pendiente  |
| T-013  | `scene/helpers.tsx` (ejes, cuadrícula, sombras)                       | E-002     | Frontend  | Media     | Pendiente  |
| T-014  | `scale-controls.tsx` (uniforme, por eje, reset)                        | E-004     | Frontend  | Alta      | Pendiente  |
| T-015  | `infill-slider.tsx`                                                   | E-004     | Frontend  | Alta      | Pendiente  |
| T-016  | `material-picker.tsx`                                                 | E-004     | Frontend  | Alta      | Pendiente  |
| T-017  | `quantity-input.tsx`                                                  | E-004     | Frontend  | Alta      | Pendiente  |
| T-018  | `geometry-info.tsx`                                                   | E-003     | Frontend  | Alta      | Pendiente  |
| T-019  | `cost-breakdown.tsx`                                                  | E-005     | Frontend  | Alta      | Pendiente  |
| T-020  | `request-quote-dialog.tsx` + `lib/whatsapp.ts`                         | E-010     | Frontend  | Alta      | Pendiente  |
| T-021  | Crear `src/app/(frontend)/cotizador/page.tsx`                          | Todas     | Setup     | Alta      | Pendiente  |
| T-022  | Layout split responsive (panel izq + visor der)                       | E-008     | Frontend  | Alta      | Pendiente  |
| T-023  | Botón "Eliminar modelo" con confirmación                              | E-006     | Frontend  | Alta      | Pendiente  |
| T-024  | Validación de tamaño máximo configurable                               | E-001     | Lógica    | Alta      | Pendiente  |
| T-025  | Detección de WebGL 2 + fallback amigable                               | E-008     | Frontend  | Media     | Pendiente  |
| T-026  | Limpieza de geometría y dispose de materiales al reemplazar/eliminar   | E-009     | Lógica    | Alta      | Pendiente  |
| T-027  | Pruebas manuales cross-browser (Chrome, Edge, Firefox, Safari)         | E-008     | QA        | Media     | Pendiente  |
| T-028  | Metadatos SEO de `/cotizador` (title, description, OG)                 | E-008     | Setup     | Baja      | Pendiente  |
| T-029  | Configurar número de WhatsApp en `shared/config/constants.ts`          | E-010     | Setup     | Alta      | Pendiente  |
| T-030  | `lib/format.ts` (Intl.NumberFormat PEN → "S/ 12.50")                   | E-005     | Lógica    | Alta      | Pendiente  |
| T-031  | Indicador de carga mientras se parsea el archivo                       | E-001     | Frontend  | Media     | Pendiente  |

# Priorización (MoSCoW)

**Must (imprescindible para v1):**

HU-001, HU-002, HU-003, HU-004, HU-005, HU-007, HU-008, HU-009, HU-010, HU-011, HU-012, HU-013
T-001..T-012, T-014..T-022, T-024, T-026, T-029, T-030

**Should (importante, deseable en v1):**

HU-006, HU-014, HU-015
T-013, T-023, T-025, T-027, T-031

**Could (mejoras, post-v1):**

T-028 (SEO avanzado, schema.org Offer)

**Won't (fuera de v1, ya en ALCANCE):**

Multi-modelo, persistencia, autenticación, slicing real, OBJ/FBX, integración WooCommerce/OctoPrint, pasarela de pago.

## Hitos sugeridos

| Hito   | Alcance                                                                                  |
| ------ | ---------------------------------------------------------------------------------------- |
| H1     | T-001..T-005, T-024 → carga STL/GLB funcional con cálculo geométrico (sin UI bonita)     |
| H2     | T-006..T-012, T-014..T-019, T-030 → visor + controles + cotización reactiva en pantalla |
| H3     | T-013, T-022, T-023, T-025, T-026, T-031 → pulido UI, responsive, limpieza memoria       |
| H4     | T-020, T-029 → flujo de "Solicitar cotización" por WhatsApp                              |
| H5     | T-027, T-028 → QA cross-browser + SEO                                                   |

# Dependencias

## Librerías nuevas

- `three` (última estable compatible con R3F 9).
- `@react-three/fiber` ^9 (declarativo React sobre Three.js).
- `@react-three/drei` ^10 (OrbitControls, Environment, Center, Bounds, Grid, Axes, useGLTF).
- `@types/three` (dev).
- Decoders Draco en `public/draco/` (descargados del repo Khronos).

## Librerías existentes reutilizadas

- shadcn/ui: `button`, `input`, `slider`, `dialog`, `card`, `label`, `select`, `separator`, `tabs`, `tooltip`, `badge`, `sonner` (notificaciones de error).
- `lucide-react` (iconos: Upload, Trash2, RotateCcw, MessageCircle, etc.).
- `framer-motion` (transiciones suaves en panels).
- `tailwind-merge` + `clsx` (`cn` utility de `@/shared/lib/utils`).
- `Intl.NumberFormat` nativo (sin librería para formato PEN).

## Externas (no agregar en v1)

- Payload: el módulo no usa Payload en v1 (catálogo en TS). Migrable a Global en v2.
- Backend, base de datos, auth, etc.: fuera de alcance.

## Assets

- Decoders Draco (~3 MB) servidos desde `public/draco/`.
- Iconos de shadcn / lucide.
- Sin assets gráficos 3D propios (todo se carga del usuario).

# Riesgos

| ID    | Riesgo                                                                | Impacto | Probabilidad | Mitigación                                                                                |
| ----- | --------------------------------------------------------------------- | ------- | ------------ | ----------------------------------------------------------------------------------------- |
| R-001 | Bundle inicial > 1 MB por Three.js + Drei                            | Alto    | Alta         | Lazy load del módulo `/cotizador` con `next/dynamic` (`ssr: false`); code-splitting      |
| R-002 | GLB con Draco no se carga si los decoders no están en `/public/draco` | Alto    | Media        | T-003 con verificación al inicio; fallback a mensaje claro si faltan decoders            |
| R-003 | Archivos grandes bloquean el hilo principal al parsear                | Alto    | Media        | `Web Worker` para parsing STL/GLB; T-024 valida tamaño antes de procesar                  |
| R-004 | Dispositivo de gama baja sin WebGL 2                                  | Alto    | Baja         | T-025 detección + mensaje amigable; degradación controlada                                |
| R-005 | Catálogo de materiales desactualizado                                | Medio   | Alta         | T-007 centralizado en `config/materials.ts`; changelog documentado; migración a Global v2  |
| R-006 | Fórmula de cotización inexacta vs competencia                         | Medio   | Media        | Documentar fórmula y limitaciones; permitir override por constante                        |
| R-007 | Cambio de API en Three.js / R3F                                       | Bajo    | Baja         | Fijar versiones en `package.json`; pruebas cross-browser en cada release                  |
| R-008 | Número de WhatsApp mal configurado o ausente                          | Alto    | Media        | Variable de entorno validada al build; el dialog deshabilita el botón si falta            |
| R-009 | Memory leak al reemplazar modelo                                      | Alto    | Media        | T-026 `dispose()` explícito de geometría, materiales y texturas antes de cargar nuevo     |
| R-010 | Cálculo de volumen inexacto en mallas no cerradas o no manifold       | Medio   | Media        | Documentar limitación en UI; advertir si la malla parece no ser manifold                   |
