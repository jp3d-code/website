"use client";

import { File as FileIcon, ImagePlus, Upload, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

type FileDropzoneProps = {
  value?: File | null;
  onChange?: (file: File | null) => void;

  accept?: string;
  multiple?: boolean;
  maxSize?: number;

  showPreview?: boolean;
  cropOnImages?: boolean;

  title?: string;
  buttonLabel?: string;
  className?: string;
};

async function cropCenterSquare(file: File): Promise<File> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read image"));

    reader.readAsDataURL(file);
  });

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const side = Math.min(img.width, img.height);

      const sx = (img.width - side) / 2;
      const sy = (img.height - side) / 2;

      const canvas = document.createElement("canvas");

      canvas.width = side;
      canvas.height = side;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Unable to crop image"));
        return;
      }

      ctx.drawImage(img, sx, sy, side, side, 0, 0, side, side);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create image"));
            return;
          }

          resolve(
            new File([blob], file.name, {
              type: "image/png",
            }),
          );
        },
        "image/png",
        1,
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
}

export function FileDropzone({
  value = null,
  onChange,

  accept = "*/*",
  multiple = false,
  maxSize = 5 * 1024 * 1024,

  showPreview = true,
  cropOnImages = false,

  title = "Arrastra un archivo aquí o haz clic para subirlo",
  buttonLabel = "Seleccionar archivo",
  className,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const previewUrl = React.useMemo(() => {
    if (!value?.type.startsWith("image/")) {
      return null;
    }

    return URL.createObjectURL(value);
  }, [value]);

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const readFile = (file: File) => {
    setProgress(0);

    const timer = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(timer);
          return 100;
        }

        return prev + 20;
      });
    }, 120);

    onChange?.(file);
  };

  const validateFile = (file: File) => {
    if (file.size > maxSize) {
      alert(
        `El archivo supera el límite de ${Math.round(
          maxSize / 1024 / 1024,
        )} MB`,
      );

      return false;
    }

    return true;
  };

  const handleFiles = async (files: FileList | null) => {
    const file = files?.[0];

    if (!file) return;

    if (!validateFile(file)) return;

    let finalFile = file;

    if (cropOnImages && file.type.startsWith("image/")) {
      finalFile = await cropCenterSquare(file);
    }

    readFile(finalFile);
  };

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={0}
        className={cn(
          "rounded-lg border-2 border-dashed px-6 py-20 text-center transition-colors",
          {
            "border-primary bg-muted": isDragging,
            "border-muted-foreground/30": !isDragging,
          },
          className,
        )}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);

          handleFiles(event.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />

        <div className="mb-2 flex justify-center">
          {accept.includes("image") ? (
            <ImagePlus className="h-6 w-6 text-muted-foreground" />
          ) : (
            <FileIcon className="h-6 w-6 text-muted-foreground" />
          )}
        </div>

        <p className="text-muted-foreground text-sm">{title}</p>

        <Button
          type="button"
          variant="outline"
          className="mt-3"
          onClick={(event) => {
            event.stopPropagation();
            inputRef.current?.click();
          }}
        >
          <Upload className="mr-2 h-4 w-4" />
          {buttonLabel}
        </Button>
      </div>

      {progress > 0 && progress < 100 && (
        <div className="rounded border p-2 text-sm">
          Procesando... {progress}%
        </div>
      )}

      {value && (
        <div className="space-y-3 rounded border p-3">
          {showPreview && previewUrl ? (
            <img
              src={previewUrl}
              alt={value.name}
              className="max-h-56 w-full rounded object-contain"
            />
          ) : (
            <div className="flex items-center gap-2">
              <FileIcon className="h-5 w-5" />

              <div className="min-w-0">
                <p className="truncate font-medium text-sm">{value.name}</p>

                <p className="text-muted-foreground text-xs">
                  {(value.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {cropOnImages && value.type.startsWith("image/") && (
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  const cropped = await cropCenterSquare(value);
                  onChange?.(cropped);
                }}
              >
                Recortar
              </Button>
            )}

            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                setProgress(0);
                onChange?.(null);
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Eliminar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
