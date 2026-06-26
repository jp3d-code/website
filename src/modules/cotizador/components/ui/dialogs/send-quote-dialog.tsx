"use client";

import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useQuotation } from "@/modules/cotizador/hooks/use-quotation";
import { generateQuotePDF } from "@/modules/cotizador/utils/pdf";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Spinner } from "@/shared/components/ui/spinner";

interface SendQuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SendQuoteModal({ open, onOpenChange }: SendQuoteModalProps) {
  const { state, quote, selectedMaterial, setLastSentConfig } = useQuotation();
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isSending, setIsSending] = useState(false);

  const { model, config } = state;

  if (!model || !quote) return null;

  const getPDFBlob = (clientEmailVal: string, clientCommentVal?: string) => {
    const canvas = document.querySelector("canvas");
    const modelImage = canvas ? canvas.toDataURL("image/png") : undefined;
    const modelAspect =
      canvas && canvas.height > 0 ? canvas.width / canvas.height : 1.0;

    return generateQuotePDF({
      fileName: model.name,
      dimensions: model.stats.dimensions,
      volume: model.stats.volume,
      config: {
        scaleUniform: config.scaleUniform,
        scaleX: config.scaleX,
        scaleY: config.scaleY,
        scaleZ: config.scaleZ,
        infill: config.infill,
        quantity: config.quantity,
      },
      materialName: selectedMaterial.name,
      quote: {
        infillVolume: quote.infillVolume,
        estimatedWeight: quote.estimatedWeight,
        materialCost: quote.materialCost,
        fixedCost: quote.fixedCost,
        finalPrice: quote.finalPrice,
      },
      clientEmail: clientEmailVal,
      clientComment: clientCommentVal,
      modelImage,
      modelAspect,
    });
  };
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const pdfBlob = getPDFBlob(email, comment || undefined);

      const formData = new FormData();
      formData.append(
        "pdf",
        pdfBlob,
        `Cotizacion-${model.name.replace(/\.[^/.]+$/, "")}.pdf`,
      );

      const metadata = {
        email,
        comment,
        fileName: model.name,
        config,
        quote,
        materialName: selectedMaterial.name,
      };
      formData.append("metadata", JSON.stringify(metadata));

      const response = await fetch("/api/quote/send", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Ocurrió un error al enviar el correo.",
        );
      }

      setLastSentConfig(config);

      toast.success(
        "Cotización enviada con éxito. Revisa tu correo electrónico.",
      );

      setEmail("");
      setComment("");
      onOpenChange(false);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No se pudo enviar la cotización. Intenta de nuevo.";
      toast.error(errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="size-5 text-primary" />
            Enviar Cotización por Correo
          </DialogTitle>
          <DialogDescription>
            Ingresa tu correo electrónico para recibir un documento PDF formal
            con el desglose detallado de los costos y la vigencia.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSend} className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Correo Electrónico *</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSending}
              required
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
              Comentario u observaciones (opcional)
            </Label>
            <textarea
              id="comment"
              placeholder="Ej. Requisitos de acabado, color preferido, etc."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isSending}
              maxLength={500}
              className="min-h-20 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50"
            />
            <div className="text-right text-[10px] text-muted-foreground">
              {comment.length}/500 caracteres
            </div>
          </div>

          <DialogFooter className="flex flex-col gap-2 pt-2 sm:flex-row">
            <Button
              type="submit"
              disabled={isSending}
              className="w-full flex-1 gap-2"
            >
              {isSending ? (
                <>
                  <Spinner className="size-4" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Enviar Cotización
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
