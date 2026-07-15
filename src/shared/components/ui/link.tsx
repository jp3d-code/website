import type { VariantProps } from "class-variance-authority";
import NextLink from "next/link";
import type { ComponentProps } from "react";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

export type LinkBtmProps = ComponentProps<typeof NextLink> &
  VariantProps<typeof buttonVariants> & {
    tooltip?: React.ReactNode;
    className?: string;
  };

function LinkBtm({
  className,
  variant,
  size,
  children,
  ...props
}: LinkBtmProps) {
  return (
    <NextLink
      {...props}
      className={cn(
        buttonVariants({ variant, size }),
        "font-medium tracking-widest",
        className,
      )}
    >
      {children}
    </NextLink>
  );
}

export { LinkBtm };
