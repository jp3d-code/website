import { render } from "@react-email/render";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as React from "react";
import { QuoteEmail } from "@/modules/cotizador/components/emails/quote-email";
import {
  BUSINESS_EMAIL,
  FROM_EMAIL,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
} from "@/shared/config/env";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const pdfFile = formData.get("pdf") as File | null;
    const metadataStr = formData.get("metadata") as string | null;

    if (!pdfFile || !metadataStr) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos (pdf o metadata)." },
        { status: 400 },
      );
    }

    let metadata: {
      email: string;
      comment?: string;
      fileName: string;
      quote: { finalPrice: number };
      config: { infill: number; quantity: number };
      materialName: string;
    };
    try {
      metadata = JSON.parse(metadataStr);
    } catch (_e) {
      return NextResponse.json(
        { error: "El formato de metadata no es un JSON válido." },
        { status: 400 },
      );
    }

    const { email, comment, fileName, quote, config, materialName } = metadata;

    if (!email) {
      return NextResponse.json(
        { error: "El correo electrónico del cliente es requerido." },
        { status: 400 },
      );
    }

    // Convertir el PDF a Buffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    // Validar configuraciones de SMTP
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { error: "El servicio de correo no está configurado en el servidor." },
        { status: 500 },
      );
    }

    // Crear el transportador de Nodemailer
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: Number(SMTP_PORT) === 465, // true para 465, false para otros puertos
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const emailSubject = `Cotización de Impresión 3D: ${fileName || "Modelo 3D"}`;

    // Renderizar correo usando react-email
    const emailElement = React.createElement(QuoteEmail, {
      fileName: fileName || "N/A",
      email,
      comment: comment || undefined,
      materialName: materialName || "N/A",
      infill: config?.infill || 20,
      quantity: config?.quantity || 1,
      finalPrice: quote?.finalPrice || 0,
      businessEmail: BUSINESS_EMAIL,
    });

    const htmlContent = await render(emailElement);
    const textContent = await render(emailElement, { plainText: true });

    // Enviar el correo
    await transporter.sendMail({
      from: `"JP3D Cotizaciones" <${FROM_EMAIL}>`,
      to: BUSINESS_EMAIL,
      cc: email,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
      attachments: [
        {
          filename: `Cotizacion-${fileName?.replace(/\.[^/.]+$/, "") || "Modelo"}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        error: `Error interno del servidor al procesar el envío: ${errorMessage}`,
      },
      { status: 500 },
    );
  }
}
