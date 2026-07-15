import { type ComponentProps, forwardRef } from "react";
import { cn } from "@/shared/lib/utils";
import { LinkBtm } from "./link";

export const Section = forwardRef<HTMLElement, ComponentProps<"section">>(
  function Section({ className, children, ...props }, ref) {
    return (
      <section
        ref={ref}
        className={cn(
          "flex w-full items-center justify-center border-primary/15 border-b px-6 pt-32 pb-36",
          className,
        )}
        {...props}
      >
        {children}
      </section>
    );
  },
);

export function Container({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full max-w-6xl flex-col items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex w-full items-end justify-between gap-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionEyebrow({
  children,
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "font-mono text-base text-primary uppercase tracking-wider",
        className,
      )}
      {...props}
    >
      [ {children} ]
    </span>
  );
}

export function SectionMainTitle({
  children,
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn("font-bold text-5xl text-secondary", className)}
      {...props}
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  className,
  children,
  ...props
}: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "flex w-full flex-col flex-wrap items-start justify-center gap-2",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function SectionLink({
  className,
  ...props
}: ComponentProps<typeof LinkBtm>) {
  return (
    <LinkBtm
      {...props}
      variant={"outline"}
      className={cn(
        "min-w-fit text-muted-foreground text-xs uppercase tracking-[0.2em]",
        className,
      )}
    />
  );
}

export function SectionDescription({
  children,
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "w-full max-w-xl text-end text-lg text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
