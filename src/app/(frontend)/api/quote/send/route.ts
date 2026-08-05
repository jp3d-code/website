import { render } from "@react-email/render";
import { NextResponse } from "next/server";
import * as React from "react";
import { Resend } from "resend";
import { QuoteEmail } from "@/modules/cotizador/components/emails/quote-email";
import {
  BUSINESS_EMAIL,
  FROM_EMAIL,
  RESEND_API_KEY,
} from "@/shared/config/env";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    if (pdfFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "El archivo PDF excede el tamaño máximo permitido (10MB)." },
        { status: 400 },
      );
    }

    const isPdfType =
      pdfFile.type === "application/pdf" ||
      pdfFile.name.toLowerCase().endsWith(".pdf");
    if (!isPdfType) {
      return NextResponse.json(
        { error: "El archivo adjunto debe ser un formato PDF válido." },
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

    if (
      !email ||
      typeof email !== "string" ||
      !EMAIL_REGEX.test(email.trim())
    ) {
      return NextResponse.json(
        { error: "Ingresa una dirección de correo electrónico válida." },
        { status: 400 },
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedComment =
      typeof comment === "string" ? comment.slice(0, 500).trim() : undefined;
    const sanitizedFileName =
      typeof fileName === "string" && fileName.trim()
        ? fileName.trim()
        : "Modelo 3D";

    if (!RESEND_API_KEY) {
      // biome-ignore lint/suspicious/noConsole: server error logging
      console.error(
        "[Quote Send API Error]: RESEND_API_KEY no está configurada.",
      );
      return NextResponse.json(
        { error: "El servicio de correo no está configurado en el servidor." },
        { status: 500 },
      );
    }

    const resend = new Resend(RESEND_API_KEY);
    const emailSubject = `Cotización de Impresión 3D: ${sanitizedFileName}`;

    const emailElement = React.createElement(QuoteEmail, {
      fileName: sanitizedFileName,
      email: sanitizedEmail,
      comment: sanitizedComment,
      materialName: materialName || "N/A",
      infill: config?.infill || 20,
      quantity: config?.quantity || 1,
      finalPrice: quote?.finalPrice || 0,
      businessEmail: BUSINESS_EMAIL,
    });

    const htmlContent = await render(emailElement);
    const textContent = await render(emailElement, { plainText: true });

    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    const safeFilename = `Cotizacion-${sanitizedFileName.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`;

    const { error } = await resend.emails.send({
      from: `"JP3D Cotizaciones" <${FROM_EMAIL}>`,
      to: [BUSINESS_EMAIL],
      cc: [sanitizedEmail],
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
      attachments: [
        {
          filename: safeFilename,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      // biome-ignore lint/suspicious/noConsole: server error logging
      console.error("[Quote Send API Resend Error]:", error);
      return NextResponse.json(
        {
          error:
            "No se pudo enviar el correo de cotización. Inténtalo de nuevo.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // biome-ignore lint/suspicious/noConsole: server error logging
    console.error("[Quote Send API Internal Error]:", error);
    return NextResponse.json(
      {
        error:
          "Ocurrió un error interno al procesar el envío de la cotización.",
      },
      { status: 500 },
    );
  }
}
