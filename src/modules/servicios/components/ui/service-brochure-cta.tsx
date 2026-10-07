"use client";

import { ExternalLink, Eye, FileText } from "lucide-react";
import { useState } from "react";
import { BrochureViewerDialog } from "@/modules/sobre-nosotros/components/ui/brochure-viewer-dialog";
import { Button } from "@/shared/components/ui/button";
import { LinkBtm } from "@/shared/components/ui/link";
import type { Brochure } from "@/shared/types/data";

interface ServiceBrochureCtaProps {
  brochure: Brochure;
}

export function ServiceBrochureCta({ brochure }: ServiceBrochureCtaProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group flex w-full flex-col gap-5 rounded-sm border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center border-2 border-primary">
            <FileText className="size-6 text-primary" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="font-mono text-primary text-xs uppercase tracking-widest">
              [ Brochure ]
            </p>
            <p className="font-bold text-lg uppercase tracking-wide transition-colors group-hover:text-primary">
              ¿Quieres el detalle completo?
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Revisa el {brochure.title.toLowerCase()} con todos nuestros
              servicios y capacidades.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Vista rápida de ${brochure.title}`}
          >
            <Eye aria-hidden />
            Vista rápida
          </Button>
          <LinkBtm
            href={brochure.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            aria-label={`Ver a detalle ${brochure.title} en Canva`}
          >
            <ExternalLink aria-hidden />
            Ver a detalle
          </LinkBtm>
        </div>
      </div>

      <BrochureViewerDialog
        brochure={brochure}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
