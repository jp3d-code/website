"use client";

import { motion } from "motion/react";
import { Section } from "@/shared/components/ui/section";
import { cn } from "@/shared/lib/utils";

const movingWords = ["EDUCACIÓN", "INGENIERÍA", "FABRICACIÓN", "DIGITAL"];

export function MarqueeSection() {
  const marqueeWords = [
    movingWords[movingWords.length - 1],
    ...movingWords,
    movingWords[0],
  ];

  return (
    <Section className="grid-background">
      <div className="mask-edge mx-auto flex w-full flex-col gap-16 overflow-hidden px-4">
        <motion.div
          className="flex gap-10 font-medium text-3xl text-foreground uppercase tracking-[0.2em] md:text-7xl"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {marqueeWords.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={cn("shrink-0", {
                "text-primary": word === "INGENIERÍA",
              })}
            >
              {word}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="flex gap-10 font-medium text-3xl text-foreground uppercase tracking-[0.2em] md:text-7xl"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {marqueeWords.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={cn("shrink-0", {
                "text-primary": word === "FABRICACIÓN",
              })}
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
