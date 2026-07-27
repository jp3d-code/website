"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import type { TeamMember } from "@/payload-types";
import { getMediaImageProps } from "@/shared/lib/utils";

interface TeamGridProps {
  members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {members.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: index * 0.2 }}
        >
          <TeamCard member={member} />
        </motion.div>
      ))}
    </div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const imageProps = getMediaImageProps(member.image);

  return (
    <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-lg">
      {imageProps ? (
        <Image
          src={imageProps.src}
          alt={imageProps.alt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-bold text-base text-white leading-tight">
          {member.name}
        </h3>
        <p className="mt-1 text-primary text-xs">{member.role}</p>

        <div className="mt-3 h-0.5 w-8 rounded-full bg-primary transition-all duration-300 group-hover:w-16" />

        {member.education && (
          <div className="mt-3 grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100">
            <p className="overflow-hidden text-white/70 text-xs leading-relaxed">
              {member.education}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
