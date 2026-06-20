"use client";

import {
  Container,
  Section,
  SectionHeader,
  SectionTitle,
  SectionTitleForeground,
  SectionTitlePrimary,
} from "@/shared/components/ui/section";
import { useModelLoader } from "../hooks/use-model-loader";
import { ModelDetails } from "./model-details";
import { ModelDropzone } from "./model-dropzone";

export default function CotizadorPage() {
  const { model, handleFileSelect, handleRemove } = useModelLoader();

  return (
    <Section className="flex flex-col">
      <Container className="items-start gap-8">
        <SectionHeader className="flex flex-col items-start gap-2">
          <SectionTitle>
            <SectionTitleForeground>Cotizador de</SectionTitleForeground>
            <SectionTitlePrimary>Impresión 3D</SectionTitlePrimary>
          </SectionTitle>
          <p className="mt-2 w-full text-lg text-muted-foreground">
            Carga tu modelo STL o GLB para analizar su geometría y estimar los
            costos en tiempo real.
          </p>
        </SectionHeader>

        {model ? (
          <ModelDetails model={model} onRemove={handleRemove} />
        ) : (
          <ModelDropzone onFileSelect={handleFileSelect} />
        )}
      </Container>
    </Section>
  );
}
