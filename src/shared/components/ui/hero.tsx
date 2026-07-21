import { type ComponentProps, forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import {
  Container,
  Section,
  SectionDescription,
  SectionEyebrow,
} from "./section";

export const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  { eyebrow, title, description, image, children, className, ...props },
  ref,
) {
  return (
    <Section
      ref={ref}
      className={cn(
        "grid-background relative min-h-[80vh] overflow-hidden pt-20 md:pt-30 md:pb-30",
        className,
      )}
      {...props}
    >
      <div className="bg-grad pointer-events-none " />
      <div className="bg-grad-white pointer-events-none" />
      <Container
        className={cn(
          "flex flex-col items-start gap-6",
          image && "md:flex-row md:items-center md:justify-between",
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
        {image && (
          <div className="hidden w-full max-w-md md:block">
            <Image
              src={image}
              alt={title}
              width={500}
              height={500}
              className="object-contain w-full max-h-140"
            />
          </div>
        )}
      </Container>
    </Section>
  );
});

interface HeroProps extends ComponentProps<"section"> {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
}
