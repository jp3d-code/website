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

    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { error: "El servicio de correo no está configurado en el servidor." },
        { status: 500 },
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    const emailSubject = `Cotización de Impresión 3D: ${fileName || "Modelo 3D"}`;

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

    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    const { error } = await resend.emails.send({
      from: `"JP3D Cotizaciones" <${FROM_EMAIL}>`,
      to: [BUSINESS_EMAIL],
      cc: [email],
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
      attachments: [
        {
          filename: `Cotizacion-${fileName?.replace(/\.[^/.]+$/, "") || "Modelo"}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      return NextResponse.json(
        { error: `Error al enviar el correo: ${error.message}` },
        { status: 500 },
      );
    }

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
