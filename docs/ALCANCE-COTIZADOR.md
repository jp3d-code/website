---
title: "Alcance del Proyecto: Módulo Web de Cotización para Impresión 3D"
subtitle: "Documento de Alcance del Proyecto"
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

# Introducción

## Propósito

Describir el objetivo, alcance y requisitos del módulo web de cotización para impresión 3D, que permita a los usuarios cargar modelos 3D en formatos estándar, configurar parámetros básicos de impresión, obtener una cotización estimada en tiempo real ejecutada completamente en el navegador, y enviar dicha cotización por correo electrónico en formato PDF al propio cliente y al negocio.

El documento busca servir como referencia contractual y funcional para las fases de diseño, implementación, pruebas y aceptación del módulo.

## Alcance

El módulo permitirá:

- Cargar modelos 3D en formato **STL** y **GLB** desde el navegador.
- Visualizar el modelo 3D de forma interactiva.
- Modificar parámetros de impresión.
- Calcular una cotización estimada en tiempo real.
- Mostrar el desglose de costos al usuario.

Solo se permite **un modelo cargado a la vez**. Al reemplazar o eliminar el modelo actual, la configuración y la cotización asociada se reinician.

Todos los cálculos y el renderizado se ejecutan localmente en el navegador, sin comunicación con servicios externos.

### Incluye

- Carga de archivos STL y GLB por selección o arrastrar y soltar.
- Visualizador 3D interactivo con cámara orbital.
- Cálculo automático de información geométrica.
- Configuración de escala, relleno, material y cantidad.
- Motor de cotización local con fórmula parametrizable.
- Desglose detallado del costo final.
- Botón de "Enviar cotización" que abre un modal con campos de email y comentario.
- Generación del PDF de la cotización en el navegador (cliente) con jsPDF o pdf-lib.
- Envío del PDF por correo electrónico a una dirección fija del negocio y copia al correo del cliente que dejó en el modal, mediante un endpoint backend mínimo.
- Bloqueo del reenvío inmediato de la misma cotización hasta que el cliente modifique algún parámetro.

### No incluye

- Carga simultánea de varios modelos.
- Persistencia de cotizaciones enviadas (no se guardan en base de datos, KV, D1 ni R2).
- Autenticación de usuarios.
- Almacenamiento remoto de archivos.
- Historial de cotizaciones consultable.
- Generación de G-Code ni motores de slicing.
- Integración con WooCommerce, WordPress u OctoPrint.
- Pasarelas de pago.
- Soportes automáticos ni patrones avanzados de infill.
- Cálculo exacto del tiempo de impresión.
- Conversión entre formatos 3D.
- Configuración de SPF/DKIM del dominio (responsabilidad de operaciones del negocio).
- Protección anti-spam (CAPTCHA, Turnstile, honeypot o rate limiting) en el envío.

## Definiciones y acrónimos

| Término | Definición                                                   |
| ------- | ------------------------------------------------------------ |
| SRS     | Software Requirements Specification                          |
| STL     | Formato estándar para mallas 3D basadas en triángulos       |
| GLB     | Formato binario de glTF, modelo 3D portable con geometría    |
| GLTF    | Formato estándar para transmisión eficiente de modelos 3D   |
| OBJ     | Formato de geometría 3D basado en texto                      |
| FBX     | Formato propietario de Autodesk para modelos 3D             |
| Infill  | Relleno interno de una pieza impresa en 3D                   |
| WebGL   | API de gráficos 2D/3D acelerada por hardware en el navegador |
| UI      | Interfaz de usuario                                          |
| UX      | Experiencia de usuario                                       |

## Referencias

- IEEE 29148 — Estándar para especificación de requisitos.
- Documentación oficial de Three.js.
- Documentación oficial de React Three Fiber.
- Documentación interna del proyecto (INFORMATION.md).
- Estándar glTF 2.0 (Khronos Group).


# Descripción general

## Contexto del producto

El producto es un módulo web embebido en una de las páginas del sitio institucional, orientado a clientes potenciales y actuales que desean estimar de forma rápida y visual el costo de impresión de un modelo 3D propio, sin necesidad de registrarse ni enviar archivos a un servidor externo.

Reemplaza la dependencia de plugins de cotización para WordPress con una solución propia, optimizada para React, que entrega resultados inmediatos y respeta la privacidad del usuario al no transferir sus archivos.

## Objetivos del negocio

- Ofrecer una herramienta de cotización instantánea que agilice el proceso de venta de servicios de impresión 3D.
- Reducir el tiempo de respuesta al cliente frente a solicitudes manuales de cotización.
- Diferenciar al sitio mediante una experiencia interactiva y moderna.
- Centralizar la información de materiales, precios y políticas de impresión.

## Tipos de usuarios

| Rol           | Descripción                                                           |
| ------------- | --------------------------------------------------------------------- |
| Visitante     | Usuario anónimo que llega al sitio, carga su modelo y obtiene precio  |

En esta primera versión, todos los visitantes comparten el mismo nivel de acceso y configuración.

## Restricciones

- Implementación mayoritariamente frontend. Se admite **un único endpoint backend** cuyo único propósito es recibir los datos de cotización y el PDF generados en el cliente, y reenviarlos por correo. No se expone ningún otro recurso backend.
- Compatibilidad con navegadores modernos (Chrome, Edge, Firefox, Safari).
- Renderizado y cálculo limitados por la capacidad del dispositivo del cliente.
- Catálogo de materiales y precios definidos en el código en esta versión.
- El servicio de envío de correo (SMTP, Gmail, Cloudflare Email Service u otro) debe estar configurado y operativo en el entorno de despliegue; no es parte del código del módulo.

## Supuestos y dependencias

- El usuario dispone de un archivo STL o GLB válido exportado desde su software de modelado.
- El navegador soporta WebGL 2.
- El catálogo de materiales y precios se mantiene en el código fuente en esta versión.
- El negocio dispone de un dominio propio con un buzón remitente (por ejemplo `no-reply@jp3d.com`) y los registros SPF y DKIM correctamente configurados para que los correos no caigan en spam.
- El endpoint backend de envío de correo está desplegado, accesible desde el frontend y configurado con las credenciales del servicio de email elegido.
- El servicio de email soporta el envío de un PDF adjunto por mensaje y se mantiene dentro de sus límites de tamaño y volumen.


# Requisitos funcionales

## RF-001 Carga de archivos 3D

**Descripción:**

El sistema debe permitir al usuario cargar modelos 3D en formatos STL y GLB desde el navegador, mediante selección de archivo o arrastrar y soltar. Solo es posible tener un modelo activo a la vez.

**Prioridad:** Alta

**Criterios de aceptación:**

- Aceptar archivos con extensiones `.stl` y `.glb`.
- Aceptar archivos por clic en botón de selección o por drag & drop.
- Validar el tipo MIME y la extensión antes de procesar.
- Validar el tamaño máximo del archivo y rechazar si lo excede.
- Detectar archivos corruptos o vacíos y mostrar mensaje de error.
- Permitir reemplazar el modelo activo cargando uno nuevo.
- Al cargar un nuevo modelo, limpiar el anterior, su configuración y su cotización.
- Permitir eliminar manualmente el modelo activo.
- Si la carga falla, eliminar cualquier resto del modelo previo y mantener el visor en estado vacío.

## RF-002 Visualización 3D

**Descripción:**

El sistema debe visualizar el modelo cargado en un visor 3D interactivo con controles de cámara orbital y ayudas visuales.

**Prioridad:** Alta

**Criterios de aceptación:**

- Renderizar el modelo con WebGL de forma fluida.
- Permitir rotación libre del modelo (orbitar).
- Permitir zoom in/out con rueda del mouse o gesto táctil.
- Permitir desplazamiento de cámara (pan).
- Ajustar automáticamente el encuadre al modelo al cargarlo.
- Mostrar ejes de referencia X, Y, Z.
- Mostrar una cuadrícula de trabajo.
- Aplicar sombras e iluminación básica.
- Permitir configurar el color de fondo del visor.

## RF-003 Información geométrica automática

**Descripción:**

Al cargar un modelo válido, el sistema debe calcular y mostrar la información geométrica básica necesaria para la cotización.

**Prioridad:** Alta

**Criterios de aceptación:**

- Calcular dimensiones: ancho (X), alto (Y), profundidad (Z).
- Calcular el volumen del modelo en la unidad nativa.
- Calcular el área superficial.
- Mostrar la escala aplicada al modelo.
- Mostrar el factor de conversión de unidades (por defecto, milímetros a centímetros cúbicos).
- Actualizar los valores al cambiar la escala del modelo.

## RF-004 Configuración de impresión

**Descripción:**

El sistema debe permitir al usuario modificar los parámetros básicos de impresión que afectan la cotización.

**Prioridad:** Alta

**Criterios de aceptación:**

- **Escala uniforme:** ajustar el modelo en porcentaje (0 % a 1000 %).
- **Escala por eje:** ajustar X, Y, Z de forma independiente.
- **Restablecer escala:** volver a la escala original del archivo.
- **Relleno (infill):** selector de porcentaje de 0 % a 100 % en pasos de 5 %.
- **Material:** selector con PLA, PETG, ABS, TPU y otros configurables.
- **Cantidad:** número entero de copias a imprimir (mínimo 1).
- Cada cambio de parámetro debe reflejarse de inmediato en el visor y en la cotización.

Cada material configurable debe incluir:

- Densidad (g/cm³).
- Precio por kilogramo.
- Color representativo.
- Factor de ajuste de costo.

## RF-005 Cotización automática

**Descripción:**

El sistema debe calcular y mostrar la cotización estimada en tiempo real cada vez que el usuario modifique cualquier parámetro de configuración o de modelo.

**Prioridad:** Alta

**Criterios de aceptación:**

- Actualizar la cotización sin recargar la página.
- Mostrar los componentes del cálculo: volumen total, volumen ajustado por relleno, peso estimado, costo de material, costo fijo, margen y precio final.
- Aplicar la fórmula definida en el anexo de este documento.
- Mostrar el precio final formateado en la moneda local.
- Recalcular al cambiar escala, relleno, material, cantidad o cualquier parámetro de costo.

## RF-006 Gestión del modelo activo

**Descripción:**

El sistema debe permitir reemplazar o eliminar el modelo activo, reiniciando el estado de configuración y cotización.

**Prioridad:** Alta

**Criterios de aceptación:**

- Botón explícito para eliminar el modelo actual.
- Botón o acción para cargar uno nuevo (que reemplaza al actual).
- Al eliminar o reemplazar, ocultar la información geométrica y la cotización.
- Restablecer la configuración a sus valores por defecto al cambiar de modelo.
- Mantener el visor en estado vacío (sin modelo) tras la eliminación.

## RF-007 Envío de cotización por correo con PDF

**Descripción:**

El sistema debe permitir al cliente enviar su cotización por correo electrónico. Al pulsar el botón "Enviar cotización", se abre un modal donde el cliente ingresa su email y, opcionalmente, un comentario. El frontend genera localmente un PDF con el detalle de la cotización y lo envía, mediante un endpoint backend, al negocio y al propio cliente como copia.

**Prioridad:** Alta

**Criterios de aceptación:**

- Existe un botón "Enviar cotización" visible únicamente cuando hay un modelo activo y una cotización calculada.
- Al pulsar el botón, se abre un modal con dos campos: **email** (obligatorio) y **comentario** (opcional).
- El campo email valida formato (estructura RFC 5322 simplificada) antes de habilitar el botón "Enviar".
- El botón "Enviar" permanece deshabilitado mientras el email no tenga formato válido.
- Al pulsar "Enviar", se muestra estado de carga (spinner o equivalente) y se deshabilita el botón para evitar doble envío.
- El PDF se genera íntegramente en el cliente, sin round-trip al backend para renderizarlo, usando una librería de generación de PDF en navegador.
- El PDF debe incluir, como mínimo:
  - Encabezado con datos del negocio (nombre, logo si aplica, datos de contacto básicos).
  - Fecha de emisión y fecha de vigencia calculada a partir de `quoteValidityDays`.
  - Datos del cliente: email y comentario (si fue proporcionado).
  - Datos del modelo: nombre del archivo, dimensiones, volumen, escala aplicada.
  - Parámetros de impresión: material, porcentaje de relleno, cantidad.
  - Desglose de costos: volumen con relleno, peso estimado, costo de material, costo fijo, margen, precio final.
  - Moneda y formato local (PEN por defecto).
- El PDF y los metadatos del envío (email, comentario, snapshot de parámetros) se envían al endpoint backend configurado.
- El endpoint backend entrega el correo a la dirección fija del negocio (configurable) y envía copia al email del cliente que dejó en el modal.
- Tras un envío exitoso, se muestra un toast de confirmación, se cierra el modal y el botón "Enviar cotización" se deshabilita hasta que el cliente modifique al menos un parámetro de la cotización.
- Si el envío falla (respuesta no exitosa del endpoint, error de red, timeout), se muestra un toast de error claro y se re-habilita el botón "Enviar" para que el cliente pueda reintentar.
- En ningún momento se persiste la cotización, el email, el comentario ni el PDF en almacenamiento del cliente ni del servidor. El envío es transaccional.
- No se incluye ninguna protección anti-spam (CAPTCHA, Turnstile, honeypot ni rate limiting) en el frontend ni en el endpoint.
- El FROM del correo debe ser una dirección `no-reply` del dominio del negocio, configurable en el código del endpoint backend.


# Requisitos no funcionales

## RNF-001 Rendimiento

- Tiempo de carga del módulo inferior a 3 segundos en equipos de gama media con conexión de banda ancha.
- Renderizado del visor a mínimo 30 FPS en equipos de gama media.
- Cálculo de cotización inferior a 100 ms tras cualquier cambio de parámetro.

## RNF-002 Seguridad

- Toda la información del usuario se procesa en el navegador; no se envía a ningún servidor.
- Validación estricta del tipo y tamaño de archivo cargado.
- Limpieza de buffers y referencias al reemplazar o eliminar un modelo para evitar fugas de memoria.

## RNF-003 Disponibilidad

- El módulo debe estar disponible como parte del sitio web con un SLA equivalente al del sitio principal.
- Al ser estático y sin backend, no requiere alta disponibilidad adicional más allá de la del hosting.

## RNF-004 Compatibilidad

- Compatible con las dos últimas versiones mayores de Chrome, Edge, Firefox y Safari.
- Compatible con dispositivos de escritorio, tabletas y móviles.
- Diseño responsive adaptable a partir de 360 px de ancho.

## RNF-005 Escalabilidad

- El módulo escala automáticamente con el sitio web (CDN y archivos estáticos).
- La arquitectura debe permitir agregar nuevos materiales, parámetros y formatos sin reescritura mayor.

## RNF-006 Usabilidad y mantenibilidad

- Arquitectura modular y reutilizable, con separación clara entre carga, visualización, configuración y cotización.
- Tipado fuerte mediante TypeScript para reducir errores en evolución futura.
- Código documentado y preparado para extensión a multi-modelo en versiones siguientes.

## RNF-007 Privacidad y seguridad del envío por correo

- La comunicación entre el frontend y el endpoint backend de envío debe realizarse sobre HTTPS.
- El email, el comentario y el PDF viajan cifrados en tránsito; no se almacenan en disco en el backend ni en el frontend tras completarse el envío.
- El endpoint backend no debe loguear en claro el contenido del email, el comentario ni el PDF.
- La dirección de destino del negocio debe estar definida en configuración del backend, nunca en el cliente, para evitar que sea manipulada.

## RNF-008 Tamaño del PDF generado

- El PDF generado en el cliente no debe superar **1 MB** de tamaño en condiciones normales (modelo único, parámetros por defecto).
- El PDF debe ser legible e imprimible en formato A4.

## RNF-009 Tiempo de generación del PDF

- La generación local del PDF debe completarse en menos de **2 segundos** en equipos de gama media.
- La generación no debe bloquear el hilo principal más de **100 ms** en un solo ciclo; si se requiere más, debe realizarse en un Web Worker.


# Modelo de datos

## Entidades principales

- **Archivo 3D:** nombre, formato, tamaño en bytes, referencia interna a la geometría cargada.
- **Material:** identificador, nombre, densidad, precio por kilogramo, color, factor de ajuste.
- **Configuración de impresión:** escala uniforme, escala por eje (X, Y, Z), porcentaje de relleno, material seleccionado, cantidad.
- **Cotización:** volumen total, volumen con relleno, peso estimado, costo de material, costo fijo, margen, precio final, marca de tiempo de cálculo.
- **Parámetros globales:** costo fijo de impresión, margen de ganancia por defecto, unidad de trabajo, límite de tamaño de archivo, `quoteValidityDays` (vigencia en días de la cotización enviada).
- **Solicitud de envío de cotización (QuoteRequest):** email del cliente, comentario (opcional), marca de tiempo de envío, snapshot inmutable de los parámetros de cotización al momento del envío. Esta entidad **no se persiste**: solo se transmite al endpoint backend en el cuerpo del POST y se descarta tras el envío del correo.


# Integraciones

| Sistema                        | Descripción                                                                                  | Responsable |
| ------------------------------ | -------------------------------------------------------------------------------------------- | ----------- |
| Endpoint backend de envío      | Recibe el PDF y los metadatos de cotización desde el frontend y los entrega vía SMTP o servicio de email al negocio y al cliente. | Backend del proyecto (Next.js / Payload) |
| Servicio de email (SMTP / API) | Servicio concreto (SMTP genérico, Gmail, Cloudflare Email Service, Resend u otro) usado por el endpoint backend para remitir el correo. Configurado en variables de entorno / secrets, no en el código del frontend. | Operaciones / infraestructura |

> Las integraciones con ERP, CRM, pasarelas de pago u OctoPrint quedan fuera de alcance y se documentarán en versiones posteriores.


# Reglas de negocio

| Código  | Regla                                                                         |
| ------- | ----------------------------------------------------------------------------- |
| RN-001  | Solo puede existir un modelo activo a la vez                                  |
| RN-002  | El porcentaje de relleno aplica solo al volumen interno, no a la cáscara       |
| RN-003  | El volumen cotizado nunca puede ser inferior al volumen de la cáscara         |
| RN-004  | La cantidad mínima a cotizar es 1 unidad                                       |
| RN-005  | El precio final siempre se redondea a 2 decimales                              |
| RN-006  | El factor de ajuste de costo del material modifica el costo del material antes del margen |
| RN-007  | Al cambiar de modelo se reinicia configuración y cotización                   |
| RN-008  | El botón "Enviar cotización" solo se habilita cuando el email del cliente tiene formato válido |
| RN-009  | Tras un envío exitoso, el botón "Enviar cotización" se deshabilita hasta que el cliente modifique al menos un parámetro (escala, relleno, material, cantidad o reemplazo/eliminación del modelo) |
| RN-010  | El PDF de cotización incluye la fecha de emisión y la fecha de vigencia, calculada como `fecha_emision + quoteValidityDays` (configurable) |


# Casos de uso

| Código  | Nombre                       | Actor principal | Descripción                                                 |
| ------- | ---------------------------- | --------------- | ----------------------------------------------------------- |
| CU-001  | Cargar modelo 3D             | Visitante       | Sube un STL o GLB válido                                    |
| CU-002  | Reemplazar modelo            | Visitante       | Carga un nuevo modelo y descarta el anterior                |
| CU-003  | Eliminar modelo              | Visitante       | Quita el modelo activo y limpia la UI                       |
| CU-004  | Visualizar modelo            | Visitante       | Interactúa con el visor 3D                                  |
| CU-005  | Modificar escala             | Visitante       | Cambia la escala uniforme o por eje                         |
| CU-006  | Modificar relleno            | Visitante       | Cambia el porcentaje de infill                              |
| CU-007  | Seleccionar material         | Visitante       | Elige entre PLA, PETG, ABS, TPU u otros                     |
| CU-008  | Modificar cantidad           | Visitante       | Define el número de copias                                  |
| CU-009  | Consultar cotización         | Visitante       | Visualiza el desglose de costos actualizado                  |
| CU-010  | Enviar cotización por correo | Visitante       | Pulsa "Enviar cotización", completa email y comentario opcional, y el sistema genera un PDF y lo envía por correo al cliente y al negocio |
| CU-011  | Generar PDF de cotización    | Visitante       | El sistema arma el PDF en el navegador con el desglose, los datos del cliente y la vigencia, a partir del snapshot de parámetros |
| CU-012  | Manejar error de carga       | Visitante       | Recibe mensaje de error por archivo inválido o demasiado grande |


# Criterios de aceptación del proyecto

- El usuario puede cargar archivos STL y GLB válidos.
- Los archivos inválidos, corruptos o que excedan el tamaño máximo son rechazados con mensaje claro.
- El modelo se visualiza correctamente en el visor 3D.
- El usuario puede modificar escala uniforme, escala por eje, relleno, material y cantidad.
- El usuario puede eliminar o reemplazar el modelo activo en cualquier momento.
- La cotización se recalcula automáticamente ante cualquier cambio.
- El visor mantiene un rendimiento fluido (≥ 30 FPS) en equipos de gama media.
- El módulo es responsive y usable en dispositivos móviles.
- Al pulsar "Enviar cotización" se muestra un modal con email obligatorio y comentario opcional.
- El sistema valida el formato del email antes de habilitar el botón "Enviar".
- Se genera un PDF en el cliente con el desglose completo, los datos del cliente (email y comentario) y la vigencia.
- El PDF y los metadatos se envían a un endpoint backend, que entrega el correo a la dirección del negocio y copia al cliente.
- Tras un envío exitoso, el botón "Enviar cotización" se deshabilita hasta que el cliente cambie un parámetro.
- Si el envío falla, se muestra un toast de error claro y se permite reintentar.
- Ningún dato del envío (email, comentario, PDF) queda persistido en cliente ni servidor.
- La documentación técnica y de uso queda entregada y versionada.

# Riesgos

| Riesgo                                                     | Impacto | Probabilidad | Mitigación                                                                              |
| ---------------------------------------------------------- | ------- | ------------ | ---------------------------------------------------------------------------------------- |
| GLB con materiales/texturas embebidas no contemplados      | Medio   | Media        | Ignorar materiales embebidos, aplicar material seleccionado en la cotización             |
| Archivos STL/GLB muy pesados degradan el rendimiento       | Alto    | Media        | Validar tamaño máximo y mostrar advertencia antes de procesar                            |
| Dispositivos de gama baja sin soporte WebGL adecuado       | Alto    | Baja         | Detectar WebGL y mostrar mensaje amigable si no está disponible                          |
| Precios de materiales desactualizados                       | Medio   | Alta         | Centralizar catálogo de materiales en un módulo de configuración fácil de actualizar     |
| Fórmula de cotización inexacta frente a competencia        | Medio   | Media        | Documentar limitaciones conocidas y permitir evolución de la fórmula en versiones futuras |
| Cambio de API de Three.js o React Three Fiber              | Bajo    | Baja         | Fijar versiones en package.json y planificar actualización periódica                     |
| Servicio de email caído o con incidentes                   | Alto    | Media        | Mostrar toast de error claro y permitir reintento; documentar dependencias operativas   |
| SPF/DKIM mal configurados y correos caen en spam           | Alto    | Media        | Bloquear el despliegue hasta verificar configuración DNS; documentar checklist de go-live  |
| Límite de tamaño de adjunto del servicio de email          | Medio   | Baja         | Restricción de RNF-008: PDF ≤ 1 MB; medir y ajustar template si se acerca al límite      |
| Endpoint backend de envío es abusado por terceros (spam)   | Medio   | Alta         | Decisión explícita de no incluir protección anti-spam en esta versión; el riesgo queda documentado para reevaluar en versiones futuras |
| Email del cliente con formato válido pero no entregable    | Bajo    | Media        | Validar formato (RN-008); el correo rebotado se maneja fuera del módulo (buzón del negocio) |
| Cambio de datos del negocio en el PDF (logo, contacto)     | Bajo    | Alta         | Centralizar datos del negocio en un módulo de configuración editable sin tocar el PDF   |


# Anexos

## Fórmula inicial de cálculo

```text
peso = volumen × densidad

costo_material = peso × precio_por_gramo × factor_ajuste_material

costo_total = (costo_material + costo_fijo) × cantidad

precio_final = costo_total × margen
```

> La fórmula podrá evolucionar en futuras versiones. Los valores de `costo_fijo`, `margen`, `factor_ajuste_material` y `precio_por_gramo` se definen en el módulo de configuración.

## Arquitectura propuesta

```text
Usuario
   |
   v
Carga STL / GLB
   |
   v
Three.js (STLLoader / GLTFLoader)
   |
   +-- Visualizacion 3D
   |
   +-- Calculo geometrico
   |
   +-- Motor de cotizacion
           |
           v
      Precio estimado
```

## Flujo de envío de cotización por correo

El envío de la cotización sigue la siguiente secuencia de pasos:

1. El usuario, con un modelo activo y una cotización calculada, pulsa el botón "Enviar cotización".
2. Se abre un modal con dos campos: email (obligatorio) y comentario (opcional).
3. El sistema valida el formato del email en tiempo real (RN-008). El botón "Enviar" permanece deshabilitado hasta que el formato sea válido.
4. Al pulsar "Enviar", el frontend genera localmente el PDF de la cotización con jsPDF o pdf-lib, incluyendo encabezado del negocio, datos del cliente, parámetros del modelo, desglose de costos, fecha de emisión y fecha de vigencia.
5. El frontend realiza un POST al endpoint backend con el PDF binario y los metadatos del envío (email del cliente, comentario y snapshot inmutable de los parámetros de cotización).
6. El endpoint backend entrega el correo mediante el servicio de email configurado, con la dirección fija del negocio como destinatario principal y el email del cliente como copia.
7. Si la respuesta es exitosa (HTTP 2xx), el frontend muestra un toast de confirmación, cierra el modal y deshabilita el botón "Enviar cotización" hasta que el cliente modifique al menos un parámetro (RN-009).
8. Si la respuesta no es exitosa o se produce un error de red, el frontend muestra un toast de error y vuelve a habilitar el botón "Enviar" para que el cliente pueda reintentar.

El PDF y los datos del envío no se persisten ni en el cliente ni en el servidor. El endpoint procesa la solicitud y la descarta una vez entregado el correo.

## Fuera de alcance (No requerido)

En esta primera versión no se implementará:

- Base de datos ni cualquier otra forma de persistencia de cotizaciones, emails, comentarios o PDFs.
- Autenticación de usuarios.
- Almacenamiento remoto de archivos.
- Historial de cotizaciones consultable.
- Integración con WooCommerce.
- Integración con WordPress.
- Pasarelas de pago.
- Generación de G-Code.
- Motores de slicing como CuraEngine o PrusaSlicer.
- Cálculo exacto del tiempo de impresión.
- Soportes automáticos.
- Patrones avanzados de infill.
- Gestión de impresoras.
- Colas de impresión.
- Integración con OctoPrint.
- Conversión entre formatos 3D.
- Persistencia de configuraciones.
- Carga simultánea de múltiples modelos.
- Configuración de SPF/DKIM del dominio del negocio (responsabilidad de operaciones).
- Anti-spam (CAPTCHA, Turnstile, honeypot, rate limiting) en el envío de cotización.
- Webhooks de respuesta del servicio de email (rebotes, abiertas, clics).
- Plantillas personalizables del PDF: el template es fijo y vive en el código del frontend.
- Múltiples destinatarios en el envío: solo una dirección de negocio y copia al cliente.
- Reenvío de la misma cotización sin que el cliente cambie un parámetro (RN-009).

> El único endpoint backend permitido en esta versión es el de envío de cotización por correo, descrito en RF-007. Cualquier otro endpoint, integración, almacenamiento o lógica de negocio del lado del servidor queda fuera de alcance.

## Limitaciones conocidas

Al no utilizar un motor de slicing, los resultados serán estimaciones aproximadas.

Las siguientes variables no serán consideradas:

- Velocidad de impresión.
- Altura de capa.
- Número de perímetros.
- Temperaturas.
- Soportes.
- Retracciones.
- Configuración específica de cada impresora.

Para archivos GLB se ignorarán materiales, texturas y animaciones embebidas: la cotización se calcula únicamente sobre la geometría y el material seleccionado por el usuario.

El objetivo es ofrecer una cotización rápida orientativa, no una simulación exacta del proceso de impresión.

Sobre el envío por correo:

- No se valida que la dirección de email del cliente sea entregable, solo se valida su formato (RN-008). Los rebotes o respuestas de no-entregable llegan al buzón del negocio.
- No se garantiza que el correo no caiga en la carpeta de spam del cliente; depende de la configuración SPF/DKIM del dominio y de la reputación del remitente, que son responsabilidades de operaciones.
- El PDF no incluye imagen renderizada del modelo 3D; contiene solo texto y el desglose.
- El template del PDF es fijo y no configurable desde el panel del negocio en esta versión.

## Formatos soportados

| Formato | Soporte | Loader            | Notas                                              |
| ------- | ------- | ----------------- | -------------------------------------------------- |
| STL     | Sí      | STLLoader         | Binario o ASCII; obligatorio                       |
| GLB     | Sí      | GLTFLoader        | glTF 2.0 binario; obligatorio                      |
| OBJ     | Futuro  | OBJLoader         | Previsto en versiones siguientes                   |
| FBX     | Futuro  | FBXLoader         | Previsto en versiones siguientes, bajo evaluación  |

## Glosario visual

- **Panel izquierdo:** carga, configuración, resumen.
- **Panel derecho:** visor 3D, controles de cámara, información geométrica.
- **Sección inferior:** desglose de costos, precio total, botón de "Enviar cotización".
- **Modal de envío:** formulario con email y comentario, botón "Enviar" y estado de carga.
