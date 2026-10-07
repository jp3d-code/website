"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import type { Brochure } from "@/shared/types/data";

interface BrochureViewerDialogProps {
  brochure: Brochure;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BrochureViewerDialog({
  brochure,
  open,
  onOpenChange,
}: BrochureViewerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[85vh] overflow-hidden p-0 sm:max-w-5xl">
        <DialogHeader className="border-border border-b p-4">
          <DialogTitle>{brochure.title}</DialogTitle>
          <DialogDescription className="line-clamp-1">
            {brochure.description}
          </DialogDescription>
        </DialogHeader>
        <div className="h-full min-h-0 w-full flex-1">
          {open && (
            <iframe
              src={brochure.embedUrl}
              title={`Visor ${brochure.title} — JP3D`}
              loading="lazy"
              allowFullScreen
              allow="fullscreen *;"
              className="h-full min-h-[60vh] w-full border-0"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
