---
title: "Plan de Implementación: Módulo Web de Cotización para Impresión 3D"
subtitle: "Documento de planificación para el desarrollo del módulo de cotización en el sitio web de JP3D"
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

**Proyecto:** Módulo Web de Cotización para Impresión 3D

**Versión:** 1.1.0

**Fecha de inicio:** Junio 2026

**Módulo:** `/cotizador`

**Ubicación de código:** `src/modules/cotizador/` consumido por `src/app/(frontend)/cotizador/page.tsx`

**Stack:** Next.js 16.2.4 + React 19.2.4 + TypeScript strict + Tailwind v4 + shadcn/ui (base-nova) + Biome 2.4.13 + three.js + React Three Fiber + Drei + jsPDF + Nodemailer

**Documentos de referencia:** `ALCANCE-COTIZADOR.md` (requisitos) y `BACKLOG_COTIZADOR.md` (tareas técnicas)

# Objetivo

Definir el orden de construcción, la estrategia de desarrollo y los criterios de salida por fase para entregar el módulo de cotización en una primera versión mayoritariamente frontend, con un único endpoint backend para el envío de correo, funcional, validada en navegadores modernos y desplegada, minimizando retrabajos y maximizando valor temprano.

# Estrategia de implementación

- **Modelo de trabajo:** incremental por hitos, MVP primero, iteraciones posteriores.
- **Criterio de orden:** de base a cima — primero dependencias, estructura y carga de archivos; después visor 3D, cálculo geométrico y motor de cotización; luego pulido UX, responsive y robustez; finalmente lanzamiento con envío de cotización por correo y QA.
- **Validación continua:** cada fase termina con un demo visible en el navegador y un smoke test manual en Chrome.
- **Mitigación temprana de riesgos:** las decisiones arquitectónicas con mayor riesgo (R-001 bundle, R-009 memory, R-013 abuso del endpoint) se aplican en Fases 1 y 3, no al final.
- **Calidad continua:** `pnpm lint` (Biome) y verificación de tipos TS después de cada tarea.
- **Trazabilidad:** cada tarea del plan referencia un ID `T-XXX` del BACKLOG.

# Fases del proyecto

## Fase 1 — Base técnica y carga de modelos

**Objetivo:** La ruta `/cotizador` está operativa, el usuario puede subir un STL o GLB válido, el módulo parsea la geometría y expone dimensiones / volumen / área en consola, sin visor 3D bonito aún.

**Épicas cubiertas:** E-001, E-007, partial E-002 y E-003.

**Hito BACKLOG:** H1.

**Tareas:**

- T-001 · Crear estructura `src/modules/cotizador/` con subcarpetas `components/`, `scene/`, `context/`, `hooks/`, `lib/`, `config/`, `types/` e `index.ts` (barrel).
- T-002 · Instalar `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`. Fijar versiones en `package.json`.
- T-003 · Descargar decoders Draco (`draco_decoder.wasm`, `draco_wasm_wrapper.js`, `draco_decoder.js`) a `public/draco/`.
- T-004 · Implementar `lib/loaders.ts` con `STLLoader` y `GLTFLoader` configurado con `DRACOLoader` apuntando a `/draco/`.
- T-005 · Implementar `lib/geometry.ts` con cálculo de dimensiones, volumen (signed volume of triangles) y área superficial.
- T-007 · Crear `config/materials.ts` con PLA, PETG, ABS, TPU (densidad, precio/kg, color, factor de ajuste).
- T-008 · Crear `config/pricing.ts` con `costo_fijo`, `margen`, `maxFileSizeMB`, `currency = "PEN"`.
- T-024 · Implementar validación de tamaño máximo en el uploader (rechazo con mensaje claro).
- T-021 · Crear `src/app/(frontend)/cotizador/page.tsx` como server component que renderiza el orquestador cliente.
- T-044 · Agregar `quoteValidityDays` (default 15) a `config/pricing.ts`. Configuración global del módulo, conviene fijarla temprano porque la usa la generación del PDF.
- shadcn add: `slider`, `sonner`, `label`, `select` (afecta a `src/shared/components/ui/*` y a `components.json`).
- Rutas: agregar `cotizadorRoute` a `src/shared/config/routes.ts`.
- Navbar: agregar entrada "Cotizador" en `HeaderDesktop` y `HeaderMobile` de `src/shared/components/layout/navbar.tsx`; agregar entrada a `src/shared/data/menu.ts`.

**Criterios de salida:**

- `pnpm build` sin errores.
- `/cotizador` renderiza sin excepciones.
- Subir un `.stl` o `.glb` válido muestra geometría en consola (`console.log` temporal en dev).
- Archivos inválidos, corruptos o que excedan el tamaño son rechazados con mensaje claro.
- La entrada "Cotizador" aparece en el navbar Desktop y en el sheet Mobile.

## Fase 2 — Visor 3D, motor de cotización y desglose

**Objetivo:** El usuario ve el modelo en 3D con cámara orbital, modifica los parámetros de impresión y ve la cotización en tiempo real con el desglose completo formateado en soles.

**Épicas cubiertas:** E-002, E-003, E-004, E-005, E-006, E-009 (parcial).

**Hito BACKLOG:** H2.

**Tareas:**

- T-006 · `lib/quotation-engine.ts` implementando la fórmula del Anexo del ALCANCE con `factor_ajuste_material` antes del margen (RN-006) y redondeo a 2 decimales (RN-005).
- T-009 · `context/quotation-context.tsx` con Provider + hook `useQuotation()` (state, dispatch, derivación de cotización).
- T-010 · `uploader.tsx` con zona de drag & drop + file input integrado al context.
- T-011 · `viewer-3d.tsx` con `<Canvas>` de R3F (importado con `next/dynamic({ ssr: false })`) + `scene/model.tsx`.
- T-012 · `scene/camera-controls.tsx` con `OrbitControls` de Drei.
- T-013 · `scene/helpers.tsx` con `Grid`, `Axes` y luces + sombras.
- T-014 · `scale-controls.tsx` (slider uniforme + sliders por eje + botón reset).
- T-015 · `infill-slider.tsx` (slider 0–100 % en pasos de 5 %).
- T-016 · `material-picker.tsx` (selector con chips de color).
- T-017 · `quantity-input.tsx` (input numérico, mínimo 1).
- T-018 · `geometry-info.tsx` (muestra dimensiones, volumen, área, escala aplicada).
- T-019 · `cost-breakdown.tsx` (muestra componentes: volumen total, volumen con relleno, peso, costo material, costo fijo, margen, precio final).
- T-030 · `lib/format.ts` con `formatPEN(value)` usando `Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' })`.
- Componente orquestador `cotizador-page.tsx` que arma el layout split (panel izquierdo + visor derecho) y conecta todo al context.

**Criterios de salida:**

- Al cargar un modelo se renderiza en el visor con encuadre automático.
- Modificar escala, relleno, material o cantidad actualiza el desglose y el precio en < 100 ms.
- El precio se muestra como `S/ 12.50`.
- Solo un modelo activo a la vez; reemplazar reinicia configuración (RN-007).
- Probar en Chrome que la cotización cambia en tiempo real al mover un slider.

## Fase 3 — UX, responsive, robustez y limpieza de memoria

**Objetivo:** El módulo es usable en cualquier dispositivo desde 360 px de ancho, maneja errores con gracia, no acumula memoria tras varios reemplazos y degrada con un mensaje claro cuando no hay WebGL 2.

**Épicas cubiertas:** E-006 (gestión), E-008, E-009.

**Hito BACKLOG:** H3.

**Tareas:**

- T-022 · Layout split responsive: panel izquierdo colapsable en móvil (sheet o accordion), visor a ancho completo.
- T-023 · Botón "Eliminar modelo" con `Dialog` de confirmación y dispose explícito.
- T-025 · Detección de WebGL 2 al montar el visor con fallback amigable (`@shared/components/ui/alert` o bloque simple).
- T-026 · Hook `useModelDisposer` que llama `geometry.dispose()`, `material.dispose()` y limpia refs al reemplazar/eliminar.
- T-031 · `Skeleton` o `Spinner` durante el parseo del archivo (shadcn `spinner`).
- Toasts con `sonner` para errores (formato, tamaño, corrupto, vacío).
- Accesibilidad: `aria-label` en botones, foco visible, navegación por teclado, `live region` para anuncios de error.

**Criterios de salida:**

- Probado en 360 px, 768 px y 1280 px+ sin overflow ni scroll horizontal.
- Sin memory leaks observables tras 10 reemplazos consecutivos (verificable en DevTools Memory).
- Sin WebGL 2 muestra mensaje y deja usable el resto de la UI.
- `pnpm lint` y `tsc --noEmit` sin warnings ni errores.

## Fase 4 — Lanzamiento, envío de cotización por correo, QA cross-browser y SEO

**Objetivo:** El botón "Enviar cotización" funcional con modal de email y comentario, PDF generado en el cliente, Route Handler de backend con Nodemailer/SMTP, correos enviados al cliente y al negocio, QA manual cross-browser, metadatos SEO configurados y build de producción validado.

**Épicas cubiertas:** E-007 (parcial, T-044), E-010, RNF-003, RNF-007, RNF-008, RNF-009.

**Hito BACKLOG:** H4.

**Tareas:**

La fase se ejecuta en este orden, de base a cima:

1. Instalar dependencias:
   - T-032 · `jspdf` y `@types/jspdf` en frontend.
   - T-033 · `nodemailer` y `@types/nodemailer` en backend.
2. shadcn add: `dialog` (modal de envío de cotización).
3. Crear `src/shared/config/email.ts` con constantes `BUSINESS_EMAIL` y `FROM_EMAIL` (placeholder hasta tener las reales).
4. T-043 · Configurar variables de entorno en `.env.example` (y documentar en `.env.local` para desarrollo): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `BUSINESS_EMAIL`, `FROM_EMAIL`. Documentar valores de ejemplo para Ethereal.
5. T-041 · Crear Route Handler `src/app/api/quote/send/route.ts` (POST). Recibe `multipart/form-data` con `metadata` (JSON con email, comentario, snapshot de parámetros) y `pdf` (Blob).
6. T-042 · Integrar Nodemailer en el Route Handler. Construir el `MailData` con `from = FROM_EMAIL`, `to = BUSINESS_EMAIL`, `cc = email del cliente`, `subject`, `text` con resumen y `attachments` con el PDF. Enviar vía SMTP configurado por env vars. Responder 2xx al frontend o 4xx/5xx con mensaje de error claro.
7. T-034 · Crear `src/modules/cotizador/lib/pdf.ts` con la función `generateQuotePDF(snapshot: QuoteSnapshot): Blob`. Usa jsPDF, formato A4 vertical, ≤ 1 MB (RNF-008).
8. T-035 · Implementar la plantilla del PDF: encabezado con datos del negocio (de `shared/config/email.ts` o constante), fecha de emisión, fecha de vigencia (`fecha_emision + quoteValidityDays`), email del cliente, comentario (si existe), nombre del archivo, dimensiones, volumen, escala aplicada, material, relleno, cantidad, desglose de costos y precio final formateado en PEN.
9. T-036 · Crear `src/modules/cotizador/lib/email-validation.ts` con validación de formato RFC 5322 simplificada (suficiente para RN-008).
10. T-037 · Crear `src/modules/cotizador/components/send-quote-modal.tsx` con shadcn `dialog`: campos email (input) y comentario (textarea), estado de carga (spinner), botón "Enviar" deshabilitado mientras no haya email válido.
11. T-038 · Integrar `email-validation` con la habilitación del botón "Enviar" (RN-008).
12. T-039 · Lógica de bloqueo de reenvío en el `quotation-context`: tras un envío exitoso, marcar `lastSentSnapshot` con el snapshot actual y deshabilitar el botón "Enviar cotización" hasta que el cliente modifique al menos un parámetro (RN-009). Reset al eliminar o reemplazar el modelo.
13. T-040 · Integrar toasts con `sonner`: éxito ("Cotización enviada, revisa tu correo") y error ("No pudimos enviar la cotización, intenta de nuevo").
14. T-045 · En `cotizador-page.tsx`, reemplazar el botón "Solicitar cotización" por "Enviar cotización" y conectarlo al nuevo modal. El botón se deshabilita si no hay modelo, no hay email válido o el snapshot coincide con `lastSentSnapshot`.
15. T-046 · Pruebas manuales con Ethereal: crear cuenta en `smtp.ethereal.email`, configurar `.env.local`, levantar el dev server, recorrer el flujo completo y verificar en el inbox virtual de Ethereal que llega el correo con el PDF adjunto y el contenido correcto (datos del cliente, desglose, vigencia).
16. T-047 · Documentar checklist de go-live (en `docs/` o en `README.md` del módulo): SPF y DKIM del dominio `jp3d.com` configurados correctamente, DNS resuelto, variables de entorno en producción, prueba final con buzón real de un tercero antes de anunciar al público.
17. T-027 · Pruebas manuales en Chrome, Edge, Firefox y Safari (últimas 2 mayores) con flujos ampliados: carga STL, carga GLB, escala, relleno, material, cantidad, eliminar, reemplazar, abrir modal de envío, validar email inválido, enviar y verificar recepción.
18. T-028 · Metadatos SEO de `/cotizador`: `title`, `description`, `openGraph` (title, description, type, url).
19. Build de producción: `pnpm build` + inspección del bundle (Viewer3D lazy + Draco + jsPDF total esperado < 2 MB gzipped).
20. Verificar que `next-sitemap` incluye `/cotizador` (es automático al detectar el page route).
21. Smoke test final del flujo completo: cargar → cotizar → abrir modal → enviar → verificar recepción en Ethereal.

**Criterios de éxito del proyecto:**

- Carga de archivos STL y GLB válidos funciona.
- Archivos inválidos, corruptos o que excedan el tamaño son rechazados con mensaje claro.
- El modelo se visualiza correctamente y se puede orbitar / hacer zoom / pan.
- El usuario puede modificar escala uniforme, escala por eje, relleno, material y cantidad.
- El usuario puede eliminar o reemplazar el modelo activo en cualquier momento.
- La cotización se recalcula automáticamente ante cualquier cambio.
- El visor mantiene ≥ 30 FPS en equipos de gama media.
- El módulo es responsive y usable en dispositivos móviles.
- El botón "Enviar cotización" abre el modal, valida el email, genera el PDF y lo envía al cliente y al negocio, con toasts de éxito o error según corresponda.

# Cronograma estimado

| Fase | Duración    | Horas de desarrollo | Hito BACKLOG | Entregable visible                                       |
| ---- | ----------- | ------------------- | ------------ | -------------------------------------------------------- |
| 1    | 2-3 días    | 12-16h              | H1           | `/cotizador` carga modelos, log de geometría, navbar     |
| 2    | 3-4 días    | 18-24h              | H2           | Visor 3D + cotización reactiva con desglose             |
| 3    | 2 días      | 10-14h              | H3           | Módulo responsive, robusto, sin memory leaks            |
| 4    | 3-4 días    | 16-22h              | H4           | Envío de cotización por correo con PDF + QA + SEO + build |
| **Total** | **10-13 días** | **56-76h**   | —            | Módulo v1.1 en `/cotizador` listo para producción        |

**Notas:**

- Velocidad asumida: ~1 tarea técnica (T-XXX) cada 1.5-2 h, ajustable según experiencia.
- Las Fases 1 y 2 son críticas y secuenciales. Las Fases 3 y 4 admiten compresión si hay presión de tiempo a costa de pulido.
- Cada fase termina con un commit pequeño y un demo verificable en `pnpm dev`.

# Recursos necesarios

## Frameworks y librerías

| Tecnología            | Versión objetivo | Estado actual | Uso                                       |
| --------------------- | ---------------- | ------------- | ----------------------------------------- |
| Next.js               | 16.2.4           | Instalado     | App Router, server/client components      |
| React                 | 19.2.4           | Instalado     | UI, hooks, refs                           |
| Payload CMS           | 3.84.1           | Instalado     | (No se usa en el cotizador en v1)         |
| Tailwind CSS          | v4               | Instalado     | Estilos utility-first                     |
| shadcn/ui (base-nova) | latest           | Instalado     | Componentes UI                            |
| Biome                 | 2.4.13           | Instalado     | Lint + format                             |
| **three**             | latest           | **A instalar** | Render 3D                                 |
| **@react-three/fiber** | latest             | **A instalar** | Bindings React para Three.js              |
| **@react-three/drei**  | latest           | **A instalar** | OrbitControls, Bounds, Center, Grid, Axes  |
| **@types/three**      | latest           | **A instalar** | Tipos TS                                  |
| **jspdf**             | latest           | **A instalar** | Generación de PDF en el cliente (Fase 4)  |
| **@types/jspdf**      | latest           | **A instalar** | Tipos TS (dev)                            |
| **nodemailer**        | latest           | **A instalar** | Envío SMTP desde el Route Handler (Fase 4) |
| **@types/nodemailer** | latest           | **A instalar** | Tipos TS (dev)                            |

## Componentes shadcn/ui a agregar

- `slider` (escala uniforme, relleno)
- `sonner` (toasts de error y feedback)
- `label` (accesibilidad en inputs)
- `select` (selector de material)
- `dialog` (modal de envío de cotización, Fase 4)

## Assets externos

- Decoders Draco (~3 MB) en `public/draco/`:
  - `draco_decoder.wasm`
  - `draco_wasm_wrapper.js`
  - `draco_decoder.js`
- Sin assets 3D propios (los modelos los provee el usuario).

## Archivos del proyecto a modificar o crear

| Archivo                                              | Tipo   | Cambio                                                  |
| ---------------------------------------------------- | ------ | ------------------------------------------------------- |
| `package.json`                                       | Modificar | Agregar deps de three + R3F + drei + jspdf + nodemailer |
| `src/app/(frontend)/cotizador/page.tsx`              | Nuevo  | Server component con metadata                          |
| `src/app/api/quote/send/route.ts`                    | Nuevo  | Route Handler POST que recibe el PDF y los metadatos y envía el correo vía Nodemailer (Fase 4) |
| `src/shared/config/routes.ts`                        | Modificar | Agregar `cotizadorRoute`                             |
| `src/shared/config/email.ts`                         | Nuevo  | Constantes de email del negocio (`BUSINESS_EMAIL`, `FROM_EMAIL`) (Fase 4) |
| `.env.example`                                       | Nuevo o Modificar | Documentar `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `BUSINESS_EMAIL`, `FROM_EMAIL` (Fase 4) |
| `src/shared/data/menu.ts`                            | Modificar | Agregar entrada "Cotizador"                           |
| `src/shared/components/layout/navbar.tsx`            | Modificar | Entrada Desktop + Mobile Sheet                       |
| `src/modules/cotizador/`                             | Nuevo  | Módulo completo (ver BACKLOG)                           |
| `src/modules/cotizador/lib/pdf.ts`                   | Nuevo  | `generateQuotePDF(snapshot): Blob` con jsPDF (Fase 4)   |
| `src/modules/cotizador/lib/email-validation.ts`      | Nuevo  | Validación de formato de email RFC 5322 (Fase 4)        |
| `src/modules/cotizador/components/send-quote-modal.tsx` | Nuevo | Modal de envío con email + comentario (Fase 4)         |
| `src/modules/cotizador/components/cotizador-page.tsx` | Modificar | Reemplazar botón "Solicitar cotización" por "Enviar cotización" y conectar modal (Fase 4) |
| `src/modules/cotizador/config/pricing.ts`            | Modificar | Agregar `quoteValidityDays` (Fase 1, T-044)          |
| `public/draco/`                                      | Nuevo  | Decoders Draco                                          |
| `src/shared/components/ui/{slider,sonner,label,select,dialog}.tsx` | Nuevos | Instalados vía shadcn CLI                          |

# Riesgos técnicos

| ID    | Riesgo                                                                | Impacto | Probabilidad | Mitigación en este plan                                  |
| ----- | --------------------------------------------------------------------- | ------- | ------------ | --------------------------------------------------------- |
| R-001 | Bundle inicial > 1 MB por Three.js + Drei                            | Alto    | Alta         | Fase 1: `next/dynamic` con `ssr: false` solo en `Viewer3D` |
| R-002 | GLB con Draco no carga si los decoders faltan                        | Alto    | Media        | Fase 1 T-003: self-host en `public/draco/` + verificación |
| R-003 | Archivos grandes bloquean el hilo principal al parsear                | Alto    | Media        | Fase 1 T-024: validación previa de tamaño                  |
| R-004 | Dispositivos sin WebGL 2                                              | Alto    | Baja         | Fase 3 T-025: detección + fallback amigable                |
| R-005 | Catálogo de materiales desactualizado                                | Medio   | Alta         | Fase 1: centralizado en `config/materials.ts` con comentarios |
| R-006 | Fórmula de cotización inexacta                                       | Medio   | Media        | Fase 2 T-006: fórmula parametrizable y documentada         |
| R-007 | Cambio de API en Three.js / R3F                                       | Bajo    | Baja         | Versiones fijadas en `package.json`; upgrade manual        |
| R-008 | DEPRECADO. Reemplazado por R-011..R-015. La constante de WhatsApp ya no se usa. | N/A | N/A         | N/A                                                       |
| R-009 | Memory leak al reemplazar modelo                                      | Alto    | Media        | Fase 3 T-026: `dispose()` explícito + smoke test           |
| R-010 | Cálculo de volumen inexacto en mallas no manifold                     | Medio   | Media        | Fase 2: documentar limitación en `geometry.ts`             |
| R-011 | Servicio SMTP caído o con incidentes                                  | Alto    | Media        | Fase 4 T-046: pruebas con Ethereal; toast de error y reintento (RF-007) |
| R-012 | SPF/DKIM mal configurados y correos caen en spam                      | Alto    | Media        | Fase 4 T-047: checklist de go-live bloqueante              |
| R-013 | Endpoint de envío abusado por terceros (spam)                        | Medio   | Alta         | Decisión explícita: sin anti-spam en esta versión; documentado para v2 |
| R-014 | Límite de tamaño de adjunto del servicio SMTP                         | Medio   | Baja         | RNF-008: PDF ≤ 1 MB; medir y ajustar plantilla si se acerca al límite |
| R-015 | Email del cliente con formato válido pero no entregable               | Bajo    | Media        | Solo se valida formato (RN-008); rebotes llegan al buzón del negocio |

# Criterios de éxito

- **Funcionalidad:** los doce casos de uso del ALCANCE (CU-001..012) implementados y verificables manualmente.
- **Requisitos funcionales:** RF-001..007 cumplidos en su totalidad.
- **Requisitos no funcionales:** RNF-001 (perf), RNF-002 (limpieza memoria), RNF-004 (responsive), RNF-006 (modularidad), RNF-007 (privacidad del envío), RNF-008 (PDF ≤ 1 MB), RNF-009 (PDF < 2 s) cumplidos; RNF-003 y RNF-005 cumplidos por el hosting.
- **Reglas de negocio:** RN-001..010 implementadas y verificables con casos de prueba manuales.
- **Calidad:** `pnpm lint` (Biome) sin warnings, `tsc --noEmit` sin errores, `pnpm build` exitoso.
- **Rendimiento:** ≥ 30 FPS en gama media, cálculo de cotización < 100 ms, primera carga del módulo < 3 s, generación de PDF < 2 s.
- **UX:** responsive desde 360 px, accesible por teclado y lector de pantalla, drag & drop y click funcionando.
- **Cobertura:** el botón "Enviar cotización" abre el modal, valida el email, genera el PDF y lo envía al cliente y al negocio.
- **Despliegue:** URL `/cotizador` accesible, sitemap la incluye, metadatos SEO configurados, variables de entorno del SMTP configuradas en el hosting, SPF/DKIM del dominio verificados antes del go-live.
- **Documentación:** ALCANCE, BACKLOG y PLAN versionados en el repositorio.
