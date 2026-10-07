"use client";

import { ExternalLink, Eye, FileText } from "lucide-react";
import * as motion from "motion/react-client";
import { useState } from "react";
import { BrochureViewerDialog } from "@/modules/sobre-nosotros/components/ui/brochure-viewer-dialog";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { LinkBtm } from "@/shared/components/ui/link";
import type { Brochure } from "@/shared/types/data";

interface BrochureCardProps {
  brochure: Brochure;
  index?: number;
}

export function BrochureCard({ brochure, index = 0 }: BrochureCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group flex h-full flex-col gap-5 overflow-hidden rounded-sm border border-border/60 bg-card p-8 transition-all duration-300 hover:border-primary"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center border-2 border-primary">
            <FileText className="size-6 text-primary" />
          </div>
          <Badge
            variant="outline"
            className="font-mono uppercase tracking-widest"
          >
            PDF / Canva
          </Badge>
        </div>

        <div className="flex flex-col items-start gap-2">
          <h3 className="font-bold text-2xl uppercase tracking-wide transition-colors group-hover:text-primary">
            {brochure.title}
          </h3>
          <div className="h-0.5 w-10 rounded-full bg-primary transition-[width] duration-300 group-hover:w-20" />
          <p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
            {brochure.description}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 border-border/40 border-t pt-6">
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
        <p className="text-muted-foreground text-xs leading-relaxed">
          En el visor puedes hojear las páginas y descargar el PDF.
        </p>
      </motion.article>

      <BrochureViewerDialog
        brochure={brochure}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
