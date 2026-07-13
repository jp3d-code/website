import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Media } from "@/payload-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getMediaUrl(media?: Media | number | null): string {
  if (!media || typeof media === "number") {
    return "";
  }

  return media.url ?? "";
}

export function getMediaImageProps(media?: Media | number | null) {
  if (!media || typeof media === "number") {
    return null;
  }

  return {
    src: media.url ?? "",
    alt: media.alt ?? "",
    width: media.width ?? 1920,
    height: media.height ?? 1080,
  };
}

export function formatDate(value?: string | null): string {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getCollections<T extends { id: number | string }>(
  value?: Array<T | number | string | null> | null,
): T[] {
  return (value ?? []).filter(
    (item): item is T =>
      item !== null && typeof item === "object" && "id" in item,
  );
}

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
