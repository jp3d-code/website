"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Section } from "@/shared/components/ui/section";
import { homeData } from "@/shared/data/home";

export function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]);
  const revertX = useTransform(scrollYProgress, [0, 1], ["-90%", "0%"]);

  const marqueeWords = [
    homeData.movingWords[homeData.movingWords.length - 1],
    ...homeData.movingWords,
    homeData.movingWords[0],
  ];

  return (
    <Section ref={ref} className="bg-card">
      <div className="mask-edge mx-auto flex w-full max-w-6xl flex-col gap-16 overflow-hidden px-4">
        <motion.div
          className="flex gap-8 font-medium text-3xl text-foreground uppercase tracking-[0.2em] md:text-7xl"
          style={{ x }}
        >
          {marqueeWords.map((word, index) => (
            <span key={`${word}-${index}`} className="shrink-0">
              {word}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="flex gap-8 font-medium text-3xl text-foreground uppercase tracking-[0.2em] md:text-7xl"
          style={{ x: revertX }}
        >
          {marqueeWords.map((word, index) => (
            <span key={`${word}-${index}`} className="shrink-0">
              {word}
            </span>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
