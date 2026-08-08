import Image from "next/image";
import { type ComponentProps, forwardRef } from "react";
import { cn } from "@/shared/lib/utils";
import {
  Container,
  Section,
  SectionDescription,
  SectionEyebrow,
} from "./section";

export const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  { eyebrow, title, description, children, className, ...props },
  ref,
) {
  return (
    <Section
      ref={ref}
      className={cn(
        "grid-background relative min-h-[75vh] overflow-hidden pt-20 md:pt-30 md:pb-30",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none bg-grad" />
      <div className="pointer-events-none bg-grad-white" />
      <Container
        className={cn(
          "flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between",
        )}
      >
        <div className="flex flex-col items-start gap-6">
          <h1 className="flex w-full max-w-xl flex-col flex-wrap items-start justify-center gap-2">
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <span className="font-bold text-5xl text-secondary">{title}</span>
          </h1>
          {description && (
            <SectionDescription className="text-start">
              {description}
            </SectionDescription>
          )}
          {children}
        </div>
        <div className="hidden w-full max-w-lg md:block">
          <Image
            src="/logotipo_title.webp"
            alt={title}
            width={800}
            height={800}
            className="max-h-160 w-full object-contain opacity-85"
          />
        </div>
      </Container>
    </Section>
  );
});

interface HeroProps extends ComponentProps<"section"> {
  eyebrow: string;
  title: string;
  description?: string;
}
