import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium cursor-pointer select-none",
    "transition-colors duration-150",
    "outline-none ring-offset-surface",
    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    "pressed:scale-[0.97]",
  ],
  {
    variants: {
      variant: {
        primary:   "bg-primary text-on-primary hovered:bg-primary-hover rounded-md",
        secondary: "bg-surface text-fg border border-border hovered:bg-surface-hover rounded-md",
        ghost:     "bg-transparent text-fg hovered:bg-surface-hover rounded-md",
        danger:    "bg-danger text-danger-fg hovered:opacity-90 rounded-md",
      },
      size: {
        sm: "h-8  px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export type ButtonProps = AriaButtonProps & VariantProps<typeof buttonStyles> & { className?: string };

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <AriaButton {...props} className={twMerge(buttonStyles({ variant, size }), className)} />;
}
