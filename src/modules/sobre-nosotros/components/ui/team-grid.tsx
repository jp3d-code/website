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
    <div className="grid w-full grid-cols-1 gap-x-16 gap-y-14 md:grid-cols-2">
      {members.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
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
    <div className="flex items-start gap-8">
      <div className="relative size-36 shrink-0 overflow-hidden rounded-full">
        {imageProps ? (
          <Image
            src={imageProps.src}
            alt={imageProps.alt}
            fill
            sizes="128px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
      </div>

      <div className="flex flex-col gap-1 pt-1">
        <h3 className="font-bold text-foreground text-lg leading-tight">
          {member.name}
        </h3>
        <p className="font-medium text-primary text-xs">{member.role}</p>
        {member.education && (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {member.education}
          </p>
        )}
      </div>
    </div>
  );
}
