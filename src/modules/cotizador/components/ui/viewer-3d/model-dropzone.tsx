import { PRICING_CONFIG } from "@/modules/cotizador/config/pricing";
import { FileDropzone } from "@/shared/components/ui/dropzone";

interface ModelDropzoneProps {
  onFileSelect: (file: File) => void;
}

export function ModelDropzone({ onFileSelect }: ModelDropzoneProps) {
  return (
    <div className="w-full">
      <FileDropzone
        value={null}
        onChange={(file) => {
          if (file) {
            onFileSelect(file);
          }
        }}
        accept=".stl,.glb"
        maxSize={PRICING_CONFIG.maxFileSizeMB * 1024 * 1024}
        title="Arrastra tu archivo .stl o .glb aquí o haz clic para subirlo"
        buttonLabel="Seleccionar archivo"
      />
    </div>
  );
}
