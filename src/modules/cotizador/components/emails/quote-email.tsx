import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface QuoteEmailProps {
  fileName: string;
  email: string;
  comment?: string;
  materialName: string;
  infill: number;
  quantity: number;
  finalPrice: number;
  businessEmail: string;
}

export function QuoteEmail({
  fileName,
  email,
  comment,
  materialName,
  infill,
  quantity,
  finalPrice,
  businessEmail,
}: QuoteEmailProps) {
  const formattedPrice = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(finalPrice);

  return (
    <Html lang="es">
      <Head />
      <Preview>Nueva estimacióan de cotización de impresión 3D</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-[#f6f9fc] font-sans">
          <Container className="mx-auto my-10 max-w-110 rounded-lg border border-[#e5e7eb] border-solid bg-white p-5">
            <Section className="mt-8">
              <div className="mb-6 flex items-center gap-2.5">
                <span className="block h-6 w-1.5 rounded-sm bg-[#10b981]" />
                <span className="font-bold text-[#1f2937] text-[22px] tracking-tight">
                  JP3D
                </span>
              </div>
            </Section>

            <Heading className="mx-0 my-4 p-0 font-bold text-[#1f2937] text-lg leading-tight">
              Estimación de Cotización JP3D
            </Heading>

            <Text className="text-[#374151] text-[14px] leading-6">
              Se ha generado una nueva estimación de cotización para impresión
              3D a través de nuestro sitio web.
            </Text>

            <Section className="my-6 rounded-md border border-[#e5e7eb] border-solid bg-[#f9fafb] p-4">
              <Heading
                as="h3"
                className="m-0 mb-3 font-bold text-[#1f2937] text-[15px]"
              >
                Resumen del Modelo
              </Heading>

              <div className="space-y-2">
                <Text className="m-0 text-[#4b5563] text-[13px]">
                  <strong>Archivo:</strong> {fileName}
                </Text>
                <Text className="m-0 text-[#4b5563] text-[13px]">
                  <strong>Material:</strong> {materialName}
                </Text>
                <Text className="m-0 text-[#4b5563] text-[13px]">
                  <strong>Relleno (Infill):</strong> {infill}%
                </Text>
                <Text className="m-0 text-[#4b5563] text-[13px]">
                  <strong>Cantidad:</strong> {quantity}{" "}
                  {quantity === 1 ? "unidad" : "unidades"}
                </Text>
              </div>

              <Hr className="my-3 border-[#e5e7eb] border-t" />

              <div className="flex items-baseline justify-between">
                <Text className="m-0 font-bold text-[#10b981] text-[14px]">
                  Precio Estimado Total:
                </Text>
                <Text className="m-0 font-bold font-mono text-[#10b981] text-[18px]">
                  {formattedPrice}
                </Text>
              </div>
            </Section>

            <Heading
              as="h3"
              className="m-0 mb-2 font-bold text-[#1f2937] text-[14px]"
            >
              Datos del Cliente
            </Heading>

            <Section className="mb-6 rounded-md bg-[#f3f4f6] p-3">
              <Text className="m-0 text-[#374151] text-[13px] leading-5">
                <strong>Email:</strong>{" "}
                <Link
                  href={`mailto:${email}`}
                  className="text-[#10b981] underline"
                >
                  {email}
                </Link>
              </Text>
              <Text className="m-0 mt-1 text-[#374151] text-[13px] leading-5">
                <strong>Comentario:</strong> "{comment || "Ninguno"}"
              </Text>
            </Section>

            <Text className="mb-6 text-[#4b5563] text-[13px] leading-5">
              Adjunto a este correo encontrará el documento PDF formal con el
              desglose detallado de los costos y la vigencia.
            </Text>

            <Hr className="my-4 border-[#e5e7eb] border-t" />

            <Text className="m-0 text-[#9ca3af] text-[11px] leading-4">
              Este correo es un mensaje automático. Por favor, no responda
              directamente a este email. Si tiene alguna duda o consulta,
              contáctenos en{" "}
              <Link
                href={`mailto:${businessEmail}`}
                className="text-[#10b981] underline"
              >
                {businessEmail}
              </Link>
              .
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
