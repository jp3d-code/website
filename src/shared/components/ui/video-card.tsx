import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Media } from "@/payload-types";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn, getMediaImageProps } from "@/shared/lib/utils";

interface VideoCardProps {
  title: string;
  excerpt?: string | null;
  url: string;
  image?: (number | null) | Media | null;
  label?: string;
  className?: string;
}

export function VideoCard({
  title,
  excerpt,
  url,
  image,
  label = "Video",
  className,
}: VideoCardProps) {
  const imageProps = getMediaImageProps(image);

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative block overflow-hidden rounded-sm border border-transparent bg-card backdrop-blur-sm transition-all duration-300 hover:border-primary",
        className,
      )}
    >
      <div className="relative aspect-9/12 overflow-hidden">
        {imageProps ? (
          <Image
            src={imageProps.src}
            alt={imageProps.alt}
            width={imageProps.width}
            height={imageProps.height}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <Skeleton className="h-full w-full rounded-none" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Play className="h-12 w-12 fill-primary text-primary" />
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-widest">{label}</p>
        <h3 className="mt-3 font-semibold text-lg transition-colors group-hover:text-primary">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-3 line-clamp-2 text-muted-foreground text-sm">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
