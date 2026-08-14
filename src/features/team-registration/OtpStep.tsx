"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, KeyRound, LoaderCircle, RotateCcw } from "lucide-react";
import { Panel, SystemError } from "./RegistrationFrame";
import { applyOtpInput } from "./form";
import { getRemainingSeconds } from "./storage";

export function OtpStep({
  email,
  otp,
  setOtp,
  referenceCode,
  resendAvailableAt,
  onVerify,
  onResend,
  onBack,
  loading,
  error,
}: {
  email: string;
  otp: string;
  setOtp: (value: string) => void;
  referenceCode: string;
  resendAvailableAt: string;
  onVerify: () => void;
  onResend: () => void;
  onBack: () => void;
  loading: boolean;
  error: string;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const [nowMs, setNowMs] = useState(() => Date.now());
  const resendSeconds = getRemainingSeconds(resendAvailableAt, nowMs);

  useEffect(() => {
    setNowMs(Date.now());
    const timer = window.setInterval(() => setNowMs(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [resendAvailableAt]);

  const digits = Array.from({ length: 6 }, (_, index) => otp[index] ?? "");
  const update = (index: number, value: string) => {
    const result = applyOtpInput(otp, index, value);
    setOtp(result.otp);
    if (/\d/.test(value)) refs.current[result.focusIndex]?.focus();
  };

  return (
    <Panel className="mx-auto max-w-xl">
      <div className="text-center">
        <div className="mx-auto mb-3 sm:mb-5 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl border border-hh-cyan/40 bg-hh-cyan/10 text-hh-cyan shadow-[0_0_20px_rgba(99,210,229,.2)]">
          <KeyRound className="w-5 h-5 sm:w-7 sm:h-7" />
        </div>
        <h1 className="font-sora text-lg sm:text-2xl md:text-3xl font-extrabold text-white">กรอกรหัส OTP 6 หลัก</h1>
        <p className="mt-1.5 sm:mt-3 text-xs sm:text-sm text-hh-text-muted">
          ส่งไปที่ <strong className="text-white font-mono">{email}</strong>
        </p>
        <p className="mt-1 font-mono text-[11px] sm:text-xs text-hh-cyan">
          รหัสอ้างอิง: <strong className="font-bold text-white">{referenceCode}</strong>
        </p>
      </div>

      <form
        className="mt-5 sm:mt-7 space-y-4 sm:space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          onVerify();
        }}
      >
        <div className="flex justify-center gap-1.5 sm:gap-3">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                refs.current[index] = element;
              }}
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              value={digit}
              onChange={(event) => update(index, event.target.value)}
              onPaste={(event) => {
                event.preventDefault();
                update(index, event.clipboardData.getData("text"));
              }}
              onKeyDown={(event) => {
                if (event.key === "Backspace" && !digit && index > 0) refs.current[index - 1]?.focus();
              }}
              className="h-11 w-9 rounded-lg sm:h-14 sm:w-12 sm:rounded-xl border-2 border-hh-cyan/40 bg-[#021316] text-center font-mono text-lg sm:text-xl font-bold text-hh-cyan outline-none transition-all focus:border-hh-cyan focus:ring-2 focus:ring-hh-cyan/40 focus:shadow-[0_0_15px_rgba(99,210,229,0.3)]"
            />
          ))}
        </div>

        {error ? <SystemError message={error} /> : null}

        <button
          disabled={loading || otp.length !== 6}
          className="flex h-11 sm:h-12 w-full items-center justify-center gap-2 rounded-xl bg-hh-action px-4 sm:px-5 py-2.5 sm:py-3.5 font-sora text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black shadow-[0_0_22px_rgba(255,106,0,.4)] transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-hh-border/60 disabled:text-hh-text-muted/60 disabled:shadow-none cursor-pointer"
        >
          {loading ? <LoaderCircle className="animate-spin" size={17} /> : null} ยืนยัน OTP <ArrowRight size={16} />
        </button>

        <div className="flex items-center justify-between gap-3 text-[11px] sm:text-xs">
          <button type="button" onClick={onBack} className="inline-flex shrink-0 items-center gap-1 text-hh-text-muted hover:text-white transition-colors cursor-pointer">
            <ArrowLeft size={13} /> เปลี่ยนอีเมล
          </button>
          <button
            type="button"
            onClick={onResend}
            disabled={loading || resendSeconds > 0}
            aria-live="polite"
            className="inline-flex items-center justify-end gap-1 text-right font-mono text-hh-cyan hover:text-white transition-colors disabled:cursor-not-allowed disabled:text-hh-text-muted/60 cursor-pointer"
          >
            <RotateCcw size={13} /> {resendSeconds > 0 ? `ส่ง OTP ใหม่ได้ใน 00:${String(resendSeconds).padStart(2, "0")}` : "ส่ง OTP ใหม่"}
          </button>
        </div>
      </form>
    </Panel>
  );
}
