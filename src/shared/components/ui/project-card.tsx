"use client";

import { motion } from "framer-motion";
import { Tag as TagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/payload-types";
import { Badge } from "@/shared/components/ui/badge";
import { routes } from "@/shared/config/routes";
import { cn, getCollections, getMediaImageProps } from "@/shared/lib/utils";

type ProjectCardProject = Pick<
  Project,
  "title" | "slug" | "image" | "excerpt" | "tags"
>;

interface ProjectCardProps {
  project: ProjectCardProject;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const imageProps = getMediaImageProps(project.image);
  const tags = getCollections(project.tags);

  const href = routes.proyectos.detail.build({ slug: project.slug });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full", className)}
    >
      <div className="group relative h-full overflow-hidden rounded-sm pt-0 backdrop-blur-sm transition-all duration-300 hover:border-primary/50">
        <Link
          href={href}
          className="absolute inset-0 z-10"
          aria-label={project.title}
        />

        <div className="relative aspect-video overflow-hidden rounded-sm border border-transparent transition-colors duration-500 group-hover:border-primary">
          {imageProps ? (
            <Image
              src={imageProps.src}
              alt={imageProps.alt}
              width={600}
              height={338}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-muted" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="py-4">
          <h3 className="mb-2 line-clamp-1 font-medium text-foreground text-xl tracking-tight transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mb-4 line-clamp-3 text-muted-foreground text-sm">
            {project.excerpt}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 border-border/40 border-t pt-4">
              <TagIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
              {tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="bg-secondary/50 px-2 py-0.5 font-normal text-xs"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
