"use client";

import { RichText } from "@payloadcms/richtext-lexical/react";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/payload-types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="group flex aspect-[3/2] w-80 shrink-0 flex-col gap-4 rounded-lg border border-border bg-background p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-md md:w-105">
      <Quote className="h-8 w-8 text-primary/40" />
      <div className="paragraph flex-1 text-sm">
        <RichText data={testimonial.quote} />
      </div>
      <div className="mt-auto border-border border-t pt-4">
        <p className="font-bold text-secondary text-sm">{testimonial.name}</p>
        <p className="text-primary text-xs">{testimonial.role}</p>
      </div>
    </div>
  );
}
