import { TextField, Label, Input as AriaInput, FieldError, type TextFieldProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export type InputProps = TextFieldProps & {
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
};

export function Input({ label, placeholder, description, className, ...props }: InputProps) {
  return (
    <TextField {...props} className={twMerge("flex flex-col gap-1.5 w-full", className)}>
      {label && <Label className="text-sm font-medium text-fg">{label}</Label>}
      {description && <span className="text-xs text-fg-muted">{description}</span>}
      <AriaInput
        placeholder={placeholder}
        className={[
          "h-10 px-3 w-full rounded-md border border-border",
          "bg-surface text-fg text-sm placeholder:text-fg-muted",
          "outline-none transition-colors",
          "focus:ring-2 focus:ring-primary focus:border-transparent",
          "invalid:border-danger focus:invalid:ring-danger",
          "disabled:opacity-40 disabled:cursor-not-allowed",
        ].join(" ")}
      />
      <FieldError className="text-xs text-danger" />
    </TextField>
  );
}
