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
geometry: margin=2.5cm
linestretch: 1.5

colorlinks: true
linkcolor: blue

header-includes:
  - \usepackage{setspace}
  - \usepackage{parskip}
  - \setlength{\parindent}{0pt}

---


# Especificacion de Requisitos de Software

**Proyecto:** Cotizador Web para Impresión 3D

**Fecha:** 19 de junio de 2026

**Responsable:** Yenaro Joel Noa Camino


# Introducción

## Propósito

Describir el objetivo, alcance y requisitos del módulo web de cotización para impresión 3D, que permita a los usuarios cargar modelos 3D en formatos estándar, configurar parámetros básicos de impresión y obtener una cotización estimada en tiempo real, ejecutada completamente en el navegador.

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
- Botón de "Solicitar cotización" como placeholder visual.

### No incluye

- Carga simultánea de varios modelos.
- Backend, base de datos ni persistencia.
- Autenticación de usuarios.
- Almacenamiento remoto de archivos.
- Historial de cotizaciones.
- Generación de G-Code ni motores de slicing.
- Integración con WooCommerce, WordPress u OctoPrint.
- Pasarelas de pago.
- Soportes automáticos ni patrones avanzados de infill.
- Cálculo exacto del tiempo de impresión.
- Conversión entre formatos 3D.

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
| Administrador | (Futuro) Mantiene catálogo de materiales, precios y configuración     |

En esta primera versión, todos los visitantes comparten el mismo nivel de acceso y configuración.

## Restricciones

- Implementación 100 % frontend, sin backend propio.
- Compatibilidad con navegadores modernos (Chrome, Edge, Firefox, Safari).
- Tamaño máximo de archivo a definir (propuesta inicial: 25 MB).
- Renderizado y cálculo limitados por la capacidad del dispositivo del cliente.
- Catálogo de materiales y precios definidos en el código en esta versión.

## Supuestos y dependencias

- El usuario dispone de un archivo STL o GLB válido exportado desde su software de modelado.
- El navegador soporta WebGL 2.
- El catálogo de materiales y precios se mantiene en el código fuente en esta versión.
- No se requiere conexión a internet después de la carga inicial de la página.


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


# Modelo de datos

## Entidades principales

- **Archivo 3D:** nombre, formato, tamaño en bytes, referencia interna a la geometría cargada.
- **Material:** identificador, nombre, densidad, precio por kilogramo, color, factor de ajuste.
- **Configuración de impresión:** escala uniforme, escala por eje (X, Y, Z), porcentaje de relleno, material seleccionado, cantidad.
- **Cotización:** volumen total, volumen con relleno, peso estimado, costo de material, costo fijo, margen, precio final, marca de tiempo de cálculo.
- **Parámetros globales:** costo fijo de impresión, margen de ganancia por defecto, unidad de trabajo, límite de tamaño de archivo.


# Integraciones

| Sistema         | Descripción                                                    | Responsable |
| --------------- | -------------------------------------------------------------- | ----------- |
| (ninguna)       | Esta versión no integra sistemas externos                       | N/A         |

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
| CU-010  | Solicitar cotización         | Visitante       | Pulsa el botón final (acción placeholder)                   |
| CU-011  | Manejar error de carga       | Visitante       | Recibe mensaje de error por archivo inválido o demasiado grande |


# Criterios de aceptación del proyecto

- El usuario puede cargar archivos STL y GLB válidos.
- Los archivos inválidos, corruptos o que excedan el tamaño máximo son rechazados con mensaje claro.
- El modelo se visualiza correctamente en el visor 3D.
- El usuario puede modificar escala uniforme, escala por eje, relleno, material y cantidad.
- El usuario puede eliminar o reemplazar el modelo activo en cualquier momento.
- La cotización se recalcula automáticamente ante cualquier cambio.
- El visor mantiene un rendimiento fluido (≥ 30 FPS) en equipos de gama media.
- Todo el proceso funciona sin conexión a servicios externos tras la carga inicial.
- El módulo es responsive y usable en dispositivos móviles.
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


# Anexos

## A. Fórmula inicial de cálculo

```text
peso = volumen × densidad

costo_material = peso × precio_por_gramo × factor_ajuste_material

costo_total = (costo_material + costo_fijo) × cantidad

precio_final = costo_total × margen
```

> La fórmula podrá evolucionar en futuras versiones. Los valores de `costo_fijo`, `margen`, `factor_ajuste_material` y `precio_por_gramo` se definen en el módulo de configuración.

## B. Arquitectura propuesta

```text
Usuario
   │
   ▼
Carga STL / GLB
   │
   ▼
Three.js (STLLoader / GLTFLoader)
   │
   ├── Visualización 3D
   │
   ├── Cálculo geométrico
   │
   └── Motor de cotización
           │
           ▼
      Precio estimado
```

## C. Fuera de alcance (No requerido)

En esta primera versión no se implementará:

- Backend.
- Base de datos.
- Autenticación de usuarios.
- Almacenamiento remoto de archivos.
- Historial de cotizaciones.
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

## D. Limitaciones conocidas

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

## E. Formatos soportados

| Formato | Soporte | Loader            | Notas                                              |
| ------- | ------- | ----------------- | -------------------------------------------------- |
| STL     | Sí      | STLLoader         | Binario o ASCII; obligatorio                       |
| GLB     | Sí      | GLTFLoader        | glTF 2.0 binario; obligatorio                      |
| OBJ     | Futuro  | OBJLoader         | Previsto en versiones siguientes                   |
| FBX     | Futuro  | FBXLoader         | Previsto en versiones siguientes, bajo evaluación  |

## F. Glosario visual

- **Panel izquierdo:** carga, configuración, resumen.
- **Panel derecho:** visor 3D, controles de cámara, información geométrica.
- **Sección inferior:** desglose de costos, precio total, botón de solicitar cotización.
