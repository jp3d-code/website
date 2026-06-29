import { jsPDF } from "jspdf";
import { PRICING_CONFIG } from "@/modules/cotizador/config/pricing";
import { formatPEN } from "@/modules/cotizador/utils/format";

export interface QuoteSnapshot {
  fileName: string;
  dimensions: { x: number; y: number; z: number };
  volume: number;
  config: {
    scaleUniform: number;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
    infill: number;
    quantity: number;
  };
  materialName: string;
  quote: {
    infillVolume: number;
    estimatedWeight: number;
    materialCost: number;
    fixedCost: number;
    finalPrice: number;
  };
  clientEmail: string;
  clientComment?: string;
  modelImage?: string;
  modelAspect?: number;
}

export function generateQuotePDF(snapshot: QuoteSnapshot): Blob {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const primaryColor = [181, 135, 9];
  const secondaryColor = [31, 41, 55];
  const textColor = [55, 65, 81];
  const lightGray = [243, 244, 246];
  const borderGray = [229, 231, 235];

  const marginX = 20;
  let currentY = 20;

  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(marginX, currentY, 6, 12, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("JP3D", marginX + 10, currentY + 9);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128);
  doc.text("IMPRESIÓN 3D DE ALTA CALIDAD", marginX + 35, currentY + 8);

  currentY += 18;

  // Línea separadora
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.5);
  doc.line(marginX, currentY, pageWidth - marginX, currentY);
  currentY += 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("COTIZACIÓN DE IMPRESIÓN 3D", marginX, currentY);

  const dateIssued = new Date();
  const dateExpiry = new Date();
  dateExpiry.setDate(
    dateIssued.getDate() + (PRICING_CONFIG.quoteValidityDays || 15),
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(
    `Fecha Emisión: ${formatDate(dateIssued)}`,
    pageWidth - marginX - 60,
    currentY,
    { align: "left" },
  );
  doc.text(
    `Fecha Vigencia: ${formatDate(dateExpiry)}`,
    pageWidth - marginX - 60,
    currentY + 5,
    { align: "left" },
  );

  currentY += 15;

  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(marginX, currentY, pageWidth - 2 * marginX, 22, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("DATOS DEL CLIENTE", marginX + 5, currentY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    `Correo Electrónico: ${snapshot.clientEmail}`,
    marginX + 5,
    currentY + 12,
  );
  if (snapshot.clientComment) {
    const comment =
      snapshot.clientComment.length > 80
        ? `${snapshot.clientComment.substring(0, 77)}...`
        : snapshot.clientComment;
    doc.text(`Comentario: "${comment}"`, marginX + 5, currentY + 17);
  } else {
    doc.text("Comentario: Ninguno", marginX + 5, currentY + 17);
  }

  currentY += 28;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("DETALLES DE IMPRESIÓN Y CONFIGURACIÓN", marginX, currentY);
  currentY += 6;

  const colWidth = snapshot.modelImage ? 100 : pageWidth - 2 * marginX;
  const startY = currentY;

  const drawRow = (
    label: string,
    value: string,
    y: number,
    width: number = pageWidth - 2 * marginX,
  ) => {
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.rect(marginX, y, width, 8, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(label, marginX + 4, y + 5.5);

    doc.setFont("helvetica", "bold");
    doc.text(value, marginX + width - 4, y + 5.5, { align: "right" });
  };

  const drawRowWhite = (
    label: string,
    value: string,
    y: number,
    width: number = pageWidth - 2 * marginX,
  ) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(label, marginX + 4, y + 5.5);

    doc.setFont("helvetica", "bold");
    doc.text(value, marginX + width - 4, y + 5.5, { align: "right" });
  };

  if (snapshot.modelImage) {
    const boxWidth = 60;
    const boxHeight = 56;
    const boxX = pageWidth - marginX - boxWidth;
    const boxY = startY;

    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.rect(boxX, boxY, boxWidth, boxHeight, "FD");

    try {
      const maxImgWidth = 56;
      const maxImgHeight = 52;
      const aspect = snapshot.modelAspect || 1.0;

      let imgWidth = maxImgWidth;
      let imgHeight = maxImgWidth / aspect;

      if (imgHeight > maxImgHeight) {
        imgHeight = maxImgHeight;
        imgWidth = maxImgHeight * aspect;
      }

      const imgX = boxX + (boxWidth - imgWidth) / 2;
      const imgY = boxY + (boxHeight - imgHeight) / 2;

      doc.addImage(snapshot.modelImage, "PNG", imgX, imgY, imgWidth, imgHeight);
    } catch {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        "[Vista 3D no disponible]",
        boxX + boxWidth / 2,
        boxY + boxHeight / 2 + 2,
        {
          align: "center",
        },
      );
    }
  }

  drawRow("Archivo cargado:", snapshot.fileName, currentY, colWidth);
  currentY += 8;
  const dims = snapshot.dimensions;
  drawRowWhite(
    "Dimensiones originales:",
    `${dims.x.toFixed(1)} x ${dims.y.toFixed(1)} x ${dims.z.toFixed(1)} mm`,
    currentY,
    colWidth,
  );
  currentY += 8;

  const scaleText = `${snapshot.config.scaleUniform}% (${(snapshot.config.scaleX * 100).toFixed(0)}% X, ${(snapshot.config.scaleY * 100).toFixed(0)}% Y, ${(snapshot.config.scaleZ * 100).toFixed(0)}% Z)`;
  drawRow("Escala aplicada:", scaleText, currentY, colWidth);
  currentY += 8;

  drawRowWhite(
    "Dimensiones escaladas:",
    `${(dims.x * snapshot.config.scaleX).toFixed(1)} x ${(dims.y * snapshot.config.scaleY).toFixed(1)} x ${(dims.z * snapshot.config.scaleZ).toFixed(1)} mm`,
    currentY,
    colWidth,
  );
  currentY += 8;

  drawRow("Material seleccionado:", snapshot.materialName, currentY, colWidth);
  currentY += 8;
  drawRowWhite(
    "Relleno configurado (infill):",
    `${snapshot.config.infill}%`,
    currentY,
    colWidth,
  );
  currentY += 8;
  drawRow(
    "Cantidad solicitada:",
    `${snapshot.config.quantity} ${snapshot.config.quantity === 1 ? "unidad" : "unidades"}`,
    currentY,
    colWidth,
  );
  currentY += 14;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("DESGLOSE DE COSTOS ESTIMADOS", marginX, currentY);
  currentY += 6;

  drawRow(
    "Volumen neto del material:",
    `${snapshot.quote.infillVolume.toFixed(2)} cm³`,
    currentY,
  );
  currentY += 8;
  drawRowWhite(
    "Peso aproximado:",
    `${snapshot.quote.estimatedWeight.toFixed(1)} g`,
    currentY,
  );
  currentY += 8;
  drawRow(
    "Costo estimado del filamento:",
    formatPEN(snapshot.quote.materialCost),
    currentY,
  );
  currentY += 8;
  drawRowWhite(
    "Costo operativo fijo de impresión:",
    formatPEN(snapshot.quote.fixedCost),
    currentY,
  );
  currentY += 12;

  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(marginX, currentY, pageWidth - 2 * marginX, 12, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("PRECIO ESTIMADO TOTAL (IGV incl.):", marginX + 5, currentY + 7.5);
  doc.text(
    formatPEN(snapshot.quote.finalPrice),
    pageWidth - marginX - 5,
    currentY + 7.5,
    { align: "right" },
  );

  currentY += 20;

  doc.setFont("helvetica", "oblique");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "* Este documento es una estimación orientativa basada en los parámetros geométricos del archivo 3D cargado.",
    marginX,
    currentY,
  );
  doc.text(
    "  El precio final puede variar según la revisión técnica detallada realizada por nuestros operadores.",
    marginX,
    currentY + 4,
  );

  doc.text(
    `JP3D Impresión 3D - cotizaciones@jp3d.com - Validez del documento: ${PRICING_CONFIG.quoteValidityDays || 15} días.`,
    pageWidth / 2,
    pageHeight - 15,
    { align: "center" },
  );

  return doc.output("blob");
}
