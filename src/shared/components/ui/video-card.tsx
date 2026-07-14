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
      className={cn("overflow-hidden rounded-lg bg-card", className)}
    >
      {imageProps ? (
        <Image
          src={imageProps.src}
          alt={imageProps.alt}
          width={imageProps.width}
          height={imageProps.height}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="aspect-video w-full object-cover"
        />
      ) : (
        <Skeleton className="aspect-video w-full rounded-none" />
      )}
      <div className="p-5">
        <p className="text-xs uppercase tracking-widest">{label}</p>
        <h3 className="mt-3 font-semibold text-lg">{title}</h3>
        {excerpt && (
          <p className="mt-3 line-clamp-2 text-muted-foreground text-sm">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
