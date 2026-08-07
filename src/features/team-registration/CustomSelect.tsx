"use client";

import { useEffect, useId, useState } from "react";
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

export function CustomSelect<T extends string>({ value, options, placeholder, ariaLabel, onChange, error }: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const listboxId = useId();
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return <div className="relative">
    <button
      type="button"
      role="combobox"
      aria-label={ariaLabel}
      aria-expanded={open}
      aria-controls={listboxId}
      aria-haspopup="listbox"
      onClick={() => setOpen((current) => !current)}
      className={`flex h-12 w-full items-center justify-between gap-3 rounded-full border bg-hh-bg px-4 text-left text-sm text-white outline-none transition hover:border-hh-cyan/60 focus:border-hh-cyan focus:ring-2 focus:ring-hh-cyan/30 ${error ? "border-red-400/60" : "border-hh-border"}`}
    >
      <span className={`min-w-0 flex-1 truncate ${selected ? "text-white" : "text-hh-text-muted/45"}`}>{selected?.label ?? placeholder}</span>
      <ChevronDown aria-hidden="true" size={20} className={`shrink-0 text-hh-cyan transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
    </button>

    {open ? <>
      <button type="button" aria-label="ปิดตัวเลือก" className="fixed inset-0 z-20 cursor-default" onClick={() => setOpen(false)} />
      <div id={listboxId} role="listbox" aria-label={ariaLabel} className="absolute left-0 right-0 top-full z-30 mt-1.5 overflow-hidden rounded-xl border border-hh-cyan/50 bg-[#041a1d] shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
        {options.map((option) => {
          const optionSelected = option.value === value;
          return <button
            key={option.value}
            type="button"
            role="option"
            aria-selected={optionSelected}
            onClick={() => { onChange(option.value); setOpen(false); }}
            className={`flex min-h-11 w-full items-center justify-between gap-3 border-b border-hh-border/40 px-4 py-2.5 text-left text-sm font-bold transition last:border-b-0 ${optionSelected ? "bg-hh-cyan/20 text-hh-cyan" : "text-white hover:bg-hh-cyan/10 hover:text-hh-cyan"}`}
          >
            <span>{option.label}</span>
            {optionSelected ? <Check aria-hidden="true" size={17} className="shrink-0 text-hh-cyan" /> : null}
          </button>;
        })}
      </div>
    </> : null}
  </div>;
}
