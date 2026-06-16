import Link from "next/link";
import { type ComponentProps, forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

export const Section = forwardRef<HTMLElement, ComponentProps<"section">>(
  function Section({ className, children, ...props }, ref) {
    return (
      <section
        ref={ref}
        className={cn(
          "flex w-full items-center justify-center border-border/60 border-b px-6 pt-32 pb-36",
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
      className={cn(
        "flex w-full items-center justify-between gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionTitleForeground({
  children,
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span className={cn("text-secondary", className)} {...props}>
      {children}
    </span>
  );
}

export function SectionTitlePrimary({
  children,
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span className={cn("text-primary", className)} {...props}>
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
        "flex w-full flex-wrap items-center justify-start gap-x-2 text-3xl uppercase",
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
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "text-muted-foreground text-xs uppercase tracking-[0.2em] hover:underline",
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
