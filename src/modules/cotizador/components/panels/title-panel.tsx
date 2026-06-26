import { FileIcon } from "lucide-react";
import { DeleteModelDialog } from "@/modules/cotizador/components/ui/dialogs/delete-model-dialog";
import type { ActiveModel } from "@/modules/cotizador/types/active-model";

interface TitlePanelProps {
  model: ActiveModel;
}

export default function TitlePanel({ model }: TitlePanelProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border/80 bg-background/85 px-3.5 py-2 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-background/95">
      <div className="flex min-w-0 items-center gap-2">
        <div className="rounded bg-muted/60 p-1.5 text-muted-foreground">
          <FileIcon className="size-4" />
        </div>
        <div className="min-w-0">
          <h4
            className="truncate font-semibold text-foreground text-xs"
            title={model.name}
          >
            {model.name}
          </h4>
          <p className="mt-0.5 text-[10px] text-muted-foreground leading-none">
            {(model.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>
      <DeleteModelDialog />
    </div>
  );
}
