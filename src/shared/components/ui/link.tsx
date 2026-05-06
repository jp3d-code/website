import type { VariantProps } from "class-variance-authority";
import NextLink from "next/link";
import type { ComponentProps } from "react";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

type Props = ComponentProps<typeof NextLink> &
  VariantProps<typeof buttonVariants> & {
    tooltip?: React.ReactNode;
    className?: string;
  };

function LinkComp({ className, variant, size, children, ...props }: Props) {
  return (
    <NextLink
      {...props}
      className={cn(
        buttonVariants({ variant, size }),
        "py-1 font-medium text-sm tracking-widest",
        className,
      )}
    >
      {children}
    </NextLink>
  );
}

export { LinkComp as LinkBtm };
