"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Section } from "@/shared/components/ui/section";
import { cn } from "@/shared/lib/utils";

const movingWords = ["EDUCACIÓN", "INGENIERÍA", "FABRICACIÓN", "DIGITAL"];

export function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]);
  const rawRevertX = useTransform(scrollYProgress, [0, 1], ["-90%", "0%"]);

  const x = useSpring(rawX, {
    stiffness: 20,
    damping: 20,
    mass: 1,
  });

  const revertX = useSpring(rawRevertX, {
    stiffness: 20,
    damping: 20,
    mass: 1,
  });

  const marqueeWords = [
    movingWords[movingWords.length - 1],
    ...movingWords,
    movingWords[0],
  ];

  return (
    <Section ref={ref} className="bg-card">
      <div className="mask-edge mx-auto flex w-full flex-col gap-16 overflow-hidden px-4">
        <motion.div
          className="flex gap-10 font-medium text-3xl text-foreground uppercase tracking-[0.2em] md:text-7xl"
          style={{ x }}
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
          style={{ x: revertX }}
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
