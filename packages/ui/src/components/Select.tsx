import {
  Select as AriaSelect, SelectValue, Button, Popover, ListBox, ListBoxItem, Label,
  type SelectProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export type SelectOption = { id: string; label: string };

export type SelectFieldProps<T extends object = SelectOption> = SelectProps<T> & {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
};

export function Select({ label, options, placeholder = "Kies een optie…", className, ...props }: SelectFieldProps) {
  return (
    <AriaSelect {...props} className={twMerge("flex flex-col gap-1.5 w-full", className)}>
      {label && <Label className="text-sm font-medium text-fg">{label}</Label>}
      <Button className={[
        "inline-flex items-center justify-between",
        "h-10 px-3 w-full rounded-md border border-border",
        "bg-surface text-fg text-sm text-left",
        "outline-none transition-colors cursor-pointer",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent",
        "hovered:bg-surface-hover",
        "disabled:opacity-40 disabled:cursor-not-allowed",
      ].join(" ")}>
        <SelectValue className="data-[placeholder]:text-fg-muted">
          {({ selectedText }) => selectedText || placeholder}
        </SelectValue>
        <span aria-hidden className="text-fg-muted ml-2">▾</span>
      </Button>
      <Popover className="w-[--trigger-width] rounded-md border border-border bg-surface shadow-lg outline-none">
        <ListBox className="py-1 outline-none" items={options}>
          {(item) => (
            <ListBoxItem
              id={item.id}
              textValue={item.label}
              className={[
                "px-3 py-2 text-sm text-fg outline-none cursor-pointer",
                "hovered:bg-surface-hover",
                "selected:bg-primary selected:text-on-primary",
                "focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary",
              ].join(" ")}
            >
              {item.label}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
