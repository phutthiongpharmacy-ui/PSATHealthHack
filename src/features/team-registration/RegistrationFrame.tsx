"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { getRegistrationStepState, getRegistrationStepSummary } from "./form";

const steps = ["ยืนยันอีเมล", "กรอก OTP", "ข้อมูลทีม", "ตรวจสอบและจ่าย", "ผลการชำระ"];

export function RegistrationFrame({ step, children, compact = false }: { step: number; children: ReactNode; compact?: boolean }) {
  const currentStep = getRegistrationStepSummary(steps, step);
  return (
    <main className="relative min-h-screen overflow-hidden bg-hh-bg px-4 py-3 sm:px-6 sm:py-6 lg:px-8 text-hh-text">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,210,229,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,210,229,0.035)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-hh-cyan/5 blur-3xl pointer-events-none" />
      <div className={`relative z-10 mx-auto ${compact ? "max-w-2xl" : "max-w-6xl"}`}>
        <header className="flex items-center justify-between border-b border-hh-border/40 pb-3 sm:pb-4">
          <Link href="/" className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm uppercase tracking-wide text-hh-text-muted transition hover:text-white">
            <ArrowLeft size={16} /> กลับหน้าหลัก
          </Link>
          <div className="font-sora text-[11px] sm:text-sm font-extrabold leading-snug text-hh-cyan">PSAT HEALTHHACK 2026</div>
        </header>
        <nav aria-label="ขั้นตอนการลงทะเบียน" className="my-4 sm:my-8">
          <ol className="flex w-full items-start">
            {steps.map((label, index) => {
              const number = index + 1;
              const state = getRegistrationStepState(number, step);
              const completed = state === "completed";
              const active = state === "active";
              return (
                <li key={label} aria-current={active ? "step" : undefined} className="relative flex min-w-0 flex-1 flex-col items-center">
                  {index < steps.length - 1 ? (
                    <span aria-hidden="true" className={`absolute left-1/2 top-[13px] h-0.5 w-full transition-colors sm:top-[19px] ${completed ? "bg-hh-emerald" : "bg-white/10"}`} />
                  ) : null}
                  <span
                    className={`relative z-10 flex h-7 w-7 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[11px] sm:text-xs font-extrabold leading-none transition-all ${completed
                      ? "border-hh-emerald bg-hh-emerald text-hh-bg"
                      : active
                        ? "border-hh-action bg-hh-action text-black shadow-[0_0_14px_rgba(255,106,0,.65)]"
                        : "border-hh-border/70 bg-[#062429] text-hh-text-muted"
                      }`}
                  >
                    {completed ? <Check aria-hidden="true" size={13} strokeWidth={3} /> : <span className="inline-block">{number}</span>}
                  </span>
                  <span
                    className={`mt-2 hidden min-h-8 px-1 text-center font-mono text-xs leading-tight sm:block ${completed ? "text-hh-emerald" : active ? "font-bold text-hh-action" : "text-hh-text-muted/70"
                      }`}
                  >
                    0{number} / {label}
                  </span>
                </li>
              );
            })}
          </ol>
          <div className="mt-2.5 text-center sm:hidden">
            <span className="font-mono text-xs font-extrabold text-hh-action">ขั้นที่ {currentStep.number} จาก {currentStep.total}</span>
            <span className="mx-1.5 text-hh-border">•</span>
            <span className="text-xs font-bold text-white">{currentStep.label}</span>
          </div>
        </nav>
        {children}
      </div>
    </main>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-hh-border/60 bg-hh-surface/80 p-4 sm:p-8 shadow-2xl backdrop-blur-2xl sm:rounded-3xl ${className}`}>{children}</section>;
}

export function SystemError({ message }: { message: string }) {
  return <div role="alert" className="rounded-xl border border-red-400/30 bg-red-950/40 px-3.5 py-2.5 text-xs sm:text-sm text-red-200">{message}</div>;
}
