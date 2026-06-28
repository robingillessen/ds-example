import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const badgeStyles = cva(
  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-surface-hover text-fg-muted",
        success: "bg-success-fg text-success",
        danger:  "bg-danger-fg  text-danger",
        warning: "bg-warning-fg text-warning",
        info:    "bg-info-fg    text-info",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeStyles>;

export function Badge({ variant, className, ...props }: BadgeProps) {
  return <span {...props} className={twMerge(badgeStyles({ variant }), className)} />;
}
