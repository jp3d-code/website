"use client";

import type { Testimonial } from "@/payload-types";
import { TestimonialCard } from "./testimonial-card";

interface TestimonialsMarqueeProps {
  testimonials: Testimonial[];
}

export function TestimonialsMarquee({
  testimonials,
}: TestimonialsMarqueeProps) {
  const duplicated = [...testimonials, ...testimonials];

  return (
    <div className="mask-edge relative w-full overflow-hidden">
      <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
        {duplicated.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
}
