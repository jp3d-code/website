import type React from "react";
import { cn } from "@/shared/lib/utils";

export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "flex w-full items-center justify-center border-border/60 border-b px-6 pt-32 pb-36",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
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
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionOverline({
  children,
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "text-primary text-sm uppercase tracking-widest",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function SectionTitle({
  first,
  second,
  className,
  ...props
}: React.ComponentProps<"h3"> & {
  first: string;
  second?: string;
}) {
  return (
    <h3
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-2 font-condensed font-extrabold text-4xl uppercase",
        className,
      )}
      {...props}
    >
      <span className={cn("text-secondary", className)}>{first}</span>{" "}
      {second && <span className="text-primary">{second}</span>}
    </h3>
  );
}

export function SectionDescription({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "w-full max-w-xl text-center text-lg text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
