import { useEffect, useState } from "react";

export function useWebGL2Check(): boolean | null {
  const [hasWebGL2, setHasWebGL2] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = !!canvas.getContext("webgl2");
      setHasWebGL2(gl);
    } catch {
      setHasWebGL2(false);
    }
  }, []);

  return hasWebGL2;
}
