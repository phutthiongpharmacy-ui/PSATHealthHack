"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export interface CustomSelectOption<T extends string> {
  value: T;
  label: string;
}

interface CustomSelectProps<T extends string> {
  value: T | "";
  options: CustomSelectOption<T>[];
  placeholder: string;
  ariaLabel: string;
  onChange: (value: T) => void;
  error?: string;
}

export function CustomSelect<T extends string>({
  value,
  options,
  placeholder,
  ariaLabel,
  onChange,
  error,
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const handlePointerDownOutside = (event: PointerEvent | MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDownOutside, { capture: true });
    document.addEventListener("touchstart", handlePointerDownOutside, { capture: true });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside, { capture: true });
      document.removeEventListener("touchstart", handlePointerDownOutside, { capture: true });
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelectOption = (optionValue: T) => {
    onChange(optionValue);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        className={`flex h-11 sm:h-12 w-full items-center justify-between gap-1.5 sm:gap-3 rounded-full border bg-hh-bg px-3 sm:px-4 text-left text-xs sm:text-sm text-white outline-none transition hover:border-hh-cyan/60 focus:border-hh-cyan focus:ring-2 focus:ring-hh-cyan/30 ${
          error ? "border-red-400/60" : "border-hh-border"
        }`}
      >
        <span
          className={`min-w-0 flex-1 truncate ${
            selected ? "text-white" : "text-hh-text-muted/45"
          }`}
        >
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          aria-hidden="true"
          size={15}
          className={`shrink-0 text-hh-cyan transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <div
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 right-0 top-full z-30 mt-1.5 min-w-full overflow-hidden rounded-xl border border-hh-cyan/50 bg-[#041a1d] shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
        >
          {options.map((option) => {
            const optionSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={optionSelected}
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleSelectOption(option.value);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelectOption(option.value);
                }}
                className={`flex min-h-10 sm:min-h-11 w-full items-center justify-between gap-2 sm:gap-3 border-b border-hh-border/40 px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm font-bold transition last:border-b-0 cursor-pointer ${
                  optionSelected
                    ? "bg-hh-cyan/20 text-hh-cyan"
                    : "text-white hover:bg-hh-cyan/10 hover:text-hh-cyan active:bg-hh-cyan/20"
                }`}
              >
                <span>{option.label}</span>
                {optionSelected ? (
                  <Check
                    aria-hidden="true"
                    size={15}
                    className="shrink-0 text-hh-cyan"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
