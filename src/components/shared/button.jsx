import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TbLoader2 } from "react-icons/tb";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/80",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",
        success:
          "bg-success2 text-primary-foreground shadow-sm hover:bg-success2/80",
        warning:
          "bg-warning text-primary-foreground shadow-sm hover:bg-warning/80",
        info:
          "bg-info text-primary-foreground shadow-sm hover:bg-info/80",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        process:
          "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-base font-semibold relative overflow-hidden",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = forwardRef(function (
  {
    className,
    variant = "default",
    size = "default",
    asChild = false,
    children,
    disabled,
    loading = false,
    leftSection,
    rightSection,
    ...props
  },
  ref
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={loading || disabled}
      ref={ref}
      {...props}
    >
      {((leftSection && loading) ||
        (!leftSection && !rightSection && loading)) && (
          <TbLoader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
      {!loading && leftSection && <div className="mr-2">{leftSection}</div>}
      {children}
      {!loading && rightSection && <div className="ml-2">{rightSection}</div>}
      {rightSection && loading && (
        <TbLoader2 className="ml-2 h-4 w-4 animate-spin" />
      )}
    </Comp>
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
