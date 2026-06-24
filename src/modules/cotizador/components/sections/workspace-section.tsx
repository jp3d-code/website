"use client";

import { SidebarPanel } from "@/modules/cotizador/components/panels/sidebar-panel";
import { ViewerPanel } from "@/modules/cotizador/components/panels/viewer-panel";
import { ModelLoading } from "@/modules/cotizador/components/ui/information/model-loading";
import { ModelDropzone } from "@/modules/cotizador/components/ui/viewer-3d/model-dropzone";
import { useQuotation } from "@/modules/cotizador/hooks/use-quotation";
import {
  Container,
  Section,
  SectionHeader,
  SectionTitle,
  SectionTitleForeground,
  SectionTitlePrimary,
} from "@/shared/components/ui/section";

export function WorkspaceSection() {
  const { state, loadModel, isProcessing } = useQuotation();
  const { model } = state;

  return (
    <Section className="flex flex-col py-14">
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

        {isProcessing ? (
          <ModelLoading />
        ) : model ? (
          <div className="grid w-full grid-cols-1 items-start gap-8 md:grid-cols-12">
            <div className="sticky top-16 z-20 w-full bg-background/90 pb-4 backdrop-blur-xs md:static md:col-span-8 md:bg-transparent md:pb-0 md:backdrop-blur-none">
              <ViewerPanel />
            </div>

            <div className="flex w-full flex-col gap-4 md:col-span-4">
              <SidebarPanel />
            </div>
          </div>
        ) : (
          <ModelDropzone onFileSelect={loadModel} />
        )}
      </Container>
    </Section>
  );
}
