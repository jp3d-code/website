"use client";

import { useQuotation } from "@/modules/cotizador/hooks/use-quotation";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Trash2 } from "lucide-react";

export function DeleteModelDialog() {
  const { removeModel } = useQuotation();

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="destructive"
            size="icon-sm"
            title="Eliminar modelo"
            aria-label="Eliminar modelo"
          />
        }
      >
        <Trash2 className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Eliminar modelo?</DialogTitle>
          <DialogDescription>
            Se descartará el archivo cargado y se reiniciará la configuración de
            cotización actual. Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose render={<Button variant="outline" />}>
            Cancelar
          </DialogClose>
          <DialogClose
            render={
              <Button variant="destructive" onClick={removeModel} />
            }
          >
            Confirmar
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
