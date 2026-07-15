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
        "grid-background relative min-h-[80vh] overflow-hidden pt-20 md:pt-40 md:pb-40",
        className,
      )}
      {...props}
    >
      <Container className="flex flex-col items-start gap-6">
        <h1 className="flex w-full flex-col flex-wrap items-start justify-center gap-2">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <span className="font-bold text-5xl text-secondary">{title}</span>
        </h1>
        {description && (
          <SectionDescription className="text-start">
            {description}
          </SectionDescription>
        )}
        {children}
      </Container>
    </Section>
  );
});

interface HeroProps extends ComponentProps<"section"> {
  eyebrow: string;
  title: string;
  description?: string;
}
